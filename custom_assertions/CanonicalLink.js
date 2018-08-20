var cheerio = require("cheerio");
var structured_urls = require("../structured_data/urls");

CanonicalLink = function(expression) {
    this.message = `Searching for Canonical Link in ${expression}`;

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
            var scripts = $("link")
            scripts.map((index,value)=>{
                if(value["attribs"]["rel"] == "canonical"){
                    
                    callback(value["attribs"]["href"])
                }
            })
        });
    };
};

module.exports.assertion = CanonicalLink;