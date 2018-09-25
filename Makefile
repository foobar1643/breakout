.PHONY:
	dev

dev:
	./node_modules/.bin/webpack --mode=development

prod:
	./node_modules/.bin/webpack --mode=production

lint:
	./node_modules/.bin/tslint -c tslint.json 'src/**/*.ts'