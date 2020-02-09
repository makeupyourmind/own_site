const { task, src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const htmlmin = require('gulp-htmlmin');
const del = require('del');

task('clear', async function (done) {
    return await del('build')
})

task('templates', function () {
    return src(['src/templates/**/*.jade'])
        .pipe(jade())
        .pipe(dest('src/html'))
});

task('minify-html', function () {
    return src('src/**/*.html') // указываем пути к файлам .html
        .pipe(htmlmin({
            collapseWhitespace: true, // удаляем все переносы
            removeComments: true // удаляем все комментарии
        }))
        .pipe(dest('build')); // оптимизированные файлы .html переносим на продакшен
});

task('ready-for-production', function (cb) {
    return src(['src/**/*.js', 'src/**/*.css', 'src/**/*.{png,gif,jpg,jpeg}'])
        .pipe(dest('build'))
});

task('sass', function () { // Создаем таск "sass"
    return src(['src/sass/**/*.sass', 'src/sass/**/*.scss']) // Берем источник
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(dest('src/css')) // Выгружаем результата в папку css
});

task('watch', function () {
    watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], series('sass')); // Наблюдение за sass файлами в папке sass
});

task('default', parallel('watch'));
task('prod', series('clear', 'minify-html', 'ready-for-production'))