var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rework = require('gulp-rework');
var reworkNPM = require('rework-npm');
var browserSync = require('browser-sync').create();
 
gulp.task('vendorCss', function () {	
	return gulp.src('assets/css/vendors.css')
		.pipe(rework(reworkNPM()))
		.pipe(gulp.dest('dist/'));
});

gulp.task('sass', function () {	
	return gulp.src(['assets/css/*/*.scss','assets/css/*.scss'])
		.pipe(concat('styles.css'))
		.pipe(sass())
		.pipe(gulp.dest('dist/'))
		.pipe(browserSync.reload({
	      stream: true
	    }))
});

gulp.task('watch', function(){
  gulp.watch(['assets/css/*/*.scss','assets/css/*.scss'], gulp.series('sass'));
  // Other watchers
});