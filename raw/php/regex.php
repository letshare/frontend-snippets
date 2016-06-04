<?php
$page_string='这是一片文章的《正文》,里面有3个关键字要被替换,分别是“可恨可恨”,“可恨”,“假的”,将被替换成“四个”,“可爱”,“真的”.有一个规则需要注意,如果关键字在双引号里是不能被替换的.只有不在双引号里,比如可恨可恨,假的,可恨这样才需要替换.同时需要注意,优先替换关键字长的.比如可恨可恨将被替换成“四个”,而不是“可爱可爱”!';

$patt = '/(.*?)(“[^”]*”)([^“]*)/';
$new_string = preg_replace_callback($patt, function($matches){
	$matches[1] = "[".$matches[1]."]";//preg_replace(pattern, replacement, subject)
	$matches[3] = "[".$matches[3]."]";
	return $matches[1].$matches[2].$matches[3];
}, $page_string);

echo $new_string."\n";
