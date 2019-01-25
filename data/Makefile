DATA_ROOT = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
DB_USER ?= root
DB_PASSWORD ?= password
DB_HOST ?= localhost
DB_PORT ?= 27017
DB_AUTH_DB ?= admin
DB_NAME ?= hobby
DB_URI ?= mongodb://$(DB_USER):$(DB_PASSWORD)@$(DB_HOST):$(DB_PORT)/$(DB_NAME)?authSource=$(DB_AUTH_DB)
DB_COLLECTION ?= paints
DB_FILE ?= $(DATA_ROOT)$(DB_COLLECTION).csv
DB_FIELDS ?= brand,line,tags,colours,quantity

all: import

import:
	@mongo $(DB_URI) --eval "db.$(DB_COLLECTION).remove({})" 
	@mongoimport --type csv --headerline --uri $(DB_URI) --file $(DB_FILE)
	@mongo $(DB_URI) transform.js

export:
	@mv -f $(DB_FILE) $(DB_FILE).bak || exit 0
	@mongoexport --type csv --uri $(DB_URI) --collection $(DB_COLLECTION) \
		--fields $(DB_FIELDS) --out $(DB_FILE)
	@rm $(DB_FILE).bak

repl:
	@mongo $(DB_URI)