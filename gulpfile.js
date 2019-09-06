
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
    // .pipe(uglify())
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    .pipe(gulp.dest('./'));
});
// ---------------------------------------------------------




// JS SECTION // ---------------------------------------
gulp.task('workflowjs', function () {
  gulp.src(['src/import/jquery-3.3.1.min.js','src/js/myjs.js','src/js/myjs-*.js'])
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('myjs.js'))
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('./'))
    .pipe(livereload());
  gulp.src('src/js/myjs_edit.js')
    .pipe(uglify())
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
  return gulp.src('src/js/myjs_dashboard.js')
    .pipe(uglify())
    .pipe(stripJS({safe: true,
                  ignore: /url\([\w\s:\/=\-\+;,]*\)/g}))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});
gulp.task('localjs', function () {
  return gulp.src(['src/import/jquery-3.3.1.min.js','src/js/local*.js'])
    // .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('local.js'))
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
gulp.task('localcss', function () {
  return gulp.src('src/sass/local.sass')
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
  gulp.watch(['src/sass/**/my*.sass','src/sass/**/_my*.sass','src/sass/**/dash*.sass','src/sass/modules/**/*.sass'], gulp.series('workflowcss','dashcss'));
  gulp.watch(['src/sass/local*.sass','src/sass/_colors.sass'], gulp.series('localcss'));
});

gulp.task('watch:js', function () {
  gulp.watch('src/js/myjs*.js', gulp.series('workflowjs'));
  gulp.watch('src/js/local*.js', gulp.series('localjs'));
});

gulp.task('watch:vars', function () {
  gulp.watch('src/js/glo*.js', gulp.series('myvars'));
});

gulp.task('watch:frontend', function () {
  gulp.watch('**/*.html').on('change', livereload.reload);
});
gulp.task('watch', gulp.parallel('watch:sass','watch:js','watch:frontend','watch:vars'));
// ---------------------------------------------------------



// REQUIRE SECTION // --------------------------------------
gulp.task('default', gulp.series(
                                 'workflowcss',
                                 'localcss',
                                 'dashcss',
                                 'workflowjs',
                                 'localjs',
                                 'myvars',
                                  gulp.parallel(
                                                'watch',
                                                'serve'
                                                )
                                )
);
// ---------------------------------------------------------
