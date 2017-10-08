const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const entryPoint = 'javascripts/main.js';

gulp.task('transpiler', () => {
  return browserify(entryPoint, { debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./dist/javascripts'))
});

gulp.task('watch', ['transpiler'], ()=>{
  gulp.watch('javascripts/*.js', ['transpiler']);
});

gulp.task('default', ['transpiler', 'watch']);