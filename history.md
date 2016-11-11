2.0.2 / 2016-11-11
==================

 * Fix: Resolve #10 again: removed engine list from package.json so yarn doesn't prevent this from working in the future


2.0.1 / 2016-10-18
==================

 * Fix: Resolve #10: added node v6 to package.json engine list so yarn doesn't complain

2.0.0 / 2016-04-03
==================

 * Breaking: Removed thunk methods to reduce dependencies on outside projects
 * Feature: Added `Async` suffixed methods, which as the same as the old `Promise`
   suffixed methods
 * Info: Tested on latest `pg` drivers (4.0), and on node v0.12, v4, and v5
 * Info: Added Vagrantfile environment to help future testing

1.3.1 / 2014-12-01
==================

 * Info: Changed to use `promissory` npm package to create underlying promises

1.3.0 / 2014-11-24
==================

 * Feature: Added connectPromise and queryPromise functions
 * Info: Updated all Dev Dependencies, now tested on co ^4.0.0
 * Deprecated: connect_ and query_ functions, the co project has opted to prefer the promise style

1.2.3 / 2014-01-22
==================

 * Info: Added tests to ensure support for node-postgres-pure project, no fixes were necessary


1.2.2 / 2014-01-08
==================

 * Fix: Resolve #3, native client connection

1.2.1 / 2014-01-05
==================

 * Fix: Update readme examples to be correct (sylvaingi)

1.2.0 / 2014-01-05
==================

 * Info: Supposed to be 0.1.2, but already published on npm, so it is what it is :P
 * Info: Added examples and readme
 * Breaking Feature: Change require to `pg` to be pass through instead of hard dependency, see readme

0.1.1 / 2013-12-24
==================

 * Info: Initial release
 * Feature: Library to wrap `node-postgres` for `co`
