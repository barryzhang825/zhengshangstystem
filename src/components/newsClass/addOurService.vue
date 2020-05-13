<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div class="conmain-left">
            <div class="confomml-name upload-demo">
              <label for="name">新闻分组名称</label>
              <input id="name" name="name" v-model="name" type="text" placeholder="请填写新闻分组名称">
            </div>
          </div>
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认添加</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消添加</el-button></div>
			</form>
		</div>
   </div>
</template>
<style scoped>
  .confom-main{
    display: flex;
    justify-content: space-between;
  }
  .home-form{
    width: auto;
  }
</style>
<script type='ecmascript-6'>
  import newsTinym from './../newsTinym.vue';
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:'http://39.98.80.223:8080/official-website/background-newsGroupName/add',
				isModify:true,//是否添加
        oldImg:'',
        name:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true
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
      addData(data){
        this.isHidden=data;
      },
      quiteFun(){
        this.isModify=false;
				$("body").css("overflow","auto");
        setTimeout(function(){
        	location.reload();
        },0);
      },
      change(){
				var _this=this;
				$("#homeModifyFrom").validate({
					rules: {
						name: "required"
					},
					messages: {
						name: "不能为空！"
					},
					submitHandler:function(form) {
            var dataStr={
              //file:_this.oldImg,
              name:_this.name
             }
             //console.log(dataStr);
            _this.$form(_this.upLoadUrl,dataStr).then(res=>{
              var seller=JSON.stringify(res);
              //console.log('结果:'+seller);
               //console.log(res);
               //debugger
              if(res.status==200){
                _this.$message({
                  message: '添加成功!',
                  type: 'success'
                });
                 setTimeout(function(){
                   location.reload();
                 }, 500);
              }else{
                _this.$message.error(res.data);
                setTimeout(function(){
                   location.reload();
                 }, 500);
              }
             }).catch(function (error) {
               //console.log(error);
              _this.$message.error(error);
               setTimeout(function(){
                 location.reload();
               }, 500);
             });
					}
				});

			}
    },
    watch: {}
	}
</script>
