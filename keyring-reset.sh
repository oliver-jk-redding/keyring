#!/usr/bin/env bash

if [[ -d "/Applications/Keyring.app" ]]; then
	rm -rf "/Applications/Keyring.app"
fi

echo 'finished'