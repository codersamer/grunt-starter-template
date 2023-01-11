var path = require('path');

module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            html : ["src/**/dist"]
        },
        includereplace : {
            html: {
                files : [
                    {  src: ["src/**/*.html", "!src/partials/*.html"], dest : "build", expand: true, cwd: "./", flatten: true }
                ]
            }
        },
        sass: {                              // Task
            build: {                            // Target
              options: {                       // Target options
                style: 'expanded'
              },
              files: [{
                expand: true,
                flatten: true,
                cwd: './',
                src: ['src/scss/**/*.scss'],
                dest: 'build/css',
                ext: '.css'
              }]
            }
        },
        copy : {
            images: {
                files : [
                    { src: ["src/imgs/**/**/*"], dest: "build/imgs", cwd : "./", expand: true, flatten: true}
                ]
            }
        },
        watch: {
            html: {
                files: ['src/**/*.html'],
                tasks: ['includereplace:html', 'clean:html'],
                options: { spawn: false }
            },
            images: {
                files: ['src/imgs/**/**/*'],
                tasks: ['copy:images'],
                options: { spawn: false }
            },
            scss : {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:build']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-include-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
};