<template>
	<div class="shop-detail">
		<x-header  class="header" :left-options="{backText:''}">商品详情-唯小镇 <i class="iconfont icon-home" slot="right"></i></x-header>
		<swiper :aspect-ratio="400/800">
	      <swiper-item class="swiper-demo-img" v-for="(item, index) in sliderImg" :key="index">
	        <img :src="item">
	      </swiper-item>
	    </swiper>
	    <div class="top">
	    	<p class="price"><span class="our">￥{{shopDetail.ourprice}}</span><span class="market">￥{{shopDetail.marketprice}}</span></p>
	    	<p class="form-addr"><span></span>{{shopDetail.country}}直采 {{shopDetail.bigname}}发货 {{shopDetail.days}}天送达</p>
	    </div>
	    <div class="info">
	    	<h6>{{shopDetail.title}}</h6>
	    	<p class="txt">{{shopDetail.reason}}</p>
	    </div>
	    <tab :line-width=1>
        	<tab-item class="vux-center" :selected="tabIndex === index" v-for="(item, index) in tabList" @click.native="tabIndex = index" :key="index">{{item}}</tab-item>
      	</tab>
      	<div class="tab-list">
      		<div class="it-detail tab-item" v-html="shopDetail.detailinfo" :class="tabIndex == 0?'active':''"></div>
      		<ul class="pro-num tab-item" :class="tabIndex == 1?'active':''">
				<li v-for="(item,index) in proNum"><span class="name-title">{{index}}:</span><span class="name-info">{{item}}</span></li>      		
				<!--<li v-for="(item,index) in shopDetail.prodparams">{{index%2 == 0?"item":item}}</li>-->
      		</ul>
      		<div class="good tab-item" :class="tabIndex == 2?'active':''"></div>
      	</div>
      	<div class="cart">
      		<i class="iconfont icon-cart" @click="$router.push('/cart')"><em v-show="cartShowFlag">{{shopCart.cartNumber}}</em></i>
      		<a href="javascript:;" @click="addCart">加入购物车</a>
      	</div>
      	<cart-icon></cart-icon>
	</div>
</template>
<script type="text/javascript">
import {XHeader,Swiper,SwiperItem,Tab, TabItem}  from 'vux'
import CartIcon from '../components/cartIcon'
import {mapActions} from "vuex";
import {mapState} from "vuex";
export default {
	name:"detail",
	data(){
		return{
			shopDetail:{},
			sliderImg:[],
			tabIndex:0,
			tabList:["图文详情","产品参数","保税优势"],
			proNum:{},
			cartShowFlag:false,
			shopCart:{
				id:'',
				cartNumber:0
			}
		}
	},
	components:{
		XHeader,
		Swiper,
		SwiperItem,
		Tab, 
		TabItem,
		CartIcon
	},
	created(){
		this.getID();
	},
	methods:{
		...mapActions(['ADDCARTFLAG']),
		getData(){
			var str = 'id=' + this.shopCart.id;
			this.axios.get('json/shopDetail.json').then(result =>{
				var data = result.data.data;
				for(var i in data){
					this.$set(this.shopDetail,i,data[i])
				}
				this.getSliderImg();
				this.getProNum();
			})
		},
		getID(){
			this.shopCart.id = this.$route.query.id
			this.getData();
		},
		getSliderImg(){
			var imgs = this.shopDetail.goodspics.split("#");
			for(var i in imgs){
				if(i == imgs.length - 1){
					break;
				}
				this.sliderImg.push(imgs[i])
			}
		},
		getProNum(){
			var pro = this.shopDetail.prodparams.split("|||");
			for(var i in pro){
				if(i == 0 || i == pro.length - 1){
					continue;
				}else{
					if(i%2){   //奇数
						this.$set(this.proNum,pro[i],pro[parseInt(i)+1]);
					}
				}
				
			}
		},
		addCart(){
			var that = this;
			that.cartShowFlag = true;   //购物车数量应该从local中获取,实现购物车数量同步,后期这个地方需要改变
			that.shopCart.cartNumber ++;  //购物车数量应该从local中获取,实现购物车数量同步,后期这个地方需要改变
			that.ADDCARTFLAG(true);
			setTimeout(function(){
				that.ADDCARTFLAG(false);	
			},2000)
			localStorage.setItem("cart",JSON.stringify(this.shopCart));
		}
	}
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
	.shop-detail{
		.vux-slider{
			img{
				width: 100%;
				height: 100%;
			}
		}
		.top{
			padding: 15px 12px;
			border-top: 1px solid #ddd;
			border-bottom: 1px solid #ddd;
			background: #fff;
			.our{
				margin: 0 5px;
				font-size: 18px;
				color: #f11;
			}
			.market{
				margin: 0 5px;
				color: #aaa;
				text-decoration: line-through;
			}
			.form-addr{
				font-size: 9px;
			}
		}
		.info{
			padding: 5px 12px;
			background: #fff;
			h6{
				font-size: 15px;
				padding: 10px 30px 10px 0;
			}
			.txt{
				color: #aaa;
				font-size: 13px;
			}
		}
		.tab-list{
			margin-bottom: 40px;
			.tab-item{
				display: none;
				&.active{
					display: block;
				}
			}
			.it-detail{
				img{
					width: 100%;
				}
			}
			.pro-num{
				padding: 10px 0;
				background: #fff;
				li{
					display: flex;
					padding: 5px 12px;
					font-size: 13px;
					.name-title{
						display: inline-block;
						width: 75px;
					}
					.name-info{
						flex: 1;
					}
				}
			}
		}
		.cart{
			display: flex;
			line-height: 40px;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 10;
			i{
				position: relative;
				width: 60px;
				background: #353535;
				text-align: center;
				font-size: 20px;
				color: #0ff;
				em{
					position: absolute;
					right: 15px;
					top: 10px;
					width: 10px;
					height: 10px;
					background: #f00;
					border-radius: 50%;
					font-size: 9px;
				}
			}
			a{
				flex: 1;
				text-align: center;
				background: #0ff;
			}
		}
	}
</style>