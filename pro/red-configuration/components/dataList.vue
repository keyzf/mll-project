<template>
	<div class="listContent">
		<div class="left_content">
			<p class="mon">预存款：<span>{{deposit.deposit}}</span>元</p>
			<p class="tel">客服电话：<span>{{deposit.phone}}</span></p>
			<a @click='modalShow(0)' href="javascript:;">修改》</a>
		</div>
		<div class="right_content">
			使用晒单红包功能时，请确保微信支付商户平台中的余额充足，并在本页面中填写预存款金额，当预存款金额消耗为0时，系统会停用晒单红包功能
		</div>
	</div>
	<modal :deposit.sync='deposit'></modal>
</template>
<script>
	import modal from './modal.vue';
   import data from './data.js'

	import {
		modalShow
	} from '../vuex/actions';

	export default{
		components:{ modal },
		vuex: {
			getters: {
				show: state => state.modalShow
			},
			actions: {
				modalShow
			}
		},
      data(){
         return {
            deposit:data.deposit,
         }
      },
      methods:{
      	todo(){
      		var _ =this;
      		$.post('show/deposit',function(data){
      			_.deposit = data;
      		})
      	}
      }
	}
</script>

<style lang='less' scoped>
	@baseColor:#63a8eb;
	.listContent{
		display:flex;
		align-items:center;
		margin-top:30px;
		border:1px solid #eee;
		height:100px;
		box-sizing:border-box;
		padding:20px;
		.left_content,.right_content{
			box-sizing:border-box;
		}
		.left_content{
			width:70%;
			display:flex;
			flex-wrap:nowrap;
			justify-content:flex-start;
			align-items:flex-end;
			*{
				line-height:1;
			}
			p.mon{
				font-size:26px;
				vertical-align:middle;
				span{
					color:@baseColor;
				}
			}
			.tel{
				margin-left:20px;
				font-size:18px;
			}
			a{
				color:@baseColor;
				margin-left:20px;
			}
		}
		.right_content{
			width:360px;
			font-size:12px;
			color:#666;
			padding-left:10px;
			position:relative;
		}
		.right_content:before{
			content:'*';
			position:absolute;
			left:0;
			top:0;
		}
	}
</style>