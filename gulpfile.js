// Load plugins
const gulp = require("gulp");
const browsersync = require("browser-sync").create();
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");

// CSS task
function css() {
  return gulp
    .src("./public/stylesheets/style.less")
    .pipe(sourcemaps.init())
    .pipe(less())
    // Use postcss with autoprefixer and compress the compiled file using cssnano
    .pipe(postcss([autoprefixer(), cssnano()]))
    // Now add/write the sourcemaps
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public/stylesheets"))
    .pipe(browsersync.stream())
}

// function scripts() {
//   return (
//     gulp
//       .src(["./assets/js/**/*"])
//       .pipe(plumber())
//       .pipe(webpackstream(webpackconfig, webpack))
//       // folder only, filename is specified in webpack config
//       .pipe(gulp.dest("./_site/assets/js/"))
//       .pipe(browsersync.stream())
//   );
// }

function reload() {
    browsersync.reload();
    done();
}

// Watch files
function watchFiles() {

  browsersync.init({
        proxy: 'localhost:3000'
    });
    gulp.watch("./public/stylesheets/*.less", css);
    // We should tell gulp which files to watch to trigger the reload
    // This can be html or whatever you're using to develop your website
    // Note -- you can obviously add the path to the Paths object
    gulp.watch("./views/*.pug", reload);
    gulp.watch("./public/javascripts/*.js", reload);
}

// define complex tasks
// const js = gulp.series(scriptsLint, scripts);
const build = gulp.series(css);
const watch = gulp.parallel(watchFiles);

// export tasks
exports.css = css;
exports.watch = watch;
exports.default = build;
