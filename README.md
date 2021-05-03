# Сборка gulp для верcтки сайтов.

Сборка gulp для вестки простых сайтов (лендингов) с использование препроцессора *css => scss*.

## Что включает в себя сборка? 
 * [gulp-autoprefixer](https://github.com/Berzeg07/build_gulp4) - автоматически расставляет вендорные префиксы в CSS в соответствии с сервисом [Can I Use](https://caniuse.com/);
 * [gulp-sass](https://www.npmjs.com/package/gulp-sass) - компиляция SASS,SCSS в CSS;
 * [gulp-rename](https://www.npmjs.com/package/gulp-rename) - переименование файлов;
 * [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - создание карты sourcemap;
 * [gulp-csso](https://www.npmjs.com/package/gulp-csso) - CSS минификатор;
 * [gulp-watch]() - отслеживание изменений в файлах проекта;
 * [gulp-group-css-media-queries](https://www.npmjs.com/package/gulp-group-css-media-queries) - группирует @media screen;
 # Как пользоваться?
 Установить Node JS
 Далее, используя cmd в Windows или Терминал VSCode, проделайте следующие шаги:
 * Скачать сборку: https://github.com/cahektpx1990/gulp-build.git ;
 * Устанавливаем пакеты из package.json: *npm install* ;
 * Основная команда: ***gulp watch*** запускает слежку за изменением файлов *scss*.