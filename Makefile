all: dist/bundle.min.js

dist/bundle.js:
	browserify src/main.js -t [ babelify --presets [ es2015 react ] ] > $@

dist/bundle.min.js: dist/bundle.js
	uglifyjs $< -m -c > $@