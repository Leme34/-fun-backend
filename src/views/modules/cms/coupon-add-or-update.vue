<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="券名称" prop="couponName">
      <el-input v-model="dataForm.couponName" placeholder="券名称"></el-input>
    </el-form-item>
    <el-form-item label="券面金额（用于抵扣订单金额）" prop="couponPrice">
      <el-input v-model="dataForm.couponPrice" placeholder="券面金额（用于抵扣订单金额）"></el-input>
    </el-form-item>
    <el-form-item label="创建人（后台用户ID）" prop="createUserId">
      <el-input v-model="dataForm.createUserId" placeholder="创建人（后台用户ID）"></el-input>
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
          couponName: '',
          couponPrice: '',
          createUserId: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          couponName: [
            { required: true, message: '券名称不能为空', trigger: 'blur' }
          ],
          couponPrice: [
            { required: true, message: '券面金额（用于抵扣订单金额）不能为空', trigger: 'blur' }
          ],
          createUserId: [
            { required: true, message: '创建人（后台用户ID）不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/coupon/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.couponName = data.coupon.couponName
                this.dataForm.couponPrice = data.coupon.couponPrice
                this.dataForm.createUserId = data.coupon.createUserId
                this.dataForm.createdAt = data.coupon.createdAt
                this.dataForm.updatedAt = data.coupon.updatedAt
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
              url: this.$http.adornUrl(`/cms/coupon/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'couponName': this.dataForm.couponName,
                'couponPrice': this.dataForm.couponPrice,
                'createUserId': this.dataForm.createUserId,
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
