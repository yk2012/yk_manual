#!/usr/bin/env zx

const data = await fetch("https://api.github.com/users/yk2012/repos");

const urls = await data.json();

console.log(urls);
