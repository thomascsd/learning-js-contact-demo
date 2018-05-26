const webpack = require('webpack');
const path = require('path');

const config = {
    entry: {
        main: './07esm/src/main.js',
        login: './07esm/src/login.js'
    },
    output: {
        path: path.resolve(__dirname, '07esm/dist'),
        filename: "[name].bundle.js"
    },
    resolve: {
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
    mode: 'development'
};

module.exports = config;