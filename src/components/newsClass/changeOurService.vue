<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div class="conmain-left">
            <div v-show="isHidden" class="confomml-name upload-demo">
              <label for="serviceId">id</label>{{serviceId}}
            </div>
            <div class="confomml-name upload-demo">
              <label for="serviceTitle">新闻标题</label>
              <input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="请输入新闻标题">
            </div>
            <div class="confomml-name upload-demo old-img-box">
              <label for="name">新闻分组</label>
              <input id="name" name="name" v-model="name" type="text" placeholder="修改新闻分组">
            </div>
          </div>
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认修改</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消修改</el-button></div>
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
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:'http://39.98.80.223:8080/official-website/background-newsGroupName/update',
				isModify:true,//是否修改
        oldImg:'',
        serviceId:0,
        name:'',
        isHidden:true,
        isTinymce:false,
        upImg:false
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
      setData(data){  //初始化数据
        //console.log(data);
        if(data.id){
          this.serviceId=data.id;
          this.name=data.name;
        }
      },
      quiteFun(){
        this.isModify=false;
        $("body").css("overflow","auto");
      },
      change(){
				var _this=this;
        //console.log("确认修改")
				$("#homeModifyFrom").validate({
					rules: {
						serviceTitle: "required",
            name:"required"
					},
					messages: {
						serviceTitle: "不能为空！",
            name: "不能为空！"
					},
					submitHandler:function(form) {
            //console.log(_this.getfileData);
            //console.log(_this.oldImg,_this.isSelect);
            //console.log(_this.isSelect);
            //debugger
            var dataStr={
              //file:_this.oldImg,
              id:_this.serviceId,
              name:_this.name
            }
            //console.log(dataStr);
           _this.$form(_this.upLoadUrl,dataStr).then(res=>{
             var seller=JSON.stringify(res);
             //console.log('结果:'+seller);
              //console.log(res);
              //debugger
              if(res.data=="修改成功"){
                _this.$message({
                  message: '修改成功!',
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
