const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('toindex', () => {
  return gulp
    .src(['./src/index.html','./src/login.html'])
    .pipe(
      htmlreplace({
        js: 'index.min.js'
      })
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function(){
  return gulp.src(['../lib/*.js','./src/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('index.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/'))
});


gulp.task('default', ['toindex', 'js']);