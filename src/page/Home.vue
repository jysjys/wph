<template>
  <div class="home">
    <x-header :left-options="{showBack: false}" class="header"><i slot="overwrite-left" class="iconfont icon-per" @click="$router.push('/my')"></i>唯小镇<span>{{addr}}</span><i class="iconfont icon-down" @click="addrFlagShow"></i><i slot="right" class="iconfont icon-search" @click="$router.push('/kind')"></i></x-header>
    <swiper :aspect-ratio="400/800">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in sliderList" :key="index">
        <img :src="item.picurl">
    	</swiper-item>
    </swiper>
    <div class="shop-list">
    	<h3 class="title"><span>主题馆</span></h3>
    	<ul class="new-list clear">
    		<li v-for="(item,index) in shopTitleList" :key="index" :data-id="item.id"><img :src="item.smallpic"/></li>
    	</ul>
    </div>
    <div class="active-list">
    	<h3 class="title"><span>环球精选</span></h3>
    	<ul class="active-list clear">
    		<li v-for="(item,index) in activeList" :key="index" :data-id="item.id" @click="goDetail(item)">
    			<img :src="item.choicepic"/>
    			<div class="active-info">
    				<p>{{item.title}}</p>
    				<div><span class="our-price">￥{{item.marketprice}}</span><span class="market-price">￥{{item.ourprice}}</span><span class="country">{{item.country}}直采<br>{{item.bigname}}发货</span></div>
    			</div>
    		</li>
    	</ul>
    </div>
    <Addr></Addr>
    <Map></Map>
  </div>
</template>

<script>
import { XHeader,Tab, TabItem,Swiper,SwiperItem} from 'vux'
import Addr from '../components/addr'
import Map from '../components/map'
import {mapActions} from "vuex";
import {mapState} from "vuex";
export default {
  name: 'home',
  components:{
  	XHeader,
  	Tab, 
  	TabItem,
  	Addr,
  	Map,
  	Swiper,
  	SwiperItem
  },
  data(){
  	return{
			shopTitleList:[],
			activeList:[],
			sliderList:[]
  	}
  }, 
  computed:mapState({
			addr:state => state.addr,
			addrFlag:state => state.addrFlag
	}),
  created(){
  	this.getSlider();
  	this.getShopList();
  	this.getActiveList();
  	
  },
  methods:{
  	...mapActions(['ADDRFLAG']),
  	getSlider(){          
			this.axios.get('json/shopList.json').then(result =>{
				for (var i in result.data.slider) {
					this.sliderList.push(result.data.slider[i]);
				}
			})
  	},
  	getShopList(){
  		this.axios.get('json/shopList2.json').then(result =>{
  			for (var i in result.data.data) {
					this.shopTitleList.push(result.data.data[i]);
				}
  		})
  	},
  	getActiveList(){
  		this.axios.get('json/kind.json').then(result =>{
  			for(var i in result.data.data.dataList){
  				this.activeList.push(result.data.data.dataList[i]);
  			}
  		})
  	},
  	addrFlagShow(){
  		this.ADDRFLAG(true);
  	},
  	goDetail(item){ 
		var id = item.id;
		this.$router.push({ 
			path:'/detail',
			query:{id:id}
		})
  	}
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
  .header{
  	background: #fff;
  	position: fixed;
  	top: 0;
  	left: 0;
  	right: 0;
  	z-index: 10;
  	h1{
  		color: #de3d96!important;
  		span{
  			font-size: 12px;
  			margin-left: 5px;
  			color: #010101;
  		}
  		.icon-down{
  			vertical-align: middle;
  			font-size: 16px;
  		}
  	}
  	.iconfont{
  		font-size: 20px;
  		color: #010101;
  		&.icon-home{
	  		font-size: 22px;
	  		
	  	}
  	}
  }
  .vux-slider{
  	margin-top: 46px;
  } 
  .title{
		text-align: center;
		font-size: 13px;
		line-height:30px;
		span{
			position: relative;
			&:after{
	  			position: absolute;
	  			top: 6px;
	  			right: -10px;
	  			width: 5px;
	  			height: 1px;
	  			content: "";
	  			background: #010101;
	  		}
	  		&:before{
	  			position: absolute;
	  			top: 6px;
	  			left: -10px;
	  			width: 5px;
	  			height: 1px;
	  			content: "";
	  			background: #010101;
	  		}
		} 
   }
  .shop-list{
  	background: #fff;
  	.new-list{
  		padding: 0 7px;
  		li{
  			width: 50%;
  			height: 1.5rem;
  			overflow: hidden;
  			padding: 5px;
  			float: left;
  			img{
  				width: 100%;
  			}
  		}
  	}
  }
  .active-list{
  	margin-bottom: 55px;
  	background: #fff;
  	.active-info{
  		padding: 10px 12px;
  		text-align: center;
  		.our-price{
  			color: #f11;
  			font-size: 18px;
  			margin: 0 5px;
  		}
  		.market-price{
  			text-decoration:  line-through;
  			color: #353535;
  			margin: 0 5px;
  		}
  		.country{
  			margin: 0 5px;
  			font-size: 9px;
  			color: #d5d5d5;
  		}
  	}
  	img{
  		width: 100%;
  	}
  }
  .home{
  	.vux-slider{
  		img{
  			width: 100%;
  		}
  	}
  }
}
</style>
