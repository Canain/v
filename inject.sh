#!/bin/sh
{ echo 'var V = (() => {'; cat dist/v.js; echo 'return V;})()'; } | pbcopy