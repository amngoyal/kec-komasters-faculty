// set isDevelopment = false
//     url = 'https://api.komasters.tk/v1/'
//
// comment console.log and remove message variable

export const isDevelopment = true;

export const url = 'https://dev-api.komasters.tk/v1/';

export function debugLog(m) {
   if (isDevelopment) console.log(m)
}

export function errorLog(m) {
    if (isDevelopment) console.error(m)
}
