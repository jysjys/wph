<template>
	<div class="cart-icon" v-if="cartFlag">
		{{cartFlag}}
	</div>
</template>
<script type="text/javascript">
import {mapActions} from "vuex";
import {mapState} from "vuex";
import {ADDCARTFLAG} from '../store'
	export default {
		name:"cart-icon",
		data(){
			return{
				
			}
		},
		computed:mapState({
			cartFlag:state => state.addCartFlag
		})
	}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
	.cart-icon{
		position: absolute;
		left: 50%;
		top: 20%;
		margin-left: -25px;
		background: #AAAAAA;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		display: block;
		animation: go 2s ease-in ;
	}
	@keyframes go{
		0{
			transform: scale(1);
		}
		10%{
			left: 49%;
			top: 30%;
		}
		20%{
			left: 46%;
			top: 40%;
		}
		30%{
			left: 43%;
			top: 50%;
		}
		100%{
			transform: scale(0.4);
			left: 40%;
			top: 70%;
			opacity: 0;
			display: none;
		}
	}
</style>