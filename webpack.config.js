const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entries = {
    index: './app/src/index.ts',
    policy: './app/src/policy.ts',
    termsOfService: './app/src/termsOfService.ts',
    curiki: './app/src/curiki.ts',
    manitobaCurriculumOverview: './app/src/manitobaCurriculumOverview.ts',
    manitobaMathematicsCurriculum: './app/src/manitobaMathematicsCurriculum.ts',
    manitobaScienceCurriculum: './app/src/manitobaScienceCurriculum.ts',
    manitobaBiologyCurriculum: './app/src/manitobaBiologyCurriculum.ts',
    manitobaSocialStudiesCurriculum: './app/src/manitobaSocialStudiesCurriculum.ts',
    lessonPlan: './app/src/lessonPlan.ts',
};

const htmlPlugins = Object.keys(entries).map(entryName => {
    const templatePath = path.resolve(__dirname, `./app/templates/${entryName}.html`);
    if (fs.existsSync(templatePath)) {
        return new HtmlWebpackPlugin({
            template: templatePath,
            filename: `html/${entryName}.html`,
            chunks: [entryName],
        });
    } else {
        console.warn(`Warning: Template for ${entryName} does not exist. Skipping...`);
        return null;
    }
}).filter(Boolean);

module.exports = {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    entry: entries,
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].bundle.css',
        }),
        ...htmlPlugins, // Include all the dynamically generated HtmlWebpackPlugin instances
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('CopyToPublic', (compilation) => {
                    exec('python copy_to_public.py', (err, stdout, stderr) => {
                        if (err) {
                            console.error('Error copying files to public:', err);
                            return;
                        }
                        console.log('Successfully copied files to public directory');
                    });
                });
            }
        }
    ],
};