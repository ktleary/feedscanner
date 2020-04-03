### feedscanner

A tool to scan for RSS feeds for keywords and return

### installation

a beta version is available through npm: npm i feedscanner

or

clone and npm install

### Usage

```
const feedscanner = require('feedscanner');

const keywords = ['automation', 'A.I.', 'artificial', 'Intelligence'];

const feedSummary = await feedscanner('https://www.reddit.com/r/Futurology/.rss', keywords, []);
```

Results will be returned as an Array of ItemSummary

```
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

```
