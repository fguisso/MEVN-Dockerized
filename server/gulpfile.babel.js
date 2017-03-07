import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import del from 'del';

gulp.task('babel', ['clean'], () =>
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')));

gulp.task('watch', () =>
  gulp.watch('src/**/*.js', { cwd: './' }, ['babel']));

gulp.task('clean', () => del(['dist']));

gulp.task('default', ['babel', 'watch']);
