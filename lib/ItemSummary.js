class ItemSummary {
  constructor(
    title,
    link,
    content,
    keywords,
    keywordMatches,
    sentencesSentiment
  ) {
    this.title = title || '';
    this.link = link || '';
    this.content = content || '';
    this.keywords = keywords || [];
    this.keywordMatches = keywordMatches || [];
    this.sentencesSentiment = sentencesSentiment || [];
  }
}

module.exports = ItemSummary;