<template>
  <div class="change">
		<div class="modify" v-show="isModify">
			<form class="home-form" id="homeModifyFrom">
				<div class="confom-main">
					<div class="confomml-name upload-demo ">
            <label for="serviceTitle">案例标题</label>
            <input id="serviceTitle" name="serviceTitle" v-model="serviceTitle" type="text" placeholder="请输入案例标题">
          </div>
          <div class="confomml-name upload-demo ">
            <label for="caseName">案例名称</label>
            <input id="caseName" name="caseName" v-model="caseName" type="text" placeholder="请输入案例名称">
          </div>
					<!-- <div class="confomml-name upload-demo "><label for="caseGroupName">案例分组名</label><input id="caseGroupName" name="caseGroupName" v-model="caseGroupName" type="text" placeholder="请输入标题"></div> -->
          <div class="confomml-name upload-demo ">
            <label for="caseGroupName">案例分组名</label>
            <select name="caseGroupName" id="caseGroupName" v-model="caseGroupName" @change="selectFn($event)">
              <option v-for="(item,index) in selectList" :key="index" :value="item.caseGroupName">{{item.caseGroupName}}</option>
            </select>
          </div>
          <div v-show="selectNum!=null" class="confomml-name upload-demo old-img-box">
            <label for="serviceDetail">分组简介</label><span class="select-span">{{serviceDetail}}</span>
            <!-- <textarea rows="3" id="serviceDetail" name="serviceDetail" type="text" disabled="disabled" v-model="serviceDetail" placeholder="请输入详情"></textarea> -->
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
        upLoadUrl:"https://www.zhengshangwl.com/background-caseDetail/add",
				isModify:true,//是否添加
        selectList:[],
        oldImg:'',
        serviceTitle:'',
        serviceDetail:'',
				caseName:'',
				caseGroupName:'',
        isSelect:0,  //选照片为1，不选照片为0
        isHidden:true,
        selectNum:null  //下拉框第几项被选中
      }
    },
    created(){

    },
    mounted (){
      this.$get('/background-caseDetail/queryByPage',{}).then(data=>{
        var seller=JSON.stringify(data);
      	//console.log('select结果:'+seller);
        this.selectList=data.list;
      }).catch(function (error) {
      		//console.log(error);
          this.$message.error(error);
      });
    },
    components: {

    },
    computed: {
      getfileData(){
        var data={
          title:"",
          detail:"",
					caseName:'',
					caseGroupName:''
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
            serviceDetail:"required",
						caseName:"required",
						caseGroupName:"required"
					},
					messages: {
						serviceTitle: "不能为空！",
            serviceDetail: "不能为空！",
						caseName:"不能为空！",
						caseGroupName:"不能为空！"
					},
					submitHandler:function(form) {
            _this.getfileData.title=_this.serviceTitle;
            _this.getfileData.detail=_this.serviceDetail;
						_this.getfileData.caseName=_this.caseName;
						_this.getfileData.caseGroupName=_this.caseGroupName;
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
