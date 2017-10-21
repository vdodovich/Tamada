let gulp                =  require ("gulp");
let gulpLess            =  require ("gulp-less");
let gulpAutoprefixer    =  require ("gulp-autoprefixer");
let browserSync         =  require ("browser-sync");
let gulpConcat          =  require ("gulp-concat");        // Обєднання файлів
let del                 =  require ("del");
let gulpImagemin        =  require ("gulp-imagemin");
let gulpCsso            =  require ("gulp-csso");          // Мініфікатор css
let gulpUglifyjs        =  require ("gulp-uglifyes");      // Мініфікатор js




gulp.task('less', function () {
    return gulp.src('src/less/main.less')
        .pipe(gulpAutoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade:true}))
        .pipe(gulpConcat("style.css"))
        .pipe(gulpLess())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream:true}));
});
gulp.task('cssVendors', function () {
    return gulp.src('src/vendors/_vendors.less')
    .pipe(gulpLess())
    .pipe(gulp.dest('src/css'))
});
gulp.task('jsVendors', function () {
    return gulp.src([
        'src/vendors/jquery/dist/jquery.js',
        'src/vendors/jquery.scrollTo/jquery.scrollTo.js'
    ])
    .pipe(gulpConcat("vendors.js"))
    .pipe(gulp.dest('src/script'))
});
gulp.task('browserSync', function () {
    browserSync({
        server:{
            baseDir:'src'
        },
        notify: false,
        open: false
    });
});
gulp.task('watch',['browserSync', 'less', 'cssVendors', 'jsVendors'], function () {
    gulp.watch('src/less/**/*.less', ['less']);
    gulp.watch('src/**/*.html', browserSync.reload);
    gulp.watch('src/script/**/*.js',[browserSync.reload]);
});

gulp.task('cleanDist', function () {
    return del.sync('dist');
});
gulp.task('img', function () {
    return gulp.src('src/images/**/*')
        .pipe(gulpImagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox:false}],
            optimizationLevel:5
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('build',['cleanDist', 'img', 'less', 'cssVendors', 'jsVendors'], function () {
    // css
    let buildCss = gulp.src([
        'src/css/style.css',
        'src/css/_vendors.css',
    ])
        .pipe(gulpCsso())
        .pipe(gulp.dest('dist/css'));

    // fonts
    let buildFonts = gulp.src('src/fonts/**/*')

        .pipe(gulp.dest('dist/fonts'));

    // js
    let buildJS = gulp.src('src/script/*.js')
        .pipe(gulpUglifyjs({
            mangle: false,
            ecma: 6
        }))
        .pipe(gulp.dest('dist/script'));


    // html
    let buildHTML=gulp.src('src/*html')
        .pipe(gulp.dest('dist'));


});



