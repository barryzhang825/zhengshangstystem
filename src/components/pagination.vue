<template>
  <div>
    <div class="case-pagination">
      <!-- <div class="capa-first" :class="{on:currentPages==1}" @click="firstFun()">首页</div> -->
      <el-pagination
        class="pagination-box"
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :page-count="pages"
        :current-page="currentPage"
        @current-change="currentFun"></el-pagination>
      <!-- <div class="capa-first" :class="{on:currentPages==pages}" @click="lastFun()">尾页</div> -->
    </div>
  </div>
</template>

<style scoped>
  .case-pagination{
    margin-bottom: 56px;
  }
  .capa-first{
    font-size: 14px;
    color: #333;
    border: solid 1px #4c4c4c;
    text-align: center;
    cursor: pointer;
		line-height: 38px;
		padding: 0 12px;
  }
  .capa-first.on{
    color: #fff;
    background-color: #333;
  }
  .case-pagination,.case-pagination >>>.pagination-box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .case-pagination >>>.el-pagination .btn-next, .case-pagination >>>.el-pagination .btn-prev{
    width: 100px;
    height: 38px;
    margin: 0 8px;
  }
  .case-pagination >>>.el-pagination span:not([class*=suffix]){
    font-size: 14px;
    color: #333;
    border: solid 1px #4c4c4c;
    width: 100%;
    height: 100%;
    line-height: 38px;
    text-align: center;
  }
  .case-pagination >>>.el-pager li{
    width: 38px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    margin: 0 8px;
    border: solid 1px #4c4c4c;
    cursor: pointer;
  }
  .case-pagination >>>.el-pager li.active{
    background-color: #333;
    color: #fff;
  }
  .case-pagination >>>.el-pager li:hover{
    color: #185EE0;
  }
  .case-pagination >>>.el-pager li:hover.active{
    color: #fff;
  }
</style>
<script type='ecmascript-6'>
	// import axios from 'axios'
	//import Header from './../Header';


	export default {
    props:{
      pages:{
        type:Number
      },
      currentPage:{
        type:Number
      }
    },
    data () {
      return {
        caseIndex:0,
        //pages:15,
        currentPages:1 //当前页
      };
    },
    created(){

    },
    mounted (){
      //console.log(this.currentPageNum);
    },
    components: {

    },
    computed: {
      /* currentPageNum(){
        var getcurPage=sessionStorage.getItem("curPage");
        if(getcurPage){
          return Number(getcurPage);
        }else{
          return 1;
        }
      } */
    },
    methods: {
      currentFun(event){
        var _this=this;
        //console.log("当前页点击事件:"+event);
        _this.currentPages=event;
        /* sessionStorage.setItem("curPage", event);*/
        _this.$emit('selectPage', _this.currentPages); 
      },
/*      firstFun(){
        var _this=this;
        ////console.log("首页页点击事件:"+_this.currentPages);
        _this.currentPages=1;
        _this.$emit('selectPage', _this.currentPages);
      },
      lastFun(){
        var _this=this;
        ////console.log("尾页页点击事件:"+_this.pages);
        _this.currentPages=_this.pages;
        _this.$emit('selectPage', _this.currentPages);
      } */
    },
    watch: {}
	}
</script>
