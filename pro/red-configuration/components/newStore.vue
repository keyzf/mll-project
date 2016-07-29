<script>
	import {
		storeShow
	} from '../vuex/actions';

	export default{
		vuex: {
			getters: {
				show: state => state.storeShow,
				title: state => state.modalTitle
			},
			actions: {
				storeShow
			}
		},
      data(){
         return {
            storeData : [],
            hasCheck : [],
            newStore : [],
            storeName:'',
            storeLen:'',
            setting : {
               check: {
                  enable: true,
                  chkboxType:{ "Y" : "", "N" : "" }
               },
               data: {
                  simpleData: {
                     enable: true
                  }
               },
               callback:{
                  onCheck:this.checkStore
               }
            }
         }
      },
      props:['chkid'],
      watch:{
         chkid(val,oldVal){
            var _ = this;
            _.hasCheck= [];
            $.fn.zTree.init($("#treeDemo"), _.setting, _.newStore);
            setTimeout(function(){
               $(val).each(function(){
                  _.choiceByStoreUuid(this)
               });
            },0)
         },
         hasCheck(val,oldVal){
            var _ = this;
            if(val.length<_.storeLen){
               $('#all_checked').css('background-position','0 0')
            }
            if(val.length == _.storeLen){
               $('#all_checked').css('background-position','-16px 0')
            }
         }
      },
      ready(){
         this.todo()
         this.makeTree()
      },
      methods:{
         todo(){
            var _ =this;
            $.ajax({
               type:'post',
               url:'show/store',
               data:{"storeName":_.storeName},
               dataType:'json',
               async:false,
               success:function(data){
                  _.storeData = data;
                  _.storeLen = data.length;
                  
               }
            })
         },
         choiceByStoreUuid(uid){
            var _ =this;

            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var nodes = treeObj.getNodeByParam('uid',uid,null);
            treeObj.checkNode(nodes);
            _.hasCheck.push(nodes)

         },
         checkAll(){
            var _ =this;
            let ev = $(event.currentTarget);
            ev.css('background-position','-16px 0');
            _.hasCheck = [];
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            treeObj.checkAllNodes(true);
            for( var i in _.newStore){
               _.hasCheck.push(_.newStore[i]);
            }
         },
         clearAll(){
            var _ = this;
            $('#all_checked').css('background-position','0 0');
            _.hasCheck = [];
            let treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            treeObj.checkAllNodes(false);
         },
         makeTree(){
            var _ = this;
            $(_.storeData).each(function(){
               let item = {
                  id:this.id, 
                  pId:this.storeId, 
                  name:this.storeName,
                  uid:this.sysUuid
               };
               _.newStore.push(item);
            });
            $.fn.zTree.init($("#treeDemo"), _.setting, _.newStore);

         },
         checkStore(e, treeId, treeNode){
            if(treeNode.checked === true){
               this.hasCheck.push(treeNode);
            }else{
               var n = $.inArray(treeNode,this.hasCheck)
               this.hasCheck.splice(n,1)
            }
         },
         deleteItem(n,uid){
            $('#all_checked').css('position','0 0')
            var _ = this;
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var ckn = treeObj.getCheckedNodes(true);
            var nodes = treeObj.getNodeByParam('uid',uid,null)
            treeObj.checkNode(nodes, false)
            this.hasCheck.splice(n,1)
         },
         saveStoreItem(){
            var _ = this;
            var newId = []
            $(_.hasCheck).each(function(){
               newId.push(this.uid)
            });
            _.chkid = newId;
            _.storeShow();
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
					<span class="modal-close" @click='storeShow()'></span>
				</div>
				<div class="modal-content">
					<div class="store_tree">
                  <h3>所有门店</h3>
                  <p>
                     <input v-model='storeName' type="text" id="txtSearchStoreName" placeholder="输入门店名称" class="wd-273">
                     <a href="javascript:;" class="search_box" id="btnSearchStore"></a>
                  </p>
                  <ul id="treeDemo" class="ztree"></ul>
                  <div class="store_footer">
                     <a @click='checkAll' class="check_box" href="javascript:;" id="all_checked"></a>全选
                     <span>
                        共<b id="bStoreTotal">{{newStore.length}}</b>家门店
                     </span>
                  </div>
               </div>
               <div class="store_chosed">
                  <h3>已选门店</h3>
                  <ul class="chosed_stores" id="chosed_stores">
                     <li v-for='item in hasCheck' :id='item.uid'>
                        {{item.name}}
                        <a class="close_item" @click='deleteItem($index,item.uid)' href="javascript:;"></a>
                     </li>
                  </ul>
                  <div class="chosed_footer">
                     <input @click='saveStoreItem' type="submit" id="btnSaveStores" value="保存配置" class="btn-default mr-8">
                     <span>
                        已选择
                        <b style="color: #333;font-weight: normal">{{hasCheck.length}}</b>
                        家门店
                     </span>
                     <span @click='clearAll' class="clear_all" id="spCleanAll">清空所选</span>
                  </div>
               </div>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang='less' scoped>
.modal-container {
   width: 670px;
   height:630px;
   margin: 0px auto;
   background-color: #fff;
   border-radius: 2px;
   box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
   box-sizing:border-box;
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
   top: 30px;
   right: 30px;
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
   display:flex;
   .store_tree, .store_chosed {
      width: 334px;
      box-sizing: border-box;
      border-right: 1px solid #e8e8e8;
      h3{
         text-align: left;
         font-weight: normal;
         color: #333;
         font-size: 14px;
         background-color: #f4f4f4;
         margin: 0;
         padding-left: 30px;
         height: 40px;
         line-height: 40px;
         border-bottom: 1px solid #e8e8e8;
      }
   }
   .store_tree{
      padding-bottom:30px;
      .search_box{
         display:inline-block;
         position:absolute;
         right:-8px;
         top:9px;
         width:18px;
         height:18px;
         background:url('../views/images/pic_saerch.png') no-repeat;
         background-size:100%;
      }
      p{
         margin-top: 20px;
         margin-bottom: 20px;
         width: 274px;
         padding: 0;
         padding-left: 10px;
         position: relative;
         .wd-273 {
            width: 273px;
            padding-right:30px;
         }
      }
      .ztree{
         margin-top: 5px;
         margin-left:30px;
         width: 285px;
         height: 350px;
         overflow-y: auto;
         overflow-x: hidden;
      }
   }
   .store_footer{
      text-align: left;
      height: 34px;
      line-height: 34px;
      margin-top: 25px;
      margin-left:30px;
      padding-left: 10px;
      .check_box{
         display:inline-block;
         width: 16px;
         height: 16px;
         margin-right:10px;
         vertical-align:-3px;
         background:url('../views/images/tree_ico.png') 0 0 no-repeat;
      }
      .checked{
         background-position:-16px 0;
      }
      input,select{
         vertical-align: middle;
      }
      span{
         display: inline-block;
         margin-left: 12px;
         b{
            color: black;
            font-weight: normal;
         }
      }
      .mr-8{
         margin-right:8px;
      }
   }
   .chosed_footer{
      text-align: left;
      margin-top: 30px;
      color:#999;
      .clear_all{
         color: #63a8eb;
         cursor: pointer;
      }
      .btn-default{
         margin-left:20px;
         margin-right:5px;
      }
   }
   .store_chosed{
      width: 336px;
      height: 465px;
      .mr-5{
         margin-right:5px;
      }
      .chosed_stores{
         margin-top: 20px;
         padding-right:20px;
         width: 320px;
         height: 409px;
         overflow-y: auto;
         li{
            height: 36px;
            list-style:none;
            border:1px solid transparent;
            line-height: 36px;
            padding-left: 10px;
            text-align: left;
            position: relative;
            color: #666666;
            margin-left:20px;
            .close_item{
               display:inline-block;
               width:10px;
               height:9px;
               position: absolute;
               right: 10px;
               top: 13px;
               background:url(../views/images/close.png) 0px 0px no-repeat;
            }
         }
         li:hover{
            color: #63a8eb;
            border:1px solid #63a8eb;
            .close_item{
               background-position:0 -9px;
            }
         }
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