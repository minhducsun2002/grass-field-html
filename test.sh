#!/bin/bash

if command -v python2 &>/dev/null; then
    printf "Press Ctrl+C to stop. Invoking Python SimpleHTTPServer...\n";
    python -m SimpleHTTPServer;
    exit 0;
else
    printf "Python 2 isn't installed. Exiting.";
    exit 1;
fi

