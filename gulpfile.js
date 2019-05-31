
// =========================================================
// GULPFILE - PURPOSE SPECIFIC
// =========================================================

// REQUIRE SECTION -----------------------------------------
var autoprefixer = require('autoprefixer'),
    concat       = require('gulp-concat'),
    gulp         = require('gulp'),
    livereload   = require('gulp-livereload'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    stripCSS     = require('gulp-strip-css-comments'),
    stripJS      = require('gulp-strip-comments'),
    postcss      = require('gulp-postcss'),
    uglify       = require('gulp-uglify');
// ---------------------------------------------------------




// JS SECTION // ---------------------------------------
gulp.task('myvars', function () {
  return gulp.src('src/js/global-vars.js')
    .pipe(uglify())
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    .pipe(gulp.dest('./'));
});
// ---------------------------------------------------------




// JS SECTION // ---------------------------------------
gulp.task('workflowjs', function () {
  return gulp.src(['src/import/jquery-3.3.1.min.js','src/js/myjs.js','src/js/myjs-*.js'])
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('myjs.js'))
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});
// ---------------------------------------------------------



// SASS SECTION // -----------------------------------------
gulp.task('workflowcss', function () {
  return gulp.src('src/sass/mycss.sass')
    // .pipe(sourcemaps.init())
    .pipe(sass.sync({
                  errLogToConsole: true,
                  precision: 10,
                  outputStyle: 'nested' //compressed'
                  }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({browsers: ['> 0.01% in IN', 'iOS 4'], grid: true}) ]))
    .pipe(stripCSS({preserve: /^!|@|#/}))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});
// ---------------------------------------------------------



// SASS SECTION // -----------------------------------------
gulp.task('dashcss', function () {
  return gulp.src('src/sass/dashboard.sass')
    .pipe(sass.sync({
                  errLogToConsole: true,
                  precision: 10,
                  outputStyle: 'nested' //compressed'
                  }).on('error', sass.logError))
    .pipe(postcss([ autoprefixer({browsers: ['> 0.01% in IN', 'iOS 4'], grid: true}) ]))
    .pipe(stripCSS({preserve: /^!|@|#/}))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});
// ---------------------------------------------------------



// SERVE SECTION // ----------------------------------------
gulp.task('serve', function(){ // This just displayes upon run and triggers the livereload listen to changes
  console.log(
              '\n' + 'LiveReload Server is now listening to your changes in files...' + '\n'
              );
  livereload.listen();
});
// ---------------------------------------------------------


// WATCH SECTION // ----------------------------------------
gulp.task('watch:sass', function () {
  gulp.watch('src/sass/**/*.sass', gulp.series('workflowcss','dashcss'));
});

gulp.task('watch:js', function () {
  gulp.watch('src/js/myjs*.js', gulp.series('workflowjs'));
});

gulp.task('watch:vars', function () {
  gulp.watch('src/js/glo*.js', gulp.series('myvars'));
});

gulp.task('watch:frontend', function () {
  gulp.watch(['**/*.html', '**/*.csv']).on('change', livereload.reload);
});
gulp.task('watch', gulp.parallel('watch:sass','watch:js','watch:frontend','watch:vars'));
// ---------------------------------------------------------



// REQUIRE SECTION // --------------------------------------
gulp.task('default', gulp.series(
                                 'workflowcss',
                                 'dashcss',
                                 'workflowjs',
                                 'myvars',
                                  gulp.parallel(
                                                'serve',
                                                'watch'
                                                )
                                )
);
// ---------------------------------------------------------
