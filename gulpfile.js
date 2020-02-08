const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const del = require('del');

gulp.task('clear', async function (done) {
    return await del('build')
})

gulp.task('templates', function () {
    return gulp.src(['src/templates/**/*.jade'])
        .pipe(jade())
        .pipe(gulp.dest('src/html'))
});

gulp.task('build', function (cb) {
    return gulp.src(['src/**/*.js', 'src/**/*.css', 'src/**/*.html', 'src/**/*.{png,gif,jpg,jpeg}'])
        .pipe(gulp.dest('build'))
});

gulp.task('sass', function () { // Создаем таск "sass"
    return gulp.src(['src/sass/**/*.sass', 'src/sass/**/*.scss']) // Берем источник
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('src/css')) // Выгружаем результата в папку css
});

gulp.task('watch', function () {
    gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], gulp.series('sass')); // Наблюдение за sass файлами в папке sass
});

gulp.task('default', gulp.parallel('watch'));
gulp.task('prod', gulp.series('sass', 'clear', 'build'))