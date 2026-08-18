# Build only x86_64 for now (the target device). Add arm when publishing.
ARCHES := x86 arm
TARGETS := x86

include node_modules/@start9labs/start-sdk/s9pk.mk