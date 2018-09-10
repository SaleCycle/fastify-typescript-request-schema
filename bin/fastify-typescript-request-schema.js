#!/usr/bin/env node
const process = require('process');
const convert = require('.dist/index');
convert(process.argv[2]);
