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

let homePageCss = {
    cssSrcFile : "app/front-end-tmp/css/home-page-unbundled.css",
    bundledCssFileName : 'home-page-bundled.css',
    bundledCssFileDest : 'app/public/css/'
}

let homePageJs = {
    jsSrcFile : "app/front-end-tmp/js/home-page-unbundled.js",
    bundledJsFileName : 'home-page-bundled.js',
    bundledJsFileDest : 'app/public/js/'
}

let reloadHtmlI = 0, 
    bundleCssI = 0,
    bundleJsI = 0;

bundleCss(homePageCss);
bundleJs(homePageJs);

gulp.task('default', () => {
    browserSync.init({ 
        notify:false,
        server: {
            baseDir: "/home/sandor/Documents/ongoing-projects/austria-recuritment/app"
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
        
        bundleCss(homePageCss); 
    });

    gulp.watch('./app/front-end-tmp/js/**/**/*.js', function() {
        browserSync.reload();

        bundleJsI++;
        console.log('bundle-js cycles: ' + bundleCssI);
        
        bundleJs(homePageJs); 
    });
});


function bundleCss(fileForPageObj){
    let {cssSrcFile, bundledCssFileName, bundledCssFileDest} = fileForPageObj;
    
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

function bundleJs(fileForPageObj) {
    let {jsSrcFile, bundledJsFileName, bundledJsFileDest} = fileForPageObj;

    return browserify(jsSrcFile)
        .bundle()
        .on('error', function(errorInfo){
   		console.log( errorInfo.toString() )
   		this.emit('end');
   		})
        .pipe(source(bundledJsFileName))
        .pipe(gulp.dest(bundledJsFileDest));
}