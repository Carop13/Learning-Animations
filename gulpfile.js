//IMPORT THE REQUIRED LIBS
var gulp = require('gulp');
var path = require('path');
var server = require('gulp-express');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var wiredep = require('wiredep').stream;
var open = require('gulp-open');

//DEFINE GLOBAL PATHS
var config = {
  app: 'app',
  dist: 'dist'
};
 
// gulp.task('reload', function () {
//   gulp.src('./app/**/*.*')
//     .pipe(connect.reload());
// });
 
gulp.task('clean:temp', function(option){
  return gulp.src('.tmp', {read: false})
  .pipe(clean());

});
gulp.task('clean:dist', function(option){
  return gulp.src(config.dist, {read: false})
  .pipe(clean());
});

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], server.notify);
  gulp.watch(['./app/**/*.js'], server.notify);
  gulp.watch(['./app/styles/*.css'], server.notify);
  gulp.watch(['./server/**/*.js'], server.notify);
});
 
//Inject the bower.json dependencies in index.html file
gulp.task('wiredep', function () {
  gulp.src( path.join(config.app, '/index.html'))
    .pipe(wiredep(
      //Wiredepp special configuration
    )).pipe(gulp.dest(config.app));
});

gulp.task('inject', function () {
  var target = gulp.src( path.join(config.app, '/index.html'));
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
    path.join('!' + config.app, '/lib/**/*'),
    path.join(config.app, '/**/*.js'), //this are equivalent'./app/**/*.js'
    path.join(config.app, '/styles/*.css')
  ], {read: false});
  return target.pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest(config.app));
});

gulp.task('server', function () {
    // Start the server at the beginning of the task
    server.run(['server/app.js', '--debug']);
 
});

gulp.task('open', function(){
  gulp.src(__filename)
  .pipe(open({uri: 'http://localhost:8080'}));
});

gulp.task('default', [
  'clean:temp',
  'wiredep',
  'inject',
  'server',
  'open',
  'watch'
]);

