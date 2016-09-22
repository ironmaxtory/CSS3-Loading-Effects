const fs = require('fs'), //文件系统
  path = require('path'), //路径插件
  gulp = require('gulp'), //本地安装gulp所用到的地方
  ejs = require('gulp-ejs'), //ejs模板转换
  less = require('gulp-less'), //处理less文件工具
  uglify = require('gulp-uglify'), //压缩js文件工具
  md5 = require('gulp-md5-plus'), //md5
  stripDebug = require('gulp-strip-debug'), //清除源文件中的console、debugger
  concat = require('gulp-concat'), //合并文件工具
  autoprefixer = require('gulp-autoprefixer'), //css前缀工具
  cssmin = require('gulp-clean-css'), //压缩css文件工具
  base64 = require('gulp-base64'),  //base64工具
  htmlmin = require('gulp-htmlmin'), //压缩Html文件工具
  order = require('gulp-order'), //安排文件顺序工具
  clean = require('gulp-clean'), //清除文件工具
  rename = require('gulp-rename'), //重命名工具
  runSq = require('gulp-run-sequence'), //顺序执行
  cheerio = require('gulp-cheerio'), //可通过js操作指定文件
  sourceMaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync');

const ROOT_PATH = path.resolve(__dirname),
    SRC_PATH = path.resolve(ROOT_PATH, 'src'),
    BUILD_PATH = path.resolve(ROOT_PATH, 'build'),
    DIST_PATH = path.resolve(ROOT_PATH, 'dist');

var autoprefixerObj = {
  browsers: ['last 5 versions'],
  cascade: true, //是否美化属性值 默认：true 像这样：
  //-webkit-transform: rotate(45deg);
  //        transform: rotate(45deg);
  remove:true //是否去掉不必要的前缀 默认：true
};

/*------------------Development--------------------*/
/***************************************************
 * gulp task: default
***************************************************/
gulp.task('default', function(){
  runSq('watch-all', 'browser-sync');
});
/***************************************************
 * less
***************************************************/
gulp.task('less-all', function(){
  return gulp.src([path.resolve(SRC_PATH, '**/*.less')])
    .pipe(less())
    .pipe(autoprefixer({autoprefixerObj}))
    .pipe(gulp.dest(SRC_PATH));
});
/***************************************************
 * ejs
***************************************************/
gulp.task('ejs-all', function(){
  return gulp.src([path.resolve(SRC_PATH, '**/*.ejs')])
    .pipe(ejs({}, {ext:'.html'}))
    .pipe(gulp.dest(SRC_PATH));
});
/***************************************************
 * watch
***************************************************/
gulp.task('watch-all', ['ejs-all', 'less-all'], function(){
  gulp.watch(path.resolve(SRC_PATH, '**/*.ejs'), ['ejs-all']);
  gulp.watch(path.resolve(SRC_PATH, '**/ejs/*.html'), ['ejs-all']);
  gulp.watch(path.resolve(SRC_PATH, '**/*.less'), ['less-all']);
});
/***************************************************
 * browser-sync
***************************************************/
gulp.task('browser-sync', function() {
  var files = [
    path.resolve(SRC_PATH, '**/*.html'),
    path.resolve(SRC_PATH, '**/*.css'),
    path.resolve(SRC_PATH, '**/*.js'),
  ];
  browserSync.init(files, {
    server: {
      baseDir: './',
      directory: true,
    }
  });
});
