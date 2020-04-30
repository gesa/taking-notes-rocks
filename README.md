# Notetaker Assigner

Take notes during your meetings and share them with your team. It's good for everyone! This app randomly chooses a member of the team to take notes during
a [tactical style meeting](https://medium.com/darkchart-music/a-modest-approach-to-hyper-productive-meetings-that-don-t-suck-3de359b72dad#.me7c07ceo).

## Features

### Standard functionality

Chooses a name at random from an array of people. Persists list locally across reloads. 

![notetaker - basic functionality](https://media.github.braintreeps.com/user/458/files/80ac020c-7116-11e6-9b63-3d92cb96ff7e)

### On-the-fly lists
Clear the hardcoded list to create a list of names on-the-fly

![notetaker - clearing lists](https://media.github.braintreeps.com/user/458/files/3ada481a-7116-11e6-9ec6-dc202f9a4256)

--

## Development

First, install the dependencies with `npm install`.

To begin the development server and launch the project in a browser, run

```shell script
npm start
```

To run tests in watch mode,

```shell script
npm test
```

To compile for production, script will output into build/ directory which can be safely copied to any location that can serve static assets.

```shell script
npm run build
```

#### Wanna help out?

Here are a list of possible features that could make this better:

- Grab a list of names from a dynamic source
- Tie into Google Calendar to create a list of names of meeting attendees

