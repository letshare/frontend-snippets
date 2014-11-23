<?php
/**
 * 安全的文件操作类，添加了锁
 *
 * @author cailudun
 * @mail cailudun@xunlei.com
 * @create 2014/5/15
 */
class SafeFile{

	//文件名
	var  $file;
	
	//文件指针
	var  $fp;
	
	//文件指针位置
	var  $pos;
	
	//是否上锁
	var  $locked = false;
	
	//可接受的打开文件模式
	var $accept_modes = array(
		"r" =>  LOCK_SH ,
		"r+" =>  LOCK_EX ,
		"w" =>  LOCK_EX ,
		"w+" =>  LOCK_EX ,
		"a" =>  LOCK_EX ,
		"a+" => LOCK_EX 
	);
	
	//错误信息
	var $errstr;
	
	/**
     * 打开文件，并上锁
     *
     */
	function open($file,$mode){
		$mode = strtolower( trim($mode) );
		if( !array_key_exists($mode, $this->accept_modes) ){
			$this->errstr = "file open mode $mode is not supported";
			return false;
		}else if( !file_exists($file) && !in_array($mode,array("w","w+","a","a+")) ){
			$this->errstr = "file  $file not found";
			return false;
		}				
		$this->fp = fopen($file,$mode);
		if( !$this->fp ){
			$this->errstr = "file  $file can't open";
			return  false;
		}
		$this->file = $file;
		$this->locked = false;
		$this->lock($this->accept_modes[$mode]);
		return $this->fp;
	}
	
	/**
     * 添锁，非阻塞模式
     *
     */
	function lock($operation){
		$retries = 0;
		$max_retries = 100;   //最大尝试100次
		do{
			if($retries>0){
				//休眠0-100w 毫秒
				usleep(rand(0,100)*10000);
			}
			$retries++;
		}while( !flock($this->fp,$operation|LOCK_NB ) && $retries <= $max_retries);
		if($retries == $max_retries){
			$this->errstr = "can't get lock";
			return false;
		}
		$this->locked = true;
		return true;
	}
	
	/**
     * 写数据
     *
     */
	function write($data){	
		if( !$this->locked || !is_writable($this->file) ){
			$this->errstr = "something wrong before write ,instance of can't open or lock file";
			return false;
		}
		return fwrite( $this->fp, $data )?true:false;
	}
	
    /**
     * 读数据
     *
     */	
	function read(){		
		if( !$this->locked || !is_readable($this->file) ){
			$this->errstr = "something wrong before read ,instance of can't open or lock file";
			return false;
		}
		$data = fread( $this->fp );		
		return $data;
	}
	
	/**
     * 从尾部读数据
     * 适合行数据比较大的情况
	 *
	 * @param number $lines 读多少行
     */
	function long_tail($lines = 100){ 
		if( !$this->locked || !is_readable($this->file) ){
			$this->errstr = "something wrong before read ,instance of can't open or lock file";
			return false;
		}
		$chunk = 4096; 
		$fs = sprintf("%u", filesize($this->file)); 
		$max = (intval($fs) == PHP_INT_MAX) ? PHP_INT_MAX : filesize($this->file); 

		for ($len = 0; $len < $max; $len += $chunk) { 
			$seekSize = ($max - $len > $chunk) ? $chunk : $max - $len; 

			fseek($this->fp, ($len + $seekSize) * -1, SEEK_END); 
			$data = fread($this->fp, $seekSize) . $data; 

			if (substr_count($data, "\n") >= $lines + 1) { 
				preg_match("!(.*?\n){".($lines)."}$!", $data, $match);
				fseek( $this->fp, strlen($match[0]) * -1 , SEEK_END );
				$this->pos = ftell( $this->fp );
				return $match[0]; 
			} 
		}
		fseek( $this->fp, strlen($data) * -1 , SEEK_END );
		$this->pos = ftell( $this->fp );
		return $data; 
	}
	
	/**
     * 从尾部读数据
     * 适合行数据比较小的情况
	 * 第一个字符是\n或\r ，fgetc 移动了一个指针，所以pos-1
	 *
	 * @param number $lines 读多少行
     */
	function short_tail($lines){
		if( !$this->locked || !is_readable($this->file) ){
			$this->errstr = "something wrong before read ,instance of can't open or lock file";
			return false;
		}
		$offset = -1;
		$c = '';
		$read = '';
		$i = 0;
		while( $lines && fseek($this->fp, $offset, SEEK_END) >= 0 ) {
			$c = fgetc($this->fp);
			if($c == "\n" || $c == "\r"){
				$lines--;				
			}
			$read .= $c;
			$offset--;
		}
		$this->pos = ftell( $this->fp )-1;		
		return strrev($read);
	}
	
	/**
     * 截断数据
     * 
	 * @param number $size 多少字节
     */
	function truncate($size){
		if( $this->fp ){
			ftruncate($this->fp,$size);
		}
	}
	
	/**
     * 创建嵌套的目录     
	 *
     */
	function rmkdir($path, $mode = 0755) {
		$path = rtrim(preg_replace(array("/\\\\/", "/\/{2,}/"), "/", $path), "/");
		$e = explode("/", ltrim($path, "/"));
		if(substr($path, 0, 1) == "/") {
			$e[0] = "/".$e[0];
		}
		$c = count($e);
		//父目录或当前目录
		$cp = $e[0];
		for($i = 1; $i < $c; $i++) {
			if(!is_dir($cp) && !@mkdir($cp, $mode)) {
				return false;
			}
			$cp .= "/".$e[$i];
		}
		return @mkdir($path, $mode);
	}
	
	/**
     * 文件指针回退到原先记录的位置
     * 
     */
	function reback(){
		fseek( $this->fp, $this->pos ); 
	}
	
	/**
     * 关闭文件
     * 	
     */
	function close(){
		flock($this->fp,LOCK_UN);
		fclose($this->fp);
	}	
	
}