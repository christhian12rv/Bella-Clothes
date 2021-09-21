module.exports = {
    equals: (a, b) => {
        return a === b;
    },
    smaller: (a, b) => {
        return parseFloat(a) < parseFloat(b);
    },
    bigger: (a, b) => {
        return parseFloat(a) > parseFloat(b);
    },
    select: (value, options) => {
        return options.fn(this)
            .split('\n')
            .map(function (v) {
                var t = 'value="' + value + '"'
                return !RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
            })
            .join('\n')
    },
    substr: (value, start, end) => {
        return value.substr(start, end);
    },
    substrLast: (value, start) => {
        return value.substr(start)
    },
    capitalize: (value) => {
        return value.toLowerCase().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }
}