<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商家名称" prop="name">
      <el-input v-model="dataForm.name" placeholder="商家名称"></el-input>
    </el-form-item>
    <el-form-item label="自我介绍" prop="description">
      <el-input v-model="dataForm.description" placeholder="自我介绍"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createdAt">
      <el-input v-model="dataForm.createdAt" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updatedAt">
      <el-input v-model="dataForm.updatedAt" placeholder="更新时间"></el-input>
    </el-form-item>
    <el-form-item label="商家评分" prop="remarkScore">
      <el-input v-model="dataForm.remarkScore" placeholder="商家评分"></el-input>
    </el-form-item>
    <el-form-item label="是否禁用" prop="disabledFlag">
      <el-input v-model="dataForm.disabledFlag" placeholder="是否禁用"></el-input>
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
          name: '',
          description: '',
          createdAt: '',
          updatedAt: '',
          remarkScore: '',
          disabledFlag: ''
        },
        dataRule: {
          name: [
            { required: true, message: '商家名称不能为空', trigger: 'blur' }
          ],
          createdAt: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updatedAt: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ],
          remarkScore: [
            { required: true, message: '商家评分不能为空', trigger: 'blur' }
          ],
          disabledFlag: [
            { required: true, message: '是否禁用不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/seller/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.seller.name
                this.dataForm.description = data.seller.description
                this.dataForm.createdAt = data.seller.createdAt
                this.dataForm.updatedAt = data.seller.updatedAt
                this.dataForm.remarkScore = data.seller.remarkScore
                this.dataForm.disabledFlag = data.seller.disabledFlag
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
              url: this.$http.adornUrl(`/cms/seller/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'description': this.dataForm.description,
                'createdAt': this.dataForm.createdAt,
                'updatedAt': this.dataForm.updatedAt,
                'remarkScore': this.dataForm.remarkScore,
                'disabledFlag': this.dataForm.disabledFlag
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
