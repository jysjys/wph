<template>
	<div class="cart">
		<x-header  class="header" :left-options="{backText:''}">购物车{{shopCart.id}} <i class="iconfont icon-home" slot="right"></i></x-header>
		<div class="no" v-show="!shopCart.id">
			<img src="static/assets/cart-null.png" />
			<p>购物车空空如也,赶快去<a href="javascript:;" @click="$router.push('/home')">购物</a>吧</p>
		</div>
		<div class="yes" v-show="shopCart.id">
			<dl class="cart-list">
				<dt><div class="circle-rd"><input type="checkbox" name="all" v-model="allFlag" @click="checkAll()"/></div>{{cartList[0].bigname}}发货预计{{cartList[1].days}}送达</dt>
				<dd v-for="(item,index) in cartList" :key="index">
					<div class="circle-rd"><input type="checkbox" name="shop" class="shop-c" v-model="checkFlag[index]" @click="checkPer(index)"/></div>
					<img :src="item.smallpic" />
					<div class="cart-info">
						<p class="cart-name">{{item.title}}</p>
						<a href="javascript:;" @click="jian(index)">-</a>
						<input type="text" v-model="shopNumber[index]" />
						<a href="javascript:;" @click="add(index)">+</a>
					</div>
					<div class="cart-price">
						<span>{{item.ourprice}}</span>
						<i class="iconfont icon-delete" @click="getIndex(index)"></i>
					</div>
				</dd>
			</dl>
			<div class="cart-bottom">
				<div class="bottom-item">已选择件商品</div>
				<div class="bottom-item sum-title">
					商品总额:<br />优惠:<br />总计(不含运费、税费):
				</div>
				<div class="bottom-item bottom-price">
					￥{{priceSum}}<br />
					￥{{freight}}<br />
					￥{{sum}}
				</div>
			</div>
		</div>
		<confirm v-model="confirmFlag"
	      title="要删除吗?"
	      @on-confirm="deleteCart">  
	        <p style="text-align:center;">删除吗?</p>
	    </confirm>
	</div>
</template>  
<script type="text/javascript">
import {XHeader,Confirm } from "vux"
import {mapActions} from "vuex";
import {mapState} from "vuex";
import {ADDCARTFLAG} from '../store'
	export default {
		name:"cart",
		data(){
			return{
				cartList:[],      //购物车列表
				shopNumber:[1,1], //购车车商品个数,获取个数
				cartIndex:0,
				
				checkFlag:[false,false],//购车车商品是否选中,获取个数
				allFlag:false,   //全选,默认fasle
				checkNumber:0,    //选中的个数,默认为0
				
				priceSum:0,     //下面是价格
				freight:0,
				sum:0
			}
		},
		components:{
			XHeader,
			Confirm 
		},  
		computed:mapState({
			shopCart:state => state.shopCart,
			confirmFlag:state =>state.confirmFlag
		}),
		created(){
			this.getCart();
		},
		methods:{
			...mapActions(['CONFIRMFLAG']),
			getCart(){
				this.axios.get('json/cart.json').then(result =>{
					var data = result.data.data.dataList;
					for (var i in data) {
						this.cartList.push(data[i]);
					}
					//获取购物车的商品id跟数量(通过localstorge),通过循环得到每个商品的id跟数量
					var shopCart = this.shopCart;
					console.log(this.shopCart)
					for(var i in shopCart){
						console.log(shopCart)
					}
				})
			},
			jian(index){
				var number = this.shopNumber[index];
				if(number > 1){
					number --;
				}else{
					number == 1;
				}
				this.$set(this.shopNumber,index,number)
				this.getPriceSum();
				
				//后续..输入框数量发生变化,需要将数量重新存储到localstorage中....
			},
			add(index){
				var number = this.shopNumber[index];
				number ++;
				this.$set(this.shopNumber,index,number);
				this.getPriceSum();
				
				//后续..输入框数量发生变化,需要将数量重新存储到localstorage中....
			},
			checkAll(){
				this.allFlag = !this.allFlag;
				
				//通过判断是否全选了,分别设置单个状态(全选了,单状态全选中)
				if(this.allFlag){
					for(var i = 0;i<this.checkFlag.length;i++){
						this.checkFlag.splice(i,1,true);
						this.checkNumber = this.checkFlag.length;
					}
				}else{
					for(var i = 0;i<this.checkFlag.length;i++){
						this.checkFlag.splice(i,1,false);
						this.checkNumber = 0;
					}
				}
				this.getPriceSum();
			},
			checkPer(index){
				this.checkFlag.splice(index,1,!this.checkFlag[index]);
				
				//通过改变单个状态,判断是否全选了(只要有一个单状态没选中,就不算全选)
				if(this.checkFlag[index]){
					this.checkNumber ++;
				}else{
					this.checkNumber --;
				}
				
				if(this.checkNumber == this.checkFlag.length){
					this.allFlag = true;
				}else{
					this.allFlag = false;
				}
				this.getPriceSum();
			},
			getPriceSum(){
				this.priceSum = 0;
				for(var i = 0;i<this.checkFlag.length;i++){
					if(this.checkFlag[i]){
						this.priceSum += this.cartList[i].ourprice * this.shopNumber[i]
					}
				}
			},
			getIndex(index){
				this.CONFIRMFLAG(true);
				this.cartIndex = index;
			},
			deleteCart(){
				console.log(this.cartIndex);
				this.CONFIRMFLAG(false);
			}
		}
	}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.no{
	margin-top: 46px;
	img{
		display: block;
		width: 100px;
		margin: 60% auto 0 auto;
	}
	p{
		text-align: center;
	}
}
.yes{
	margin-top: 46px;
	.cart-list{
		background: #fff;
		dt{
			padding: 10px 12px;
			border-bottom: 1px solid #ddd;
			font-size: 14px;
		}
		dd{
			display: flex;
			padding: 10px 12px;
			border-bottom: 1px solid #ddd;
			&:last-of-type{
				border-bottom:none;
			}
			img{
				width: 50px;
				height: 50px;
			}
			.cart-info{
				margin-left: 15px;
				flex: 1;
				font-size: 0;
				.cart-name{
					font-size: 13px;
				}
				a{
					display: inline-block;
					width: 20px;
					line-height: 20px;
					border:1px solid #ddd;
					text-align: center;
					font-size: 13px;
				}
				input[type="text"]{
					width: 30px;
					text-align: center;
					line-height: 20px;
					border-top: 1px solid #ddd;
					border-bottom: 1px solid #ddd;
					font-size: 13px;
				}
			}
			.cart-price{
				width: 85px;
				text-align: right;
			}
		}
	}
	.cart-bottom{
		background: #fff;
		margin-top: 10px;
		display: flex;
		padding: 10px 12px;
		font-size: 11px;
		.bottom-item{
			width: 85px;
			&.sum-title{
				flex: 1;
				text-align: right;
			}
			&.bottom-price{
				text-align: right;
			}
		}
	}
	
	input[type="checkbox"]{
		vertical-align: text-top;
		margin-right: 12px;
	}
}
</style>