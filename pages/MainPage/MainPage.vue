<template>
	<view>
		<button type="default" @click="get_device">get device</button>
	</view>
</template>

<script>
	import { getBluetoothState,openBluetoothAdapter,startDicoverDevices,readDeviceData,writeDeviceData,
	notifyBLECharacteristicValueChange,
	getBlueToothDeviceList,foundNewDevice,connectDevice,getDeviceService,getCharacteristicId } from './helper.js'
	
	export default{
		data(){
			return{
				DeviceId : "3C:A5:4A:E4:06:18",
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
				characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB"
			}
		},
		mounted() {
			openBluetoothAdapter().then((e)=>{
				console.log('open success: '+JSON.stringify(e))
				startDicoverDevices().then(e=>{foundNewDevice()})
				})
			// getBluetoothState()
			console.log("successfully init")
			// 连接设备
			connectDevice(this.DeviceId).then(()=>{notifyBLECharacteristicValueChange(this.DeviceId,this.serviceId,this.characteristicId)})
		},
		methods:{
			get_device(){
				// getBlueToothDeviceList().then(e=>{
				// 	console.log("Getted device is :")
				// 	console.log(e)	
				// })
				// console.log("Now connect device")

			}
		}
	}
</script>

<style>
</style>
