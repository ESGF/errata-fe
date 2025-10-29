const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        edit: './media/js/detail-edit/index.js',
    	pid: './media/js/pid/index.js',
    	pidq: './media/js/pidq/index.js',
    	search: './media/js/search/index.js',
    	view: './media/js/detail-view/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new UglifyJSPlugin()
    ]
};
