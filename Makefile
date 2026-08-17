PKG_ID := $(shell jq -r ".id" startos/manifest/index.ts)
PKG_VERSION := $(shell jq -r ".version" startos/versions/current.ts)
TS_FILES := $(shell find . -name "*.ts")

# Build the s9pk
all: $(PKG_ID).s9pk

$(PKG_ID).s9pk: manifest.json icon.svg instructions.md LICENSE.md javascript.squashfs
	start-cli s9pk pack . -o $(PKG_ID).s9pk

# Compile TypeScript to JavaScript and generate manifest.json
manifest.json javascript.squashfs: $(TS_FILES) package.json
	npm install
	npm run build
	# The build command generates manifest.json and dist/index.js
	mksquashfs dist javascript.squashfs -noappend

clean:
	rm -rf dist $(PKG_ID).s9pk javascript.squashfs manifest.json
