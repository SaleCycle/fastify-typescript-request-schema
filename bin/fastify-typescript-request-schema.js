#!/usr/bin/env node
const process = require('process');
const path = require('path');
const convert = require('../.dist/src/index').default;
convert(path.join(process.cwd(), process.argv[2]));
