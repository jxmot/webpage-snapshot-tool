# Web Page Snapshot Tool

This utility will take a number snapshots of a web page at various dimensions and save them. The page dimensions currently used in this tool are *desktop* dimensions. 

## Purpose

The intended purpose of this tool is to aid in the layout design of web pages. It can also be used for archival purposes.

## Details

This application uses - 

* simple-text-log - https://www.npmjs.com/package/simple-text-log
* puppeteer - https://www.npmjs.com/package/puppeteer

When this application runs, it will:

* Iterate through a list of view port dimensions
  * Take a snapshot of each
    * Each file is named with the domain name and the viewport dimensions: **`domain_name-WWWxHHH.png`**

### Installation

1) download this repository
2) navigate to its containing folder (i.e. `webpage-snapshot-tool`)
3) install node modules - **`npm install`**
4) edit/create a target config file

### Usage 

Use the following command:

**`node index.js ./target_cfg.js`**

Where: **`./`**`target_cfg.js` is a configuration for the targeted web page. That file should contain:

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

* `target` = the full URL, including `HTTP[s]`. Query arguments are ignored but passed on to the page.
* `fullpage` = true or false, if **true** then the entire page is accessed, it does not stop at the specified height in `views[]`.
* `imgpath` = optional, the path to where the snapshots will be saved. The default is './'
* `imgextn` = options, the extension(type) of image file. The default is '.png'

**NOTES**: 
1) For most single-page sites `fullpage` should be true.
2) An example file (`target-example.js`) has been provided.

### Dimension Used

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

### Run-time Results

* Creates an image for each entry in `views[]`
* Creates a run-time log of operations

