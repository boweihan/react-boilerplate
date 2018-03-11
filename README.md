# React Boilerplate

## ESLint

This project uses base ESLint settings provided by Create React App. The linting from CRA is not
intended to enforce style guidelines but is rather intended to provide a minimal set of rules
that prevent common mistakes. You can install an ESLint editor plugin to view lint errors as you
develop.

## Prettier

Prettier is an opinionated code formatter for JavaScript, CSS and JSON. It automatically formats your
code on commit so that it's impossible to make formatting errors. You can also install an editor plugin
to format your code on save or hotkey.

## Flow

Flow is a static type checker for JavaScript. It provides type inference as long as you specify
appropriate typing information.

`npm run flow`

## Environment Variables

.env : default environment variables (available to all builds)
.env.development: development environment variables
.env.test: test environment variables
.env.production: production environment variables

Access environment variables with {process.env.VAR_NAME}

## Testing

Currently leveraging Jest with Enzyme to unit test React components.

npm run test
npm run testcoverage (to output coverage info)

## Service Worker

As part of being a progressive web application (which means OFFLINE FIRST) a service worker file has
been generated that will automatically pre-cache local assets and keep them updated as changes are
pushed. This ensures that the app loads fast - even with slow network connectivity. The service worker
employs a cache first strategy (similar to most browsers) in which it will pull from the cache if the
asset exists and pull from the network if it doesn't.

To remove caching, simply remove registerServiceWorker() from index.js and call unregister() instead.

Service workers

* require HTTPS
* don't work on all browser
* is only enabled in production

## Source Map Explorer (Bundle Size Analysis)

Source map explorer analyzes JavaScript bundle sizes using source maps. The purpose is to identify code bloat.

npm run build (to generate source maps)
npm run analyze

## Webpack

Webpack is provided as part of the Create React App package. Webpack provides a host of functionality.

* Tree shaking (dead code removal via ES2015 module syntax combined with UglifyJS)
* Hot module replacement
* Asset management (CSS, images, fonts, data, global assets)
* Output management (build, minification)
* Source mapping
* Code splitting (splitting your code at logical breakpoints)
* Lazy loading (loading your code as you need it)
* Caching (i.e. ensuring that browsers can cache files that aren't changed in subsequent builds)
* Shimming globals
* Managing libraries

## Redux

Redux is used to hold our application state. It promotes one-way data flow

React -> Action Creator -> Action -> Middleware -> State -> React

Reducers are pure functions that take in a previous state and an action and return a new state.

## Redux-Thunk

Redux-Thunk allows us to make asynchronous actions using Redux.

* It allows your actions to return plain JavaScript functions and call dispatch().

## Reselect

Allows memoization of redux state selectors. Caching for large scale applications.

## Redux DevTools

Redux DevTools provides visualizations for redux data along with time travelling debugging.

Dan Abramov's original talk on time travelling debugging:
https://www.youtube.com/watch?v=xsSnOQynTHs

Installation:
https://github.com/zalmoxisus/redux-devtools-extension
