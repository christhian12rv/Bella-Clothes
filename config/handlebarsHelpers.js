module.exports = {
    equals: (a, b) => {
        return a === b;
    },
    equalsToString: (a, b) => {
        return a.toString() === b.toString();
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
    selectWithEachOption: (value, label, selectedValue) => {
        var selectedProperty = value == selectedValue ? 'selected="selected"' : '';
        return new Handlebars.SafeString('<option value="' + value + '"' + selectedProperty + '>' + label + "</option>");
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