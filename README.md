# elixir-angular-template-cache-2

This plugin is for Laravel Elixir v6 and up.
It is an updated version of the Elixir v3-v5 plugin found here https://github.com/larkinwhitaker/laravel-elixir-angular-template-cache

## Installation
----

```sh
$ npm install elixir-angular-template-cache-2 --save-dev
```

## Usage
----

Require the extension and call it using mix.angulartemplatecache(). 

```javascript
var elixir = require('laravel-elixir');
require('elixir-angular-template-cache-2');

elixir(function(mix)
{
	mix.angulartemplatecache(
   		{module: 'app', root: 'templates'}, 	//	template cache options
   		'public/app/views/cached/**', 			//	source 
   		'public/app/js', 						//	destination
   		'./', 						            //	base Directory (optional)
   		false								    //	wrap (optional)
	);	
});
```

Run gulp.

```sh
$ gulp
```