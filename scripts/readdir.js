var fs = require('fs');
var path = require('path');

var pp = {};
var count = 0;

//readJsRecurse(path.resolve(__dirname, "../js/"));
readCssRecurse(path.resolve(__dirname, "../css/"));

//遍历读取js文件
function readJsRecurse(filepath) {
    count++;
    //分析路径
    return;
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
                    console.log('\t'+count)
                    if(count === 0){
                        fs.writeFile(path.resolve(__dirname, "jsData.json"),JSON.stringify(pp));
                    }
                });

            }
        //路径是目录，递归遍历读取文件
        } else if (stats.isDirectory()) {
            count++;
            fs.readdir(filepath, function(err, files) {
                if (err) return;
                files.forEach(function(el, index) {
                    readJsRecurse(path.join(filepath, el));
                });
                count--;
            })
        }
        count--;
    });
}


//遍历读取css文件
function readCssRecurse(filepath) {
    count++;
    //分析路径
    fs.stat(filepath, function(err, stats) {
        if (err) {
            console.log('!!!!error!!!!');
            return;
        } 
        //路径是文件
        if (stats.isFile()) {
            var dirs = path.dirname(filepath).split(path.sep) ;
            var directory = dirs[dirs.length-1];
            //文件是html，并且目录是 'xx.yy'形式，xx是父目录
            if (path.extname(filepath) == '.html' && directory.indexOf('.')>-1) {
                count++;
                fs.readFile(filepath,function(err,data){
                    if(err){
                        console.log('!!!!error!!!!');
                        return;
                    } 
                    var html = data+'';
                    //提取html文件的title
                    //如果文件名为标题文字
                    var filename = path.basename(filepath,'.html');
                    if( /[\W]/.test(filename) && !/\d\.\d/.test(filename)){
                        var title = filename;
                        var matchFile = true;
                        html = html.replace(/<title>([^<]*)<\/title>/,function(tag,otitle){
                            return '<title>'+ title + '</title>';
                        });
                        fs.writeFile(filepath,html);
                    }else{
                        var matchs =html.match(/<title>([^<]*)<\/title>/);
                        title = matchs && matchs[1];
                        fs.rename(filepath, path.join(filepath,'..',title+'.html'),function(err){if(err)return;});
                        fs.unlink(path.join(filepath,'..',filename+'.css'),function(){});
                    }
                    pp[directory.split('.')[0]] = pp[directory.split('.')[0]] || {};
                    pp[directory.split('.')[0]][directory.split('.')[1]] = pp[directory.split('.')[0]][directory.split('.')[1]] || [];
                    pp[directory.split('.')[0]][directory.split('.')[1]].push(title);

                    //提取html文件的style
                    var styleContent = '',style = '';
                    var styleReg =  new RegExp('<style[^>]*>((?:(?!<\\/style>)[\\s\\S])*)<\\/style>','g');
                    while( (style = styleReg.exec(html)) != null ){
                        styleContent += style[1];
                    }

                    //提取html文件的script
                    var scriptContent = '',script = '';
                    var scriptReg = new RegExp('<script[^>]*>((?:(?!<\\/script>)[\\s\\S])*)<\\/script>','g');
                    while( (script = scriptReg.exec(html)) != null ){
                        scriptContent += script[1];
                    }
                    if(scriptContent){
                        scriptContent = '\r\n/*\r\n'+scriptContent + '  */';
                    }
                    count--;
                   
                    fs.writeFile(path.join(path.dirname(filepath),title+'.css'),styleContent+scriptContent);
                    console.log('\t'+count)
                    //TODO 不知道为什么==1了 ，该是0
                    if(count === 1){   
                        fs.writeFile(path.resolve(__dirname, "cssData.json"),JSON.stringify(pp));
                    }
                });

            }
        //路径是目录，递归遍历读取文件
        } else if (stats.isDirectory()) {
            count++;
            fs.readdir(filepath, function(err, files) {
                if (err){
                    console.log('!!!!error!!!!');
                    return;
                } 
                files.forEach(function(el, index) {
                    readCssRecurse(path.join(filepath, el));
                });
                count--;
            })
        }
        count--;
    });
}