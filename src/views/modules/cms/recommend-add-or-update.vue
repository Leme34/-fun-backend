<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="以“,”分隔的推荐商铺id字符串数组" prop="shopIds">
      <el-input v-model="dataForm.shopIds" placeholder="以“,”分隔的推荐商铺id字符串数组"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          memberId: 0,
          shopIds: ''
        },
        dataRule: {
          shopIds: [
            { required: true, message: '以“,”分隔的推荐商铺id字符串数组不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.memberId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.memberId) {
            this.$http({
              url: this.$http.adornUrl(`/cms/recommend/info/${this.dataForm.memberId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.shopIds = data.recommend.shopIds
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/cms/recommend/${!this.dataForm.memberId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'memberId': this.dataForm.memberId || undefined,
                'shopIds': this.dataForm.shopIds
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
