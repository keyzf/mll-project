<script>
	import item from './item.vue';
	import delitem from './delete.vue';

	import {
		modalShow,
		editShow,
		deleteItem
	} from '../vuex/actions';

	export default{
		components:{ item,delitem },
		vuex: {
			getters: {
				show: state => state.modalShow,
				itemShow : state => state.editShow,
			},
			actions: {
				modalShow,
				editShow,
				deleteItem
			}
		},
		data (){
			return {
				tableInfo:{
					content:[]
				},
				currentPage:0,
				itemInfo:{
					name:'',
					state:'',
					storeUuids:[],
					rule:{
						payMoney:'',
						ratio:''
					},
					activityBeginDate:'',
					activityEndDate:'',
					type:'',
					avgMoney:'',
					owerRatio:''
				},
				/*规则名称类型*/
				ruleList:{
					ruleName:'',
					state:'',
					size:'10',
					page:0
				},
				/*item验证码*/
				vali:{
					name:false,
					state:false,
					storeUuids:false,
					rule:false,
					ruleRatio: false,
					activityDate:false,
					type:false,
					avgMoney:false,
					owerRatio:false
				}
			}
		},
		ready(){
			this.todo()
		},
    watch:{
      currentPage(val,oldVal){
        this.todo();
      }
    },
		methods:{
			todo(rule){
				var _ = this;

				$.post('show/ruleList',_.ruleList,function(data){
					$(data.content).each(function(){
						this.activityBeginDate = _.changeDate(this.activityBeginDate);
						this.activityEndDate = _.changeDate(this.activityEndDate);
					})

					_.tableInfo = data;

					if (data.total > 10) {
					   function pageselectCallback(page_id, jq) {
					      _.ruleList.page = page_id;
                		_.currentPage = page_id;
					      return false;
					   }
					   $("#Pagination").pagination(data.total, {
					      callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
					      prev_text: " 上一页",
					      next_text: "下一页 ",
					      items_per_page: 10, //每页的数据个数
					      num_display_entries: 4, //两侧首尾分页条目数
					      current_page: _.currentPage,   //当前页码
					      num_edge_entries: 2 //连续分页主体部分分页条目数
					   });
					} else {
					   $("#Pagination").html('');
					}
				})
			},
			searchItem(){
				var _ = this;
				_.currentPage = 0;
				_.ruleList.page = 0;
				_.todo(_.ruleList)
			},
			addItem(){
				this.itemInfo = {
					name:'',
<<<<<<< HEAD
					state:'',
					all:true,
					storeUuids:[],
=======
					state:'fixed',
					storeUuids:'',
>>>>>>> 7b4443e24c0d87895766820c4ea5f6fa6c26295a
					rule:[{
						payMoney:'',
						ratio:''
					}],
					activityBeginDate:'',
					activityEndDate:'',
					type:'fixed',
					avgMoney:'1',
					owerRatio:''
				};
				this.vali={
					name:false,
					state:false,
					storeUuids:false,
					rule:false,
					activityDate:false,
					type:false,
					avgMoney:false,
					owerRatio:false,
					ruleRatio:false
				};
				this.init();
				this.editShow();
			},
			editItem(uid){
				var _ = this;
				_.vali={
					name:false,
					state:false,
					storeUuids:false,
					rule:false,
					activityDate:false,
					type:false,
					avgMoney:false,
					owerRatio:false,
					ruleRatio:false
				}
				$.post('show/ruleDetail',{id:uid},function(data){
					data.activityBeginDate = _.changeDate(data.activityBeginDate);
					data.activityEndDate = _.changeDate(data.activityEndDate);
					_.itemInfo = data;
					// $('#cardEndDate').val(_.itemInfo.activityEndDate);
					_.init(_.itemInfo.activityBeginDate);
					_.editShow(uid);
				})
			},
			init(beg){
				var _ =this;
				var cardStay = {
					start:$('#cardStartDate'),
					end:$('#cardEndDate'),
					today:beg,
					init:function(){
					   cardStay.inputVal();
					   // cardStay.today = new Date($("#cardStartDate").val());
					   if(!beg){
					   	$('#cardStartDate').val('')
					   	_.itemInfo.activityBeginDate = ''
					   }
					   cardStay.endFun();
					   cardStay.startFun();
					   cardStay.end.datepicker('option', 'minDate', new Date(moment(_.itemInfo.activityBeginDate).add('days', 0)));
					   $('#cardEndDate').val(_.itemInfo.activityEndDate)

					},
					startFun:function(){
					   cardStay.start.datepicker({
					       dateFormat : 'yy-mm-dd',
					       dayNamesMin : ['日','一','二','三','四','五','六'],
					       monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
					       altFormat : 'yy-mm-dd',
					       yearSuffix:'年',
					       showMonthAfterYear:true,
					       firstDay : 1,
					       showOtherMonths:true,
					       minDate : -36000,
					       maxDate:36000,
					       onSelect:function(dateText,inst){
					       		_.itemInfo.activityBeginDate = dateText;
					           cardStay.end.datepicker('option', 'minDate', new Date(moment(dateText).add('days',0)));
					           // cardStay.end.datepicker('option', 'maxDate', new Date(moment(new Date()).add('days', -1)));
					       }

					   });
					},
					endFun:function(){
					   cardStay.end.datepicker('refresh');
					   cardStay.end.datepicker({
					       dateFormat : 'yy-mm-dd',
					       dayNamesMin : ['日','一','二','三','四','五','六'],
					       monthNames : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
					       altFormat : 'yy-mm-dd',
					       yearSuffix:'年',
					       showMonthAfterYear:true,
					       firstDay : 1,
					       showOtherMonths:true,
					       minDate :-36000,
					       maxDate:36000,
					   });
					},
					transformStr:function(day,strDay){
					   switch (day){
					       case 1:
					           strDay  = '星期一';
					           break;
					       case 2:
					           strDay  = '星期二';
					           break;
					       case 3:
					           strDay  = '星期三';
					           break;
					       case 4:
					           strDay  = '星期四';
					           break;
					       case 5:
					           strDay  = '星期五';
					           break;
					       case 6:
					           strDay  = '星期六';
					           break;
					       case 0:
					           strDay  = '星期日';
					           break;
					   }
					   return strDay;
					},
					compare:function(obj){
					   var strDay = '今天';
					   var myDate = new Date(cardStay.today.getFullYear(),cardStay.today.getMonth(),cardStay.today.getDate());
					   var day = (obj.datepicker('getDate') - myDate)/(24*60*60*1000);
					   day == 0 ? strDay: day == 1 ?
					       (strDay = '明天') : day == 2 ?
					       (strDay = '后天') : (strDay = cardStay.transformStr(obj.datepicker('getDate').getDay(),strDay));
					   return strDay;
					},
					inputVal:function(){
					   cardStay.inputTimes(cardStay.start,0);
					   cardStay.inputTimes(cardStay.end,-1);
					},
					inputTimes:function(obj,day){
					   var m = new Date(moment(cardStay.today).add('days', day));
					   obj.val(m.getFullYear() + "-" + cardStay.addZero((m.getMonth()+1)) + "-" + cardStay.addZero(m.getDate()));
					},
					addZero:function(num){
					   num < 10 ? num = "0" + num : num ;
					   return num;
					}
				}
				cardStay.init();
			},
			changeDate(d){
				var nd = parseInt(d);
				var year=new Date(nd).getFullYear();
				var month=new Date(nd).getMonth()+1;
				var date=new Date(nd).getDate();
				if(month<10){
					month = '0'+month;
				}
				if(date<10){
					date = '0'+date;
				}
				return year+"-"+month+"-"+date;
			},
		},
		events:{
			'list-events':function(){
				var _ = this;
				$.post('show/ruleList',_.ruleList,function(data){
					$(data.content).each(function(){
						this.activityBeginDate = _.changeDate(this.activityBeginDate);
						this.activityEndDate = _.changeDate(this.activityEndDate);
					})
					_.tableInfo = data;
					if (data.total > 10) {
					   function pageselectCallback(page_id, jq) {
					      _.ruleList.page = page_id;
                _.currentPage = page_id;
					      return false;
					   }
					   $("#Pagination").pagination(data.total, {
					      callback: pageselectCallback,//PageCallback() 为翻页调用次函数。
					      prev_text: " 上一页",
					      next_text: "下一页 ",
					      items_per_page: 10, //每页的数据个数
					      num_display_entries: 4, //两侧首尾分页条目数
					      current_page: _.currentPage,   //当前页码
					      num_edge_entries: 2 //连续分页主体部分分页条目数
					   });
					} else {
					   $("#Pagination").html('');
					}
				})
			}
		}
	}
</script>

<template>
	<div class="table-form">
		<div class="search-group">
			<label>规则名称</label>
			<input v-model='ruleList.ruleName' type="text">
		</div>
		<div class="search-group">
			<label>状态</label>
			<select v-model='ruleList.state'>
				<option selected>全部</option>
				<option>进行中</option>
				<option>已过期</option>
				<option>未开始</option>
				<option>已停用</option>
			</select>
		</div>
		<div class="search-group ml30">
			<input class="btn-default" type="button" value="查询" @click='searchItem()'>
			<input class="btn-default" type="button" value="新增规则" @click='addItem()'>
		</div>
		<table class="table-list">
			<thead>
				<tr>
					<th width="30%">
						规则名称
						<div class="opr-tips">
                     <span class="tips-icon">?</span>
                     <div class="opr-tips-content">
                        <dl class="tips-list">
                           <dd>一个门店可配置多个红包规则，以发放红包金额最多的规则为准</dd>
                        </dl>
                     </div>
                  </div>
					</th>
					<th width="30%">有效时间</th>
					<th width="20%">状态</th>
					<th width="20%">操作</th>
				</tr>
			</thead>
			<tbody>
				<template v-if='tableInfo.content.length == 0'>
					<tr>
						<td colspan="30">
							<span class="noData"></span>
						</td>
					</tr>
				</template>
				<template v-else>
					<tr v-for='item in tableInfo.content'>
						<td>{{item.name}}</td>
						<td>{{item.activityBeginDate}}~{{item.activityEndDate}}</td>
						<td>{{item.state}}</td>
						<td>
							<div class="operate-group">
								<a href="javascript:;" @click='editItem(item.id)'>编辑</a>
								<slot v-if='item.state=="已停用"'>
									<a style="margin:0" href="javascript:;" @click='deleteItem(item.id,1)'>启用</a>
								</slot>
								<slot v-else>
									<a class="delete" href="javascript:;" @click='deleteItem(item.id,0)'>停用</a>
								</slot>
							</div>
						</td>
					</tr>
				</template>
			</tbody>
		</table>
		<div id="Pagination" class="pageNav"></div>
	</div>
	<item :iteminfo.sync='itemInfo' :vali.sync='vali'></item>
	<delitem></delitem>
</template>

<style scoped lang='less'>
	.table-list{
		table-layout:fixed;
		tbody{
			td{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}

	}
	.table-form{
		margin-top:20px;
		.ml30{
			margin-left:10px;
		}
	}
	.noData{
		display: inline-block;
		width: 100%;
		height: 400px;
		background: url(../views/images/noinfo.png) center center no-repeat;
	}
	.pageNav{
		margin-top:20px;
	}
	.opr-tips{
	    position: relative;
	    vertical-align: 15px;
	    display: inline-block;
	    font-weight: normal;
	}

	.opr-tips .tips-icon {
	    position: absolute;
	    top: 1px;
	    display: inline-block;
	    width: 15px;
	    height: 15px;
	    border-radius: 50%;
	    border: 1px solid #666666;
	    font-size: 12px;
	    line-height: 15px;
	    text-align: center;
	    cursor: pointer;
	    z-index: 9;
	    background:#fff;
	}

	.tips-icon:hover+.opr-tips-content {
	    transform: scale(1);
	}

	.opr-tips .opr-tips-content {
	    position: absolute;
	    top: 32px;
	    left:-20px;
	    padding: 5px 10px;
	    width: 200px;
	    border: 1px solid #ddd;
	    background: #fff;
	    box-sizing: border-box;
	    transform-origin:12% 0 ;
	    transform: scale(0);
	    transition: all .3s ease-in-out;
	    text-align: justify;
	}

	.opr-tips .opr-tips-content:before {
	    content: "";
	    width: 0;
	    height: 0;
	    border-width: 15px  10px;
	    border-style: solid;
	    border-color: transparent transparent #ddd transparent;
	    position: absolute;
	    left: 15px;
	    top: -30px;
	}

	.opr-tips .opr-tips-content:after {
	    content: "";
	    width: 0;
	    height: 0;
	    border-width: 15px  10px;
	    border-style: solid;
	    border-color: transparent transparent #fff transparent;
	    position: absolute;
	    left: 15px;
	    top: -28px;
	}
</style>
