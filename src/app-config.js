// set isDevelopment = false
//     url = 'https://api.komasters.tk/v1/'
//
// comment console.log and remove message variable

const isDevelopment = true;

let url;
let debugLog = function () {
};

let errorLog = function () {
};

if (isDevelopment) {

    url = 'https://dev-api.komasters.tk/v1/';

    debugLog = function debugLog(m) {
        console.log(m)
    };

    errorLog = function errorLog(m) {
        console.error(m)
    };

} else {
    url = 'https://api.komasters.tk/v1/';

}

export {debugLog, errorLog, url, isDevelopment};
