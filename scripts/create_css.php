<?php
//加载模版引擎
require_once 'smarty3/Smarty.class.php';

define('DIR',__DIR__);
$tpl = new Smarty();	
$tpl->template_dir = DIR."/templates/";
$tpl->compile_dir = DIR."/templates_c/";
$tpl->caching =false;

$css_data = file_get_contents('./cssData.json');
$titles_arr = json_decode($css_data );
foreach ($titles_arr as $index => $titles) {
	# code...
	$tpl->assign('chapt',$index);
	$tpl->assign('titles',$titles);
	$html = $tpl->fetch('css.html');
	write_file(realpath(DIR."/../css/{$index}")."/index.html",$html);
}


// 写入文件
function write_file($file, $content){
	$fp = fopen($file, 'w+');
	fwrite($fp, $content);
	fclose($fp);
}


/**
* An easier way to do mkdirs : recursion.
*
* @param string $strPath
* @param integer $mode
* @return bool
*/

function mkdirs($strPath = '', $mode = 0777) {
	if (is_dir($strPath)) return true;

	$pStrPath = dirname($strPath);

	if (!mkdirs($pStrPath, $mode)) return false;

	return mkdir($strPath, $mode);
}

?>