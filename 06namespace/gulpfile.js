const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const concat = require('gulp-concat');
const minify = require('gulp-minify');

gulp.task('toindex', () => {
  return gulp
    .src(['./src/index.html'])
    .pipe(
      htmlreplace({
        js: 'index.min.js'
      })
    )
    .pipe(gulp.dest('dist/'));
});
gulp.task('tologin', () => {
  return gulp
    .src(['./src/login.html'])
    .pipe(
      htmlreplace({
        js: 'login.min.js'
      })
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('indexjs', function() {
  return gulp
    .src(['../lib/*.js', './src/shared.js', './src/main.js'])
    .pipe(concat('index.js'))
    .pipe(
      minify({
        ext: {
          src: '.debug.js',
          min: '.min.js'
        }
      })
    )

    .pipe(gulp.dest('dist/'));
});

gulp.task('loginjs', function() {
  return gulp
    .src(['../lib/*.js', './src/shared.js', './src/login.js'])
    .pipe(concat('login.js'))
    .pipe(
      minify({
        ext: {
          src: '.debug.js',
          min: '.min.js'
        }
      })
    )

    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['toindex', 'tologin', 'indexjs', 'loginjs']);
