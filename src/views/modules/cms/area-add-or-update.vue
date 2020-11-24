<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="父级id" prop="pid">
      <el-input v-model="dataForm.pid" placeholder="父级id"></el-input>
    </el-form-item>
    <el-form-item label="地区名" prop="name">
      <el-input v-model="dataForm.name" placeholder="地区名"></el-input>
    </el-form-item>
    <el-form-item label="level" prop="level">
      <el-input v-model="dataForm.level" placeholder="level"></el-input>
    </el-form-item>
<!--    <el-form-item label="" prop="createdAt">-->
<!--      <el-input v-model="dataForm.createdAt" placeholder=""></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="" prop="updatedAt">-->
<!--      <el-input v-model="dataForm.updatedAt" placeholder=""></el-input>-->
<!--    </el-form-item>-->
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
          pid: '',
          name: '',
          level: '',
          createdAt: '',
          updatedAt: ''
        },
        dataRule: {
          pid: [
            { required: true, message: '父级id不能为空', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '地区名不能为空', trigger: 'blur' }
          ],
          level: [
            { required: true, message: 'level不能为空', trigger: 'blur' }
          ],
          createdAt: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          updatedAt: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/cms/area/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.pid = data.area.pid
                this.dataForm.name = data.area.name
                this.dataForm.level = data.area.level
                this.dataForm.createdAt = data.area.createdAt
                this.dataForm.updatedAt = data.area.updatedAt
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
              url: this.$http.adornUrl(`/cms/area/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'pid': this.dataForm.pid,
                'name': this.dataForm.name,
                'level': this.dataForm.level,
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
