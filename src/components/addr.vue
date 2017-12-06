<template>
	<div class="addr">
	  <x-dialog v-model="addrFlag">
	  	<div class="dialog-box" slot="default">
	  		<h5 class="addr-title">选择送货地址,火速送到哦</h5>
	  		<i class="icon-close iconfont" @click="close"></i>
	  		<dl>
	  			<dt>我们猜你在</dt>
	  			<dd>{{addr}}</dd>
	  		</dl>
	  		<dl v-for="(item,index) in addrList" :key="index">
	  			<dt>{{poiList[index]}}</dt>
	  			<dd v-for="(subitem,subindex) in item" @click="setAddr(index,subindex)">{{subitem.name}}</dd>
	  		</dl>
	  		<h5 class="addr-title">选择送货地址,火速送到哦</h5>
	  	</div>
	  </x-dialog>
	</div>
</template>

<script>
import { XDialog  } from 'vux'
import { TransferDomDirective as TransferDom } from 'vux'
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
import {ADDR} from '../store'
export default {
  components: {
    XDialog 
  },
  data () {
    return {
    	addrList:[],
    	poiList:["华北地区","东北地区","华东地区","华南地区","西南地区","西北地区"]
    }
  },
  directives: {
    TransferDom
  },
  created(){
	this.getData();
  },
  computed:mapState({
  	addr:state => state.addr,
  	addrFlag:state => state.addrFlag
  }),
  methods:{
  	...mapActions(['ADDR','ADDRFLAG']),
  	getData(){
  		this.axios.get('json/addr.json').then(result =>{
  			for (var i in result.data.province) {
  				this.addrList.push(result.data.province[i]);
  			}
  		})
  	},
  	setAddr(index,subindex){
  		var addr = this.addrList[index][subindex].name;
  		this.ADDR(addr);
  		this.close();
  	},
  	close(){
  		this.ADDRFLAG(false)
  	}
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
.addr{
	.weui-dialog{
		max-height: 80%;
		overflow-y: auto;
	}
}
.dialog-box{
	position: relative;
	background: #fff;
	font-size: 13px;
	text-align: left;
	.addr-title{
		color: #e4007e;
		line-height: 40px;
		text-align: center;
		&:last-of-type{
			border-top: 1px solid #ccc;
		}
	}
	.icon-close{
		position: absolute;
		color: #010101;
		right: 10px;
		top: 5px;
		font-size: 16px;
	}
	dt{
		padding: 2px 20px;
		background: #ccc;
	}
	dd{
		padding: 0 20px;
		line-height: 35px;
		border-bottom: 1px solid #ccc;
		&:last-of-type{
			border-bottom: none;
		}
	}
}
</style>
