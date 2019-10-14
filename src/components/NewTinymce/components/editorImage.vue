<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click.stop=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">

      <!--<el-upload-->
        <!--class="upload-demo"-->
        <!--action="string"-->
        <!--:on-preview="handlePreview"-->
        <!--:on-remove="handleRemove"-->
        <!--:file-list="fileList"-->
        <!--:http-request="beforeUpload"-->
        <!--:on-success="success"-->
        <!--list-type="picture">-->
        <!--<el-button size="small" type="primary">点击上传</el-button>-->
        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <!--</el-upload>-->

      <el-upload class="editor-slide-upload" action="string" :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :http-request="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click.stop="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click.stop="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'
import {getNewStr} from '@/assets/js/public'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
//      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
//      if (!this.checkAllSuccess()) {
//        this.$message('请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！')
//        return
//      }
//      console.log(arr)
      this.$emit('successCBK', this.fileList)
//      this.listObj = {}
//      console.log(this.fileList)
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(item){
      var fd = new FormData();
      fd.append("fileToUpload", item.file);
      var xhr = new XMLHttpRequest();
      xhr.open("POST", getNewStr + '/OSSFile/PostToOSS');
      xhr.send(fd);
      xhr.onreadystatechange = ()=>{
        if (xhr.readyState == 4 && xhr.status == 200) {
          let obj = JSON.parse(xhr.responseText);
          this.fileList.push({
            url:obj.data
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
      console.log(response, file, fileList)
    },
//    beforeUpload(file) {
//      const _self = this
//      const _URL = window.URL || window.webkitURL
//      const fileName = file.uid
//      this.listObj[fileName] = {}
//      return new Promise((resolve, reject) => {
//        const img = new Image()
//        img.src = _URL.createObjectURL(file)
//        img.onload = function() {
//          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
//        }
//        resolve(true)
//      })
//    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}

</style>
