const { src, dest, series, watch, parallel } = require("gulp");

//general packets
const plumber = require("gulp-plumber");
const newer = require("gulp-newer");
const concat = require("gulp-concat");
const notify = require("gulp-notify");
const clean = require("gulp-clean");
const server = require("gulp-server-livereload");
const fs = require("fs");

//html
const fileInclude = require("gulp-file-include");
const htmlclean = require("gulp-htmlclean");

//pug
const pug = require("gulp-pug");

//styles
const sass = require("gulp-sass")(require("sass"));
const sourceMaps = require("gulp-sourcemaps");
const prefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");

//images
const imagemin = require("gulp-imagemin");
const recompress = require("imagemin-jpeg-recompress");
const pngquant = require("imagemin-pngquant");

//js
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const babel = require("gulp-babel");

// paths
const {
  srcFolder,
  buildFolder,
  docsFolder,
  paths,
} = require("./configs/paths.js");

//plumber settings
const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: "Error <%= error.message %>",
      sound: false,
    }),
  };
};

//Production settings

const toProd = (done) => {
  isProd = true;
  done();
};

let isProd = false;

//Pug settings

const toPug = (done) => {
  isPug = true;
  done();
};

let isPug = false;

//file include settings
const fileIncludeSetting = {
  prefix: "@@",
  basepath: "@file",
};

//Server settings
const serverOptions = {
  livereload: true,
  open: true,
};

//Server
const serverGulp = () => {
  return src(isProd ? `${docsFolder}/` : `${buildFolder}/`).pipe(
    server(serverOptions)
  );
};

//Clean files
const cleanFolder = (done) => {
  if (!isProd) {
    if (fs.existsSync(`${buildFolder}/`)) {
      return src([`${buildFolder}/`, `!${paths.buildImagesFolder}`], {
        read: false,
      }).pipe(clean({ force: true }));
    }
  } else {
    if (fs.existsSync(`${docsFolder}/`)) {
      return src([`${docsFolder}/`, `!${[paths.docsImagesFolder]}`], {
        read: false,
      }).pipe(clean({ force: true }));
    }
  }

  done();
};

//Styles task
const styles = () => {
  return src(paths.srcStyles)
    .pipe(newer(isProd ? paths.docsCssFolder : paths.buildCssFolder))
    .pipe(plumber(plumberNotify("Styles")))
    .pipe(sourceMaps.init())
    .pipe(
      sass(
        isProd
          ? {
              outputStyle: "compressed",
            }
          : ""
      ).on("error", sass.logError)
    )
    .pipe(
      prefixer({
        overrideBrowserslist: ["last 8 versions"],
        browsers: [
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 11",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6",
        ],
      })
    )
    .pipe(
      cleanCss(
        isProd
          ? {
              level: 2,
            }
          : {
              level: 0,
            }
      )
    )
    .pipe(concat(isProd ? "style.min.css" : "style.css"))
    .pipe(dest(isProd ? paths.docsCssFolder : paths.buildCssFolder));
};

//HTML task
const html = () => {
  if (!isProd) {
    return src([
      `${paths.srcHtmlFolder}/**/*.html`,
      `!${paths.srcHtmlFolder}/blocks/*.html`,
    ])
      .pipe(newer(`${buildFolder}/*.html`))
      .pipe(plumber(plumberNotify("HTML")))
      .pipe(fileInclude(fileIncludeSetting))
      .pipe(dest(`${buildFolder}/`));
  } else {
    return src([
      `${paths.srcHtmlFolder}/**/*.html`,
      `!${paths.srcHtmlFolder}/blocks/*.html`,
    ])
      .pipe(newer(`${docsFolder}/`))
      .pipe(plumber(plumberNotify("HTML")))
      .pipe(fileInclude(fileIncludeSetting))
      .pipe(dest(`${docsFolder}/`));
  }
};

//Pug Task
const pugToHtml = () => {
  return src([
    `${paths.srcPugFolder}/**/*.pug`,
    `!${paths.srcPugFolder}/blocks/*.pug`,
  ])
    .pipe(newer(`${buildFolder}/`))
    .pipe(plumber(plumberNotify("PUG")))
    .pipe(
      pug({
        pretty: isProd ? false : true,
      })
    )
    .pipe(dest(`${buildFolder}/`));
};

//Images Task
const images = () => {
  if (!isProd) {
    return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
      .pipe(newer(`${paths.buildImagesFolder}`))
      .pipe(dest(`${paths.buildImagesFolder}`));
  } else {
    return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
      .pipe(newer(`${paths.docsImagesFolder}`))
      .pipe(
        imagemin(
          {
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
          },
          [
            recompress({
              loops: 6,
              min: 50,
              max: 90,
              quality: "high",
              use: [
                pngquant({
                  quality: [0.8, 1],
                  strip: true,
                  speed: 1,
                }),
              ],
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo(),
          ]
        )
      )
      .pipe(dest(`${paths.docsImagesFolder}`));
  }
};

//Webp

//JS

const js = () => {
  if (!isProd) {
    return src(`${paths.srcScripts}/*.js`)
      .pipe(newer(`${paths.buildScriptsFolder}`))
      .pipe(plumber(plumberNotify("JS")))
      .pipe(webpackStream(require("./webpack.config.js"), webpack))
      .pipe(dest(`${paths.buildScriptsFolder}`));
  } else {
    return src(`${paths.srcScripts}/*.js`)
      .pipe(newer(`${paths.docsScriptsFolder}`))
      .pipe(plumber(plumberNotify("JS")))
      .pipe(babel())
      .pipe(webpackStream(require("./webpack.config.js"), webpack))
      .pipe(dest(`${paths.docsScriptsFolder}`));
  }
};

//Fonts

const fonts = () => {};

//Files

const files = () => {
  if (!isProd) {
    return src(`${paths.srcFilesFolder}/**/*`)
      .pipe(newer(`${paths.buildFilesFolder}/`))
      .pipe(dest(`${paths.buildFilesFolder}/`));
  } else {
    return src(`${paths.srcFilesFolder}/**/*`)
      .pipe(newer(`${paths.docsFilesFolder}/`))
      .pipe(dest(`${paths.docsFilesFolder}/`));
  }
};
//PHP

const php = () => {
  if (isProd) {
    return src("./src/php/*.php")
      .pipe(newer("./docs/php/*.php"))
      .pipe(dest("./docs/php/"));
  }
};

//Deploy

//Watch files
const watchGulp = () => {
  watch(paths.srcStyles, styles);
  isPug
    ? watch(paths.srcPugFolder, pugToHtml)
    : watch(paths.srcHtmlFolder, html);
  watch(paths.srcImgFolder, images);
  watch(paths.srcScripts, js);
  watch(paths.srcFilesFolder, files);
};

//gulp
exports.default = series(
  cleanFolder,
  parallel(styles, html, images, js, files),
  parallel(serverGulp, watchGulp)
);

//gulp docs
exports.docs = series(
  toProd,
  cleanFolder,
  parallel(styles, html, images, js, files, php)
);

//gulp pug

exports.pugBuild = series(
  cleanFolder,
  toPug,
  parallel(styles, pugToHtml, images, js, files),
  parallel(serverGulp, watchGulp)
);

//gulp docs
exports.pugDocs = series(
  toPug,
  toProd,
  cleanFolder,
  parallel(styles, pugToHtml, images, js, files)
);
