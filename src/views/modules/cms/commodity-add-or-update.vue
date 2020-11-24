<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="商品名" prop="name">
      <el-input v-model="dataForm.name" placeholder="商品名"></el-input>
    </el-form-item>
    <el-form-item label="商品金额" prop="price">
      <el-input v-model="dataForm.price" placeholder="商品金额"></el-input>
    </el-form-item>
    <el-form-item label="商品分类id" prop="commodityCategoryId">
      <el-input v-model="dataForm.commodityCategoryId" placeholder="商品分类id"></el-input>
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
          price: '',
          commodityCategoryId: '',
          createUserId: '',
          status: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          name: [
            { required: true, message: '商品名不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '商品金额不能为空', trigger: 'blur' }
          ],
          commodityCategoryId: [
            { required: true, message: '商品分类id不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/commodity/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.commodity.name
                this.dataForm.price = data.commodity.price
                this.dataForm.commodityCategoryId = data.commodity.commodityCategoryId
                this.dataForm.createUserId = data.commodity.createUserId
                this.dataForm.status = data.commodity.status
                this.dataForm.createdAt = data.commodity.createdAt
                this.dataForm.updatedAt = data.commodity.updatedAt
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
              url: this.$http.adornUrl(`/cms/commodity/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'price': this.dataForm.price,
                'commodityCategoryId': this.dataForm.commodityCategoryId,
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
