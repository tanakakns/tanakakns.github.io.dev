var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var jade = require("gulp-jade");
var typescript = require("gulp-typescript");
var compass = require("gulp-compass");
var webserver = require('gulp-webserver');
const del = require('del');

gulp.task('server', function() {
  gulp.src('./tanakakns.github.io')
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      path: '/',
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('clean', function () {
  return del(
    'tanakakns.github.io/**/*',
    '!tanakakns.github.io/.git/**/*'
  );
});

gulp.task('sass', ['clean'], function() {
    gulp.src("./src/scss/**/*scss")
        .pipe(compass({
          config_file: './config.rb',
          css: 'tanakakns.github.io/assets/css',
          sass: 'src/scss'
        }))
        .pipe(autoprefixer())
        .pipe(gulp.dest("./tanakakns.github.io/assets/css"));
});

gulp.task('jade', ['clean'], function() {
    gulp.src("./src/jade/**/*jade")
        .pipe(jade())
        .pipe(gulp.dest("./tanakakns.github.io/"));
});

gulp.task('typescript', ['clean'], function() {
    gulp.src("src/typescript/**/*ts")
        .pipe(typescript())
        .pipe(gulp.dest("./tanakakns.github.io/assets/js"));
});

gulp.task('build', ['sass', 'jade', 'typescript']);