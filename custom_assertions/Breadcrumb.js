var cheerio = require("cheerio");
var structured_urls = require("../Breadcrumb/urls");

Breadcrumb = function(expression) {
    this.message = `Expected Number Of BreadCrumb ${expression}`;

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
            var scripts = $("#pd_bread")
            let counter = scripts[0]["children"].length
            callback(counter)
        });
    };
};

module.exports.assertion = Breadcrumb;