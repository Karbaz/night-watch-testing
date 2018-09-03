const {
    IncomingWebhook
} = require('@slack/client');
const url = "https://hooks.slack.com/services/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";
exports.chanelConfig = {
    ["automation-testing"]: {
        webHook: "https://hooks.slack.com/services/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",
        channelId: "#automation-testing"
    }
}

exports.sendSuccessSlackNotification = ({
    channelId,
    testFile
}) => {
    const webhook = new IncomingWebhook(url);
    webhook.send({
            "text": "Automation Testing Completed",
            "attachments": [{
                "color": "good",
                "author_name": "Testing Bot",
                "title": "Test Result",
                "text": "All Test Cases Pass For "
            }]
        },
        function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
}

exports.sendFailureSlackNotification = ({
    channelId,
    failTestCasesArray
}) => {
    const webhook = new IncomingWebhook(url);
    let SlackTestString = "";
    failTestCasesArray.map((value, index) => SlackTestString += `[Message]: ${value.message}\n[Failure Message]: ${value.failure}\n[Tag Name]: ${value.tagname} \n \n`)
    webhook.send({
            "text": "Automation Testing Fails",
            "attachments": [{
                "color": "danger",
                "author_name": "Testing Bot",
                "title": "Test Fail",
                "text": SlackTestString,
            }]
        },
        function (err, res) {
            if (err) {
                console.log('Error:', err);
            } else {
                console.log('Message sent: ', res);
            }
        });
}