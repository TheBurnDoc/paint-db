DATA_ROOT = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
DB_HOST ?= localhost
DB_PORT ?= 27017
DB_NAME ?= hobby
DB_USER ?= root
DB_PASS ?= password
AUTH_DB ?= admin

all: import transform

import:
	@mongoimport --type csv --headerline --host $(DB_HOST):$(DB_PORT) \
		--username $(DB_USER) --password $(DB_PASS) --db $(DB_NAME) \
		--authenticationDatabase $(AUTH_DB) --file $(DATA_ROOT)paints.csv

transform:
	@mongo --username $(DB_USER) --password $(DB_PASS) \
		--authenticationDatabase $(AUTH_DB) $(DB_NAME) \
		$(DATA_ROOT)transform.js