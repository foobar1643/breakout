const gulp = require('gulp');
const babel = require('gulp-babel');
const requirejs = require('gulp-requirejs');
const del = require('del');
const flow = require('gulp-flowtype');
const util = require('gulp-util');

var paths = {
    buildTemp: 'build/temp',
    es5Game: 'public/media/game',
    babel: ['src/*.js', 'src/**/*.js']
};

gulp.task('clean-build-temp', function(){
    return del(paths.buildTemp);
});

gulp.task('es6-to-amd', ['clean-build-temp'], function() {
    return gulp.src(paths.babel)
    /*.pipe(flow({
        all: false,
        weak: false,
        killFlow: false,
        abort: true
    })).on('error', util.log)*/
    .pipe(babel({
        presets: ['latest'],
        plugins: [
            "transform-flow-strip-types",
            "transform-es2015-modules-amd"
        ]
    }))
    .pipe(gulp.dest(paths.buildTemp));
});

gulp.task('es5-amd-clean', function() {
    return del(paths.es5Game);
});

gulp.task('default', ['es5-amd-clean', 'es6-to-amd'], function() {
    return requirejs({
        name: 'Game',
        baseUrl: paths.buildTemp,
        out: 'Arkanoid.js'
    }).on('error', util.log)
    .pipe(gulp.dest(paths.es5Game));
});