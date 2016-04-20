/// <binding AfterBuild='copy' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

var itemsToCopy = {
    './node_modules/angular2/bundles/angular2.dev.js': paths.webroot + 'lib/angular2',
    './node_modules/angular2/bundles/angular2-polyfills.js': paths.webroot + 'lib/angular2',
    './node_modules/es6-shim/es6-shim.min.js': paths.webroot + 'lib/es6-shim',
    './node_modules/systemjs/dist/system-polyfills.js': paths.webroot + 'lib/systemjs',
    './node_modules/angular2/es6/dev/src/testing/shims_for_IE.js': paths.webroot + 'lib/angular2',
    './node_modules/systemjs/dist/system.src.js': paths.webroot + 'lib/systemjs',
    './node_modules/rxjs/bundles/Rx.js': paths.webroot + 'lib/rxjs',
    './node_modules/moment/moment.js': paths.webroot + 'lib/moment',
    './node_modules/underscore/underscore.js': paths.webroot + 'lib/underscore'
}

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task('copy', function () {
    for (var src in itemsToCopy) {
        if (!itemsToCopy.hasOwnProperty(src)) continue;
        gulp.src(src)
        .pipe(gulp.dest(itemsToCopy[src]));
    }
});

gulp.task("min", ["min:js", "min:css"]);