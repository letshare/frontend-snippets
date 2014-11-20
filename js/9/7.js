/*
 *HTML5版Js实现的MP3播放器
 * */
var playerMp3 = function(mp3) {
    var playerMp3 = function(option) { //mp3播放器
        this.audio = option.audio;
        this.audioAction = option.audioAction;
        this.process = option.process;
        this.setProcessO = option.setProcess;
        this.setProcessOK = option.setProcessOK;
        this.volup = option.volup;
        this.voldown = option.voldown;
        this.muted = option.muted;
        var self = this;
        this.audioAction.onclick = function() { //播放控制
            if (this.value == "播放") {
                self.start();
                this.value = "暂停";
            } else {
                self.pause();
                this.value = "播放";
            }
        }
        this.volup.onclick = function() { //音量增大
            self.setVolup();
        }
        this.voldown.onclick = function() { //音量减少
            self.setVoldown();
        }
        this.muted.onclick = function() { //静音、发声
            self.setMute();
        }
        setInterval(function() { //获取播放进度
            self.getProcess();
        }, 1000)
        this.setProcessOK.onclick = function() { //确定修改进度
            self.setProcess();
        }
    }
    playerMp3.prototype.start = function() { //开始播放
        this.audio.play();
    }
    playerMp3.prototype.pause = function() { //暂停播放
        this.audio.pause();
    }
    playerMp3.prototype.getProcess = function() { //获取播放进度
        this.process.value = Math.floor(this.audio.currentTime) + "秒";
    }
    playerMp3.prototype.setProcess = function() { //设置播放进度
        this.audio.currentTime = (this.setProcessO.value || 0);
    }
    playerMp3.prototype.setVolup = function() { //音量+
        var v = this.audio.volume + 0.1;
        this.audio.volume = (v > 1 ? 1 : v);
    }
    playerMp3.prototype.setVoldown = function() { //音量-
        var v = this.audio.volume - 0.1;
        this.audio.volume = (v < 0 ? 0 : v);
    }
    playerMp3.prototype.setMute = function() { //静音/发声
        this.audio.muted = !this.audio.muted;
        this.audio.muted ? (this.muted.value = "发声") : (this.muted.value = "静音");
    }
    //实例化播放器
    return new playerMp3(mp3);
}
/*=========HTML5版Js实现的MP3播放器==============*/
playerMp3({
    "audio": document.getElementById("audio"), //音频对象
    "audioAction": document.getElementById("audioAction"), //音频控制播放或暂停
    "process": document.getElementById("process"), //播放进度
    "setProcess": document.getElementById("setProcess"), //修改播放进度
    "setProcessOK": document.getElementById("setProcessOK"), //确定修改进度
    "volup": document.getElementById("volup"), //音量增大
    "voldown": document.getElementById("voldown"), //音量减小
    "muted": document.getElementById("muted") //静音
})