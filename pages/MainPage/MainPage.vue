<template>
	<view>
		hello
	</view>
</template>

<script>
	import { getBluetoothState,openBluetoothAdapter } from './helper.js'
	export default{
		data(){
			return{
				
			}
		},
		mounted() {
			openBluetoothAdapter().then((e)=>{console.log('open success: '+JSON.stringify(e))})
			// getBluetoothState()
			console.log("successfully init")
		}
	}
</script>

<style>
</style>
