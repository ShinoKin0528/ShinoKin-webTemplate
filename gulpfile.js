var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');

gulp.task('sass', done => {
  gulp
    .src('./sass/**/*.scss', { sourcemaps: true })
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Error!',
          message: '<%= error.message %>'
        })
      })
    )
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([mqpacker()]))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('./css', { sourcemaps: '../sourcemaps' }));
  done();
});

gulp.task('browser-sync', done => {
  browserSync.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
  done();
});

gulp.task('bs-reload', done => {
  browserSync.reload();
  done();
});

gulp.task('eslint', done => {
  return gulp
    .src(['**/*.js', '!node_modules/**'])
    .pipe(eslint({ useEslintrc: true })) // .eslintrc を参照
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(
  'start',
  gulp.parallel('browser-sync', () => {
    gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./js/**/*.js', gulp.parallel('eslint'));
    gulp.watch('./**/*.html', gulp.parallel('bs-reload'));
    gulp.watch('./sass/**/*.scss', gulp.parallel('bs-reload'));
    gulp.watch('./js/**/*.js', gulp.parallel('bs-reload'));
  })
);
