const express = require('express');

const {
  logging,
  ServiceManager
} = require('@jtbnntt/service-manager');

const AnagramService = require('./anagram-service');

const LOGGER = logging.createLogger('Anagrams');
const ANAGRAM_SERVICE = 'anagramService';
const ENABLE_FILENAME = 'enable1.txt';

LOGGER.info('Creating service builders')
const builders = new Map()
  .set(
    ANAGRAM_SERVICE,
    (_, { wordFilename }) => new AnagramService(wordFilename)
  );

LOGGER.info('Creating ServiceManager')
const serviceManager = new ServiceManager(
  { wordFilename: ENABLE_FILENAME },
  builders
);

LOGGER.info('Getting AnagramService');
const anagramService = serviceManager.getService(ANAGRAM_SERVICE);

const app = express();

LOGGER.info('Setting up routes');
app.get('/anagrams/:word', (req, res) => {
  const word = req.params.word;
  LOGGER.info(`Looking up anagrams for ${word}`);
  const anagrams = anagramService.getAnagrams(req.params.word);
  LOGGER.info(`Anagrams for ${word}:`, anagrams);
  res.send(anagrams);
});

const port = process.env.ANAGRAMS_PORT || 0;

const listener = app.listen(port, () => {
  const actualPort = listener.address().port;
  LOGGER.info(`Server listening on port ${actualPort}`);
});
