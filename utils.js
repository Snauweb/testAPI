let fs = require('fs');
let fsPromises = fs.promises;

const asc = ['asc', 'ascending', 'stigende', '', undefined, null];
const desc = ['desc', 'descending', 'synkende'];

const readObjectsFromFile = (file, options) => {
    return fsPromises.open(file, 'r')
        .then(file => file.readFile('utf-8'))
        .then(str => JSON.parse(str))
        .then(objects => {
            if (options.sorter) {
                const [key, order] = options.sorter.split('-');
                return objects.sort((a, b) => {
                    return ((String)(a[key])).localeCompare((String)(b[key]));
                });
            }
            return objects;
        })
        .then(objects => objects.slice(0, options.antall ? options.antall : objects.length));
}

module.exports = { readObjectsFromFile };