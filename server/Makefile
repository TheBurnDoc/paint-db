SERVER_ROOT = $(dir $(realpath $(firstword $(MAKEFILE_LIST))))
IMAGE_NAME ?= paint-db-server
IMAGE_TAG ?= v$(shell jq -r '{"version"} | .[]' $(SERVER_ROOT)package.json)

all: docker

docker:
	@docker build -t $(IMAGE_NAME):$(IMAGE_TAG) $(SERVER_ROOT)

clean:
	@docker rmi $(IMAGE_NAME):$(IMAGE_TAG)
