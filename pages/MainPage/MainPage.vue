<template>
	<view>
		<u-button type="default" @click="get_device">get device</u-button>
		<u-row>
			<u-col>
				<p>
					{{logPlace}}
				</p>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	import * as helper from './helper.js'
	
	export default{
		data(){
			return{
				DeviceId : "3C:A5:4A:E4:06:18",
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
				characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB",
				// log模块
				logPlace:''
			}
		},
		mounted() {
			helper.openBluetoothAdapter(this).then((e)=>{
				helper.startDicoverDevices(this).then(e=>{
					helper.foundNewDevice(this)
					})
				})
			// getBluetoothState()
			// 连接设备
			helper.connectDevice(this,this.DeviceId).then(()=>{helper.notifyBLECharacteristicValueChange(this,this.DeviceId,this.serviceId,this.characteristicId)})
		},
		methods:{
			get_device(){
				// getBlueToothDeviceList().then(e=>{
				// 	console.log("Getted device is :")
				// 	console.log(e)	
				// })
				// console.log("Now connect device")
				helper.log_this(this,"warn","this is a test log")
				
			}
		}
	}
</script>

<style>
	p{
		white-space: pre-wrap;
	}
</style>
