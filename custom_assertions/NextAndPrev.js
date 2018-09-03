var cheerio = require("cheerio");
var structured_urls = require("../structured_data/urls");

NextAndPrev = function (expression) {
    this.message = `Searching for Links  ======================== ${expression}`;

    this.expected = expression;

    this.pass = (value) => {
        return value === this.expected;
    };

    this.value = (result) => {
        return result;
    };

    this.command = (callback) => {
        return this.api.source(function (result) {
            $ = cheerio.load(result.value)
            var scripts = $("link")
            let check = false;
            let valueCan;
            scripts.map((index, value) => {
                valueCan = value;
                if (valueCan["attribs"]["rel"] == expression) {
                    check = true;
                    this.verify.equal(expression,valueCan["attribs"]["rel"])
                }
            })
            if (!check) {
                this.verify.equal(expression,valueCan["attribs"]["rel"])
            }
        });
    };
};

module.exports.assertion = NextAndPrev;