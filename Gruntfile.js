module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        platform: 'android',

        clean: {
            build: ["bin", "lib", "build", "www/js"]
        },

        ts: {
            build: {
                src: ['src/ts/**/*.ts'],
                reference: 'src/ref/Reference.ts',
                out: 'build/<%= pkg.company %>/<%= pkg.name %>.js',
                options: {
                    target: 'es5',
                    module: 'amd',
                    declaration: false,
                    sourceMap: false,
                    removeComments: true
                }
            }
        },

        uglify: {
            options: {
                mangle: true,
                banner: '/* <%= pkg.name %> \n*/'
            },
            build: {
                src: 'build/<%= pkg.company %>/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.company %>/<%= pkg.name %>.min.js'
            }
        },

        copy: {

            build: {
                files: [
                    {expand: true, cwd: 'src/', src: ['js/**'], dest: 'www'},
                    {expand: true, flatten: true, src: ['build/<%= pkg.company %>/*.js'], dest: 'www/js/<%= pkg.company %>'}
                ]
            },

            release: {
                files: [
                    {expand: true, src: ['src/**'], dest: 'bin/js-interview'},
                    {expand: true, src: ['docs/**'], dest: 'bin/js-interview'},
                    {expand: true, src: ['www/**'], dest: 'bin/js-interview'},
                    {expand: true, src: ['Gruntfile.js'], dest: 'bin/js-interview'},
                    {expand: true, src: ['package.json'], dest: 'bin/js-interview'}
                ]
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: '*',
                    protocol: 'http',
                    base: 'www',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-text-replace');

    grunt.registerTask('default', ['ts', 'uglify', 'copy:build']);
    grunt.registerTask('package', ['default','copy:release']);
};