// entry point
// output file: bundle.js

const path                  = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    // loaders are used to translate files for use in Babel
    module: {
        rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
        }]
    }
};

