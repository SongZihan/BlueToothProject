<template>
	<view>
		<u-row gutter="10" justify="around">
			<u-col span="4">
				<u-button class="button_1" @click="connect_device" :type="connectStatus" :disabled="startButton">{{connectText}}</u-button>
			</u-col>
			<u-col span="4">
				<u-button class="button_1" type="info" @click="save_data" :disabled="stopButton">Stop and Save</u-button>
			</u-col>
		</u-row>
		<u-row>
			<u-col>
				<p>
					{{logPlace}}
				</p>
			</u-col>
		</u-row>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import * as helper from './helper.js'
	import {
		log_this
	} from './time_helper.js'
	import {
		file_writer
	} from './file_helper.js'

	export default {
		data() {
			return {
				DeviceId: "3C:A5:4A:E4:06:18",
				serviceId: '0000FFE0-0000-1000-8000-00805F9B34FB',
				characteristicId: "0000FFE1-0000-1000-8000-00805F9B34FB",
				// log模块
				logPlace: '',
				// 用户信息
				userInfo: {
					username: "Song Zihan",
					header: "data,time\r\n",
					file_type: "Distance",
				},
				// 数据
				data: '',
				// 表示连接状态
				connectStatus: 'primary',
				// 表示按钮文字
				connectText: 'Connect Device',
				// 停止按钮的状态
				stopButton: true,
				startButton: false
			}
		},
		onLoad() {
			helper.openBluetoothAdapter(this).then((e) => {
				helper.startDicoverDevices(this).then(e => {
					helper.foundNewDevice(this)
				})
			})
			// getBluetoothState()

		},
		methods: {
			connect_device() {
				// 连接设备
				helper.connectDevice(this, this.DeviceId).then((e) => {
					helper.notifyBLECharacteristicValueChange(
						this,
						this.DeviceId,
						this.serviceId,
						this.characteristicId)
					// 订阅成功，改变按钮状态
					this.connectStatus = 'success'
					this.connectText = 'Connected'
					this.stopButton = false
					this.startButton = true
					// 发送消息
					this.$refs.uToast.show({
						title: 'Successfully connected~',
						type: 'success'
					})
				}).catch(e => {
					// 发送消息
					this.$refs.uToast.show({
						title: 'connect failed',
						type: 'error'
					})
				}).finally((e) => {
					// 关闭设备搜寻
					helper.stopBluetoothDiscovery(this)
				})
			},
			save_data() {
				var data_cache = this.data
				file_writer(this,
					this.userInfo.username,
					data_cache,
					this.userInfo.header,
					this.userInfo.file_type)
				this.data = ''
				// 更改按钮状态
				this.stopButton = true
				this.startButton = false
				// 关闭蓝牙连接，停止监听数据
				helper.closeConnection(this,this.DeviceId)
			}
		},
		onUnload() {
			// 卸载页面之后关闭各种蓝牙接口
			helper.stopBluetoothDiscovery(this).finally((e) => {
				helper.closeBluetoothAdapter(this)
			})
		}
	}
</script>

<style>
	p {
		white-space: pre-wrap;
	}

	.button_1 {
		width: 250rpx;
		margin: 20px 0;
	}
</style>
