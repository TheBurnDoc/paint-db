PROJECT_ROOT = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
SERVER_ROOT = $(PROJECT_ROOT)server/
DATA_ROOT = $(PROJECT_ROOT)data/
STACK_NAME ?= paint-db

.PHONY: docker deploy data clean

all: docker deploy data

docker:
	@make -f $(SERVER_ROOT)Makefile all

deploy:
	@docker stack deploy -c $(PROJECT_ROOT)stack.yml $(STACK_NAME)

data:
	@make -f $(DATA_ROOT)Makefile all
	
clean:
	@docker stack rm $(STACK_NAME)
