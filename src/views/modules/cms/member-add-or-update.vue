<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="会员名" prop="name">
      <el-input v-model="dataForm.name" placeholder="会员名"></el-input>
    </el-form-item>
    <el-form-item label="登录密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="登录密码"></el-input>
    </el-form-item>
    <el-form-item label="性别（-1:未知 1:男 2:女）" prop="sex">
      <el-input v-model="dataForm.sex" placeholder="性别（-1:未知 1:男 2:女）"></el-input>
    </el-form-item>
    <el-form-item label="" prop="phone">
      <el-input v-model="dataForm.phone" placeholder=""></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="birth">
      <el-input v-model="dataForm.birth" placeholder="出生日期"></el-input>
    </el-form-item>
    <el-form-item label="默认地址ID" prop="addressDefaultId">
      <el-input v-model="dataForm.addressDefaultId" placeholder="默认地址ID"></el-input>
    </el-form-item>
    <el-form-item label="会员注册渠道（1:IOS 2:android 3:微信小程序 4:微信公众号 5:h5）" prop="memberChannel">
      <el-input v-model="dataForm.memberChannel" placeholder="会员注册渠道（1:IOS 2:android 3:微信小程序 4:微信公众号 5:h5）"></el-input>
    </el-form-item>
    <el-form-item label="微信公众号openId" prop="mpOpenId">
      <el-input v-model="dataForm.mpOpenId" placeholder="微信公众号openId"></el-input>
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
          password: '',
          sex: '',
          phone: '',
          birth: '',
          addressDefaultId: '',
          memberChannel: '',
          mpOpenId: '',
          status: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          name: [
            { required: true, message: '会员名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '登录密码不能为空', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '性别（-1:未知 1:男 2:女）不能为空', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          birth: [
            { required: true, message: '出生日期不能为空', trigger: 'blur' }
          ],
          addressDefaultId: [
            { required: true, message: '默认地址ID不能为空', trigger: 'blur' }
          ],
          memberChannel: [
            { required: true, message: '会员注册渠道（1:IOS 2:android 3:微信小程序 4:微信公众号 5:h5）不能为空', trigger: 'blur' }
          ],
          mpOpenId: [
            { required: true, message: '微信公众号openId不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/member/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.name = data.member.name
                this.dataForm.password = data.member.password
                this.dataForm.sex = data.member.sex
                this.dataForm.phone = data.member.phone
                this.dataForm.birth = data.member.birth
                this.dataForm.addressDefaultId = data.member.addressDefaultId
                this.dataForm.memberChannel = data.member.memberChannel
                this.dataForm.mpOpenId = data.member.mpOpenId
                this.dataForm.status = data.member.status
                this.dataForm.createdAt = data.member.createdAt
                this.dataForm.updatedAt = data.member.updatedAt
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
              url: this.$http.adornUrl(`/cms/member/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'name': this.dataForm.name,
                'password': this.dataForm.password,
                'sex': this.dataForm.sex,
                'phone': this.dataForm.phone,
                'birth': this.dataForm.birth,
                'addressDefaultId': this.dataForm.addressDefaultId,
                'memberChannel': this.dataForm.memberChannel,
                'mpOpenId': this.dataForm.mpOpenId,
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
