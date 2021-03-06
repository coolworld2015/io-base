var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var minifyHTML = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');

var scripts = [
    './app/vendors/ionic.bundle.min.js',
    './app/src/**/!(*.spec).js'
];

var getScripts = function () {
    return gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'));
};

gulp.task('index', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./build/app'))
});

gulp.task('pic', function () {
    return gulp.src('./app/*.jpg')
        .pipe(gulp.dest('./build/app'))
});

gulp.task('fonts', function () {
    return gulp.src('./app/fonts/*.*')
        .pipe(gulp.dest('./build/fonts'))
});

gulp.task('css', function () {
    return gulp.src('./app/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./build/app'));
});

gulp.task('minify-css', function() {
	return gulp.src('./app/css/*.css')
		.pipe(minifyCss())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('./build/app'));
});

gulp.task('scripts', function () {
    return gulp.src(scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./build/app'));
});

gulp.task('dev:html', function () {
    return gulp.src('./app/src/**/*.html')
        .pipe(templateCache({
            module: 'app'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./build/app'));
});

gulp.task('prod:html', function () {
    return gulp.src('./app/src/**/*.html')
        .pipe(minifyHTML())
        .pipe(templateCache({
            module: 'app'
        }))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('./build/app'));
});

gulp.task('dev:scripts', function () {
    return getScripts()
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./build/app'));
});

gulp.task('prod:scripts', function () {
    return getScripts()
        .pipe(uglify())
        .pipe(gulp.dest('./build/app'));
});

gulp.task('dev', ['dev:scripts', 'dev:html', 'css', 'pic', 'fonts']);
gulp.task('build', ['index', 'dev']);

gulp.task('prod', ['prod:scripts', 'prod:html', 'minify-css', 'pic', 'fonts']);
//gulp.task('release', ['index', 'prod', 'test']);
gulp.task('release', ['index', 'prod']);

gulp.task('watch', ['build'], function () {
    gulp.watch('./app/**', ['build']);
});

gulp.task('default', ['build'], function () {
    gulp.watch('./app/**', ['build']);
    gulp.start('tdd');
});
 
