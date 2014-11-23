<?php
function array_combine($keys, $values){
	$result = array();
	foreach ($keys as $i => $k) {
		$result[$k][] = $values[$i];
	}
	array_walk($result, create_function('&$v', '$v = (count($v) == 1)? array_pop($v): $v;'));
	return    $result;
}