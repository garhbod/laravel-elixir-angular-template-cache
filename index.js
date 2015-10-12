var elixir 		  = require('laravel-elixir'),
	gulp 		  = require("gulp"),
	templateCache = require('gulp-angular-templatecache'),
	insert 		  = require('gulp-insert');

var Task = elixir.Task;

elixir.extend("angulartemplatecache", function(options, from, to, wrap, watch) 
{
	new Task('angulartemplatecache', function() 
	{
	    if (wrap)
	    {
	        return gulp.src(from)
	            .pipe(templateCache(options))
	            .pipe(insert.wrap('(function(angular) {', '})(angular);'))
	            .pipe(gulp.dest(to));
	    } 
	    else
	    {
	        return gulp.src(from)
	            .pipe(templateCache(options))
	            .pipe(gulp.dest(to));
	    }
    })
    .watch(watch);

});