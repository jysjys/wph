<template>
	<div class="register">
		<x-header  class="header" :left-options="{backText:''}">注册 </x-header>
		<div class="top">
			<p class="logo">唯小镇</p>
			<p class="logo-txt">正品·特价·限量抢购</p>
		</div>
		<group>
			<x-input title="账号" v-model="form.useid" placeholder="手机号/邮箱"></x-input>
			<x-input title="密码" v-model="form.password" placeholder="密码"></x-input>
		</group>
		<div class="submit">
			<x-button type="default" @click="register">注册</x-button>
		</div>
	</div>
</template>
<script type="text/javascript">
import {XHeader,XInput,Group,XButton } from "vux";
import {mapActions} from "vuex";
import {mapState} from "vuex";
	export default {
		name:"register",
		data(){
			return{
				form:{
					userid:"",
					password:""
				}
			}
		},
		components:{
			XHeader,
			XInput,
			Group,
			XButton 
		},
		methods:{
			register(){
				var str = "userid=" + this.form.userid + "&password=" + this.form.password;
				this.axios.get().then(result =>{
					console.log(result);
				})
			}
		}
	}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.register{
	.top{
		margin-top: 46px;
		padding: 20px 0;
		text-align: center;
		color: #f66;
		.logo{
			font-size: 30px;
		}
		.logo.txt{
			font-size: 13px;
		}
	}
	.submit{
		padding: 0 12px;
		margin-top: 20px;
	}
}
</style>