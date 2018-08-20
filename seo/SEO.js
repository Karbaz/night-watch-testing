var seo_urls = require("../config/seo_urls")
var seo_test_cases = {};
seo_urls.seo_urls.map((value, index) => {
    Object.keys(value).map((testValue, testIndex) => {
        let copy = Object.assign({
            '@tags': [index == 1 ? "Example" : "Test_" + index.toString()],
            [value[testValue]['tag']]: function (browser) {
                browser
                    .resizeWindow(400, 400)
                    .url(value[testValue]['url'])
                    .waitForElementVisible('body', 1000)
                    .pause(100)
                    .end()
            },
        }, seo_test_cases)
        seo_test_cases = copy;
    })
})

exports.module = seo_test_cases;