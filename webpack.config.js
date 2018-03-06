const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
    	pid: './media/js/pid/index.js',
    	pidq: './media/js/pidq/index.js',
    	search: './media/js/search/index.js',
    	viewer: './media/js/viewer/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};