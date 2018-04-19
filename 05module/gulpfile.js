const gulp = require('gulp');
const htmlreplace = require('gulp-html-replace');

gulp.task('toindex', () => {
  return gulp
    .src('./index.html')
    .pipe(
      htmlreplace({
        js: 'index.min.js'
      })
    )
    .pipe(gulp.dest('dist/'));
});
gulp.task('tologin', () => {
  return gulp
    .src('./login.html')
    .pipe(
      htmlreplace({
        js: 'login.min.js'
      })
    )
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['toindex', 'tologin']);