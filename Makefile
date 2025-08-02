.PHONY: gen api api-docker www www-docker

gen:
	deno task --cwd ./scripts gen

api:
	deno task --cwd ./web api

api-docker:
	docker build --no-cache -f ./web/apps/api/dockerfile -t apple-devices-api:dev . && \
	docker run -it --rm --name apple-devices-api -p 3000:3000 apple-devices-api:dev

www:
	deno task --cwd ./web www

www-docker:
	docker build --no-cache -f ./web/apps/www/dockerfile -t apple-devices-frontend:dev . && \
	docker run -it --rm --name apple-devices-frontend -p 5173:5173 apple-devices-frontend:dev
