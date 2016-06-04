module.exports = function(grunt) {
    var fs = require('fs');
    var crypto = require('crypto');

    function getMd5(p) {
        var str = fs.readFileSync(p);
        var md5um = crypto.createHash('md5');
        md5um.update(str);
        return md5um.digest('hex').substr(0, 8);
    }
    var WORKSPACE = '/workspace/kancity/';
    if (__dirname.indexOf('/data/vhosts/kankancity.com') > -1) {
        WORKSPACE = '/data/vhosts/kankancity.com/';
    }
    var urlMatchs = {
        'http://misc.kankancity.com/': WORKSPACE + '/misc/public_html/'
    };
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        root: WORKSPACE,
        templates_src_dir:'<%= root %>www/templates_s/',
        ssi_dest_dir:'<%= root %>www/ssi_include/news_page/',
        ssi_src_files:[
            '<%= templates_src_dir %>content_nation_header_ssi.html',
            '<%= templates_src_dir %>content_local_header_ssi.html','<%= templates_src_dir %>content_footer_ssi.html',
            '<%= templates_src_dir %>channel_header_ssi.html','<%= templates_src_dir %>channel_footer_ssi.html',
            '<%= templates_src_dir %>content_header_ssi_wap.html','<%= templates_src_dir %>content_footer_ssi_wap.html',
            '<%= templates_src_dir %>channel_header_ssi_wap.html','<%= templates_src_dir %>channel_footer_ssi_wap.html'
        ],
        ssi_dest_files:[
            '<%= ssi_dest_dir %>content_nation_header_ssi.html',
            '<%= ssi_dest_dir %>content_local_header_ssi.html','<%= ssi_dest_dir %>content_footer_ssi.html',
            '<%= ssi_dest_dir %>channel_header_ssi.html','<%= ssi_dest_dir %>channel_footer_ssi.html',
            '<%= ssi_dest_dir %>content_header_ssi_wap.html','<%= ssi_dest_dir %>content_footer_ssi_wap.html',
            '<%= ssi_dest_dir %>channel_header_ssi_wap.html','<%= ssi_dest_dir %>channel_footer_ssi_wap.html'
        ],
        video_ssi_dest_dir:'<%= root %>www/ssi_include/video_page/',
        video_ssi_src_files:[
            '<%= templates_src_dir %>video_header_ssi.html','<%= templates_src_dir %>video_footer_ssi.html'
        ],
        video_ssi_dest_files:[
            '<%= video_ssi_dest_dir %>video_header_ssi.html','<%= video_ssi_dest_dir %>video_footer_ssi.html'
        ],
        dev_dir: '<%= root %>misc/public_html/news_dev/',
        dist_dir: '<%= root %>misc/public_html/news/',

        //空配置，usminPrepare会插入配置
        concat:{
           
        },
        //将源模板拷贝到目标模块
        copy: {
            ssi:{
                expand: true,       //expand 不能设置在task-options 
                flatten: true,
                src:['<%= ssi_src_files %>'],
                dest:'<%= ssi_dest_dir %>'
            },
            video_ssi:{
                expand: true,       //expand 不能设置在task-options 
                flatten: true,
                src:['<%= video_ssi_src_files %>'],
                dest:'<%= video_ssi_dest_dir %>'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
            all: ['<%= dev_dir %>/*/{,*/}*.js']
        },
        uglify: {
            options: {
                preserveComments:"some",
                compress: {
                    sequences: true, // join consecutive statemets with the “comma operator”
                    properties: true, // optimize property access: a["foo"] → a.foo
                    dead_code: false, // discard unreachable code
                    drop_debugger: true, // discard “debugger” statements
                    unsafe: false, // some unsafe optimizations (see below)
                    conditionals: true, // optimize if-s and conditional expressions
                    comparisons: true, // optimize comparisons
                    evaluate: true, // evaluate constant expressions
                    booleans: true, // optimize boolean expressions
                    loops: true, // optimize loops
                    unused: false, // drop unused variables/functions
                    hoist_funs: true, // hoist function declarations
                    hoist_vars: false, // hoist variable declarations
                    if_return: true, // optimize if-s followed by return/continue
                    join_vars: true, // join var declarations
                    cascade: true, // try to cascade `right` into `left` in sequences
                    side_effects: false, // drop side-effect-free statements
                    warnings: true, // warn about potentially dangerous optimizations/code
                    global_defs: {} // global definitions
                }

            }
        },
        //usemin 的预配置任务，就是自动生成concat:generator uglify:generator cssmin:generator任务
        useminPrepare: {
            options:{
                dest: '<%= root %>',  //uglify, cssmin 生成 相对路径  
                root: '<%= root %>'   //concat,  生成 相对路径  
                //expand: true,        //expand 设置不了
                //cwd:'<%= root %>',    //cwd 设置不了
            },
            prepare:{
                src: ['<%= video_ssi_src_files %>','<%= ssi_src_files %>'],
                options: {
                    flow: {
                        steps: {
                            js: ['concat'],
                            css: ['concat']
                        },
                        post: {}
                    }
                }
            },
            build: {
                src: ['<%= video_ssi_dest_files %>','<%= ssi_dest_files %>'],
                options: {
                    flow: {
                        steps: {
                            js: ['concat'],
                            css: ['concat']
                        },
                        post: {}
                    }
                }
            },
            deploy: ['<%= video_ssi_dest_files %>','<%= ssi_dest_files %>']

        },
    //    filerev: {
    //       js: {
    //            src: ['<%= dist_dir %>/*/{,*/}*.js']
    //        },
    //        css: {
    //            src: ['<%= dist_dir %>/*/{,*/}*.css']
    //        }
    //    }, 
        usemin: {
            html: ['<%= video_ssi_dest_files %>','<%= ssi_dest_files %>'],  //html是key ，js也是key  ，不能使用其他
            options: {
                assetsDirs: ['<%= root %>']    //指定搜索打过版本的文件的相对路径
            }
        },
        //替换templates_dest 的文件路径为url
        replace: {
            templates: {
                options: {
                    patterns: [{
                        match: /(=['"])(\/misc\/public_html[^'"]+)/gi,
                        replacement: function(all,prefix,target) {
                            for (var url in urlMatchs) {
                                var filename = WORKSPACE + target;
                                if (filename.indexOf(urlMatchs[url]) > -1) {
                                    var newUrl = filename.replace(urlMatchs[url], url);
                                    //console.log(filename);
                                    newUrl = newUrl + "?rd=" + getMd5(filename);
                                    return prefix+newUrl;
                                }
                            }
                            return all;
                        }
                    }]
                    //expand: true, // 配置在这无效
                   // flatten: true  //配置在这无效
                },
                files: [
                    {expand: true, flatten: true,src:['<%= video_ssi_dest_files %>'],dest:'<%= video_ssi_dest_dir %>'},
                    {expand: true, flatten: true,src:['<%= ssi_dest_files %>'],dest:'<%= ssi_dest_dir %>'}
                ]
            }
        },
        //监控模板，news_dev , Gruntfile.js
        watch: {
            templates: {
                options:{
                    //expand: true,    //注释防止生效
                    //cwd:'<%= root %>',
                },
                files: ['<%= video_ssi_src_files %>','<%= ssi_src_files %>'],
                tasks: ['build']
            },
            staticFiles:{
                files: ['<%= dev_dir %>/*/*'],
                tasks: ['prepare']
            },
            configFiles: {
                files: ['Gruntfile.js'],
                options: {
                   // expand:false,     //覆盖不了父配置
                    reload: true

                }
            }
        },
        //将bower安装的组件复制到指定目录，复制的文件由组件.bower.json{main}指定
        bower:{
            install:{
                options:{
                    targetDir:'public_html/bow',
                    cleanTargetDir:true,
                    layout:'byType'
                }
            }
        }
    });
    
    //清空.tmp/concat下的文件
    grunt.registerTask('clear', function() {
        grunt.file.delete('.tmp/concat', {force: true});
    });

    //复制.tmp/concat下的文件，由usemin/concat所得
    grunt.registerTask('cpconcat', function() {
        grunt.file.recurse('.tmp/concat', function(abspath, rootdir, subdir, filename) {
            var filepath = rootdir + '/' + subdir + '/' + filename;
            var destpath = WORKSPACE  +'/'+ subdir + '/' + filename;
            if(this.process.argv){     //避免复制dev_dir的文件否则 会 触发 watch.staticFiles ，死循环
                grunt.file.copy(filepath, destpath);
            }
        });
    });
    //prepare执行usemin的concat，将news_dev/下的concat 合并到news,不对模板修改,
    grunt.registerTask('prepare',['useminPrepare:prepare', 'concat', 'cpconcat']);

    //build执行usemin的concat，将news_dev/下得concat 合并到news, 并将文件路径替换为url
    grunt.registerTask('build', ['copy', 'useminPrepare:build', 'concat', 'cpconcat', 'usemin','replace']);

    //除了build的任务外，还进行jshint,uglify,cssmin
    grunt.registerTask('deploy', ['copy', 'newer:jshint', 'useminPrepare:deploy', 'concat', 'uglify', 'cssmin', 'usemin','replace']);
}