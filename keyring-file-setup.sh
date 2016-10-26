#!/usr/bin/env bash

if [[ ! -d "/Applications/Keyring.app" ]]; then
	mkdir /Applications/Keyring.app
fi

if [[ ! -f "/Applications/Keyring.app/apps" ]]; then
	touch /Applications/Keyring.app/apps
fi

echo 'finished'