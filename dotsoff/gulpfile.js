var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var eslint = require('gulp-eslint');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./www/js/*/*.js']
};


gulp.task('default', ['sass']);

gulp.task('config', require('gulp-cordova-config'));
gulp.task('bump', require('gulp-cordova-bump'));

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('img', function() {
  return gulp.src('./images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./www/img'));
});

gulp.task('lint', function() {
  // Pass the code we want to lint
  return gulp.src(['./www/js/*/*.js'])
    // Send that to eslint
    .pipe(eslint())
    // then format the out put to something readable
    .pipe(eslint.format('stylish', process.stderr));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  // lint while ionic serve
  gulp.watch(paths.js, ['lint']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
