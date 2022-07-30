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