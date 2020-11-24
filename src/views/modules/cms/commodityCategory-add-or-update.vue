<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="类目ID" prop="name">
      <el-input v-model="dataForm.name" placeholder="类目ID"></el-input>
    </el-form-item>
    <el-form-item label="父类别ID（一级类目为0）" prop="pid">
      <el-input v-model="dataForm.pid" placeholder="父类别ID（一级类目为0）"></el-input>
    </el-form-item>
    <el-form-item label="创建人（后台用户ID）" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建人（后台用户ID）"></el-input>
    </el-form-item>
    <el-form-item label="状态（0:禁用 1:启用）" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态（0:禁用 1:启用）"></el-input>
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
          name: '',
          pid: '',
          createUserId: '',
          status: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          name: [
            { required: true, message: '类目ID不能为空', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '父类别ID（一级类目为0）不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建人（后台用户ID）不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态（0:禁用 1:启用）不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/commodityCategory/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.commodityCategory.name
                this.dataForm.pid = data.commodityCategory.pid
                this.dataForm.createUserId = data.commodityCategory.createUserId
                this.dataForm.status = data.commodityCategory.status
                this.dataForm.createdAt = data.commodityCategory.createdAt
                this.dataForm.updatedAt = data.commodityCategory.updatedAt
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
              url: this.$http.adornUrl(`/cms/commodityCategory/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'pid': this.dataForm.pid,
                'createUserId': this.dataForm.createUserId,
                'status': this.dataForm.status,
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
