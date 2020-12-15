import {
	getCurrentTime,
	log_this,
	now_date
} from './time_helper.js'


export function add_a_row(data) {

	return '' + data + ',' + getCurrentTime() + '\r\n'
}
export function add_data(self, data) {
	// 处理数据,给全局的data变量增加一行
	self.data += add_a_row(data)
	// 设置长度限制,达到的话就写入文件
	var data_cache = self.data
	if (data_cache.length > 80000) {
		file_writer(self,
			self.userInfo.username,
			self.data,
			self.userInfo.header,
			self.userInfo.file_type)
		// 清空数据存储
		self.data = ''
	}
}

export function file_writer(self, user_name, data, header, file_type) {
	// user_name 用户名，用来创建文件夹
	// data 文件对象 字符串格式
	// header 如果文件的长度为0则自动添加文件头
	// file_type 文件的类型： 

	// 获取当前时间
	var date = now_date() 


	// 组装文件名
	// if( file_type === 'acceleration' ){
	// 	var file_name = date + '-' + time_type + '-' + 'acceleration' +'.csv'
	// }else{
	// 	var file_name = date + '-' + time_type + '-' + 'orientation' +'.csv'
	// }
	var file_name = date + '-' + file_type + '.csv'

	plus.io.resolveLocalFileSystemURL('_documents', function(entry) {
		// 创建文件夹,如果不存在的话
		entry.getDirectory(user_name, {
			create: true,
			exclusive: false
		}, function(entry_success) {
			// 获取对应文件名的文件对象，如果没有就创建
			entry_success.getFile(file_name, {
					create: true
				},
				function(file_entry) {
					// 这里也有一层回调函数
					file_entry.file(function(file) {
						// 创建文件读取器
						var fileWriter = file_entry.createWriter(function(writer) {

							writer.seek(file.size - 1)
							// 如果文件的长度为0则自动添加文件头
							if (file.size === 0) {
								// 解决两个write无法写入后一个的问题
								writer.write(header + data)
							} else {
								// 向文件中写入一些实体,将文件指针调到文件末尾
								writer.write(data)
							}
							log_this(self, "success", 'write file success')
							// 发送消息
							self.$refs.uToast.show({
								title: 'Successfully saved~',
								type: 'success'
							})
						})
					}, function(e) {
						console.log("Request file system failed: " + e.message)
						log_this(self, "error", 'Request file system failed: ' + JSON.stringify(e))
					})
				},
				function(e) {
					log_this(self, "error", 'failed' + JSON.stringify(e))
					console.log('failed' + e)
				})

		}, function(entry_fail) {
			log_this(self, "error", 'Failed get diretory')
			console.log('Failed get diretory')
		})
	})
}
