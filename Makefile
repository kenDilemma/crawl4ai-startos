PKG_ID := $(shell jq -r ".id" startos/manifest/index.ts)
PKG_VERSION := $(shell jq -r ".version" startos/versions/current.ts)
TS_FILES := $(shell find . -name "*.ts")

# Build the s9pk
all: $(PKG_ID).s9pk

$(PKG_ID).s9pk: manifest.json icon.svg instructions.md license.md javascript.squashfs
	start-cli s9pk pack . -o $(PKG_ID).s9pk

# Compile TypeScript to JavaScript
javascript.squashfs: $(TS_FILES)
	npm install
	npm run build
	mksquashfs dist javascript.squashfs -noappend

clean:
	rm -rf dist $(PKG_ID).s9pk javascript.squashfs
