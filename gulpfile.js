/**
 * Created by GRE511 on 2019-04-16.
 */
'use strict';
const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const html = require('gulp-html-tag-include');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const ghPages = require('gulp-gh-pages');
const babel = require("gulp-babel");

const paths = {
	port: '3000',
	input: './src/**/*',
	output: './dist/',
	html: {
		input: './src/html/**',
		output: './dist/html/'
	},
	style: {
		input: './src/scss/*.scss',
		output: './dist/css'
	},
	img: {
		input: './src/img/**/*',
		output: './dist/img'
	},
	js: {
		input: './src/js/*.js',
		output: './dist/js/'
	}
};

function browserSync(done) {
	console.log("start sync...");
	browsersync.init({
		port: paths.port,
		server: {
			baseDir: paths.output
		},
		startPath: './html/index.html' //index.html 일반 프로젝트에서는 index.html 로 변경
	});
	done();
}

function htmlComp() {
	return gulp.src(paths.html.input)
		.pipe(html())
		.pipe(gulp.dest(paths.html.output))
		.pipe(browsersync.reload({ stream: true }));
}

function sassComp(done) {
	gulp.src(paths.style.input, { sourcemaps: true })
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sass({ outputStyle: 'compressed' })) //nested, expanded, compact, compressed
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.style.output))
		.pipe(browsersync.reload({ stream: true }));
	// 압축버전 - 이버전은 소스맵이 안맞아서 배포용으로 따로 뺌
	// gulp.src(paths.style.input, { sourcemaps: false })
	// 	.pipe(sass.sync().on('error', sass.logError))
	// 	.pipe(autoprefixer())
	// 	.pipe(sass({ outputStyle: 'compressed' })) //nested, expanded, compact, compressed
	// 	.pipe(gulp.dest(paths.style.output + '/min'));
	done();
}

function js() {
	return gulp.src(paths.js.input)
		.pipe(gulp.dest(paths.js.output+'/es6.origin'))
}

function babelJs() {
	return gulp.src(paths.js.input)
	.pipe(babel())
	// .pipe(uglify())
	.pipe(gulp.dest(paths.js.output))
	.pipe(browsersync.reload({ stream: true }));
}

function img() {
	return gulp.src(paths.img.input)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 85 }), // 85 포토샵 퀄리티 60%정도와 비슷함
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeTitle: false }, // <title> 제거안함 (접근성, 반응형 웹 디자인시 필요함)
					{ removeDesc: false }, // <desc> 제거안함 (접근성, 반응형 웹 디자인시 필요함)
					{ removeViewBox: false }, // viewBox가 삭제되지 않아야 css로 width를 조정할 수 있다. (접근성, 반응형 웹 디자인시 필요함)
					{ removeDimensions: true } // viewBox 속성이 있을 경우, width/height 속성 제거
				]
			})
		]))
		.pipe(gulp.dest(paths.img.output))
		.pipe(browsersync.reload({ stream: true }));
}

function watchFiles() {
	gulp.watch(paths.html.input, htmlComp);
	gulp.watch(paths.img.input, img);
	gulp.watch(paths.style.input, sassComp);
	gulp.watch(paths.js.input, babelJs);
}

// gulp.task('default', );
gulp.task('build', function() {
	return gulp.src('./dist/**/*')
	.pipe(ghPages());
});

// export tasks
// exports.default = gulp.series(gulp.parallel(htmlComp, sassComp, img, js, babelJs), browserSync, watchFiles);
exports.default = gulp.series(gulp.parallel(htmlComp, sassComp, img, babelJs, js), browserSync, watchFiles);
