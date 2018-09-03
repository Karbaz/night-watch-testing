var testCaseUrls = require("../../testing_urls").urls.TAG_COUNTER
let test_case_failure_collections = [];
var checkerForTestCaseFailure = require("../../helper").checkerForTestCaseFailure;
var sendSuccessSlackNotification = require("../../SlackNotification").sendSuccessSlackNotification
var sendFailureSlackNotification = require("../../SlackNotification").sendFailureSlackNotification
var chanelConfig = require("../../SlackNotification").chanelConfig
var cheerio = require("cheerio")

let actualTestCase = {}
Object.keys(testCaseUrls).map((value, index) => {
    let testDetails = testCaseUrls[value]
    let copy_test = Object.assign({
        [`${index+1} TESTING SEO FOR ${testDetails.tag}`]: function (browser) {
            browser
                .url(testDetails.url)
                .waitForElementVisible('body', 1000)
                .verify.ElementCount("h1", 1)
                .verify.elementPresent("h1")
                .end();
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
                    chanel_id: chanelConfig["automation-testing"].chanel_id,
                    failTestCasesArray: test_case_failure_collections,
                    webHook: chanelConfig["automation-testing"].webHook,
                })
            } else {
                sendSuccessSlackNotification({
                    chanel_id: chanelConfig["automation-testing"].chanel_id
                })
            }
            done()
        }

    }, actualTestCase)
    actualTestCase = copy_test
})

exports.module = actualTestCase