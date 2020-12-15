/**
 * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
 */
export function getCurrentTime() {
    var date = new Date();//当前时间
    var month = zeroFill(date.getMonth() + 1);//月
    var day = zeroFill(date.getDate());//日
    var hour = zeroFill(date.getHours());//时
    var minute = zeroFill(date.getMinutes());//分
    var second = zeroFill(date.getSeconds());//秒
	var milisec = zeroFill(date.getMilliseconds()) // 微妙
    
    //当前时间
    var curTime = date.getFullYear() + "-" + month + "-" + day
            + " " + hour + ":" + minute + ":" + second + "." + milisec
    
    return curTime;
}
 // 将log信息写入显示元素中以在手机屏幕上打印log
 export function log_this(self, type, str) {
 	var time = getCurrentTime()
 	switch (type) {
 		case "error":
 			self.logPlace += time + ": " + "error " + str + '\r\n'
 			break
 		case "warn":
 			self.logPlace += time + ": " + "warn " + str + '\r\n'
 			break
 		case "info":
 			self.logPlace += time + ": " + "info " + str + '\r\n'
 			break
 		case "success":
 			self.logPlace += time + ": " + "success " + str + '\r\n'
 			break
 	}
 }
 
 
/**
 * 补零
 */
function zeroFill(i){
    if (i >= 0 && i <= 9) {
        return "0" + i;
    } else {
        return i;
    }
}

export function now_date(){
	// 获取当前日期
	var date = new Date();
	
	// 获取当前月份
	var nowMonth = date.getMonth() + 1;
	
	// 获取当前是几号
	var strDate = date.getDate();
	
	// 添加分隔符“-”
	var seperator = "-";
	
	// 对月份进行处理，1-9月在前面添加一个“0”
	if (nowMonth >= 1 && nowMonth <= 9) {
	   nowMonth = "0" + nowMonth;
	}
	
	// 对日期进行处理，1-9号在前面添加一个“0”
	if (strDate >= 0 && strDate <= 9) {
	   strDate = "0" + strDate;
	}
	
	// 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
	var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
	return nowDate
}