<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="会员ID" prop="memberId">
      <el-input v-model="dataForm.memberId" placeholder="会员ID"></el-input>
    </el-form-item>
    <el-form-item label="订单原价" prop="originPrice">
      <el-input v-model="dataForm.originPrice" placeholder="订单原价"></el-input>
    </el-form-item>
    <el-form-item label="订单实付" prop="payPrice">
      <el-input v-model="dataForm.payPrice" placeholder="订单实付"></el-input>
    </el-form-item>
    <el-form-item label="订单状态（1:进行中 2:已完成 3:已取消）" prop="status">
      <el-input v-model="dataForm.status" placeholder="订单状态（1:进行中 2:已完成 3:已取消）"></el-input>
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
          originPrice: '',
          payPrice: '',
          status: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          memberId: [
            { required: true, message: '会员ID不能为空', trigger: 'blur' }
          ],
          originPrice: [
            { required: true, message: '订单原价不能为空', trigger: 'blur' }
          ],
          payPrice: [
            { required: true, message: '订单实付不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '订单状态（1:进行中 2:已完成 3:已取消）不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/tOrder/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.memberId = data.tOrder.memberId
                this.dataForm.originPrice = data.tOrder.originPrice
                this.dataForm.payPrice = data.tOrder.payPrice
                this.dataForm.status = data.tOrder.status
                this.dataForm.createdAt = data.tOrder.createdAt
                this.dataForm.updatedAt = data.tOrder.updatedAt
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
              url: this.$http.adornUrl(`/cms/tOrder/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'memberId': this.dataForm.memberId,
                'originPrice': this.dataForm.originPrice,
                'payPrice': this.dataForm.payPrice,
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
