<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick">
    </editor>
  </div>
</template>

<style scoped>

</style>
<script >
  //富文本编辑器
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  //import 'tinymce/themes/modern/theme'
  import 'tinymce/themes/silver/theme'
  import 'tinymce/skins/ui/oxide/skin.css'

  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'
	export default {
    name: 'tinymce',
    props: {
      //传入一个value，使组件支持v-model绑定
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        //default: 'lists image media table textcolor wordcount contextmenu',
        default: 'lists image media table wordcount'
      },

      toolbar: {
        type: [String, Array],
        default: ' undo redo |preview| formatselect | fontselect | fontsizeselect | forecolor backcolor | cut copy paste ' +
          '| bold italic underline strikethrough|blockquote | alignleft aligncenter alignright alignjustify |' +
          ' bullist numlist outdent indent | lists image media table |quicklink removeformat |'
      }
    },
    data () {
      return {
        //初始化配置
        init: {
          language_url: './static/tinymce/skins/zh_CN.js',
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/lightgray',
          height: 300,
          plugins: this.plugins,
          toolbar: this.toolbar,
          branding: false,
          menubar: 'file edit insert view format table',
          //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
          images_upload_handler: (blobInfo, success, failure) => {
            const img = 'data:image/jpeg;base64,' + blobInfo.base64()
            success(img)
          }
        },
        myValue: this.value
      }
    },
    created(){

    },
    mounted (){
      tinymce.init({}) //初始化
    },
    components: {
      Editor
    },
    computed: {

    },
    methods: {
      /**
       * 上传图片方法
       * 其中 blobinfo 是一个对象，包含上传文件的信息：
       * success 和 failure 是函数，上传成功的时候向 success 传入一个图片地址，失败的时候向 failure 传入报错信息
      */
      handleImgUpload (blobInfo, success, failure) {
        let formdata = new FormData()
        formdata.set('upload_file', blobInfo.blob())
        axios.post('/api/upload', formdata).then(res => {
          success(res.data.data.src)
        }).catch(res => {
          failure('error')
        })
      },
      //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
      //需要什么事件可以自己增加
      onClick(e) {
        this.$emit('onClick', e, tinymce)
      },
      //可以添加一些自己的自定义事件，如清空内容
      clear() {
        this.myValue = ''
      }
    },
    watch: {
      value(newValue) {
        this.myValue = newValue
      },
      myValue(newValue) {
        this.$emit('input', newValue)
      }
    }
	}
</script>
