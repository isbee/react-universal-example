const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    context : resolve(__dirname, 'client'),

    entry : ['./index'],
    output : {
        filename : 'bundle.js',      // output filename
        path : resolve(__dirname, 'build'), // output path
        publicPath : '/'
    },

    devtool : 'inline-source-map',

    module : {
        rules : [
            {
                test : /\.jsx?$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader',
                    options : {
                        presets : ['env', 'react']  // ES2015, React를 이용해서 빌드한다.
                    },
                }
            }
        ],
    }
}