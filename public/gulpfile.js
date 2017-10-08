const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const entryPoint = 'js/main.js';

gulp.task('transpiler', () => {
  return browserify(entryPoint, { debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch', ['transpiler'], ()=>{
  gulp.watch('js/*.js', ['transpiler']);
});

gulp.task('default', ['transpiler', 'watch']);