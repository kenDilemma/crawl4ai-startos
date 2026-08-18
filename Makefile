PKG_ID := crawl4ai
PKG_VERSION := $(shell cat manifest.json 2>/dev/null | jq -r '.version' || echo "0.1.0:0")
TS_FILES := $(shell find . -name "*.ts")

# Build the s9pk
all: $(PKG_ID).s9pk

$(PKG_ID).s9pk: manifest.json icon.svg instructions.md LICENSE.md javascript.squashfs
	start-cli s9pk pack . -o $(PKG_ID).s9pk

# Compile TypeScript to JavaScript and generate manifest.json
manifest.json: $(TS_FILES) package.json tsconfig.json
	npm install
	npm run build

javascript.squashfs: manifest.json
	# The build command generates manifest.json and dist/index.js
	mksquashfs dist javascript.squashfs -noappend

clean:
	rm -rf dist $(PKG_ID).s9pk javascript.squashfs manifest.json node_modules
