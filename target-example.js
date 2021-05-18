'use strict';
module.exports = {
    target:'https://example.com/',
    fullpage:true,
    // these are optional, and can be omitted or
    // commented out. The folders in imgpath must
    // exist prior to running the app.
    imgpath:'./screenshots/',   // default = ./  but MUST end with '/'!
    imgextn:'.png',             // default .png
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
        {width:825, height:900}
    ]
};
