const gulp = require('gulp'),
	  sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      cssnano = require('gulp-cssnano'),
	  minifyHTML = require('gulp-htmlmin'),
      del = require('del')

gulp.task('styles', function(){
  	return gulp.src('src/styles.scss')
	    .pipe(sass({outputStyle: 'compressed'}))
	    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
	    .pipe(cssnano())
	    .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.reload({
			stream: true
		}));
})

gulp.task('scripts', function(){
	return gulp.src('src/scripts.js')
		.pipe(gulp.dest('docs/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
})

gulp.task('html', function() {
  	return gulp.src('src/index.html')
	    .pipe(minifyHTML({collapseWhitespace: true}))
	    .pipe(gulp.dest('docs'));
})

gulp.task('clean', function(){
	return del(['docs/js', 'docs/css']);
})

// Start browserSync server
// gulp.task('browserSync', function() {
//   browserSync({
//     server: {
//       baseDir: 'docs'
//     }
//   })
// });

// gulp.task('default', ['clean'], function(){
// 	gulp.start('styles', 'scripts', 'html', 'browserSync');
// })

// gulp.task('watch', function(){
// 	gulp.watch('docs/*.html', browserSync.reload);
// 	gulp.watch('src/styles.scss', ['styles']);
// 	gulp.watch('src/scripts.js', ['scripts'])
// })

gulp.task('serve', ['clean'], function(){
	gulp.start('styles', 'scripts', 'html');
	browserSync.init({
		server: 'docs'
	});
	gulp.watch('src/styles.scss', ['styles']);
	gulp.watch('src/scripts.js', ['scripts']);
	gulp.watch('src/index.html', ['html']);
	gulp.watch('docs/*.html', browserSync.reload);
});

gulp.task('default', ['serve']);