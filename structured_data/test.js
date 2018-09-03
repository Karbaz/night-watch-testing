const { IncomingWebhook } = require('@slack/client');
const url = "https://hooks.slack.com/services/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";
const webhook = new IncomingWebhook(url);

// Send simple text to the webhook channel
webhook.send('Hello there', function(err, res) {
    if (err) {
        console.log('Error:', err);
    } else {
        console.log('Message sent: ', res);
    }
});