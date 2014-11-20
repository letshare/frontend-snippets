var fs = require('fs');
var path = require('path');

var pp = {};
var count = 0;
return;
readRecurse(path.resolve(__dirname, "../js/"));

//遍历读取文件
function readRecurse(filepath) {
    count++;
    //分析路径
    fs.stat(filepath, function(err, stats) {
        if (err) return;
        //路径是文件
        if (stats.isFile()) {
        	var dirs = path.dirname(filepath).split(path.sep) ;
        	var directory = dirs[dirs.length-1];
            //文件是html，并且目录是 'xx.yy'形式，xx是父目录
            if (path.extname(filepath) == '.html' && directory.indexOf('.')>-1) {
                count++;
                fs.readFile(filepath,function(err,data){
                	if(err)return;
                    var html = data+'';
                    //提取html文件的title
                	var matchs =html.match(/<title>([^<]+)<\/title>/);
                	var title = matchs && matchs[1];
                	pp[directory.split('.')[0]] = pp[directory.split('.')[0]] || {};
                	pp[directory.split('.')[0]][directory.split('.')[1]] = title;

                    //提取html文件的script
                    var scriptContent = '',script = '';
                    var patt = new RegExp('<script[^>]*>((?:(?!<\\/script>)[\\s\\S])*)<\\/script>','g');
                    while( (script = patt.exec(html)) != null ){
                        scriptContent += script[1];
                        //去掉头尾
                        scriptContent = scriptContent.replace(/^\s*window\.onload\s*=\s*function\(\)\{\s*/,'');
                        scriptContent = scriptContent.replace(/\s*\};\s*$/,'');
                    }
                    count--;
                    if(directory.split('.')[0]!=2){
                        //fs.writeFile(path.join(path.dirname(filepath),'../',directory.split('.')[1]+'.js'),scriptContent);
                    }
                    if(count === 0){
                        fs.writeFile(path.resolve(__dirname, "data.json"),JSON.stringify(pp));
                    }
                });

            }
        //路径是目录，递归遍历读取文件
        } else if (stats.isDirectory()) {
            count++;
            fs.readdir(filepath, function(err, files) {
                if (err) return;
                files.forEach(function(el, index) {
                    readRecurse(path.join(filepath, el));
                });
                count--;
            })
        }
        count--;
    });
}