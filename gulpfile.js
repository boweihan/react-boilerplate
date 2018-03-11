let gulp = require('gulp');
let replace = require('gulp-replace');
let runSequence = require('run-sequence');
let argv = require('yargs').argv;
let webserver = require('gulp-webserver');

let config = {
  release: './build',
  localUrl: 'https://localhost:8443/',
  localVersion: '1.0.0.0', //Three Versions, Local 1.0.0.0, Canary 1.0.0.1, Production 1.0.0.2 ---> hoping this translates in to being able to switch between versions.
};

/*
 * Make a local version of the project
 */
gulp.task('make-local', function() {
  // Run in sequence to prevent replace-url-dev from failing
  runSequence('build', 'copy-manifest', 'replace-url-local');
});

/*
 * Make a dev version of the project
 */
gulp.task('make-dev', function() {
  // Run in sequence to prevent replace-url-dev from failing
  runSequence('build', 'copy-manifest', 'replace-url-dev');
});

/**
 * Make a release version of the project
 */
gulp.task('make-release', function() {
  // Cannot just run dist or the sequence will break.
  runSequence('build', 'copy-manifest', 'replace-url-release');
});

/**
 * Build the project
 */
gulp.task('build', function() {
  let execSync = require('child_process').execSync;
  execSync(
    `REACT_APP_BUILD_TYPE=${argv.env} REACT_APP_RELEASE_ID=${
      argv.releaseId
    } npm run build`,
  );
});

gulp.task('copy-manifest', function() {
  return gulp
    .src(['./react-manifest.xml'], { base: './' })
    .pipe(gulp.dest(config.release));
});

/**
 * Replace local URL in manifest file if supplied via gulp dist  --url
 */
gulp.task('replace-url-release', function() {
  gulp
    .src([config.release + '/react-manifest.xml'], {
      base: config.release + '/',
    })
    .pipe(
      replace(
        config.localUrl,
        'https://addin.reactboilerplate.io/js-addin2/release/',
      ),
    )
    .pipe(replace(config.localVersion, '1.0.0.2'))
    .pipe(gulp.dest(config.release));
});

gulp.task('replace-url-dev', function() {
  gulp
    .src([config.release + '/react-manifest.xml'], {
      base: config.release + '/',
    })
    .pipe(
      replace(
        config.localUrl,
        'https://addin.reactboilerplate.io/js-addin2/dev/',
      ),
    )
    .pipe(replace(config.localVersion, '1.0.0.1'))
    .pipe(gulp.dest(config.release));
});

gulp.task('replace-url-local', function() {
  if (argv.url) {
    gulp
      .src([config.release + '/react-manifest.xml'], {
        base: config.release + '/',
      })
      .pipe(replace(config.localUrl, argv.url))
      .pipe(replace(config.localVersion, '1.0.0.0'))
      .pipe(gulp.dest(config.release));
  }
});

gulp.task('serve-dist', function() {
  gulp.src('./build').pipe(
    webserver({
      https: true,
      port: '8443',
      host: 'localhost',
      directoryListing: true,
      fallback: 'index.html',
      middleware: function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
        next();
      },
    }),
  );
});
