<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div v-show="isHidden" class="confomml-name upload-demo"><label for="serviceId">id</label>{{serviceId}}</div>
					<div class="confomml-name upload-demo">
            <label for="serviceTitle">案例标题</label>
            <input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="请输入案例标题">
          </div>
					<!-- <div class="confomml-name upload-demo">
            <label for="caseGroupName">案例分组名</label>
            <input id="caseGroupName" name="caseGroupName" disabled v-model="caseGroupName" type="text" placeholder="案例分组名"/>
          </div> -->
          <div class="confomml-name upload-demo ">
            <label for="caseGroupName">案例分组名</label>
            <select name="caseGroupName" id="caseGroupName" v-model="caseGroupName"  @change="selectGrounpFn($event)">
              <option v-for="(item,index) in selectList" :key="index" :value="item.name">{{item.name}}</option>
            </select>
          </div>
          <div class="confomml-name upload-demo">
            <label for="detail">案例详情文本</label>
            <input id="detail" name="detail" v-model="detail" type="text" placeholder="请输入案例详情文本">
          </div>
          <div class="confomml-name upload-demo old-img-box">
            <label for="serviceImg">案例原图</label>
            <img class="old-img" :src="indexFile" alt="案例原图">
          </div>
          <div class="confomml-name upload-demo old-img-box">
            <label for="serviceImg">案例详情原图</label>
            <img class="old-img" :src="detailFile" alt="案例原图">
          </div>
          <!-- <div>！注意：</div> -->
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
            :file-list="fileList"
            :auto-upload="false"
            >
            <label>修改图片<br>
            </label>
            <el-button size="small" type="primary">点击上传</el-button>
            <!-- <div slot="tip" class="el-upload__tip action-text" v-if="imgListLength==1">注意：第一张上传的为案例图片，第二张上传的为案例详情图片，不要上传错误。</div> -->
            <div slot="tip" class="el-upload__tip action-text" v-if="imgListLength==1">
              <template>
                <el-radio v-model="radio" label="1"  @click.native="useInfoFun(1)">案例图片</el-radio>
                <el-radio v-model="radio" label="2" @click.native="useInfoFun(2)">详情图片</el-radio>
              </template>
            </div>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
				</div>
				<div class="confom-btn"><button class="change-btn" type="submit" @click="change">确认修改</button></div>
        <div class="confom-btn"><el-button @click="quiteFun" type="info">取消修改</el-button></div>
			</form>
		</div>
   </div>
</template>
<style scoped>
  .home-form{
    padding:30px 100px 10px 100px;
  }
  .confomml-name{
    padding-bottom: 10px;
  }
  .old-img{
    height: 100px;
  }
  .confom-btn{
    margin: 10px 0;
  }
  .upload-demo >>>.el-radio__inner{
    width: 16px;
    height: 16px;
  }
  .upload-demo >>>.el-radio__input{
    width: 20px;
  }
</style>

<script type='ecmascript-6'>
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:"http://39.98.80.223:8080/official-website/background-caseDetail/update",
        //upLoadUrl:"http://192.168.1.14:8080/official-website/background-caseDetail/update",
        isModify:true,//是否修改
        serviceId:0,
        serviceTitle:'',
				caseGroupName:'',
        detail:'',
        indexFile:'',
        detailFile:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        fileList:[],
        selectList:[],
        radio:"1",
        useInfo:1,
        imgListLength:0
      }
    },
    created(){

    },
    mounted (){
      this.$get('/official-website/background-caseGroup/queryByPage',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('select结果:'+seller);
        this.selectList=data.list;
      }).catch(function (error) {
      		//console.log(error);
      });
    },
    components: {

    },
    computed: {
      getfileData(){
        var data={
          id:0,
          caseName:'',
          caseGroupName:'',
          detail:''
        }
        return data;
      }
    },
    methods: {
      setData(data){  //初始化数据
        //console.log(data);
        if(data.id){
          this.serviceId=data.id;
          this.serviceTitle=data.caseName;
					this.caseGroupName=data.caseGroupName;
          this.detail=data.detail;
          this.indexFile=data.indexFile;
          this.detailFile=data.detailFile;
          this.isModify=data.isModify;
        }
      },
      beyondNum(){
        this.$message.error('只能上传1张图片');
      },
      useInfoFun(num){
        //debugger
        //console.log(this.imgListLength);
        //if (e.target.tagName === 'input') return // 因为原生click事件会执行两次，第一次在label标签上，第二次在input标签上，故此处理
        if(this.imgListLength==1){
          this.useInfo=Number(num);
        }
      },
      onchange(file,fileList){
        //console.log(file,fileList.length);
        this.imgListLength=fileList.length;
        if(fileList.length==0){
          this.useInfo=null;
        }
        this.isSelect=1;
        var _this=this;
        if(file.response){
          if(file.response==='修改成功'){
          	_this.$message({
          		message: '修改成功!',
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
      },
      change(){
				var _this=this;
        //console.log("确认修改");
				$("#homeModifyFrom").validate({
					rules: {
						serviceTitle: "required",
						//caseGroupName:'required',
            detail:'required'
					},
					messages: {
						serviceTitle: "不能为空！",
						//caseGroupName:'不能为空!',
            detail:'不能为空!'
					},
					submitHandler:function(form) {
            _this.getfileData.id=_this.serviceId;
            _this.getfileData.caseName=_this.serviceTitle;
						_this.getfileData.caseGroupName=_this.caseGroupName;
            _this.getfileData.detail=_this.detail;
            _this.getfileData.useInfo=_this.useInfo;
            // console.log(_this.getfileData);
            // console.log(_this.isSelect);
            //debugger
            if(_this.isSelect==1){
              _this.$refs.upload.submit();
            }else{
              var dataStr={
                //file:_this.oldImg,
                id:_this.serviceId,
                caseName:_this.serviceTitle,
								caseGroupName:_this.caseGroupName,
                detail:_this.detail,
                useInfo:null
              }
              //console.log(dataStr);
              _this.$form(_this.upLoadUrl,dataStr).then(res=>{
                //console.log(res);
                //debugger
                if(res.status==200){
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
                //Message.error('出错！');
              });
            }
					}
				});
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
