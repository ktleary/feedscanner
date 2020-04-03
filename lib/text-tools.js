'use strict';
const TextCleaner = require('text-cleaner');
const { split } = require('sentence-splitter');
const tm = require('text-miner');

const natural = require('natural');
var tokenizer = new natural.WordTokenizer();
const Analyzer = require('natural').SentimentAnalyzer;
const stemmer = require('natural').PorterStemmer;
//"afinn" , "senticon" or "pattern"
const analyzer = new Analyzer('English', stemmer, 'afinn');

const SENTENCE = 'Sentence';
const properties = {
  text: ['title', 'content', 'contentSnippet', 'headline']
};

function processText(text, keywords) {
  const corp = new tm.Corpus(text)
    .toLower()
    .clean()
    .removeDigits()
    .removeInvalidCharacters()
    .removeInterpunctuation()
    .removeWords(tm.STOPWORDS.EN);
  const terms = new tm.DocumentTermMatrix(corp);
  const vocab = terms.findFreqTerms(1);
  const matches = vocab.filter(term =>
    keywords.map(keyword => keyword.toLowerCase()).includes(term.word)
  );
  return matches.length ? { matches, vocab } : false;
}

function getCleanText(item) {
  const textProperties = properties.text;
  return textProperties
    .filter(prop => item[prop] && item[prop].length)
    .reduce((all, prop) => {
      const cleanString = TextCleaner(item[prop])
        .stripHtml()
        .condense()
        .valueOf();
      all += `${cleanString} `;
      return all;
    }, '');
}

function getSentencesSentiment(text) {
  return split(text)
    .filter(sentence => sentence.type === SENTENCE)
    .map(sentence => sentence.raw)
    .map(sentence => {
      return { sentence, tokens: tokenizer.tokenize(sentence) };
    })
    .filter(sentenceObj => sentenceObj.tokens.length > 2)
    .map(sentenceObj => {
      return {
        sentence: sentenceObj.sentence,
        sentiment: analyzer.getSentiment(sentenceObj.tokens)
      };
    });
}

module.exports = {
  getCleanText,
  processText,
  getSentencesSentiment
};
