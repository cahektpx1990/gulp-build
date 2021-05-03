
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
sass.compiler = require('node-sass');


// Срабатывает все тут
gulp.task('sass', function () {
  return gulp.src('./src/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    // .pipe(gulp.dest('./src/assets/css/dist'));
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gcmq())
    .pipe(csso())
    .pipe(rename({
      suffix: ".min"    
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./src/assets/css"))
    .pipe(browserSync.reload({ stream: true}));    
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: 'src',
    }
      // notify: false,
      // open: false,
      // tunnel true
  });
});

/*
// Минимизированный файл c суффиксом min и автопрефиксами------ не используется
gulp.task('csso', function () {
  return gulp.src('./src/assets/css/style.css')
      .pipe(gcmq())
      .pipe(csso())
      // .pipe(gulp.dest('./src/assets/css/dist'));
      .pipe(rename({
        suffix: ".min"    
      }))
      .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest("./src/assets/css/dist"));
});

// Добавление суффикса min.---------------- не используется 
gulp.task('rename', function () {
  return gulp.src("./src/assets/css/dist/style.css", { base: process.cwd() })
  .pipe(rename({
    suffix: ".min"    
  }))
  .pipe(gulp.dest("./"));
});

gulp.task('gcmq', function () {
  return gulp.src('./src/assets/css/style.css')
      .pipe(gcmq())
      .pipe(gulp.dest('./src/assets/css/q'));
});*/

gulp.task('checkupdate', function () {
  gulp.watch('./src/assets/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./src/*.html').on('change', browserSync.reload);
});

gulp.task(
  "watch",
  gulp.parallel(
    'sass',
    'checkupdate'
  )
);
// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });