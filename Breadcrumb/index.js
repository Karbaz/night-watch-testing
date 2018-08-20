var structured_urls = require("./urls")
var seo_test_cases = {};

Object.keys(structured_urls.structured_urls).map((value, index) => {
    let current_query = structured_urls.structured_urls[value]
    let copy = Object.assign({
        [`${index+1}: ${current_query["tags"]}`]: function (browser) {
            browser.resizeWindow(400, 400);
            browser.url(current_query["url"]);
            browser.waitForElementVisible('body', 1000);
            browser.pause(100);
            browser.assert.Breadcrumb(current_query["nos_of_breadCrumb_tags"])
            browser.end()
        },
    }, seo_test_cases)
    seo_test_cases = copy;
})


exports.module = seo_test_cases;