// 获取蓝牙状态
export function getBluetoothState(){
	plus.bluetooth.getBluetoothAdapterState({
		success:function(e){
			console.log('state success: '+JSON.stringify(e))
		},
		fail:function(e){
			console.log('state failed: '+JSON.stringify(e));
		}
	});
}

// 打开蓝牙模块
export function openBluetoothAdapter(){
	return new Promise(function(resolve,reject){
		plus.bluetooth.openBluetoothAdapter({
			success:(e) => {resolve(e)},
			fail:(e) => {reject(e)}
			})
	})
	
}

// 开始搜索蓝牙
export function startDicoverDevices(){
	return new Promise((resolve,reject)=>{
		plus.bluetooth.startBluetoothDevicesDiscovery({
				success:(e)=>{
					console.log('start discovery success: '+JSON.stringify(e))
					resolve(e)
				},
				fail:(e)=>{
					console.log('start discovery failed: '+JSON.stringify(e))
					reject(e)
				},
				
			})
	})
}
// 获取到新设备
export function foundNewDevice(){
	return new Promise((resolve,reject)=>{
		plus.bluetooth.onBluetoothDeviceFound((e)=>{
				var devices = e.devices;
				console.log('device found: '+e.length);
				for(var i in devices){
					console.log(i+': '+JSON.stringify(devices[i]));
				}
			})
	})
}

// 获取已经搜索到的蓝牙设备
export function getBlueToothDeviceList(){
	return new Promise((resolve,reject)=>{
		plus.bluetooth.getBluetoothDevices({
				success:function(e){
					var devices = e.devices;
					console.log('get devices success: '+e.length);
					for(var i in devices){
						console.log(i+': '+JSON.stringify(devices[i]));
					}
					resolve(devices)
				},
				fail:function(e){
					console.log('get devices failed: '+JSON.stringify(e))
					reject(e)
				}
			})
	})
}

// 连接蓝牙设备
export function connectDevice(deviceId){
	return new Promise((resolve,reject)=>{
		plus.bluetooth.createBLEConnection({
				deviceId:deviceId,
				success:(e)=>{
					console.log('create connection success: '+JSON.stringify(e))
					resolve(e)
				},
				fail:(e)=>{
					console.log('create connection failed: '+JSON.stringify(e))
					reject(e)
				}
			})
	})
}
// 获取蓝牙设备的服务
export function getDeviceService(deviceId){
	return new Promise((resolve,reject)=>{
		// 设置一秒延时
		setTimeout(()=>{
			plus.bluetooth.getBLEDeviceServices({
					deviceId:deviceId,
					success:(e)=>{
						var services = e.services;
						console.log('get services success: '+services.length);
						for(var i in services){
							console.log(i+': '+JSON.stringify(services[i]));
						}
						console.log(e)
						resolve(e)
					},
					fail:(e)=>{
						console.log('get services failed: '+JSON.stringify(e))
						reject(e)
					}
				})
		},1000)
		
	})
}
// 获取设备特征值
export function getCharacteristicId(deviceId,serviceId){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			plus.bluetooth.getBLEDeviceCharacteristics({
					deviceId:deviceId,
					serviceId:serviceId,
					success:function(e){
						var characteristics = e.characteristics;
						console.log('get characteristics success: '+characteristics.length);
						for(var i in characteristics){
							console.log(i+': '+JSON.stringify(characteristics[i]));
						}
						console.log(e)
						resolve(e)
					},
					fail:function(e){
						console.log('get characteristics failed: '+JSON.stringify(e))
						reject(e)
					}
				})
		},1000)
	})
}
// 辅助转码
function ab2hex(buffer) {
			  const hexArr = Array.prototype.map.call(
			    new Uint8Array(buffer),
			    function (bit) {
			      return ('00' + bit.toString(16)).slice(-2)
			    }
			  )
			  return hexArr.join('')}
// 辅助转码 可用			  
function ab2str(arraybuffer) {
        return String.fromCharCode.apply(null, new Uint8Array(arraybuffer));
      }

// 开启特征值监听
export function notifyBLECharacteristicValueChange(deviceId,serviceId,characteristicId){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			// 监听低功耗蓝牙设备的特征值变化 
				plus.bluetooth.onBLECharacteristicValueChange(function(e){
					console.log('onBLECharacteristicValueChange: '+JSON.stringify(e));
					var value = ab2str(e.value);
					// var value = new Uint8Array(e.value)
					console.log('value(hex) = '+value);
					if(characteristicId == e.characteristicId){
						// 更新到页面显示
						alert('特征值变化: '+value);
					}
				})
				
			plus.bluetooth.notifyBLECharacteristicValueChange({
					deviceId:deviceId,
					serviceId:serviceId,
					characteristicId:characteristicId,
					success:(e)=>{
						var characteristics = e.characteristics;
						console.log('get characteristics success: '+characteristics.length);
						for(var i in characteristics){
							console.log(i+': '+JSON.stringify(characteristics[i]));
						}
						resolve(e)
					},
					fail:(e)=>{
						console.log('get characteristics failed: '+JSON.stringify(e))
						reject(e)
					}
				})
		},1000)
		
	})
}


// 订阅设备二进制数据
export function startCharacteristicsNotify(deviceId,serviceId,characteristicId){
	console.log("now notify device data")
	return new Promise((resolve,reject)=>{
		plus.bluetooth.readBLECharacteristicValue({
				deviceId:deviceId,
				serviceId:serviceId,
				characteristicId:characteristicId,
				success:(e)=>{
					console.log('read characteristics success: '+JSON.stringify(e))
					resolve(e)
				},
				fail:(e)=>{
					console.log('read characteristics failed: '+JSON.stringify(e))
					console.log(e.errMsg)
					reject()
				}
			})
	})
}
//尝试写数据
export function writeDeviceData(deviceId,serviceId,characteristicId){
	console.log("now write device data")
	// 要写入的数据
	let suffix = "\r\n";
	let sendData = 'nihao' + suffix
	let buffer = new ArrayBuffer(sendData.length);
	let dataView = new DataView(buffer);
	for (let i = 0; i < sendData.length; i++) {
	  dataView.setUint8(i, sendData.charAt(i).charCodeAt());
	}

	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			plus.bluetooth.writeBLECharacteristicValue({
					deviceId:deviceId,
					serviceId:serviceId,
					characteristicId:characteristicId,
					value:buffer,
					success:function(e){
						console.log('write characteristics success: '+JSON.stringify(e));
					},
					fail:function(e){
						console.log('write characteristics failed: '+JSON.stringify(e));
					}
				})
		},1000)

	})
}