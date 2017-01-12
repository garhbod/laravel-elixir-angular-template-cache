'use strict';

let gulpInsert;
let templateCache;

class AngularTemplateCacheTask extends Elixir.Task {

    /**
     * Create a new JavaScriptTask instance.
     */
    constructor(options, paths, wrap) {
        super('angular-templatecache', null, paths);
        this.options 	= options || {};
        this.wrap    	= wrap || false;
    }

    /**
     * Lazy load the task dependencies.
     */
    loadDependencies() {
        gulpInsert    = require('gulp-insert');
        templateCache = require('gulp-angular-templatecache');
    }


    /**
     * Build up the Gulp task.
     */
    gulpTask() {
        this.record("Compiling HTML into Angular module's Template Cache");

        var ouput = gulp.src(this.src.path)
            .pipe(this.initSourceMaps())
            .pipe(templateCache(this.options));

        if (this.wrap) {
            ouput.pipe(gulpInsert.wrap('(function(angular) {', '})(angular);'))
        }

        ouput.pipe(this.writeSourceMaps())
            .pipe(gulp.dest(this.output.path))
            .pipe(this.onSuccess());

        return ouput;
    }

    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src.path)
            .ignore(this.output.path);
    }

    record(message) {
        this.recordStep(message);
        return;
    }
}

Elixir.extend('angulartemplatecache', function(options, src, outputDir, baseDir, wrap) {
    new AngularTemplateCacheTask(options, getPaths(src, baseDir, outputDir), wrap);
});

/**
 * Prep the Gulp src and output paths.
 */
function getPaths(src, baseDir, output) {
    return new Elixir.GulpPaths().src(src, baseDir || Elixir.config.get('assets.js.folder')).output(output || Elixir.config.get('public.js.outputFolder'));
}