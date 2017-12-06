<template>
	<div class="my">
		<x-header  class="header" :left-options="{backText:''}">个人中心<i class="iconfont icon-home" slot="right"></i></x-header>
		<div class="top no" v-show="loginInfo">
			<span @click="$router.push('/register')">注册</span>|<span @click="$router.push('/login')">登录</span>  
		</div>
		<div class="top yes" v-show="!loginInfo">
			<img src=""/>
			<p></p>
		</div>
		<ul class="middle">
			<li v-for="(item,index) in orderTab"><i class="iconfont"></i>{{item.name}}</li>
		</ul>
		<group>
	      <cell title="我的收藏" is-link></cell>
	      <cell title="浏览历史" is-link></cell>
	    </group>
	</div>
</template>
<script type="text/javascript">
import {XHeader,Confirm,Cell,Group} from "vux"
import {mapActions} from "vuex";
import {mapState} from "vuex";
	export default {
		name:"my",
		data(){
			return{
				orderTab:[
					{
						name:"待付款",
						path:""
					},
					{
						name:"待收货",
						path:""
					},
					{
						name:"更多订单",
						path:""
					}
				]
			}
		},
		components:{
			XHeader,
			Cell,
			Group
		},
		computed:mapState({
			loginInfo:state => state.loginInfo
		}),
		methods:{
		}
	}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
	.my{
		.top{
			padding: 60px 0;
			margin-top: 46px;
			text-align: center;
			span{
				padding: 0 20px;
			}
		}
		.middle{
			display: flex;
			justify-content: space-around;
			align-items: center;
			padding: 10px 0;
			border-top: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			font-size: 13px;
			background: #fff;
			li{
				flex: 1;
				text-align: center;
			}
		}
		.weui-cells{
			font-size: 13px;
		}
	}
</style>