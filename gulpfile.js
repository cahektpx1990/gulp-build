
"use strict"

const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const del = require('del');
// const include = require('gulp-include');
// sass.compiler = require('node-sass');


// Срабатывает все тут
gulp.task('sass', function () {
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(csso())  
    .pipe(rename({
      suffix: ".min"    
    }))  
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("./src/assets/css"))
    .pipe(browserSync.reload({ stream: true}));    
});

gulp.task("js", function () {
	return gulp  
  .src(['src/assets/js/*.js', '!src/assets/js/*.min.js'])
		.pipe(webpack({
			mode: 'production',
			performance: { hints: false },
			module: {
				rules: [
					{
						test: /\.(js)$/,
						exclude: /(node_modules)/,
						loader: 'babel-loader',
						query: {
							presets: ['@babel/env'],
							plugins: ['babel-plugin-root-import']
						}
					}
				]
			}
		})).on('error', function handleError() {
			this.emit('end')
		})
		.pipe(rename('index.min.js'))
		.pipe(gulp.dest('src/assets/js'))
		.pipe(browserSync.stream())
});


gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
      // notify: false,
      // open: false,
      // tunnel true
  });
});

gulp.task('clean', async function () {
  return del.sync('./dist');
});

gulp.task('prebuild', async function () {
  let buildCss = gulp.src('./src/assets/css/*.css').pipe(gulp.dest('./dist/assets/css'));

  let buildFonts = gulp.src('./src/assets/fonts/**/*').pipe(gulp.dest('./dist/assets/fonts'));

  let buildImages = gulp.src('./src/assets/img/**/*').pipe(imagemin({progressive: true})).pipe(gulp.dest('./dist/assets/img'));

  let buildJs = gulp.src('./src/assets/js/*.min.js').pipe(gulp.dest('./dist/assets/js'));

  let buildStructure = gulp.src('./src/*', '!./src/assets/**/*').pipe(gulp.dest('./dist'));

})

gulp.task('checkupdate', function () {
  gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
  gulp.watch(['src/assets/js/*.js', '!src/assets/js/*.min.js'], gulp.parallel('js')).on('change', browserSync.reload);  
});

gulp.task("watch", gulp.parallel("sass", "js", "checkupdate"));

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'js'), 'prebuild'));