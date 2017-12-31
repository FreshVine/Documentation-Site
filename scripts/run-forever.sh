#!/bin/bash
forever start -l fv-docs-forever.log -e fv-docs-err.log -a scripts/server.js