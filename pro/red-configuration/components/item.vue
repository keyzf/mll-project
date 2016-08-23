<script>
	import {
		editShow,storeShow
	} from '../vuex/actions';

	import store from './newStore.vue';

	export default{
		components : { store },
		vuex: {
			getters : {
				show : state => state.editShow,
				stShow: state => state.storeShow,
				title : state => state.modalTitle,
			},
			actions: {
				editShow,storeShow
			}
		},
		props:["iteminfo","vali"],
		data(){
			return {
				hasCheck:[],
<<<<<<< HEAD
				activeDia:'',
=======
				vali:{
					name:false,
					state:false,
					storeUuids:false,
					rule:false,
					activityDate:false,
					type:false,
					avgMoney:false,
					owerRatio:false
				}
			}
		},
		watch:{
			iteminfo:{
				handler(val, oldVal){
					var _ = this;
					/*为空*/
					if(val.name == ''){
						_.vali.name = true;
					};
					if(val.state == ''){
						_.vali.state = true;
					};

					if(val.storeUuids.length === 0 && $('.radius').eq(1).hasClass('current')){
						_.vali.storeUuids = true;
					};

					$(val.rule).each(function(){
						if(this.payMoney == '' || this.ratio == '' || this.ratio >100){
							_.vali.rule = true;
							return false;
						}else{
							_.vali.rule = false;
						};
					});
					if(val.activityBeginDate == '' || val.activityEndDate == ''){
						_.vali.activityDate = true;
					};
					if(val.avgMoney == '' || val.avgMoney>199 ){
						_.vali.avgMoney = true;
					};
					if(val.owerRatio == '' || val.owerRatio>100 ){
						_.vali.owerRatio = true;
					};
					/*非空*/
					if(val.name != ''){
						_.vali.name = false;
					};
					if(val.state != ''){
						_.vali.state = false;
					};
					if(val.storeUuids.length > 0 || $('.radius').eq(0).hasClass('current')){
						_.vali.storeUuids = false;
					};

					if(val.activityBeginDate != '' && val.activityEndDate != ''){
						_.vali.activityDate = false;
					};
					if(val.avgMoney != '' && val.avgMoney<200 ){
						_.vali.avgMoney = false;
					};
					if(val.owerRatio != '' && val.owerRatio<101 ){
						_.vali.owerRatio = false;
					};
				},
				deep:true
>>>>>>> 7b4443e24c0d87895766820c4ea5f6fa6c26295a
			}
		},
		methods:{
			getTime(d){
				return (Date.parse(new Date(d))/1000);
			},
			checkStore(e){
				var _ =this;
				$(e.currentTarget).parent().find('a').removeClass('current');
				$(e.currentTarget).addClass('current');
				if(e.currentTarget.innerHTML === '指定门店'){
					// _.storeShow();
					_.activeDia = 'store';
					_.iteminfo.all = false;
				}
				if(e.currentTarget.innerHTML === '所有门店'){
					_.iteminfo.storeUuids=[];
					_.iteminfo.all = true;
				}
			},
			cfix(){
				var _ = this;
				var et = event.currentTarget.innerHTML;
				if(et == '随机金额'){
					_.iteminfo.type = 'random';
					_.iteminfo.avgMoney = '2';
				}
				if(et == '固定金额'){
					_.iteminfo.type = 'fixed';
					_.iteminfo.avgMoney = '1';
				}
			},
			cutRule(n){
				this.iteminfo.rule.splice(n,1)
			},
			addRule(){
				let newR = {
					payMoney:'',
					ratio:''
				}
				this.iteminfo.rule.push(newR);
			},
			saveItem(){
				var _ = this;
				_.valiCon();
				var a = false;
				for(var i in _.vali){
					if(_.vali[i] == true){
						a = false
						return false;
					}else{
						a = true
					}
				}
				if(a == true){
<<<<<<< HEAD
					_.iteminfo.activityBeginDate = Date.parse(_.iteminfo.activityBeginDate)-28800000;
					_.iteminfo.activityEndDate = Date.parse($('#cardEndDate').val())+86399999-28800000;
					$.ajax({
						type:'post',
	               url:'show/saveRule',
	               data:JSON.stringify(_.iteminfo),
=======
					console.log(_.iteminfo);
					_.iteminfo.activityBeginDate = Date.parse(_.iteminfo.activityBeginDate);
					_.iteminfo.activityEndDate = Date.parse(_.iteminfo.activityEndDate);
					$.ajax({
						type:'post',
	               url:'show/saveRule',
	               data:{"storeName":_.storeName},
>>>>>>> 7b4443e24c0d87895766820c4ea5f6fa6c26295a
	               contentType : 'application/json',
	               success:function(data){
	               	if(data.success === true){
								_.editShow();
<<<<<<< HEAD
								_.$dispatch('list-events');
=======
>>>>>>> 7b4443e24c0d87895766820c4ea5f6fa6c26295a
							}
	               }
					})
					// $.post('show/saveRule',_.iteminfo,function(data){
					// 	if(data.success === true){
					// 		_.editShow();
					// 	}
					// })
				}
			},
			valiCon(){
				var _ = this;
				/*为空*/
				if(_.iteminfo.name == ''){
					_.vali.name = true;
				};

				if(_.iteminfo.storeUuids.length === 0 || _.iteminfo.all == false ){
					_.vali.storeUuids = true;
				};

				$(_.iteminfo.rule).each(function(){
					if(this.payMoney == '' || this.ratio == '' || this.ratio >100){
						_.vali.rule = true;
						return false;
					}else{
						_.vali.rule = false;
					}

					if(this.payMoney*this.ratio*0.01 < 1){
						_.vali.ruleRatio = true;
						return false;
					}

					if(this.payMoney*this.ratio*0.01 >= 1) {
						_.vali.ruleRatio = false;
					}
				});

				if(_.iteminfo.activityBeginDate == '' || _.iteminfo.activityEndDate == ''){
					_.vali.activityDate = true;
				};
				if(_.iteminfo.avgMoney == '' || _.iteminfo.avgMoney>199 || _.iteminfo.avgMoney<1 ){
					_.vali.avgMoney = true;
				};
				if(_.iteminfo.owerRatio>100 || _.iteminfo.owerRatio<1){
					_.vali.owerRatio = true;

				};
				/*非空*/
				if(_.iteminfo.name != ''){
					_.vali.name = false;
				};

				if(_.iteminfo.storeUuids.length > 0 || _.iteminfo.all == true ){
					_.vali.storeUuids = false;
				};

				if(_.iteminfo.activityBeginDate != '' && _.iteminfo.activityEndDate != ''){
					_.vali.activityDate = false;
				};
				if(_.iteminfo.avgMoney != '' && _.iteminfo.avgMoney<200 && _.iteminfo.avgMoney>0 ){
					_.vali.avgMoney = false;
				};
				if(_.iteminfo.owerRatio == '' || _.iteminfo.owerRatio<101 && _.iteminfo.owerRatio>0 ){
					_.vali.owerRatio = false;
				};
			}
		}
	}
</script>

<template>
	<div v-show='show' class="modal-mask" transition="modal">
		<div class="modal-wrapper">
			<div class="modal-container">
				<div class="modal-head">
					<div class="modal-title">
						<slot name="header">{{title}}</slot>
					</div>
					<span class="modal-close" @click='editShow()'></span>
				</div>
				<div class="modal-content">
					<div class="search-group">
						<em class="must-point">*</em>
						<label>规则名称</label>
						<input style="padding-right:60px" maxlength="32" v-model='iteminfo.name' class="wd470" type="text" name="">
						<strong class="nub">{{iteminfo.name.length}}/32</strong>
						<em v-show='vali.name' class="error">请填写规则名称，长度1~32个字</em>
					</div>
					<div class="search-group">
						<em class="must-point">*</em>
						<label>有效期</label>
						<input id='cardStartDate' :value='iteminfo.activityStartDate' class="wd100" type="text" name="">
						<span>至</span>
						<input id='cardEndDate' v-model='iteminfo.activityEndDate' class="wd100" type="text" name="">
						<em v-show='vali.activityDate' class="error">请填写有效期</em>
					</div>
					<div class="search-group">
						<em class="must-point top2">*</em>
						<label>适用门店</label>
						<slot v-if='iteminfo.all == true'>
							<a @click='checkStore' class='radius current' href="javascript:;">所有门店</a>
							<a @click='checkStore' class='radius' href="javascript:;">指定门店</a>
						</slot>
						<slot v-else>
							<a @click='checkStore' class='radius' href="javascript:;">所有门店</a>
							<a @click='checkStore' class='radius current' href="javascript:;">指定门店</a>
							<span class="checkNub">已选{{iteminfo.storeUuids.length}}间</span>
						</slot>
						<component :show.sync='activeDia' :is="activeDia" :chkid.sync='iteminfo.storeUuids'></component>
						<em v-show='vali.storeUuids' class="error">请选择适用门店</em>
					</div>
					<div class="search-group">
						<em class="must-point">*</em>
						<label>返点比例</label>
						<slot v-if='iteminfo.rule.length<3'>
							<div class="add_rol" v-for='item in iteminfo.rule'>
								<span>订单金额 ≥ </span>
								<input v-model='item.payMoney ' class="wd100" type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onblur="this.value=this.value.replace(/[^\d]/g,'')">
								<span>元，返点比例</span>
								<input v-model='item.ratio' class="wd100" type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onblur="this.value=this.value.replace(/[^\d]/g,'')">
								<span>%</span>
								<slot v-if='$index+1 === iteminfo.rule.length'>
									<span @click='addRule()' class="addRule"></span>
								</slot>
								<slot v-else>
									<span @click='cutRule($index)' class="cutRule"></span>
								</slot>
							</div>
						</slot>
						<slot v-if='iteminfo.rule.length === 3'>
							<div class="add_rol" v-for='item in iteminfo.rule'>
								<span>订单金额 ≥ </span>
								<input v-model='item.payMoney' class="wd100" type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onblur="this.value=this.value.replace(/[^\d]/g,'')">
								<span>元，返点比例</span>
								<input v-model='item.ratio' class="wd100" type="text" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onblur="this.value=this.value.replace(/[^\d]/g,'')">
								<span>%</span>
								<slot v-if='$index != 2'>
									<span @click='cutRule($index)' class="cutRule"></span>
								</slot>
							</div>
						</slot>
						<em v-show='vali.rule' class="error">请填写返点比例（订单金额需为正整数，返点比例范围1~100的整数）</em>
						<em v-show='vali.ruleRatio && vali.rule==false' class="error">由于红包金额最低要1元,请重新输入返点比例</em>
					</div>
					<div class="search-group flx">
						<div>
							<label>金主所得</label>
							<input v-model='iteminfo.owerRatio' class="wd100" type="text" style="margin-left: 10px;" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onblur="this.value=this.value.replace(/[^\d]/g,'')">
							<span>%</span>
						</div>
						<div>
							<span>订单拥有者可以获得红包金额的比例，当计算剩余金额不足1元时，则金主获得全部金额</span>
						</div>
					</div>
					<em v-show='vali.owerRatio' class="error anoth">请输入范围1~100的整数</em>
					<div class="search-group">
						<em class="must-point top2">*</em>
						<label>红包类型</label>
						<slot v-if='iteminfo.type=="random"'>
							<a @click='cfix' class='radius' href="javascript:;">固定金额</a>
							<a @click='cfix' class='radius current' href="javascript:;">随机金额</a>
						</slot>
						<slot v-else>
							<a @click='cfix' class='radius current' href="javascript:;">固定金额</a>
							<a @click='cfix' class='radius' href="javascript:;">随机金额</a>
						</slot>
					</div>
					<div class="search-group">
						<em class="must-point">*</em>
						<label v-if="iteminfo.type == 'fixed'">每人领取</label>
						<label v-if="iteminfo.type == 'random'">平均领取</label>
						<input v-model='iteminfo.avgMoney' class="wd100" type="text" style="margin-left: 10px;" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" onblur="this.value=this.value.replace(/[^\d]/g,'')">
						<span v-if="iteminfo.type == 'fixed'">请输入1~199的数值</span>
						<span v-if="iteminfo.type == 'random'" class="randomTips">
							请输入1~199的数值，红包金额会有随机产生,平均每人可领取该值,金额会有上下浮动
						</span>
						<em v-show='vali.avgMoney' class="error">请填写正确金额</em>
					</div>
					<div class="search-group">
						<label>红包金额</label>
						<span>红包金额 = 订单金额 * 返点比例</span>
						<span>（四舍五入，保留整数）</span>
					</div>
					<div class="search-group">
						<label>领取人数</label>
						<span class="block">
							固定金额时，领取人数 = （红包金额 - 金主所得）/ 每人领取</br>
							随机金额时，领取人数 = （红包金额 - 金主所得）/ 平均领取
						</span>
					</div>
				</div>
				<div class="modal-foot">
					<button type="button" class="btn-cancel" @click='editShow()'>取&emsp;消</button>
					<button type="button" class="btn-save" @click='saveItem()'> 保&emsp;存</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang='less' scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
}

input[type="number"]{-moz-appearance:textfield;}

.modal-container {
   width: 670px;
   max-height:100%;
   overflow-y: auto;
   overflow-x:hidden;
   margin: 0px auto;
   padding: 0px 30px 30px 30px;
   background-color: #fff;
   border-radius: 2px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
   transition: all .3s ease;
   font-family: Helvetica, Arial, sans-serif;
}

.modal-wrapper {
   display: table-cell;
   vertical-align: middle;
   color: #666;
   text-align: center;
}

.modal-head{
    position: relative;
    border-bottom: 1px solid #e8e8e8;
}

.modal-head .modal-title{
   /* height: 65px;
   line-height: 65px; */
   line-height: 1;
   padding-bottom: 15px;
   padding-top: 25px;

   font-size: 25px;
   text-align: center;
   font-weight: normal;
   color:#333;
}

.modal-head .modal-close{
   display: inline-block;
   width: 15px;
   height: 15px;
   background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAylpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTA0OTAxMjY5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTA0OTAxMjU5NzBCMTFFNTk0NEQ5NzVCQzZFNkNCMjAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuZGlkOjU2OTBmNmJiLTA5MmItMjA0YS1iOTU3LTE4NmFhMDY1MjY3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NjkwZjZiYi0wOTJiLTIwNGEtYjk1Ny0xODZhYTA2NTI2NzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7UCCNHAAAAbElEQVR42pSRyQ3AMAgEzfbfANUSxVEkZLOI5cWDGS5z91hf2NJic0hgqPDL4ugeCvxPsATJtS6Ogk5S3gpFYSWhhwYZNUvaL6HZ10g+FgTJR4I8dvsdDK9NJZi8qpNgCFMJBLiUQIQvySPAADnqHeikkPSlAAAAAElFTkSuQmCC') no-repeat;
   position: absolute;
   top: 25px;
   right: 0;
   cursor: pointer;
}

.modal-foot{
   text-align: center;
   margin-top: 10px;
}

.modal-mask{
   position: fixed;
   z-index: 9998;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, .5);
   display: table;
   transition: opacity .3s ease;
}

.modal-content {
   font-size: 14px;
   padding: 20px;
   position:relative;
   text-align:left;
   div.flx{
   	display:flex;
   	flex-wrap:nowrap;
   	align-items:center;
   	div:nth-of-type(1){
   		margin-right:20px;
   	}
   	div:nth-of-type(2){
   		width:380px;
   		span{
   			margin-left:0;
   		}
   	}
   }
   .search-group:last-of-type{
   		margin-bottom:0
   }
   .anoth{
   	display:block;
		font-size:14px;
		position:relative;
		left:65px;
		font-style:normal;
		margin-top:5px;
		line-height:1;
		color: #f94a05;
		top:-10px;
   }
   .search-group{
   	position:relative;
   	display:block;
   	input[type="number"]{
			font-size: 14px;
			margin-left: 10px;
   	}
   	.checkNub{
   		color:#63a8eb ;
   		vertical-align:0;
   		line-height:1;
   	}
   	.nub{
			font-size:14px;
			font-weight:normal;
			position:absolute;
			right:90px;
			top:0px;
			height:34px;
			line-height:34px;
			color:#999;
		}
   	.add_rol{
   		display:inline-block;
   	}
   	.add_rol:not(:nth-of-type(1)){
   		position:relative;
   		left: 56px;
   		margin-top:10px;
   	}
   	.cutRule{
   		display:inline-block;
   		width:32px;
   		height:32px;
   		vertical-align:-10px;
   		background-size:100%;
   		cursor:pointer;
   		background: url('../views/images/add_rule.png') no-repeat 0 -32px;
   	}
   	.addRule{
   		display:inline-block;
   		width:32px;
   		height:32px;
   		vertical-align:-10px;
   		background-size:100%;
   		cursor:pointer;
   		background: url('../views/images/add_rule.png') no-repeat 0 0;
   	}
   	.block{
   		display:inline-block;
   		width:380px;
   		vertical-align:top;
   	}
   	.radius{
   		display: inline-block;
			width: 95px;
			height: 16px;
			line-height: 16px;
			text-align: center;
			font-size: 14px;
			background: url('../views/images/radio.png') 0 -18px no-repeat;
			background-size: 16px;
			cursor: pointer;
			color:#666;
   	}
   	.radius:first-of-type{
   		margin-left:10px;
   	}
   	.current{
   		background-position:0 0;
   	}
   	label{
   		width:56px;
   		display:inline-block;
   	}
   	span{
   		font-size:14px;
   		margin-left:10px;
   	}
   	.wd470{
   		width:470px;
   	}
   	.wd100{
   		width:100px;
   	}
   	.must-point{
			left: -10px;
			top: 9px;
   	}
   	.top2{
   		top:2px;
   	}
   	.error{
   		display:block;
   		font-size:14px;
   		position:relative;
   		left:65px;
   		font-style:normal;
   		margin-top:5px;
   		line-height:1;
   		color: #f94a05;
   		bottom:-8px;
   	}
   }
}

.modal-foot button {
	font-size: 16px;
	width: 130px;
	height: 40px;
	line-height: 40px;
	border-radius: 3px;
	cursor: pointer;
	border: none;
	outline: none;
}

.modal-foot .btn-cancel {
	color: #666;
	background: #ddd;
	margin-right: 20px;
}

.modal-foot .btn-save {
	color: #fff;
	background: #63a8eb;
}
.modal-foot .btn-save:hover{
	background: #548ce5;
}

.modal-enter, .modal-leave {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container{
   -webkit-transform: scale(1.1);
   transform: scale(1.1);
}

.randomTips {
	display: inline-block;
    width: 300px;
    vertical-align: top;
    line-height: 1.1;
}
</style>
