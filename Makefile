export PATH := bin:node_modules/.bin:${PATH}

npm_flags := --loglevel=http --progress=false

build: node_modules

node_modules: package.json
	@npm install ${npm_flags}

test: build
	@mocha --harmony --timeout 2s --require=test

lint: jscs eslint

jscs:
	jscs .

eslint:
	eslint .

maintainer-clean:
	@rm -rf node_modules


.PHONY: build test jshint maintainer-clean
