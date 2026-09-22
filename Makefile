.DEFAULT_GOAL := help
.PHONY: help install dev build lint preview clean

help:
	$(info Usage: make <target>)
	$(info )
	$(info   install     Install dependencies)
	$(info   dev         Start the dev server on http://localhost:8081)
	$(info   build       Production build into dist/ (with route pages, sitemap, robots.txt))
	$(info   lint        Run ESLint)
	$(info   preview     Build, then serve dist/ like GitHub Pages on http://localhost:8090)
	$(info   clean       Remove dist/ and the build cache)
	$(info )
	$(info Every target is also available without make: npm run <name>, e.g. npm run build)
	@node -e 0

install:
	npm install

dev:
	npm run serve

build:
	npm run build

lint:
	npm run lint

preview: build
	npm run preview

clean:
	npm run clean
