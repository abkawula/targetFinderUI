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
  gulp.src('./dist/views', { read: false });
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
  .pipe(gulp.dest('dist/css/'));
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: false
  }))
  // Bundle to a single file
  .pipe(concat('bundle.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('dist/js'));
});



// gulp.task('connect', function () {
//   connect.server({
//     root: 'app/',
//     port: 9000,
//     livereload: true,
//     middleware: function() {
//       return [
//       modRewrite([
//         '^/event/(.*)$ http://localhost:8080/event/$1 [P]'
//         ])
//       ];
//     }
//   });
// });

gulp.task('connect', function() {
  // livereload({start: true});
  connect.server({
    root: 'app',
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

// // Views task
// gulp.task('views', function() {
//   // Get our index.html
//   gulp.src('app/index.html')
//   // And put it in the dist folder
//   .pipe(gulp.dest('dist/'));

//   // Any other view files from app/views
//   gulp.src('app/views/**/*')
//   // Will be put in the dist/views folder
//   .pipe(gulp.dest('dist/views/')
//     .pipe(livereload())
//     );
// });

// gulp.task('watch', function() {
//   console.log("watch was tripped");
//   livereload.listen();
//   gulp.watch([
//     'app/js/**/*.js', 
//     '**/*.html', 
//     'app/css/**/*.css'
//     ]
//     , ['views']
    
//     );
// });

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch([
    'app/js/**/*.js', 
    '**/*.html', 
    'app/css/**/*.css'
    ], ['html']);
});



// Dev task
gulp.task('dev', ['clean', 'styles', 'lint', 'browserify'], function() { });
gulp.task('default', ['dev', 'connect', 'watch']);
