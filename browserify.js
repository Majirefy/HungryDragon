var browserify = require('browserify');
var tsify = require('tsify');

browserify()
    .add('src/app.ts')
    .plugin(tsify, { project: '.' })
    .transform('browserify-shim')
    .bundle()
    .on('error', function (error) { console.error(error.toString()); })
    .pipe(process.stdout);
