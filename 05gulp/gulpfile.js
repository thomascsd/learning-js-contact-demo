const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

gulp.task('toindex', () => {
  return gulp
    .src(['./src/index.html', './src/login.html'])
    .pipe(
      htmlreplace({
        js: 'index.min.js'
      })
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  return gulp
    .src(['../lib/*.js', './src/*.js'])
    .pipe(
      minify({
        ignoreFiles: ['-min.js']
      })
    )
    .pipe(concat('index.min.js'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['toindex', 'js']);
