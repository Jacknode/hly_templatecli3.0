<template>
  <div>
    <el-upload
      class="upload-demo"
      action="string"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      multiple
      :file-list="fileList"
      :http-request="beforeUpload"
      :on-success="success"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!--<el-button size="small" type="primary" @click.stop="getValue">获取值</el-button>-->
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {getNewStr} from '@/assets/js/public'
  export default{
    name: '',
    props: ['index','i'],
    data(){
      return {
        fileList: [],
        obj:{}
      }
    },
    computed: mapGetters([]),
    created(){
    },
    methods: {
      beforeUpload(item){
        var fd = new FormData();
        fd.append("fileToUpload", item.file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", getNewStr + '/OSSFile/PostToOSS');
        xhr.send(fd);
        xhr.onreadystatechange = ()=>{
          if (xhr.readyState == 4 && xhr.status == 200) {
            this.obj = JSON.parse(xhr.responseText);
            this.obj.index = this.index;
            this.obj.i = this.i;
            this.$emit('getData',this.obj)
            this.fileList.push({
              url:this.obj.data
            })
            item.onSuccess('配时文件上传成功')
          }
        }
      },
      handleRemove(file) {
        this.fileList = this.fileList.filter(item=>{
          if(item.uid==file.uid){
            return false;
          }
          return true;
        })
      },
      handlePreview(file) {
//        console.log(file);
      },
      success(response, file, fileList){
//        this.fileList = this.fileList.map(item=>{
//          return item.url
//        })
//        this.$emit('getData',this.fileList)
      },
      getValue(){
        console.log(this.fileList)
      }
    },
  }
</script>
<style>
  input[type="file"] {
    display: none !important;
  }
</style>
