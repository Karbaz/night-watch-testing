const { WebClient } = require('@slack/client');

// An access token (from your Slack app or custom integration - xoxa, xoxp, or xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient("xoxp-207183315829-207176537076-426268930400-6eadeb2f7d2db579239577b50537ffd5");

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = '#automation-testing';

// See: https://api.slack.com/methods/chat.postMessage
web.chat.postMessage({ channel: conversationId, text: 'Hello there' })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);