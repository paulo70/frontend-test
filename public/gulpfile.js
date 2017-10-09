const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const jshint = require('gulp-jshint');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const entryPoint = 'javascripts/main.js';

gulp.task('transpiler', () => {
  return browserify(entryPoint, { debug: true })
    .transform('babelify', { presets: ['es2015'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(concat('script.min.js'))
    .pipe(gulp.dest('./dist/javascripts'));
});

gulp.task('jshint', () => {
  return gulp.src('js/**/*.js')
    .pipe(jshint({ esversion: 6 }))
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', () => {
  return gulp.src(['scss/**/*.scss', 'bootstrap/bootstrap.css'])
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('./dist/stylesheets'))
});

gulp.task('htmlmin', () => {
  return gulp.src('index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'));

});

gulp.task('copy', () => {
  return gulp.src(['fazenda.json'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('imagemin', () => {
  return gulp.src('images/farm.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('watch', ['transpiler'], () => {
  return gulp.watch('js/*.js', ['transpiler']);
});

gulp.task('default', (cb) => {
 return runSequence(['transpiler', 'jshint', 'sass', 'copy','htmlmin','imagemin' ,'watch'], cb);
});