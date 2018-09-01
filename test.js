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


// const webhook = new IncomingWebhook(url);
// webhook.send('Hello there', function (err, res) {
//     if (err) {
//         console.log('Error:', err);
//     } else {
//         console.log('Message sent: ', res);
//     }
// });

exports.sendSuccessSlackNotification = ({
    channelId,
    testFile
}) => {
    const webhook = new IncomingWebhook(url);
    webhook.send('Hello there', function (err, res) {
        if (err) {
            console.log('Error:', err);
        } else {
            console.log('Message sent: ', res);
        }
    });
}

this.sendSuccessSlackNotification({
    channelId:null,
    testFile:null
})