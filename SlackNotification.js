const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient("https://hooks.slack.com/services/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");

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = '#react-native';

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: conversationId, text: 'Hello there' })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);