var gulp = require('gulp');
var rename=require('gulp-rename');
var minifycss = require('gulp-clean-css');
var scss = require('gulp-sass');
var cssmin=require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var re=require('gulp-requirejs');
var op=require('gulp-requirejs-optimize');
var concat=require('gulp-concat');
var uglify=require('gulp-uglify');
// 静态服务器 + 监听 scss/html 文件
gulp.task('server', ['sass','mincss'], function() {
    browserSync.init({
        server: {baseDir:'./'},
        startPath:'/login.html'
    });

    gulp.watch("sass/*.scss",['sass']);
    gulp.watch("sass/main.css",['mincss']);
    gulp.watch("sass/*.scss").on('change',reload);
    gulp.watch("scripts/*.js").on('change',reload);
    gulp.watch("*.html").on('change',reload);
});

gulp.task('sass',function(){
    return gulp.src('sass/main.scss')
        .pipe(sourcemaps.init())
    	.pipe(scss())
        .on('error',function(err){
            console.log(err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('sass'))
        .pipe(reload({stream:true}));
});

gulp.task('mincss',function(){
    gulp.src('sass/main.css')
        .pipe(cssmin({
            advanced:false,
            compatibility:'ie7',
            keepBreaks:true,
            keepSpecialComments:'*'
        }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('css'));
});

gulp.task('build',['sass'],function(){
    re({
        baseUrl:'./',
        name:'lib/almond',
        include:['scripts/main'],
        out:'build.js',
        paths:{
            "jquery":"lib/jquery-1.7.2",
            "fastclick":"lib/fastclick",
            "mobIscroll":"plugin/mobiscroll",
            "mobIscrollDate":"plugin/mobiscroll_date",
            "dialog":"plugin/dialog",
            "swiper":"plugin/swiper.min",
            "iScroll":"lib/iscroll-probe",
            "public":"scripts/public",
            "dropload":"plugin/dropload",
            "echarts":"plugin/echarts"
        }
    })
        .pipe(uglify())
        .pipe(gulp.dest('build'))
})