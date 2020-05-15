<template>
  <div class="main">
    <div class="main-left">
      <leftMenu :current="current"></leftMenu>
    </div>
    <div class="main-right">
  		<div class="main-box">
        <div class="home">
          <div class="user-title">正尚科技后台管理平台</div>
          <div class="main-top">
            <div class="home-title">客户需求</div>
            <user></user>
          </div>
          <div class="home-table">
            <el-table :data="ourServiceList" border style="width: 100%">
                <el-table-column prop="id" label="ID"> </el-table-column>
                <el-table-column prop="name" label="客户姓名"> </el-table-column>
                <el-table-column prop="need" label="客户需求"> </el-table-column>
                <el-table-column prop="phoneNumber" label="客户需求"> </el-table-column>
              </el-table>
          </div>
          <Pagination :pages="totalPages" :currentPage="selectItemPage" @selectPage="pageAxios"></Pagination>
         </div>
  		</div>
    </div>
  </div>
</template>
<style scoped>

</style>
<script type='ecmascript-6'>
  import leftMenu from './leftmenu';
  import axios from 'axios'
	import Pagination from './pagination';
  import user from './user.vue';

	export default {
    props:{
    },
    data () {
      return {
        current:8,
        ourServiceList: [],
        value2: true,
				totalPages:1,  //默认总页数为1
				pageNumber:10,  //默认每页显示10个
				selectItemPage:1  ,//默认选中页面
        changeData:{},
        isModify:false,
        isAdd:false
      }
    },
    created(){

    },
    mounted (){
      var _this=this;
      var pageData={
        pageSize:_this.pageNumber, //每页显示条数（非必填）
        pageNum:_this.selectItemPage  //当前页（非必填）
      }
      _this.$get('/background-customerInformation/queryByPage',pageData).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);

        _this.ourServiceList=data.list;
        _this.totalPages=data.pages;
        _this.selectItemPage=data.pageNum;
      }).catch(function (error) {
      		//console.log(error);
      });
    },
    components: {
			Pagination,
      user,
      leftMenu
    },
    computed: {
    },
    methods: {
      pageAxios(page){
        //console.log(page);
        var _this=this;
        _this.selectItemPage=page;
        var dataObject={
          pageNum:_this.selectItemPage,
          pageSize:_this.pageNumber
        }
        ////console.log(dataObject);
        _this.$get('/background-customerInformation/queryByPage',dataObject).then(data=>{
          var seller=JSON.stringify(data);
          ////console.log('结果:'+seller);
          _this.ourServiceList=data.list;
          _this.totalPages=data.pages;
        })
      },
      enlargeFun(item){
        this.$alert('<div class="message-box"><img class="message-img" src="'+item.url+'" /></div>', '图片详情', {
          dangerouslyUseHTMLString: true
        });
      }
    },
    watch: {}
	}
</script>
