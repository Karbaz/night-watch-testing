var seo_urls = require("./urls")
var testCase = {};
let test_case_failure_collections = [];
var checkerForTestCaseFailure = require("../helper").checkerForTestCaseFailure;
var sendSuccessSlackNotification = require("../SlackNotification").sendSuccessSlackNotification
var sendFailureSlackNotification = require("../SlackNotification").sendFailureSlackNotification
var chanelConfig = require("../SlackNotification").chanelConfig

seo_urls.seo_urls.map((value, index) => {
    Object.keys(value).map((testValue, testIndex) => {
        let v = JSON.parse(JSON.stringify(testValue))
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
        }, testCase)
        testCase = copy;
    })
})

exports.module = testCase;