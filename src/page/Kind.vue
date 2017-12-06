<template>
	<div class="kind">
		<x-header  class="header" :left-options="{backText:''}">分类</x-header>
		<div class="kind-box">
			<nav>
				<ul class="nav-list">
					<li class="active" v-for="(item,index) in kindList" :key="index" @click="setActive(index)">{{item.parentdesc}}</li>
				</ul>
			</nav>
		</div>
	</div>
</template>
<script>
import { XHeader} from 'vux'
	export default{
		name:"kind",
		data(){
			return{
				kindList:[],
				activeIndex:0
			}
		},
		components:{
			XHeader
		},
		created(){
//			this.getData();
		},
		methods:{
			getData(){
				this.axios.get('json/kind.json').then(result =>{
					console.log(result);
					var data = result.data.data;
					for (var i in data.dataList) {
						this.kindList.push(data.dataList[i]);
					}
				})
			},
			setActive(index){
				this.activeIndex = index;
			}
		}
	}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
.kind{
	.kind-box{
		display: flex;
		nav{
			width: 30%;
		}
	}
	.nav-list{
		li{
			border-bottom: 1px solid #ccc;
			text-align: center;
			line-height: 45px;
			background: #eee;
			&.active{
				background: #fff;
			}
		}
	}
}
</style>