/**
 * gulp
 * $ npm install gulp gulp-livereload gulp-watch gulp-sass gulp-rename gulp-plumber gulp-babel browserify babelify --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    babel = require('gulp-babel'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    fs = require("fs");

// Js
gulp.task('js', function () {
  return browserify('js/main.js', { debug: true })
          .transform(babelify)
          .bundle()
          .on("error", function (err) { console.log("Error : " + err.message); })
          .pipe(fs.createWriteStream("./dist/bundle.js"));
});

// Sass
gulp.task('sass', function () {
    return gulp.src('sass/*.scss')
           .pipe(plumber())
           .pipe(sass())
           .pipe(gulp.dest('css'));
});

// Watch
gulp.task('watch', function () {

    // Watch `html`
    gulp.watch(['*.html', 'css/*.css', 'dist/bundle.js']).on('change', livereload.changed);

    // Watch `scss` files
    gulp.watch('sass/*.scss', ['sass']);

    gulp.watch('js/*.js', ['js']);
    
    // Create liveReload server
    livereload.listen();
 
});