const { src, dest, watch, parallel } = require("gulp");

const gulp = require("gulp"),
  sass = require("gulp-sass")(require("sass")),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  recompress = require("imagemin-jpeg-recompress"),
  del = require("del"),
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  rigger = require("gulp-rigger"),
  cleanCSS = require("gulp-clean-css");

var path = {
  dist: {
    // Путь для файлов при сборке
    html: "dist/",
    js: "dist/js/",
    css: "dist/css/",
    img: "dist/img/",
    fonts: "dist/fonts/",
    php: "dist/php/",
  },
  src: {
    // Пути исходников
    html: "src/*.html",
    js: "src/js/**/*.js",
    scss: "src/scss/*.scss",
    img: "src/img/**/**/*.{jpg,png,svg,gif,ico}",
    fonts: "src/fonts/**/*.*",
    php: "src/php/**/*.*",
  },
  watch: {
    // Пути для наблюдения за изменениями файлов
    html: "src/**/*.html",
    js: "src/js/**/*.js",
    scss: "src/scss/**/*.scss",
    img: "src/img/**/**/*.{jpg,png,svg,gif,ico}",
    fonts: "src/fonts/**/*.*",
    php: "src/php/**/*.*",
  },
  clean: "./dist",
};

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "dist/",
    },
  });
}

/* ========= "HTML" ========== */
function html() {
  return src(path.src.html)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(rigger())
    .pipe(dest(path.dist.html))
    .pipe(browserSync.stream());
}

/* ========= "JS" ========== */
function scripts() {
  return src(path.src.js)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(concat("main.min.js"))
    // .pipe(uglify())
    .pipe(dest(path.dist.js))
    .pipe(browserSync.stream());
}

/* ========= "SCSS" ========== */
function styles() {
  return src(path.src.scss)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version", ">1%", "ie 8", "ie 7"],
      })
    )
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(concat("style.min.css"))
    .pipe(dest(path.dist.css))
    .pipe(browserSync.stream());
}

/* ========== "IMG" ========== */
function images() {
  return src(path.src.img)
    .pipe(
      plumber({ errorHandler: notify.onError("Error: <%= error.message %>") })
    )
    .pipe(
      imagemin([
        recompress({
          progressive: true,
          min: 70,
          max: 90,
        }),
        pngquant({
          speed: 5,
          quality: [0.9, 1],
        }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }],
        }),
        imagemin.gifsicle(),
        imagemin.optipng(),
      ])
    )
    .pipe(dest(path.dist.img))
    .pipe(browserSync.stream());
}

/* ========== "FONTS" ========== */
function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.dist.fonts))
    .pipe(browserSync.stream());
}

/* ========== "PHP" ========== */
function php() {
  return src(path.src.php).pipe(dest(path.dist.php)).pipe(browserSync.stream());
}

/* ========= "CLEAN" ========= */
function clean() {
  return del.sync(path.clean);
}

/* ========= "WATCH" ========= */
function watching() {
  watch([path.watch.html], html);
  watch([path.watch.scss], styles);
  watch([path.watch.js], scripts);
  watch([path.watch.img], images);
  watch([path.watch.fonts], fonts);
  watch([path.watch.php], php);
}

exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.php = php;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = parallel(html, styles, scripts, images, fonts, php);
exports.default = parallel(
  clean,
  html,
  styles,
  scripts,
  images,
  fonts,
  php,
  browsersync,
  watching
);