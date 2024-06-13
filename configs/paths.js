const srcFolder = "./src";
const buildFolder = "./build";
const docsFolder = "./docs";

const paths = {
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/images/`,
  srcHtmlFolder: `${srcFolder}/html`,
  srcPugFolder: `${srcFolder}/pug`,
  srcStyles: [`${srcFolder}/styles/**/*.scss`, `${srcFolder}/styles/**/*.sass`],
  srcScripts: `${srcFolder}/js`,
  srcFilesFolder: `${srcFolder}/files`,
  buildCssFolder: `${buildFolder}/css`,
  buildScriptsFolder: `${buildFolder}/js`,
  buildFilesFolder: `${buildFolder}/files`,
  docsCssFolder: `${docsFolder}/css`,
  buildImagesFolder: `${buildFolder}/images/`,
  docsImagesFolder: `${docsFolder}/images/`,
  docsScriptsFolder: `${docsFolder}/js/`,
  docsFilesFolder: `${docsFolder}/files/`,
};

module.exports = {
  srcFolder,
  buildFolder,
  docsFolder,
  paths,
};
