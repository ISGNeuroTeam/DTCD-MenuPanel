define ANNOUNCE_BODY
Required section:
 build - build project into build directory, with configuration file and environment
 clean - clean all addition file, build directory and output archive file
 test - run all tests
 pack - make output archivne
Addition section:
endef

PROJECT_NAME = DTCD-MenuPanel

GENERATE_VERSION = $(shell jq .version ./${PROJECT_NAME}/package.json )
GENERATE_BRANCH = $(shell git name-rev $$(git rev-parse HEAD) | cut -d\  -f2 | sed -re 's/^(remotes\/)?origin\///' | tr '/' '_')

SET_VERSION = $(eval VERSION=$(GENERATE_VERSION))
SET_BRANCH = $(eval BRANCH=$(GENERATE_BRANCH))

DEV_STORAGE = http://storage.dev.isgneuro.com/repository/components
DTCD_SDK = DTCD-SDK
DTCD_SDK_URL = $(DEV_STORAGE)/$(DTCD_SDK)/$(DTCD_SDK)-0.1.1-master-0002.tar.gz


.SILENT:

COMPONENTS = sdk dependencies

export ANNOUNCE_BODY
all:
	echo "$$ANNOUNCE_BODY"

pack: build
	$(SET_BRANCH)
	$(SET_VERSION)
	echo Create archive \"$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz\"
	cd build; tar czf ../$(PROJECT_NAME)-$(VERSION)-$(BRANCH).tar.gz .

build: $(COMPONENTS)
	# required section
	echo Build!
	$(SET_VERSION)
	echo Start command: npm run build
	npm run build --prefix ./$(PROJECT_NAME)
	mkdir build
	mkdir build/$(PROJECT_NAME)
	cp -r ./$(PROJECT_NAME)/dist/* ./build/$(PROJECT_NAME)
	cp README.md build/
	cp CHANGELOG.md build/
	cp LICENSE.md build/

clean:
	# required section"
	$(SET_VERSION)
	$(SET_PROJECT_NAME)
	rm -rf ./$(DTCD_SDK)/
	rm -rf build ./$(PROJECT_NAME)/dist ./$(PROJECT_NAME)/node_modules/ ./*-lock.* ./$(PROJECT_NAME)/*-lock.* $(PROJECT_NAME)-*.tar.gz \

test: $(COMPONENTS)
	# required section
	echo "Testing..."
	echo $(PROJECT_NAME)
	npm run --prefix ./$(PROJECT_NAME) test
	
dev: $(COMPONENTS)
	echo Development mode!
	npm run dev --prefix ./$(PROJECT_NAME)

dependencies:
	echo Installing project dependencies...
	if ! [ -d ./$(PROJECT_NAME)/node_modules ];\
		then npm i --prefix ./$(PROJECT_NAME) && echo Project dependencies downloaded.;\
		else echo Project dependencies is already downloaded.;\
	fi

sdk:
	echo Downloading $(DTCD_SDK)...
	if ! [ -d ./$(DTCD_SDK) ];\
		then curl -# $(DTCD_SDK_URL) | tar -zx ./$(DTCD_SDK) && echo $(DTCD_SDK) downloaded.;\
		else echo $(DTCD_SDK) is already downloaded.;\
	fi

