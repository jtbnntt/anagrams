# anagrams

`anagrams` is a demonstration of how the `@jtbnntt/service-manager` module can be used to build an web service. For an application this simple, it's overkill, but it hopefully provides an idea of how more advanced services could be created.

## Setup

1. Clone this repo and enter the directory
2. Run `npm install` to retrieve dependencies
3. Run `npm start` to start the server on a random port; to specify a port, use the `ANAGRAMS_PORT` environment variable, e.g., `ANAGRAMS_PORT=9999 npm start`
4. In a browser, assuming you chose port 9999, vist <http://localhost:9999/anagrams/apt> (the last part of the path is the word to search for)

## Example from command line with `curl`

First, start up the server with `ANAGRAMS_PORT=9999 npm start`:

```
[INFO][Anagrams] Creating service builders
[INFO][Anagrams] Creating ServiceManager
[INFO][Anagrams] Getting AnagramService
[INFO][ServiceManager] No service registered for "anagramService", attempting to build
[INFO][ServiceManager] Found builder for "anagramService"
[INFO][AnagramService] Reading words
[INFO][AnagramService] Building entries
[INFO][AnagramService] AnagramService ready
[INFO][ServiceManager] Registered service "anagramService"
[INFO][Anagrams] Setting up routes
[INFO][Anagrams] Server listening on port 9999
```

Then, in another terminal, make a request with `curl http://localhost:9999/anagrams/apt`:

```
["apt","pat","tap"]
```

If you look back at the original terminal, you should see logging for the request:

```
[INFO][Anagrams] Looking up anagrams for apt
[INFO][Anagrams] Anagrams for apt: apt,pat,tap
```