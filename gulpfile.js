// Defining requirements
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function(){
  return gulp.src('src/css/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function(){
  gulp.watch('src/css/scss/**/*.scss', ['sass']);
  // Other watchers
})