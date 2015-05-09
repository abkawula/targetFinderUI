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


gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
});


// JSHint task
gulp.task('lint', function() {
  gulp.src('app/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('app/styles/*.s\css')
  // These last two should look familiar now :)
  .pipe(gulp.dest('dist/css/'))
  .pipe(connect.reload());
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/js/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'))
  .pipe(connect.reload());
});

gulp.task('connect', function() {
  // livereload({start: true});
  connect.server({
    root: 'dist',
    port: 9000,
    livereload: true,
      middleware: function() {
      return [
      modRewrite([
        '^/event/(.*)$ http://localhost:8080/event/$1 [P]'
        ])
      ];
    }
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch([
    'app/js/**/*.js',  
    ], ['browserify']);
  gulp.watch([
    'app/*.html', 
    ], ['html']);
  gulp.watch([
    'app/css/**/*.css'
    ], ['styles']);

});



// Dev task
gulp.task('dev', ['clean', 'html', 'styles', 'lint', 'browserify'], function() { });
gulp.task('default', ['dev', 'connect', 'watch']);
