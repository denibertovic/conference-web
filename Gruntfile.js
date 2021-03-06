/* jshint node:true */

module.exports = function ( grunt ) {

    grunt.initConfig({

        sass: {
            dist: {
                options: {
                    bundleExec: true,
                    sourcemap: 'none',
                    style: 'expanded',
                    precision: 5,
                    loadPath: [
                        'node_modules/bourbon/app/assets/stylesheets'
                    ]
                },
                files: {
                    'ui/static/stylesheets/site.css': 'ui/static/stylesheets/source/index.scss'
                }
            }
        },

        cssmin: {
            dist: {
                options: {
                    keepSpecialComments: 0,
                    restructuring: false
                },
                files: {
                    'ui/static/stylesheets/site.css': [
                        'node_modules/normalize.css/normalize.css',
                        'node_modules/rationalize.css/dist/rationalize.css',
                        'ui/static/stylesheets/site.css'
                    ]
                }
            }
        },

        postcss: {
            dist: {
                options: {
                    map: false,
                    processors: [
                        require('postcss-flexbugs-fixes'),
                        require('autoprefixer-core')({ browsers: ['last 2 version'] }),
                        require('pixrem')(),
                        require('postcss-assets')({
                            basePath: 'ui'
                        }),
                        require('postcss-clearfix')
                    ]
                },
                src: 'ui/static/stylesheets/site.css',
                dest: 'ui/static/stylesheets/site.css'
            }
        },

        browserify: {
            dist: {
                options: {
                    plugin: ['bundle-collapser/plugin'],
                    ignore: ['css']
                },
                files: {
                    'ui/static/javascripts/site.js': 'ui/static/javascripts/source/index.js'
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'ui/static/javascripts/site.js': [
                        'ui/static/javascripts/source/modernizr.js',
                        'ui/static/javascripts/site.js'
                    ]
                }
            }
        },

        modernizr: {
            dist: {
                devFile: false,
                uglify: false,
                excludeTests: ['svg'],
                files: ['ui/static/**/*.scss'],
                options: [
                    'setClasses',
                    'addTest',
                    'testProp'
                ],
                dest: 'ui/static/javascripts/source/modernizr.js'
            }
        },

        ttf2woff: {
            dist: {
                src: ['ui/static/fonts/*.ttf'],
                dest: 'ui/static/fonts/'
            }
        },

        imagemin: {
            main: {
                options: {
                    svgoPlugins: [
                        {removeTitle: true},
                        {removeDesc: true},
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'ui/static/images/',
                    src: [
                        '**/*.{png,jpg,gif,svg}',
                    ],
                    dest: 'ui/static/images/'
                }]
            }
        },

        watch: {
            css: {
                files: ['ui/static/stylesheets/source/**/*.scss'],
                tasks: ['css'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['ui/static/javascripts/**/*.js'],
                tasks: ['js'],
                options: {
                    spawn: false
                }
            }
        },

        concurrent: {
            main: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['watch:css','watch:js']
            }
        },

        svgstore: {
            sprite: {
                options: {
                    prefix: 'Sprite-',
                    includeTitleElement: false,
                    preserveDescElement: false
                },
                files: {
                    'ui/static/images/sprite.svg': [
                        'ui/static/images/icons/social/**/*.svg',
                        'ui/static/images/icons/user.svg'
                    ]
                }
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('font', ['ttf2woff']);
    grunt.registerTask('css', ['sass','postcss','cssmin']);
    grunt.registerTask('js', ['browserify','uglify']);
    grunt.registerTask('static', function () {
        var tasks = ['css','js'];
        if ( grunt.option('watch') ) {
            tasks.push('concurrent');
        }
        grunt.task.run(tasks);
    });

};
