// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var modRewrite = require('connect-modrewrite');
var livereload = require('gulp-livereload');

// tasks
gulp.task('watch', function() {
  // Watch .js files
  gulp.watch('app/js/**/*.js');
  // Watch html files
  gulp.watch('app/**/*.html');
  // Watch css files
  gulp.watch('app/css/**/*.css');
});
gulp.task('browserifyDist', function() {
  gulp.src(['app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./dist/js'))
});
gulp.task('browserify', function() {
  gulp.src(['app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./app/js'))
});
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
    gulp.src('./app/js/bundled.js')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 9000,
    middleware: function() {
      return [
      modRewrite([
        '^/event/(.*)$ http://localhost:8080/event/$1 [P]'
        ])
      ];
    }
  });
});

// gulp.task('connect', function () {
//   connect.server({
//     root: 'app/',
//     port: 9000
//   });
// });


gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9999
  });
});


// default task
gulp.task('default',
  ['clean', 'browserify', 'connect', 'watch']
);
// build task
gulp.task('build',
  ['lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-bower-components', 'connectDist']
);
