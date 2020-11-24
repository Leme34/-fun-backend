<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="" prop="memberId">
      <el-input v-model="dataForm.memberId" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="反馈内容" prop="feedbackContent">
      <el-input v-model="dataForm.feedbackContent" placeholder="反馈内容"></el-input>
    </el-form-item>
    <el-form-item label="反馈类型（1:破损 2:缺货 3:错货 4:投诉）" prop="feedbackType">
      <el-input v-model="dataForm.feedbackType" placeholder="反馈类型（1:破损 2:缺货 3:错货 4:投诉）"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createdAt">
      <el-input v-model="dataForm.createdAt" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updatedAt">
      <el-input v-model="dataForm.updatedAt" placeholder="更新时间"></el-input>
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
          id: 0,
          memberId: '',
          feedbackContent: '',
          feedbackType: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          memberId: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          feedbackContent: [
            { required: true, message: '反馈内容不能为空', trigger: 'blur' }
          ],
          feedbackType: [
            { required: true, message: '反馈类型（1:破损 2:缺货 3:错货 4:投诉）不能为空', trigger: 'blur' }
          ],
          createdAt: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatedAt: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/cms/feedback/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.memberId = data.feedback.memberId
                this.dataForm.feedbackContent = data.feedback.feedbackContent
                this.dataForm.feedbackType = data.feedback.feedbackType
                this.dataForm.createdAt = data.feedback.createdAt
                this.dataForm.updatedAt = data.feedback.updatedAt
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
              url: this.$http.adornUrl(`/cms/feedback/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'memberId': this.dataForm.memberId,
                'feedbackContent': this.dataForm.feedbackContent,
                'feedbackType': this.dataForm.feedbackType,
                'createdAt': this.dataForm.createdAt,
                'updatedAt': this.dataForm.updatedAt
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
