var structured_urls = require("./urls")
var cheerio = require("cheerio")
var assert = require('chai').assert
var seo_test_cases = {};


Object.keys(structured_urls.structured_urls).map((value, index) => {
    let current_query = structured_urls.structured_urls[value]
    let copy = Object.assign({
        [`${index+1}: ${current_query["tags"]}`]: function (browser) {
            browser
                .resizeWindow(400, 400)
                .url(current_query["url"])
                .waitForElementVisible('body', 1000)
                .assert.CheckTitle(current_query["check"])
                .pause(100)
                .end()
        },
    }, seo_test_cases)
    seo_test_cases = copy;
})


exports.module = seo_test_cases;