var liveDomain = require("../global").liveDomain
exports.structured_urls = {
    "Link_1": {
        "url": `${liveDomain}/women-new-arrivals-collection`,
        "tags": "CHECKING FOR NEXT TAG",
        "testCase": ["next","prev"]
    },
    "Link_2": {
        "url": `${liveDomain}/women-new-arrivals-collection/default/2`,
        "tags": "CHECKING FOR NEXT TAG",
        "testCase": ["prev", "next"]
    },
    "Link_3": {
        "url": `${liveDomain}/women-new-arrivals-collection/default/3`,
        "tags": "CHECKING FOR NEXT TAG",
        "testCase": ["prev", "next"]
    }
}