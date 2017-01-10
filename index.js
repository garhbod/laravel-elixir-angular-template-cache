'use strict';

const gulpInsert    = require('gulp-insert');
const templateCache = require('gulp-angular-templatecache');
const insert 		= require('gulp-insert');

class AngularTemplatecacheTask extends Elixir.Task {

    constructor(options, src, outputDir, wrap) {
        super('angular-templatecache');
        this.options 	= options;
        this.src        = src;
        this.outputDir  = outputDir;
        this.wrap    	= wrap;
    }

    gulpTask() {
        this.record("Compiling HTML into Angular module's Template Cache");

        var ouput = gulp.src(this.src)
            .pipe(this.initSourceMaps())
            .pipe(templateCache(this.options));

        if (this.wrap) {
            ouput.pipe(insert.wrap('(function(angular) {', '})(angular);'))
        }

        ouput.pipe(this.writeSourceMaps())
            .pipe(gulp.dest(this.outputDir))
            .pipe(this.onSuccess());

        return ouput;
    }

    /**
     * Register file watchers.
     */
    registerWatchers() {
        this.watch(this.src)
            .ignore(this.outputDir);
    }

    record(message) {
        this.recordStep(message);
        return;
    }
}

Elixir.extend('angulartemplatecache', function(options, src, outputDir, wrap) {
    new AngularTemplatecacheTask(options, src, outputDir, wrap);
});