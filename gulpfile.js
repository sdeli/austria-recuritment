// npm i -S gulp-postcss autoprefixer postcss-simple-vars postcss-nested postcss-mixins postcss-import postcss-hexrgba gulp-rename browserify vinyl-source-stream gulp
const gulpPostcss = require("gulp-postcss"),
	  autoprefixer = require("autoprefixer"),
	  postcssSimpleVars = require("postcss-simple-vars"),
	  postcssNested = require("postcss-nested"), 
	  postcssMixins = require("postcss-mixins"),
	  postcssImport = require("postcss-import"),
	  hexRgba = require("postcss-hexrgba"),
	  rename = require("gulp-rename"),
	  browserify = require('browserify'),
	  source = require('vinyl-source-stream'),
	  gulp = require('gulp');
      browserSync = require('browser-sync');

let homePage = {
    cssSrcFile : "app/front-end-tmp/css/home-page-unbundled.css",
    bundledCssFileName : 'home-page-bundled.css',
    bundledCssFileDest : 'app/public/css/'
}

let bundleJavascriptI = 0, 
    bundleCssI = 0,
    reloadHtmlI = 0; 

bundleCss(homePage);

gulp.task('default', () => {
    browserSync.init({ 
        notify:false,
        server: {
            baseDir: "/home/sandor/Documents/on-going-projects/austria-recruitment/app/"
        }   
    });

    gulp.watch('./app/views/*.html', function() {
        browserSync.reload();

        reloadHtmlI++;
        console.log('reloaded html cycles: ' + reloadHtmlI);
    });


    gulp.watch('./app/front-end-tmp/css/**/**/*.css', function() {
        browserSync.reload();

        bundleCssI++;
        console.log('bundle-css cycles: ' + bundleCssI);
        
        bundleCss(homePage); 
    });
});


function bundleCss(fileForPageObj){
    let cssSrcFile = fileForPageObj.cssSrcFile
    let bundledCssFileName = fileForPageObj.bundledCssFileName
    let bundledCssFileDest = fileForPageObj.bundledCssFileDest

    return gulp.src(cssSrcFile)
    .pipe(gulpPostcss([
        postcssImport,
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        postcssMixins, 
        postcssSimpleVars,
        hexRgba,
        postcssNested
    ]))
    .on('error', function(errorInfo){
        console.log( errorInfo.toString())
        this.emit('end');
    })
    .pipe(rename(bundledCssFileName))
    .pipe(gulp.dest(bundledCssFileDest))
}

// gulp.task('bundle-sign-in-page-javascript', function() {
//     console.log('bundle-sign-in-page-javascript');
//     return browserify(signInPagejsSrcFile)
//         .bundle()
//         .on('error', function(errorInfo){
//    		console.log( errorInfo.toString() )
//    		this.emit('end');
//    		})
//         .pipe(source(signInPagebundledJsSrcFileName))
//         .pipe(gulp.dest(signInPagebundledJsSrcFileDest));
// });