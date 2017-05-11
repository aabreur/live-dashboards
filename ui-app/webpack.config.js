var path = require('path');
var webpack = require('webpack');
 
module.exports = {
    entry: './main.js',
    output: { path: __dirname, filename: '../public/live-dashboard.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                },
                options: {
                    plugins: ["wildcard"]
                }
            }
        ]
    }
};