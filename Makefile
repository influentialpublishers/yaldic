NODE_BIN=./node_modules/.bin

install:
	npm install

test: install
	${NODE_BIN}/istanbul cover ${NODE_BIN}/_mocha --recursive test
	
.PHONY: install test
