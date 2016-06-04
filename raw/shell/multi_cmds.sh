#!/bin/bash
# 这是一个多进程执行命令的shell
# @author cailudun

PROGNAME=`type $0 | awk '{print $3}'`  # search for executable on path
PROGDIR=`dirname "$PROGNAME"`          # extract directory of program
PROGNAME=`basename "$PROGNAME"` 

usage () {
    echo "usage: $PROGDIR/$PROGNAME [-f file | --file file ] $1"
    return
}
beginTime=`date +%s`
#echo "$@" $#
#从参数获取文件
filename=
debug=0
while [[ -n $1 ]]; do
	#获取参数
	case $1 in
		-f | --file )
			shift
			filename=$1
			;;
		-d | --debug )
			debug=1
			;;	
		*)
			usage 1 >&2
			exit 1
			;;
			
	esac
	shift
done

#从文件提取命令
declare -a cmds
if [[ -e "$filename" ]]; then
	#读取文件中的命令 ，每行一条
	#IFS设置
	OLD_IFS="$IFS"
	IFS=$'\n'
	[[ $debug = 1 ]] && printf "cmd list:\n******************************\n"

	while read cmd; do
		cmds+=($cmd)
	done < "$filename"

	for cmd in "${cmds[@]}";do
		[[ $debug = 1 ]] && printf "%s\n" $cmd
	done
	
	[[ $debug = 1 ]] && printf "******************************\n"
	IFS="$OLD_IFS"
else
	usage 2 >&2
	exit 1
fi

#以cpu核数作为线程数
SEND_THREAD_NUM=$(cat /proc/cpuinfo | grep processor | wc -l)

[[ -d './tmp' ]] || mkdir './tmp'
tmp_fifofile=./tmp/$$.$RANDOM.fifo
mkfifo "$tmp_fifofile"

exec 6<>"$tmp_fifofile" 
for((i=0; i < $SEND_THREAD_NUM; i++)); do 
    echo 
done >&6 

for cmdt in "${cmds[@]}";do
	read -u6 
    { 
       ($cmdt)
       echo >&6 
    } & 
    pid=$! 
    echo $pid
done

#删除fifo临时文件
rm -f $tmp_fifofile
rm -f "$filename"
wait

endTime=`date +%s`
printf "usage: %d s\n" $(($endTime - $beginTime))

exec 6>&-


