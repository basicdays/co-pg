PATH := node_modules/.bin:${PATH}

build: node_modules

node_modules: package.json
	npm install

test: build
	mocha --harmony --timeout 2s --require=test/index.js

eslint:
	eslint .

clean:
	@rm -rf package *.tgz

maintainer-clean: clean
	@rm -rf node_modules


.PHONY: build test eslint clean maintainer-clean
