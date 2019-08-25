const fs = require('fs');

const { logging } = require('@jtbnntt/service-manager');

const LOGGER = logging.createLogger('AnagramService');

function sortedWord(word) {
  return word.split('').sort().join('');
}

function AnagramService(filename) {
  LOGGER.info(`Using config file ${filename}`);

  if (!fs.existsSync(filename)) {
    const message = `File ${filename} does not exist!`;
    LOGGER.error(message)
    throw new Error(message);
  }

  this.entries = new Map();

  LOGGER.info('Reading words');
  const words = fs.readFileSync(filename).toString().split('\n');

  LOGGER.info('Building entries');
  words.forEach(word => {
    const key = sortedWord(word);

    if (!this.entries.has(key)) {
      this.entries.set(key, []);
    }

    this.entries.get(key).push(word);
  });

  LOGGER.info('AnagramService ready');
}

AnagramService.prototype.getAnagrams = function(word) {
  return this.entries.get(sortedWord(word)) || [];
};

const builder = (_, { wordFilename }) => { return new AnagramService(wordFilename) };

module.exports = {
  AnagramService,
  builder
};
