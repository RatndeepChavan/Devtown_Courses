"use strict";
import { src, dest, watch, series, parallel } from "gulp";
import * as sass from "sass";
import gulpSass from "gulp-sass";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "gulp-autoprefixer";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import babel from "gulp-babel";
import uglify from "gulp-uglify";

const sassCompiler = gulpSass(sass);

const paths = {
	styles: {
		buildStyles: {
			src: "./src/scss/**/*.scss",
			dist: "./src/css/compiled/",
		},
		vendorCss: {
			src: "./src/css/compiled/*.css",
			dist: "./src/css/vendor/",
		},
		minifyCss: {
			src: "./src/css/vendor/*.css",
			dist: "./dist/css/",
		},
	},
	scripts: {
		legacyJs: {
			src: "./src/js/*.js",
			dist: "./src/js/legacy/",
		},
		minifyJs: {
			src: "./src/js/legacy/*.js",
			dist: "./dist/js/",
		},
	},
};

// Function to compile SCSS to CSS with source maps
//? (documentation) synchronous rendering is twice as fast as asynchronous rendering
const buildStyles = () => {
	return src(paths.styles.buildStyles.src)
		.pipe(sourcemaps.init())
		.pipe(sassCompiler.sync({ outputStyle: "expanded" }).on("error", sassCompiler.logError))
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.styles.buildStyles.dist));
};

// Function to add vendor prefixes to CSS for cross-browser compatibility
const vendorCss = () => {
	return src(paths.styles.vendorCss.src)
		.pipe(sourcemaps.init())
		.pipe(
			autoprefixer({
				cascade: false,
			}),
		)
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.styles.vendorCss.dist));
};

// function to minify the vendor css file for production
const minifyCss = () => {
	return src(paths.styles.minifyCss.src)
		.pipe(sourcemaps.init())
		.pipe(cleanCss())
		.pipe(
			rename({
				suffix: ".min",
			}),
		)
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.styles.minifyCss.dist));
};

// Function to convert modern JavaScript to be compatible with legacy browsers
const legacyJs = () => {
	return src(paths.scripts.legacyJs.src)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/env"],
			}),
		)
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.scripts.legacyJs.dist));
};

// function to minify the legacy compatible js file for production
const minifyJs = () => {
	return src(paths.scripts.minifyJs.src)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(dest(paths.scripts.minifyJs.dist));
};

// ? exporting styles and scripts to manually run specific task if require
export const styles = series(buildStyles, vendorCss, minifyCss);
export const scripts = series(legacyJs, minifyJs);

// ? exporting build to manually run styles and scripts tasks in parallel
export const build = parallel(styles, scripts);

// *Function to run styles in background and/or scripts tasks whenever any changes occurs in respective files.
export const watchFiles = () => {
	watch(paths.styles.buildStyles.src, styles);
	watch(paths.scripts.legacyJs.src, scripts);
};
