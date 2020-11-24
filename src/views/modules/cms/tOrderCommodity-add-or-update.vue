<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="订单ID" prop="orderId">
      <el-input v-model="dataForm.orderId" placeholder="订单ID"></el-input>
    </el-form-item>
    <el-form-item label="商品ID" prop="shopId">
      <el-input v-model="dataForm.shopId" placeholder="商品ID"></el-input>
    </el-form-item>
    <el-form-item label="商品名称" prop="shopName">
      <el-input v-model="dataForm.shopName" placeholder="商品名称"></el-input>
    </el-form-item>
    <el-form-item label="商品数量" prop="num">
      <el-input v-model="dataForm.num" placeholder="商品数量"></el-input>
    </el-form-item>
    <el-form-item label="商品金额" prop="price">
      <el-input v-model="dataForm.price" placeholder="商品金额"></el-input>
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
          orderId: '',
          shopId: '',
          shopName: '',
          num: '',
          price: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          orderId: [
            { required: true, message: '订单ID不能为空', trigger: 'blur' }
          ],
          shopId: [
            { required: true, message: '商品ID不能为空', trigger: 'blur' }
          ],
          shopName: [
            { required: true, message: '商品名称不能为空', trigger: 'blur' }
          ],
          num: [
            { required: true, message: '商品数量不能为空', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '商品金额不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/tOrderCommodity/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.orderId = data.tOrderCommodity.orderId
                this.dataForm.shopId = data.tOrderCommodity.shopId
                this.dataForm.shopName = data.tOrderCommodity.shopName
                this.dataForm.num = data.tOrderCommodity.num
                this.dataForm.price = data.tOrderCommodity.price
                this.dataForm.createdAt = data.tOrderCommodity.createdAt
                this.dataForm.updatedAt = data.tOrderCommodity.updatedAt
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
              url: this.$http.adornUrl(`/cms/tOrderCommodity/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'orderId': this.dataForm.orderId,
                'shopId': this.dataForm.shopId,
                'shopName': this.dataForm.shopName,
                'num': this.dataForm.num,
                'price': this.dataForm.price,
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
