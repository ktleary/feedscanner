'use strict';

let Parser = require('rss-parser');
let parser = new Parser();
const ItemSummary = require('./lib/ItemSummary');
const {
  getCleanText,
  getSentencesSentiment,
  processText
} = require('./lib/text-tools');

async function feedscanner(feedUri, keywords, excludes = []) {
  try {
    const feed = await parser.parseURL(feedUri);
    const feedSummary = {
      title: feed.title || feed.rights || feedUri,
      itemSummaries: []
    };
    for (const item of feed.items) {
      if (excludes[item.link]) continue;
      const cleanText = getCleanText(item);
      const vocabMatches = processText(cleanText, keywords);
      if (!vocabMatches) continue;
      const sentencesSentiment = getSentencesSentiment(cleanText);
      const itemSummary = new ItemSummary(
        item.title,
        item.link,
        cleanText,
        vocabMatches.vocab,
        vocabMatches.matches,
        sentencesSentiment
      );
      feedSummary.itemSummaries.push(itemSummary);
    }
    return feedSummary;
  } catch (e) {
    console.error(
      `Error processing feed url: ${feedUri} \n Error message: ${e}`
    );
  }
}

module.exports = feedscanner;
