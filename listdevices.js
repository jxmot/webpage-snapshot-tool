'use strict';
/*
    List all devices that Puppeteer contains:

        node listdevices.js

    Creates a text file listing all of the device names 
    and their dimensions:

        Nexus 6P - 412 X 732
*/
// set up run-time logging first...
const Log = require('simple-text-log');
const logOut = new Log({logfile:'./devicelist.txt',logsize:10485760});
// optionally also write to the console
const logcon = true;
function log(payload) {
    if(logcon) console.log(payload);
    logOut.write(payload);
};
const puppeteer = require('puppeteer');
Object.keys(puppeteer.devices).forEach((key, idx) => {
    let dev = puppeteer.devices[key];
    log(`${dev.name} - ${dev.viewport.width} X ${dev.viewport.height}`);
});
