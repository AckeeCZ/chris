const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                include: path.resolve(__dirname, '../')
            },
            {
                test: /\.story\.(ts|js)x?$/,
                loaders: [
                    {
                        loader: require.resolve('@storybook/addon-storysource/loader'),
                        options: {
                            prettierConfig: {
                                parser: 'babylon'
                            }
                        }
                    },
                ],
                enforce: 'pre',
                include: [
                    path.resolve(__dirname, '../stories'),
                ]
            },
            {
                test: /\.(ts|js)x?$/,
                loaders: ['babel-loader'],
                include: [
                    path.resolve(__dirname, '../stories'),
                    path.resolve(__dirname, '../src'),
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    // https://github.com/webpack-contrib/css-loader/issues/447
    node: {
        fs: 'empty'
    }
};
