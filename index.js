'use strict';
/*
    Web Page Snapshot Tool - This utility will take a number snapshots 
    of a webpage and save them. 

    This application uses - 

        * simple-text-log - https://www.npmjs.com/package/simple-text-log
        * puppeteer - https://www.npmjs.com/package/puppeteer

    When this application runs, it will:

        * Iterate through a list of view port dimensions
        * Take a snapshot of each
            * Each file is named with the domain name and the viewport
            dimensions: "domain_name-WWWxHHH.png

    * Usage: 

        node index.js target_cfg.js

        Where: 'target_cfg.js' is a configuration for the target web 
        page. That file should contain:

            'use strict';
            module.exports = {
                target:'http[s]://somedomain.something/',
                fullpage:true
            };

        NOTE: For most single-page sites 'fullpage' should be true.

    * Run-time Results:

        * Creates an image for each entry in views[]
        * Creates a run-time log of operations
*/

// set up run-time logging first...
const Log = require('simple-text-log');
const logOut = new Log(require('./runlogopt.js'));
// optionally also write to the console
const logcon = true;
function log(payload) {
    if(logcon) console.log(payload);
    logOut.writeTS(payload);
};

log('***********************************');
log('begin....');

// get the target config file name from the args...
let targetopt = null;
const fs = require('fs')
if(process.argv.length > 2) {
    try {
        fs.accessSync(process.argv[2], fs.constants.F_OK);
    } catch(err) {
        if(err.code === 'ENOENT') {
            log(`ERROR - file does not exist: ${process.argv[2]}`);
        } else {
            log(`ERROR - ${err.code}`);
        }
        process.exit(0);
    }
    targetopt = require(process.argv[2]);
} else {
    log('ERROR - missing target config file argument');
    process.exit(0);
}

// https://try-puppeteer.appspot.com/ <-- OUT OF DATE VERSION!!!
// use instead - 
// https://github.com/puppeteer/puppeteer/tree/main/examples
// docs - 
// https://pptr.dev/#?product=Puppeteer&version=v9.1.1&show=outline
const puppeteer = require('puppeteer');

// the destination of the screenshot images...
// make sure it's a valid path, if not then exit
const imgpath  = ((typeof targetopt.imgpath === 'string') && (targetopt.imgpath.length >= 2) ? targetopt.imgpath : './');
try {
    var dir = fs.statSync(imgpath);
} catch(err) {
    throw new Error(`ERROR - "${imgpath}", not found. ${err.code}`);
}
if (!dir.isDirectory()) {
   throw new Error(`ERROR - "${imgpath}", is not a directory.`);
}

// default screenshot image extension
const imgextn  = (typeof targetopt.imgextn === 'string' ? targetopt.imgextn : '.png');
log(`saving screenshots to ${imgextn}`);
// full size for screenshot?
const fullpage = targetopt.fullpage;
// where?
const target = targetopt.target;
// here we go...
log(`beginning ${targetopt.views.length} desktop snapshots....`);
for(let idx = 0; idx < targetopt.views.length; idx++) {
    // create the name of the screenshot file
    let name;
    // grab the domain name from the target
    if(target.includes('www.')) {
        name = target.split('//www.')[1].split('.')[0];
    } else {
        // add extensions as needed, be sure to include 
        // the leading '.'
        if((target.includes('.')) && (!target.includes('.php')) && (!target.includes('.htm'))) {
            name = target.split('//')[1].split('.')[0];
        } else {
            name = target.split('//')[1].split('/')[0];
        }
    }

    /*
        targetopt.views[] can contain either viewport dimensions:
            {width:950, height:1080}

        OR device names:
            {device:'Nexus 6P'}
    */
    if(targetopt.views[idx].width) {
        // add the viewport dimensions to the name
        name = name + '-' + targetopt.views[idx].width + 'x' + targetopt.views[idx].height;
        log(`queuing: target = ${target}   snapshot file = ${imgpath}${name}${imgextn}`);
    }

    if(targetopt.views[idx].device) {
        // add the device name to the file name
        name = name + '-' + targetopt.views[idx].device.replace(/ /g,'_');
        log(`queuing: target = ${target}   snapshot file = ${imgpath}${name}${imgextn}`);
    }

    (async () => {
        const browser = await puppeteer.launch({headless:true});
        const page = await browser.newPage();

        // use a device viewport or a custome one
        if(targetopt.views[idx].device) {
            await page.emulate(puppeteer.devices[targetopt.views[idx].device]);
        }
        // get the page and wait for things to settle
        await page.goto(target,{waitUntil:'networkidle0'});

        // give time for page load and render
        if(targetopt.godelay && targetopt.godelay > 0) {
            await page.waitForTimeout(targetopt.godelay);
        }

        log(`fullpage = ${(fullpage ? 'true' : 'false')}`);

        // custom viewport, render full page?
        if(fullpage === true) {
            // NOTE: this is an attempt to get a Bootstrap 4
            // sticky footer to render at the bottom. 
            let height = await page.evaluate(
                () => document.documentElement.offsetHeight
                //() => document.documentElement.scrollHeight
            );

            if(targetopt.views[idx].device) {
                let w = puppeteer.devices[targetopt.views[idx].device].viewport.width;
                await page.setViewport({width:w, height:height+1})
                    .then(log(`viewport set: ${w} X ${height+1}`));
            } else {
                await page.setViewport({width:targetopt.views[idx].width, height:height+1})
                    .then(log(`viewport set: ${targetopt.views[idx].width} X ${height+1}`));
            }
        } else {
            if(!targetopt.views[idx].device) {
                // not full page, use the viewport settings
                await page.setViewport(targetopt.views[idx])
                    .then(log(`viewport set: ${targetopt.views[idx].width} X ${targetopt.views[idx].height}`));
            }
        }
        await page.screenshot({path:`${imgpath}${name}${imgextn}`, fullPage: fullpage}).then(log(`saved - ${name}${imgextn}`));
        // we're done with this one
        await browser.close();
    })();
}
log(`snapshots in the queue - ${targetopt.views.length}`);

