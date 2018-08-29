    var cheerio = require("cheerio");
    var structured_urls = require("../structured_data/urls");

    CheckTitle = function(expression) {
        this.message = `Structure Data Contains ${expression}`;

        this.expected = expression;

        this.pass = (value) => {
            return value === this.expected;
        };

        this.value = (result) => {
            return result;
        };

        this.command = (callback) => {
            return this.api.source(function(result){
                $ = cheerio.load(result.value)
                var scripts = $("script")
                let check = false;
                let temp_script;
                scripts.map((i, v) => {
                    if (v["attribs"]["type"] == "application/ld+json") {
                        temp_script = JSON.parse(v["children"][0]["data"])
                        if (expression == temp_script["@type"]) {
                            check=true;
                            this.verify.equal(expression,temp_script["@type"])
                        }
                    }
                })
                if(!check){
                    this.verify.equal(expression,temp_script["@type"])
                }
            });
        };
    };
    module.exports.assertion = CheckTitle;