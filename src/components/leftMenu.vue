<template>
  <div class="left-menu">
    <div class="menu-logo"><img src="../../static/images/logo.png" alt="公司logo"></div>
    <ul>
    	<li class="color-red" v-for="(item,index) in navList" :key="index">
        <div class="item-box" :class="{active:current==index}">
          <router-link class="nav-text" :to="{name:item.url}" tag="div">
            <span :class="item.icon"></span>{{item.text}}
          </router-link>
          <!-- <div class="nav-text" @click="currentGo(item.url)"><span :class="item.icon"></span>{{item.text}}</div> -->
          <span class="right-icon el-icon-arrow-down" v-if="item.detailList&&current!=index"></span>
          <span class="right-icon el-icon-arrow-up" v-if="item.detailList&&current==index"></span>
        </div>
        <ul v-if="current==index">
          <li class="color-blue" v-for="(arr,$index) in item.detailList" :key="$index">
            <router-link class="nav-text navlist-text" :to="{name:arr.url}" tag="div" :class="{active:on==$index}">
              <span :class="arr.icon"></span>{{arr.name}}
            </router-link>
            <!-- <div class="nav-text navlist-text"><span :class="arr.icon"></span>{{arr.name}}</div> -->
          </li>
        </ul>

      </li>
    </ul>
  </div>
</template>
<style scoped>
  .menu-logo{
    padding-top: 50px;
  }
  .menu-logo,.menu-logo img{
    width: 130px;
    text-align: center;
  }
  .el-menu{
    border-right:none;
    background-color: transparent;
    padding-top: 40px;
  }
  .color-blue{
    color: #fff;
    cursor: pointer;
    text-align: left;
    padding-left: 20px;
  }
  .item-box{
    position: relative;
    color: rgb(191, 203, 217);
    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  .right-icon{
    position: absolute;
    right: 0px;
    top:20px;
  }
  .active{
    color: rgb(64, 158, 255);
  }
  .navlist-text{
    padding:20px 0 0px 20px;
  }
</style>
<script type='ecmascript-6'>
	export default {
    props:{
      current:{
        type:Number,
        default:0
      },
      on:{
        type:Number,
        default:0
      }
    },
    data () {
      return {
        navList:[
          {
            id:1,
            text:"我们的服务",
            url:"OurService",
            icon:"el-icon-s-cooperation"
          },
          {
            id:2,
            text:"我们的优势",
            url:"OurAdvantage",
            icon:"el-icon-s-data"
          },
          {
            id:3,
            text:"客户案例",
            url:"CustomerCase",
            icon:"el-icon-user-solid",
            detailList:[
              {
                name:"客户案例",
                icon:"el-icon-folder-add",
                url:"CustomerCase"
              },
              {
                name:"案例分类",
                icon:"el-icon-set-up",
                url:"CustomerClass"
              }
            ]
            //url:"CustomerCaseDetail"
          },
          /* {
            id:4,
            text:"客户详情",
            //url:"CustomerCase"
            url:"CustomerCaseDetail",
            icon:"el-icon-picture-outline-round"
          }, */
          {
            id:4,
            text:"新闻管理",
            url:"NewsClass",
            icon:"el-icon-camera-solid",
            detailList:[
              {
                name:"新闻分类",
                icon:"el-icon-folder-add",
                url:"NewsClass"
              },
              {
                name:"新闻详情",
                icon:"el-icon-set-up",
                url:"NewsCenter"
              }
            ]
          },
          {
            id:5,
            text:"关于我们",
            url:"AboutUs",
            icon:"el-icon-video-camera-solid"
          },
          {
            id:6,
            text:"合作伙伴",
            url:"Parternar",
            icon:"el-icon-s-custom"
          },
          {
            id:7,
            text:"轮播图",
            url:"Slideshow",
            icon:"el-icon-picture"
          },
          {
            id:8,
            text:"公司环境",
            url:"Company",
            icon:"el-icon-s-home"
          },
          {
            id:9,
            text:"客户需求",
            url:"CustomerDemand",
            icon:"el-icon-s-order"
          }
        ]
      }
    },
    created(){

    },
    mounted (){
    },
    components: {

    },
    computed: {

    },
    methods: {

    },
    watch: {}
	}
</script>
