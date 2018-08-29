var assert = require("assert")
var seo_urls = require("./urls")
var seo_test_cases = {};
seo_urls.seo_urls.map((value, index) => {
    Object.keys(value).map((testValue, testIndex) => {
        let copy = Object.assign({
            [value[testValue]['tag']]: function (browser) {
                browser.resizeWindow(400, 400);
                browser.url(value[testValue]['url']);
                browser.waitForElementVisible('body', 1000);
                browser.verify.attributeEquals("meta[property='og:title']", "content", value[testValue]['title'])
                browser.verify.attributeEquals("meta[property='og:description']", "content", value[testValue]['desc'])
                browser.pause(100);
                browser.end();
            },
        }, seo_test_cases)
        seo_test_cases = copy;
    })
})

exports.module = seo_test_cases;