.PHONY: gen api www

gen:
	deno task --cwd ./scripts gen

api:
	deno task --cwd ./web api

www:
	deno task --cwd ./web www
