<template>
  <div class="left-menu">
    <el-row class="tac">
      <el-col>
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item v-for="(item,$index) in navList" index="$index" :key="$index" :class="{active:current==$index}" @click="currentFun($index)">
            <router-link class="nav-text" :to="{name:item.url}" tag="div">
              <i class="el-icon-menu"></i>{{item.text}}
            </router-link>
          </el-menu-item>
<!--          <li v-for="(item,$index) in navList">
            <ul v-if="item.detailList">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>{{item.text}}</template>
                <el-menu-item v-for="(arr,index) in item.detailList" :key="index" :class="{active:on==index}" @click="currentOnFun(index)">
                  <router-link class="nav-text" :to="{name:item.url}" tag="div">
                    <i class="el-icon-menu"></i>{{arr.caseGroupName}}
                  </router-link>
                </el-menu-item>
              </el-submenu>
            </ul>
            <ul v-else> -->

<!--            </ul>
          </li> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
  .el-menu{
    border-right:none;
    background-color: transparent;
    padding-top: 50px;
  }
</style>
<script type='ecmascript-6'>
  import axios from 'axios'
	import Pagination from './pagination';
  import addOurService from './ourService/addOurService';
  import changeOurService from './ourService/changeOurService';
  import user from './user.vue';

	export default {
    props:{
      current:{
        type:Number,
        default:0
      }
    },
    data () {
      return {
        on:0,
        navList:[
          {
            id:1,
            text:"我们的服务",
            url:"Home"
          },
          {
            id:2,
            text:"业务领域",
            url:"BusinessArea"
          },
          {
            id:3,
            text:"客户详情",
            //url:"CustomerCase"
            url:"CustomerCaseDetail",
            detailList:[]
          },
        	{
        		id:4,
        		text:"客户案例",
        		//url:"CustomerCase"
        		//url:"CustomerCaseDetail"
        	},
          {
            id:5,
            text:"新闻中心",
            //url:"NewsCenter"
            //url:"NewsCenterDetail"
          },
          {
            id:6,
            text:"关于我们",
            url:"AboutUs"
          },
          {
            id:7,
            text:"联系我们",
            //url:"ContactUs"
          },
          {
            id:8,
            text:"新闻中心详情",
            url:"NewsCenterDetail"
          },
        	{
        		id:9,
        		text:"公司环境",
        		url:"Company"
        	},
        ]
      }
    },
    created(){

    },
    mounted (){
      var _this=this;
      _this.$get('/background-caseDetail/queryByPage',{}).then(data=>{
        var seller=JSON.stringify(data);
      	////console.log('结果111:'+seller);

        _this.navList[2].detailList=data.list;
      }).catch(function (error) {
      		//console.log(error);
      });
    },
    components: {

    },
    computed: {

    },
    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      }
    },
    watch: {}
	}
</script>
