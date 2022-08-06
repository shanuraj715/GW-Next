export const urlParams = () => {
    let urlParams = {}
    let match,
        pl = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query = window.location.search.substring(1);

    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2])
    return urlParams
}

export const copyToClipboard = text => {
    navigator.clipboard.writeText(text)
}

export const pascalCase = str => {
    let arr = str.split(' ');
    let temp = [];
    arr.map((item) => temp.push(item.charAt(0).toUpperCase() + item.slice(1)))
    return temp.join(' ')
}

export const clone = array => {
    if (typeof obj == 'object') {
        if (Array.isArray(array)) {
            let l = array.length;
            let r = new Array(l);
            for (let i = 0; i < l; i++) {
                r[i] = copyArray(array[i]);
            }
            return r;
        } else {
            let r = {};
            r.prototype = array.prototype;
            for (let k in array) {
                r[k] = clone(array[k]);
            }
            return r;
        }
    }
    return array;
}

export const secToMinSec = sec => {
    if (isNaN(sec)) {
        return {
            min: "00",
            sec: "00"
        }
    }
    sec = parseInt(sec)
    return {
        min: ("0" + parseInt(sec / 60)).slice(-2),
        sec: ("0" + (sec % 60)).slice(-2)
    }
}