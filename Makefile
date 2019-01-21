PROJECT_ROOT = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
STACK_NAME ?= paint-db
DB_HOST ?= localhost
DB_PORT ?= 27017
DB_NAME ?= hobby
DB_USER ?= root
DB_PASS ?= password
AUTH_DB ?= admin

init: deploy import transform

deploy:
	@docker stack deploy -c $(PROJECT_ROOT)stack.yml $(STACK_NAME)

import:
	@mongoimport --type csv --headerline --host $(DB_HOST):$(DB_PORT) \
		--username $(DB_USER) --password $(DB_PASS) --db $(DB_NAME) \
		--authenticationDatabase $(AUTH_DB) --file $(PROJECT_ROOT)paints.csv

transform:
	@mongo --username $(DB_USER) --password $(DB_PASS) \
		--authenticationDatabase $(AUTH_DB) $(DB_NAME) \
		$(PROJECT_ROOT)transform.js

repl:
	@mongo --username $(DB_USER) --password $(DB_PASS) \
		--authenticationDatabase $(AUTH_DB) $(DB_NAME)

clean:
	@docker stack rm $(STACK_NAME)
