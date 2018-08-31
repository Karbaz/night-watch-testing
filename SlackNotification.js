var Slack = require('slack-node');

exports.chanelConfig = {
    ["automation-testing"]: {
        webHook: "https://hooks.slack.com/services/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",
        channelId: "#automation-testing"
    }
}

exports.sendFailureSlackNotification = ({
    channelId,
    webHook,
    testCase
}) => {
    let SlackTestString = "";
    let slack = new Slack();
    slack.setWebhook(webHook);
    testCase.map((v, i) => {
        SlackTestString += `${v.failure} \n \n`
    })
    slack.webhook({
        channel: `${channelId}`,
        username: "Automation-Testing-WebApp",
        icon_emoji: ":slack:",
        text: `Testing Fail`,
        attachments: [{
            "text": `${SlackTestString}`,
            "color": "danger",
        }]
    }, function (err, response) {
        console.log(response);
    });

}

exports.sendSuccessSlackNotification = (channelId, testFile) => {
    let slack = new Slack();
    slack.setWebhook(chanelConfig["automation-testing"].webHook);
    slack.webhook({
        channel: `${chanelConfig["automation-testing"].channelId}`,
        username: "Automation-Testing-WebApp",
        icon_emoji: ":slack:",
        text: `Testing`,
        attachments: [{
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "color": "good",
        }]
    }, function (err, response) {
        console.log(response);
    });

}

// this.sendSuccessSlackNotification(null, null)