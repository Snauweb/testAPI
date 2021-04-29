let fs = require('fs');
let fsPromises = fs.promises;

const asc = ['asc', 'ascending', 'stigende', '', undefined, null];
const desc = ['desc', 'descending', 'synkende'];
const reservedParams = ['antall', 'sorter', 'foerDato', 'etterDato']

const readObjectsFromFileAndParseQuery = (file, options) => {
    return fsPromises.open(file, 'r')
        .then(file => file.readFile('utf-8'))
        .then(str => JSON.parse(str))
        .then(objects => {
            //Remove reserved parameters like 'antall' 
            const keys = Object.keys(options).filter(key => !reservedParams.includes(key));
            //Filter all objects that don't match query parameters
            //String parameters are matched on substring, number parameters are matched on value
            keys.forEach(key => objects = objects.filter(object => {
                if (typeof object[key] == 'number') return object[key] == options[key];
                return ((String)(object[key])).includes(options[key]);
            }));
            return objects;
        })
        .then(objects => {
            //Sort based on given key
            //TODO sort ascending or descending dependent on preference
            if (options.sorter) {
                const [key, order] = options.sorter.split('-');
                let ascending = 1;
                if (desc.includes(order))
                    ascending = -1;

                let compare = (a, b) => ascending * ((String)(a[key])).localeCompare((String)(b[key]));

                if (typeof objects[0][key] == 'number') {
                    compare = (a, b) => ascending * (a.id - b.id);
                }
                return objects.sort(compare);
            }
            return objects;
        })
        //Get only as many objects as requested

        .then(objects => objects.slice(0, options.antall ? options.antall : objects.length))
        .catch(error => console.error(error))
}

module.exports = { readObjectsFromFileAndParseQuery };
