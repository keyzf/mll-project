<script>
	import modal from './modal.vue';

	import {
		modalShow
	} from '../vuex/actions';

	export default{
		components:{ modal },
		props:['deposit'],
		vuex: {
			getters: {
				show: state => state.modalShow,
				title:state => state.modalTitle,
			},
			actions: {
				modalShow
			}
		},
		data(){
			return {
				newMon:'',
				newTel:'',
				monSh:false,
				telSh:false,
				saveDep:{
					deposit:'',
					phone:'',
				}
			}
		},
		watch:{
			newMon (val,oldVal){
				if(val == ''){
					this.monSh = true;
				}
				
				if(val !=''){
					this.monSh = false;
				}
			},
			newTel (val,oldVal){
				if(val == '' || !(/^1[3|4|5|7|8]\d{9}$/.test(val)) ){
					this.telSh = true;
				}
				if(val !='' && (/^1[3|4|5|7|8]\d{9}$/.test(val))){
					this.telSh = false;
				}
			}
		},
		ready(){
			this.todo();
		},
		methods:{
			todo(){
				this.newMon = this.deposit.deposit;
				this.newTel = this.deposit.phone;
			},
			changeDepose(){
				var _ =this;
				if(this.monSh === false && this.telSh === false){
					_.saveDep.deposit = this.newMon;
					_.saveDep.phone = this.newTel;
					$.post('show/saveDeposit',_.saveDep,function(data){
						console.log(data)
						if(data.success === true){
							_.deposit.deposit = _.newMon;
							_.deposit.phone = _.newTel;
							_.modalShow();
						}else{
							alert('修改失败')
						}
					})
					
				}
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
					<span class="modal-close" @click='modalShow()'></span>
				</div>
				<div class="modal-content">
					<div class="search-group">
						<em class="must-point">*</em>
						<label>预存款</label>
						<input v-model='newMon' onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')"  type="text">
						<span>元</span>
						<i v-show='monSh' class="error">请输入大于0的数字</i>
					</div>
					<div class="search-group">
						<em class="must-point">*</em>
						<label>客服电话</label>
						<input v-model='newTel' type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" maxlength="11">
						<span>请填写手机号码</span>
						<i v-show='telSh' class="error">请输入正确的手机号码</i>
					</div>
					<div class="search-group">
						<h5>当预存款消耗至2000以下时，会给客服电话发送预警短信</h5>
					</div>
				</div>
				<div class="modal-foot">
					<button type="button" class="btn-cancel" @click='modalShow()'>取&emsp;消</button>
					<button type="button" class="btn-save" @click='changeDepose()'> 确&emsp;认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang='less' scoped>
.modal-container {
   width: 480px;
   box-sizing:border-box;
   text-align:left;
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
    margin-bottom: 20px;
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
   .search-group{
   	position:relative;
   	margin-right:0;
   	label{
   		display:inline-block;
   		width:56px;
   	}
   	input{
   		width:200px;
   	}
   	span{
   		font-size:14px;
   		margin-left:10px;
	   	text-align:left;
   	}
   	.error{
   		font-size:14px;
   		display:inline-block;
   		position:relative;
   		left: 65px;
   		font-style:normal;
   		color:#f94a05;
   		line-height:1;
   		margin-top:5px;
   	}
   	h5{
   		font-weight:normal;
   		font-size:14px;

   	}
   	.must-point{
   		top:9px;
   		left:-10px;
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
</style>