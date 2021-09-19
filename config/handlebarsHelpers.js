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
    }
}