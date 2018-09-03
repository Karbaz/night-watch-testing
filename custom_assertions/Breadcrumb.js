var cheerio = require("cheerio");
// var structured_urls = require("../Breadcrumb/urls");

Breadcrumb = function (expression) {
    this.message = `Expected Number Of BreadCrumb ${expression}`;

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
            var scripts = $("#pd_bread")
            if (scripts[0] && scripts[0]["children"]) {
                let counter = scripts[0]["children"].length
                this.verify.equal(counter.length,expression);
            }else{
                this.verify.ok(false)
            }
        });
    };
};

module.exports.assertion = Breadcrumb;