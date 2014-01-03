export PATH := bin:node_modules/.bin:$(PATH)

.PHONY: all build test test-lint test-unit

all: build

build:
	@npm install

test: test-lint test-unit

test-lint:
	@echo running jshint
	@jshint **/*.js

test-unit:
	@mocha --harmony-generators --reporter=spec --timeout 2s

doc:
	@find ./lib -name "*.js" | xargs -n 1 -I file sh -c "dox < file"

clean:
	@rm -rf doc
