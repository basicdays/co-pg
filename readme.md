# co-pg

[Co](https://github.com/visionmedia/co) wrapper for [node-postgres](https://github.com/brianc/node-postgres).
Also supports ESNext's async/await.


## Installation

```
$ npm install co-pg
```


## Overview

`co-pg` provides higher order functions that will return a wrapped edition of `pg`. Everything that is available
from `pg` is also available on `co-pg` with no alterations to the original API. The `pg` API methods that use a
callback style interface also have companion promise methods that are usable by `co` 4.0 and by ESNext async/await.

Supports:

- [node-postgres](https://github.com/brianc/node-postgres)
- [node-pg-native](https://github.com/brianc/node-pg-native)
- [node-postgres-pure](https://github.com/brianc/node-postgres-pure) (even though it has been deprecated)

Supports Node Engines:

- v0.12 (requires `--harmony` flag to work)
- v4
- v5


## API Additions

`co-pg` adds a few additional methods on top of the `pg` API.

 - `PG` prototype adds the `#connectAsync` method
   - also includes `#connectPromise` which aliases `#connectAsync`
 - `Client` prototype adds the `#connectAsync` and `#queryAsync` methods
   - also includes `#connectPromise` which aliases `#connectAsync`
   - also includes `#queryPromise` which aliases `#queryAsync`

These methods behave exactly the same as their counter-parts, including their arguments, except instead of
supplying a callback, the promise is yielded. All the original methods are still available by using the
sans-underscore methods. For documentation or help on how they work, please see the original project's documentation.

## Examples

### Single connection

Connect to a postgres instance, run a query, and disconnect, using `co`.

```js
let co = require('co');
let pg = require('co-pg')(require('pg'));

let connectionString = 'postgres://postgres:1234@localhost/postgres';

co(function* connectExample() {
	try {
		let client = new pg.Client(connectionString);
		yield client.connectPromise();

		let result = yield client.queryPromise('select now() as "theTime"');
		console.log(result.rows[0].theTime);

		client.end();
	} catch (ex) {
		console.error(ex);
	}
});
```

### Client pooling

The underlying pooling system is not altered. The companion thunk methods can be used instead. Since PG#Connect
returns multiple objects, the return value is an array of those results. They can then be manually destructured
into separate variables for cleaner code.

```js
let co = require('co');
let pg = require('../')(require('pg'));

let connectionString = 'postgres://postgres:1234@localhost/postgres';

co(function* poolExample() {
	try {
		let connectResults = yield pg.connectPromise(connectionString);
		let client = connectResults[0];
		let done = connectResults[1];

		let result = yield client.queryPromise('select now() as "theTime"');
		//call `done()` to release the client back to the pool
		done();

		console.log(result.rows[0].theTime);
		process.exit();
	} catch (ex) {
		console.error(ex.toString());
	}
});
```

## Other projects

- [brianc/node-postgres](https://github.com/brianc/node-postgres): the PostgreSQL driver
- [brianc/node-pg-native](https://github.com/brianc/node-pg-native): the PostgreSQL drive using native bindings

## License
MIT
