var gulp         = require('gulp'),
    csslint      = require('gulp-csslint'),
    concat       = require('gulp-concat'),
    // jshint       = require('gulp-jshint'),
    less         = require('gulp-less'),
    cssnano      = require('gulp-cssnano'),
    postcss      = require('gulp-postcss'),
    uglify       = require('gulp-uglify'),
    gutil        = require('gulp-util'),
    shell        = require('gulp-shell'),
    del          = require('del');

var config = {
  production: !!gutil.env.production
};


// clean
gulp.task('clean', function() {
  return del(['public/build/**']);
});

// uglify js
gulp.task('uglify-js', ['clean'], function() {
  return gulp.src('public/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/build/js'))
    .on('error', gutil.log);
});

// jshint
// gulp.task('jshint', function() {
//   return gulp.src(['public/js/**/*.js'])
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'))
//     .on('error', gutil.log);
// });

// less
gulp.task('less', ['clean'], function() {
  return gulp.src(
      ['public/less/ownstyles.less'],
      { base: 'public/less' }
    )
    .pipe(less())
    .pipe(gulp.dest('public/build/css'))
    .on('error', gutil.log);
});

// csslint
gulp.task('csslint', ['less'], function() {
  return gulp.src(['public/build/css/ownstyles.css'])
    .pipe(csslint({
      'adjoining-classes': false,
      'box-sizing': false,
      'box-model': false,
      'compatible-vendor-prefixes': false,
      'fallback-colors': false,
      'floats': false,
      'font-sizes': false,
      'important': false,
      'outline-none': false,
      'qualified-headings': false,
      'regex-selectors': false,
      'unique-headings': false,
      'universal-selector': false,
      'unqualified-attributes': false
    }))
    .pipe(csslint.reporter());
});


// watch
gulp.task('watch', function() {
  gulp.watch(['public/js/**/*.js',
    'public/less/**/*.less', 'public/demo.html'], ['build', 'csslint']);
});

// build task
gulp.task('build', ['uglify-js', 'less']);

// default
gulp.task('default', ['build', 'csslint', 'watch']);

// deploy task without watch and linting
gulp.task('deploy', ['build']);

// jsdoc
gulp.task('jsdoc', shell.task([
  './node_modules/.bin/jsdoc .'
]));
