<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
					<div class="confomml-name upload-demo">
            <label for="serviceTitle">我们的优势标题</label>
            <input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="请输入标题"/>
          </div>
          <el-upload
            class="upload-demo"
            :action="upLoadUrl"
            :limit="1"
            list-type="picture"
            accept="image/*"
            :on-exceed="beyondNum"
            :on-change="onchange"
            :on-remove="onRemove"
            :on-success="onSuccess"
            ref="upload"
            :data="getfileData"
            :auto-upload="false"
            >
            <label>添加图片</label>
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认添加</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消添加</el-button></div>
			</form>
		</div>
   </div>
</template>
<style scoped>

</style>
<script type='ecmascript-6'>
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:'https://www.zhengshangwl.com/background-ourAdvantages/add',
				isModify:true,//是否添加
        oldImg:'',
        serviceTitle:'',
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
      getfileData(){
        var data={
          title:""
        }
        return data;
      }
    },
    methods: {
      addData(data){
        this.isHidden=data;
      },
      beyondNum(){
        this.$message.error('只能上传一个图片');
      },
      onchange(file){
        console.log(file);
        var _this=this;
        _this.isSelect=1;
        if(file.response){
          if(file.response==='添加成功'){
          	_this.$message({
          		message: '添加成功!',
          		type: 'success'
          	});
            setTimeout(function(){
              location.reload();
            }, 500);
          }else{
          	_this.$message.error(file.response);
            setTimeout(function(){
              location.reload();
            }, 500);
          }
        }
      },
      onRemove(file){
        //console.log(file);
        this.isSelect=0;
      },
      onSuccess(response, file){
        //console.log(response, file);

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
						serviceTitle: "required"
					},
					messages: {
						serviceTitle: "不能为空！"
					},
					submitHandler:function(form) {
            _this.getfileData.title=_this.serviceTitle;
            //console.log(_this.getfileData);
            if(_this.isSelect==0){
              _this.$message.error("请上传图片！");
            }else{
              //console.log("确认添加");
              //debugger
              _this.$refs.upload.submit();
            }
					}
				});
			}
    },
    watch: {}
	}
</script>
