<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
          <div v-show="isHidden" class="confomml-name upload-demo"><label for="serviceId">id</label>{{serviceId}}</div>
					<div class="confomml-name upload-demo"><label for="serviceTitle">案例标题</label><input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="请输入标题"></div>
					<div class="confomml-name upload-demo"><label for="caseName">案例名称</label><input id="caseName" name="caseName" v-model="caseName" type="text" placeholder="请输入案例名称"></div>
					<!-- <div class="confomml-name upload-demo"><label for="caseGroupName">案例分组名</label><input id="caseGroupName" name="caseGroupName" v-model="caseGroupName" type="text" placeholder="案例分组名"/></div> -->
          <div class="confomml-name upload-demo ">
            <label for="caseGroupName">案例分组名</label>
            <select name="caseGroupName" id="caseGroupName" v-model="caseGroupName" @change="selectFn($event)">
              <option v-for="(item,index) in selectList" :key="index" :value="item.caseGroupName">{{item.caseGroupName}}</option>
            </select>
          </div>
          <div v-show="selectNum!=null" class="confomml-name upload-demo old-img-box">
            <label for="serviceDetail">分组简介</label><span class="select-span">{{serviceDetail}}</span>
          </div>
          <!-- <div class="confomml-name upload-demo  old-img-box"><label for="serviceDetail">分组简介</label><textarea rows="3" id="serviceDetail" name="serviceDetail" type="text" v-model="serviceDetail" placeholder="请输入详情"></textarea></div> -->
          <div class="confomml-name upload-demo old-img-box"><label for="serviceImg">原图片</label><img class="old-img" :src="oldImg" alt=""></div>
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
            <label>修改图片</label>
            <el-button size="small" type="primary">点击上传</el-button>
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

</style>
<script type='ecmascript-6'>
	export default {
    props:{
    },
    data () {
      return {
        upLoadUrl:'http://39.98.80.223:8080/official-website/background-caseDetail/update',
				isModify:true,//是否修改
        oldImg:'',
        serviceId:0,
        serviceTitle:'',
        serviceDetail:'',
				caseName:'',
				caseGroupName:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        selectList:[],
        selectNum:null  //下拉框第几项被选中
      }
    },
    created(){

    },
    mounted (){
      this.$get('/official-website/background-caseDetail/queryByPage',{}).then(data=>{
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
          text:"",
          title:"",
          detail:""
        }
        return data;
      }
    },
    methods: {
      setData(data){  //初始化数据
        //console.log(data.caseGroupName);
        if(data.id){
          this.serviceId=data.id;
          this.serviceTitle=data.title;
          this.serviceDetail=data.detail;
					this.caseName=data.caseName;
					this.caseGroupName=data.caseGroupName;
          this.oldImg=data.file;
          this.isModify=data.isModify;
        }
      },
      beyondNum(){
        this.$message.error('只能上传一个图片');
      },
      onchange(file){
        //console.log(file);
        var _this=this;
        _this.isSelect=1;
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
            serviceDetail:"required",
						caseName:'required',
						caseGroupName:'required'
					},
					messages: {
						serviceTitle: "不能为空！",
            serviceDetail: "不能为空！",
						caseName:'不能为空!',
						caseGroupName:'不能为空!'
					},
					submitHandler:function(form) {
            _this.getfileData.id=_this.serviceId;
            _this.getfileData.title=_this.serviceTitle;
            _this.getfileData.detail=_this.serviceDetail;
						_this.getfileData.caseName=_this.caseName;
						_this.getfileData.caseGroupName=_this.caseGroupName;
            //console.log(_this.getfileData);
            //console.log(_this.oldImg,_this.isSelect);
            //debugger
            if(_this.isSelect==1){
              _this.$refs.upload.submit();
            }else{
              var dataStr={
                //file:_this.oldImg,
                id:_this.serviceId,
                title:_this.serviceTitle,
                detail:_this.serviceDetail,
								caseName:_this.caseName,
								caseGroupName:_this.caseGroupName
              }
              //console.log(dataStr);
              _this.$form(_this.upLoadUrl,dataStr).then(res=>{
                var seller=JSON.stringify(res);
                //console.log('结果:'+seller);
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
      selectFn(e){
        //console.log(e)
        //console.log(e.target.selectedIndex) // 选择项的index索引
        //console.log(e.target.value) // 选择项的value
        this.selectNum=e.target.selectedIndex;
        this.serviceDetail=this.selectList[this.selectNum].detail;
        //console.log(this.selectList[this.selectNum].detail);
      }
    },
    watch: {}
	}
</script>
