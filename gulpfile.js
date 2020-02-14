const { task, src, dest, watch, series, parallel } = require('gulp');
const less = require('gulp-less');
const stylus = require('gulp-stylus');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const htmlmin = require('gulp-htmlmin');
const del = require('del');

task('clear', async function (done) {
    return await del('build')
})

task('stylus', function () {
    return src('src/stylus/**/*.styl')
        .pipe(stylus({
            compress: true
        }))
        .pipe(dest('src/css'));
});

task('less', function () {
    return src('src/less/**/*.less')
        .pipe(less())
        .pipe(dest('src/css'));
});

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

task('less-watch', function () {
    watch(['src/less/**/*.less', 'src/less/**/*.less'], series('less')); // Наблюдение за less файлами в папке less
});

task('stylus-watch', function () {
    watch(['src/stylus/**/*.styl', 'src/stylus/**/*.styl'], series('stylus')); // Наблюдение за less файлами в папке less
});

task('default', parallel('watch'));
task('prod', series('clear', 'minify-html', 'ready-for-production'))