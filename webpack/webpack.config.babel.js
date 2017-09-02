import webpack from 'webpack';
import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';

// plugin to remove/clean build folder(s) before building
import CleanWebpackPlugin from 'clean-webpack-plugin';

// Enables output bundles gzip compression
import CompressionPlugin from 'compression-webpack-plugin';

export const rootPath = path.resolve(__dirname, '../');       // Root of the project
export const srcPath = path.join(rootPath, 'develop');       // Sources files
export const statPath = path.join(rootPath, 'static');        // Static files ro include in distribution
export const distPath = path.join(rootPath, 'public');        // Target path for distribution to generate
const nodeModules = path.join(rootPath, 'node_modules');        // Target path for distribution to generate
const isBuild = !!process.env.BUILD;

export default function (args = {}) {
    return {
        entry: [
            `${nodeModules}/animate.css/animate.css`,
            `${nodeModules}/fullpage.js/dist/jquery.fullpage.css`,
            `${nodeModules}/fullpage.js/dist/jquery.fullpage.js`,
            'jquery',
            path.join(srcPath, 'index.jsx'),
        ],
        output: {
            filename: '[name].js',
            path: distPath,
            publicPath: '/',
            chunkFilename: '[id].[hash].chunk.js',
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"]}',
                },

                {
                    test: /\.gif$/,
                    use: 'url-loader?limit=16000&mimetype=image/gif&name=[name].[ext]?[hash]',
                },
                {
                    test: /\.jpg$/,
                    use: 'url-loader?limit=100000&mimetype=image/jpg&name=[name].[ext]?[hash]',
                },
                {
                    test: /\.png$/,
                    use: 'url-loader?limit=50000&mimetype=image/png&name=[name].[ext]?[hash]',
                },

                // {
                //     test: /\.svg/,
                //     use: 'url-loader?limit=50000&mimetype=image/svg+xml'
                //     //use: 'url-loader?limit=50000&mimetype=image/svg+xml&name=[name].[ext]?[hash]!svgo'
                // },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    // test: /\.(ttf|otf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: 'url-loader?limit=500000&name=[name].[ext]?[hash]',
                },
                {
                    test: /\.(woff|wff2|ttf|otf|eot|svg)/,
                    use: 'url-loader?limit=500000&name=[name].[ext]?[hash]',
                },
                {
                    test: /\.(js|jsx)/,
                    use: ['babel-loader'],
                    exclude: /(node_modules|public)/,
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: ['node_modules'],
        },

        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.join(srcPath, 'index.html'),
                inject: 'body',
                minify: false
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    BUILD: JSON.stringify(process.env.BUILD),
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                    BUILD_ENV: JSON.stringify(args.BUILD_ENV || process.env.BUILD_ENV),
                },
            }),
            ...(
                isBuild
                    ? [
                        new CleanWebpackPlugin([distPath], {
                            root: rootPath,
                            verbose: true,
                            dry: false,
                        }),
                        new CompressionPlugin({
                            asset: '[path].gz[query]',
                            algorithm: 'gzip',
                            test: /\.js$|\.html$/,
                            threshold: 10240,
                            minRatio: 0.8,
                        }),
                    ] : []
            ),
        ],
        performance: {
            hints: false,
        },
    };
}
