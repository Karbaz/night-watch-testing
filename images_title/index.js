var structured_urls = require("./urls")
var cheerio = require("cheerio")
var seo_test_cases = {};
let test_case_failure_collections = [];
var checkerForTestCaseFailure = require("../helper").checkerForTestCaseFailure;
var sendSuccessSlackNotification = require("../SlackNotification").sendSuccessSlackNotification
var sendFailureSlackNotification = require("../SlackNotification").sendFailureSlackNotification
var chanelConfig = require("../SlackNotification").chanelConfig


Object.keys(structured_urls.structured_urls).map((value, index) => {
    let current_query = structured_urls.structured_urls[value]
    let copy = Object.assign({
        [`${index+1}: ${current_query["tags"]}`]: function (browser) {
            browser.resizeWindow(400, 400);
            browser.url(current_query["url"]);
            browser.waitForElementVisible('body', 1000);
            browser.pause(1000);
            browser.source(function (res) {
                $ = cheerio.load(res.value)
                var scripts = $("img")
                scripts.map((index, val) => {
                    if (val.name === "img") {
                        this.verify.ok(val.attribs.title, `Title ${val.attribs.src}`)
                        this.verify.ok(val.attribs.src, `Src ${val.attribs.src}`)
                        this.verify.ok(val.attribs.alt, `Alt ${val.attribs.src}`)
                    }
                })
            })
            browser.end()
        },
        afterEach: function (browser, done) {
            checkerForTestCaseFailure(browser, browser.currentTest.name, function (error, response) {
                if (response) test_case_failure_collections.push(response)
            })
            done()
        },
        after: function (browser, done) {
            if (browser.currentTest.results && browser.currentTest.results.failed && browser.currentTest.results.failed > 0) {
                sendFailureSlackNotification({
                    channelId: chanelConfig["automation-testing"].channelId,
                    failTestCasesArray: test_case_failure_collections,
                    webHook: chanelConfig["automation-testing"].webHook,
                })
            } else {
                sendSuccessSlackNotification({
                    channelId: chanelConfig["automation-testing"].channelId,
                    testFile: "Seo.js"
                })
            }
            done()
        }
    }, seo_test_cases)
    seo_test_cases = copy;
})


exports.module = seo_test_cases;