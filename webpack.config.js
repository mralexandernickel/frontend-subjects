module.exports = {
  entry: {
    module: './src/index.ts'
  },
  output: {
    filename: './bundles/frontend.subjects.js',
    library: 'FrontendSubjects',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    // Add '.ts' and '.tsx' as a resolvable extension.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
}