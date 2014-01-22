export PATH := bin:node_modules/.bin:$(PATH)

.PHONY: build test test-lint test-unit

build: node_modules

node_modules:
	@npm install

test: test-lint test-unit

test-lint:
	@jshint .

test-unit:
	@mocha --harmony-generators --reporter=spec --timeout 2s

nuke:
	@rm -rf node_modules
