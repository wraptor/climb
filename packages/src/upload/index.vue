<template>
  <el-upload
      :action="myOption.action"
      :headers="myOption.headers"
      :multiple="myOption.multiple"
      :data="myOption.data"
      :name="myOption.name"
      :with-credentials="myOption.withCredentials"
      :show-file-list="myOption.showFileList"
      :drag="myOption.drag"
      :accept="myOption.accept"
      :list-type="myOption.listType"
      :auto-upload="myOption.autoUpload"
      :http-request="myOption.httpRequest"
      :limit="myOption.limit"
      :on-exceed="onExceed"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-error="onError"
      :on-success="onSuccess"
      :before-upload="myOption.beforeUpload"
  >

    <template v-if="myOption.drag">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </template>
    <template v-else-if="myOption.listType==='picture-card'">
      <i class="el-icon-plus"></i>
    </template>
    <el-button v-else size="small" type="primary">点击上传</el-button>


    <template #tip v-if="myOption.tip">
      <div class="el-upload__tip" style="line-height: 12px;">{{ myOption.tip }}</div>
    </template>
  </el-upload>

  <el-image-viewer
      hide-on-click-modal
      :z-index="999999"
      :url-list="imgPreviewList"
      v-if="imgPreviewList.length > 0"
      :onClose="onViewerClose"
  ></el-image-viewer>
</template>

<script>
import beanUtil from "../util/bean-util";
import axios from "axios"
import {ElMessage} from "element-plus"

export default {
  name: "ClUpload",
  props: {
    modelValue: {},
    option: {},
    disabled: {}
  },
  emits: ['update:modelValue'],
  watch: {
    modelValue: {
      handler(val) {
        if (this.myOption.fileListSync || !this.init) {
          this.init = true
          if (val !== undefined) {
            this.fileList = window.deepClone(val);
          }
        }
      },
      immediate: true,
      deep: true
    },
    option: {
      handler(val) {
        beanUtil.copyPropertiesNotEmpty(val, this.myOption);

        if (this.myOption.listType === "picture-card" || this.myOption.listType === "picture") {
          if (!this.myOption.accept) {
            this.myOption.accept = "image/*"
          }
        }

      },
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      fileList: [],
      init: false,
      myOption: {
        action: "",
        headers: {},
        multiple: false,
        data: {},
        name: "file",
        withCredentials: false,
        showFileList: true,
        drag: false,
        accept: undefined,
        listType: "text",
        autoUpload: true,
        httpRequest: (ctx) => {
          let param = new FormData(); // 创建form对象
          param.append("file", ctx.file);
          let request = axios;
          if (window.axios) {
            request = window.axios
          }
          request({
            url: ctx.action,
            data: param,
            method: "post",
            headers: {"Content-Type": "multipart/form-data"},
            onUploadProgress: progressEvent => {
              ctx.onProgress(progressEvent);
            }
          })
              .then(res => {
                const type = Object.prototype.toString.call(res)
                if (type === '[object String]') {
                  ctx.onSuccess(res);
                } else if (res.data) {
                  if (res.data.data) {
                    ctx.onSuccess(res.data.data);
                  } else {
                    ctx.onSuccess(res.data);
                  }
                } else {
                  ctx.onSuccess(res);
                }
              })
              .catch((err) => {
                ctx.onError(err);
              });
        },
        onError: undefined,
        limit: undefined,
        onExceed: undefined,
        onSuccess: undefined,
        beforeUpload: () => {
        },
        // ext
        tip: undefined,
        fileListSync: false,
        errorTips: true
      },
      imgPreviewList: []
    }
  },
  computed: {
    imgList: function () {
      let arr = [];
      if (this.myOption.limit === 1) {
        if (this.isImage(this.modelValue)) {
          arr.push(this.modelValue.url);
        }
      } else {
        this.modelValue.forEach(item => {
          if (this.isImage(item)) {
            arr.push(item.url);
          }
        })
      }
      return arr;
    }
  },
  methods: {
    isImage(file) {
      const url = file.url
      if (!url) return false;
      if (url.toLowerCase().indexOf("jpg") > 0) {
        return true;
      }
      if (url.toLowerCase().indexOf("png") > 0) {
        return true;
      }
      if (url.toLowerCase().indexOf("jpeg") > 0) {
        return true;
      }
      if (url.toLowerCase().indexOf("bmp") > 0) {
        return true;
      }
      if (url.toLowerCase().indexOf("webp") > 0) {
        return true;
      }
      if (url.toLowerCase().indexOf("gif") > 0) {
        return true;
      }
      return file.type && file.type.indexOf("image/") === 0;
    },
    onPreview(file) {
      const index = this.imgList.findIndex(img => img === file.url)
      if (index >= 0) {
        for (let i = index; i < this.imgList.length; i++) {
          this.imgPreviewList.push(this.imgList[i])
        }
        for (let i = 0; i < index; i++) {
          this.imgPreviewList.push(this.imgList[i])
        }
      } else if (file.url && file.url.indexOf("http") === 0) {
        window.open(file.url)
      }
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    onChange(file, fileList) {
      file.url = this.getObjectURL(file.raw)
      file.type = file.raw.type;
      this.updateModel(fileList);
    },
    onRemove(file, fileList) {
      this.updateModel(fileList);
    },
    onExceed(files, fileList) {
      if (this.myOption.onExceed) {
        this.myOption.onExceed(files, fileList, () => {
          if (this.myOption.limit === 1) {
            this.fileList = [{
              name: files[0].name,
              type: files[0].type,
              size: files[0].size,
              url: this.getObjectURL(files[0])
            }];
            this.updateModel(this.fileList);
          }
        })
      } else {
        if (this.myOption.limit === 1) {
          this.fileList = [{
            name: files[0].name,
            type: files[0].type,
            size: files[0].size,
            url: this.getObjectURL(files[0])
          }];
          this.updateModel(this.fileList);
        } else {
          this.$message.warning("文件上传数达到限制")
        }
      }
    },
    onSuccess(response, file, fileList) {
      if (this.myOption.onSuccess) {
        this.myOption.onSuccess(response, file, fileList);
      } else {
        file.url = response;
      }
    },
    onError(err, file, fileList) {
      if (this.myOption.onError) {
        this.myOption.onError(err, file, fileList)
      } else if (this.myOption.errorTips) {
        ElMessage.error("上传失败")
      }
    },
    onViewerClose() {
      this.imgPreviewList = []
    },
    updateModel(fileList) {
      let arr = fileList.map(item => {
        if (item.response && item.response.indexOf("http") === 0) {
          item.url = item.response
        }
        return {
          name: item.name,
          raw: item.raw,
          size: item.size,
          status: item.status,
          type: item.type,
          url: item.url
        }
      })
      if (this.myOption.limit === 1) {
        this.$emit("update:modelValue", arr.length > 0 ? arr[0] : undefined);
      } else {
        this.$emit("update:modelValue", arr);
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep(.el-upload--picture-card) {
  line-height: 148px;
}
</style>