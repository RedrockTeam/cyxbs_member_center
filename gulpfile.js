
var gulp = require("gulp"),
    path = require("path"),
    px2rem = require("gulp-px2rem"),

    // browserSync
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,

    // require less的编译，及使用autoprefix的自动补全前戳
    less = require("gulp-less"),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

    // 监听文件改动
    gulp.task("default", function() {
        browserSync.init({
            server: {
                baseDir: "public"
            }
        });
        gulp.watch("less/*.less", ["styles"]);
        gulp.watch("public/*.html").on("change", reload);
        gulp.watch("public/css/*.css").on("change", reload);
        gulp.watch("public/images/*.jpg").on("change", reload);
        gulp.watch("public/images/*.png").on("change", reload);
    });

    // gulp.task("browser-sync", function() {

    // });

    gulp.task("styles", function() {
        return gulp.src("./less/*.less")
            .pipe(less({
                plugins: [autoprefix]
            }))
            .pipe(px2rem({replace: true, rootValue: 64}))
            .pipe(gulp.dest("./public/css"));
    });