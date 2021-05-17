# Web Page Snapshot Tool

This utility will take a number snapshots of a webpage and save them. 

This application uses - 

* simple-text-log - https://www.npmjs.com/package/simple-text-log
* puppeteer - https://www.npmjs.com/package/puppeteer

When this application runs, it will:

* Iterate through a list of view port dimensions
  * Take a snapshot of each
    * Each file is named with the domain name and the viewport dimensions: "domain_name-WWWxHHH.png

## Usage 

**`node index.js target_cfg.js`**

Where: 'target_cfg.js' is a configuration for the target web page. That file should contain:

```
'use strict';
module.exports = {
    target:'https://example.com/',
    fullpage:true,
    // these are optional, and can be omitted or
    // commented out. The folders in imgpath must
    // exist prior to running the app.
    imgpath:'./screenshots/',   // default = ./  but MUST end with '/'!
    imgextn:'.png'              // default .png
};
```

**NOTE**: For most single-page sites `fullpage` should be true.

## Run-time Results

* Creates an image for each entry in views[]
* Creates a run-time log of operations

## Dimension Used

The dimensions are found in `views[]`. Edit as necessary for your particular needs. The dimensions used are:

* 1366 X  768
* 1920 X 1080
* 1280 X  800
* 1024 X  768
* 1536 X  864
* 1440 X  900
* 1100 X  900
*  825 X  900

They are in order of most to least popular according to the following sources - 

* <https://www.w3schools.com/browsers/browsers_display.asp>
* <https://gs.statcounter.com/screen-resolution-stats/desktop/north-america>

