var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	})
});

gulp.task('sass', function() {
	return gulp.src('scss/**/*.scss')
		.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(gulp.dest('css/'))
		.pipe(sourcemaps.write('maps/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('server', ['browser-sync', 'sass'], function () {
	gulp.watch('scss/**/*.scss', ['sass']);
	gulp.watch('**/*.html', browserSync.reload);
	gulp.watch('**/*.js', browserSync.reload);
});