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
// success:function(e){
// 			console.log('open success: '+JSON.stringify(e))
// 			callback(getBluetoothState)
// 		},
// 		fail:function(e){
// 			console.log('open failed: '+JSON.stringify(e));
// 		}