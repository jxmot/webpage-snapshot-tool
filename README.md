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
    // how long (in ms) to wait for the page, gives 
    // time for fades and other effects to run.
    godelay:5000,
    // https://gs.statcounter.com/screen-resolution-stats/desktop/north-america
    //      AND
    // https://www.w3schools.com/browsers/browsers_display.asp
    // 
    // in order of most to least popular
    views:[
        {width:1366, height:768},
        {width:1920, height:1080},
        {width:1280, height:800},
        // don't duplicate 'width' in items
//        {width:1280, height:1024},
        {width:1024, height:768},
        {width:1536, height:864},
//        {width:1280, height:720},
        {width:1440, height:900},
        // extras, some smaller sizes...
        {width:1100, height:900},
        {width:825, height:900},
        // can also select from Puppeteer's devices
        {device:'Nexus 6P'}
    ],
    // these are optional, and can be omitted or
    // commented out. The folders in imgpath must
    // exist prior to running the app.
    imgpath:'./screenshots/',   // default = ./  but MUST end with '/'!
    imgextn:'.png'              // default .png
};

```

* `target` = the full URL, including `HTTP[s]`. Query arguments are ignored but passed on to the page.
* `fullpage` = true or false, if **true** then the entire page is accessed, it does not stop at the specified height in `views[]`.
* `godelay` = the number of milliseconds to wait after loading the page. If `0` then there will be no waiting. The value that goes here depends on the page and any load-time effects it might contain.
* `views[]` = an array of `{width:?,height:?}` objects. Edit as necessary.
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

**NOTE**: A device can be added to the `views[]` array with `{device:'device name here'}`.

### Run-time Results

* Creates an image for each entry in `views[]`
* Creates a run-time log of operations

The following will be seen on the console, and logged to the file specified in `runlogopt.js` :

```
***********************************
begin....
beginning 8 desktop snap shots....
queuing: target = https://example.com/   name = example-1366x768
queuing: target = https://example.com/   name = example-1920x1080
queuing: target = https://example.com/   name = example-1280x800
queuing: target = https://example.com/   name = example-1024x768
queuing: target = https://example.com/   name = example-1536x864
queuing: target = https://example.com/   name = example-1440x900
queuing: target = https://example.com/   name = example-1100x900
queuing: target = https://example.com/   name = example-825x900
queuing: target = https://example.com/   name = example-Nexus_6P
snap shots are in the queue...
saved - example-1024x768.png
saved - example-1280x800.png
saved - example-1440x900.png
saved - example-825x900.png
saved - example-Nexus_6P.png
saved - example-1920x1080.png
saved - example-1366x768.png
saved - example-1536x864.png
saved - example-1100x900.png
```

For additional information about *logging* in this application see:

* Simple Text Log
  * github: <https://github.com/jxmot/simple-text-log>
  * npmjs: <https://www.npmjs.com/package/simple-text-log>

---
<img src="http://webexperiment.info/extcounter/mdcount.php?id=webpage-snapshot-tool">
