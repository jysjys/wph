<template>
	<div id="container" class="map"></div>
</template>
<script type="text/javascript">
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
import {ADDR} from '../store'
	var map,geolocation; 
	export default {
		name:"map",
		data(){
			return{
				
			}
		},
		mounted(){
			this.init();  
		},
		created(){
			this.init();
			this.getAddr();
		},
		methods:{
			...mapActions(['ADDR']),
			init(){
				map = new AMap.Map('container');
			},
			getAddr(){
				var addAddr = this.ADDR;
				map.plugin('AMap.Geolocation', function () {
    				geolocation = new AMap.Geolocation({
    					enableHighAccuracy: false,
        				timeout: 10000
    				})
    				map.addControl(geolocation);  
    				geolocation.getCurrentPosition(function(status,result){
    					if(status == "complete" && result.info == "SUCCESS"){
    						var addr = result.addressComponent.province.replace("省","");
    						addAddr(addr);
    					}
    				});
    			})
			}
		}
	}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
#container{
	height: 100px;
}

</style>