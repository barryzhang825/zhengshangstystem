<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div class="conmain-left">
            <div class="confomml-name upload-demo">
              <label for="serviceTitle">新闻标题</label>
              <input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="上传新闻新闻标题">
            </div>
            <div class="confomml-name upload-demo  old-img-box">
              <label for="serviceText">新闻正文内容</label>
              <textarea disabled rows="3" id="serviceText" name="serviceText" v-model="serviceText" type="text" placeholder="上传新闻正文内容"></textarea>
            </div>
            <div class="change-newstext" @click="openTinymce">上传新闻正文内容</div>
            <div class="confomml-name upload-demo ">
              <label for="newsGroupName">新闻分组</label>
              <select name="newsGroupName" id="newsGroupName" v-model="newsGroupName" @change="selectGrounpFn($event)">
                <option v-for="(item,index) in list" :key="index" :value="item">{{item}}</option>
              </select>
            </div>
            <div class="confomml-name upload-demo ">
              <label for="useArea">使用位置</label>
              <select name="useArea" id="useArea" v-model="useArea" @change="selectFn($event)">
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="notShow">notShow</option>
              </select>
            </div>
          </div>
          <div class="conmain-right">
            <div class="confomml-name upload-demo  old-img-box">
            	<label for="lead">新闻导语</label>
            	<textarea rows="3" id="lead" name="lead" type="text" v-model="lead" placeholder="请输入详情"></textarea>
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
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认添加</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消添加</el-button></div>
			</form>
		</div>
    <newsTinym v-if="isTinymce" :msg="serviceText" @watchTinymce="closeTiny"></newsTinym>
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
        upLoadUrl:'https://www.zhengshangwl.com/background-news/add',
				isModify:true,//是否添加
        oldImg:'',
        serviceTitle:'',
        serviceText:'',
        lead:'',
				newsGroup:'',
        useArea:'',
        newsGroupName:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        isTinymce:false,
        upImg:false,
        list:[]
      }
    },
    created(){

    },
    mounted (){
      this.$get('/newsPageDetail/getNewsGroupName').then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('结果:'+seller);
        this.list=data;
      }).catch(function (error) {
      		//console.log(error);
      });
    },
    components: {
      newsTinym
    },
    computed: {
      getfileData(){
        var data={
          text:"",
          title:"",
          lead:"",
          //newsGroup:'',
          newsGroupName:'',
          useArea:''
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
        //console.log(file);
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
						serviceTitle: "required",
						serviceText:{
							required: true,
						},
            lead: "required",
						newsGroup:"required",
            newsGroupName:"required",
            useArea:"required"
					},
					messages: {
						serviceTitle: "不能为空！",
						serviceText:{
							required: "不能为空！"
						},
            lead: "不能为空！",
						newsGroup:"不能为空！",
            newsGroupName:"不能为空！",
            useArea:"不能为空！"
					},
					submitHandler:function(form) {
            _this.getfileData.title=_this.serviceTitle;
            _this.getfileData.text=_this.serviceText;
            _this.getfileData.lead=_this.lead;
						_this.getfileData.newsGroup=_this.newsGroup;
            _this.getfileData.useArea=_this.useArea;
            _this.getfileData.newsGroupName=_this.newsGroupName;
            //console.log(_this.serviceText);
            if(!_this.serviceText||_this.serviceText==null){
              _this.$message.error("请上传新闻正文内容！");
              return
            }
            if(_this.isSelect==0){
              _this.$message.error("请上传图片！");
            }else{
              //console.log("确认添加");
              //debugger
              _this.$refs.upload.submit();
            }
					}
				});


			},
      openTinymce(){
        this.isTinymce=true;
      },
      closeTiny(data){
        this.isTinymce=data.status;
        this.serviceText=data.data;
      },
      selectFn(e){
        //console.log(e)
        //console.log(e.target.selectedIndex) // 选择项的index索引
        //console.log(e.target.value) // 选择项的value
        if(e.target.value=="left"){
          this.upImg=true;
        }else{
          this.upImg=false;
        }
      },
      selectGrounpFn(e){
        // console.log(e)
        // console.log(e.target.selectedIndex) // 选择项的index索引
        // console.log(e.target.value) // 选择项的value
        this.newsGroupName=e.target.value
      }
    },
    watch: {}
	}
</script>
