var gulp 		= require('gulp');
var sass 		= require('gulp-sass');
var concat 		= require('gulp-concat');
var rework 		= require('gulp-rework');
var reworkNPM 	= require('rework-npm');
var rename 		= require('gulp-rename');
var uglify 		= require('gulp-uglify');
var browserSync = require('browser-sync').create();

var paths = {
  css: [
	'assets/css/*.scss',
	'assets/css/*/*.scss'
  ],
  js: [
    'assets/js/*.js',
    'assets/js/**/*.js'
  ]
};

gulp.task('default', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);
 
gulp.task('vendorCss', function () {	
	return gulp.src('assets/vendor/vendors.css')
		.pipe(rework(reworkNPM()))
		.pipe(gulp.dest('dist/'));
});

var jsFiles = 'assets/js/**/*.js',
    jsDest = 'dist/js/';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('sass', function () {	
	return gulp.src(paths.css)
		.pipe(concat('styles.css'))
		.pipe(sass())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({
	      stream: true
	    }));
});

gulp.task('watch', function(){
  gulp.watch(paths.css, gulp.series('sass'));
  gulp.watch(paths.js, gulp.series('scripts'));
});