<template>
  <el-dialog
    class="cms_zxpart"
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      @keyup.enter.native="dataFormSubmit()"
      label-width="120px"
    >
      <div class="hummanpart">
        <el-form-item label="字典名" prop="name">
          <el-input v-model="dataForm.name" placeholder="字典名" />
        </el-form-item>
        <el-form-item label="字典值" prop="value">
          <el-input v-model="dataForm.value" placeholder="字典值" />
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        value: "",
        name: ""
      },
      curSelId: "",
      dataRule: {
        value: [{ required: true, message: "字典值不能为空", trigger: "blur" }],
        name: [{ required: true, message: "字典名不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    init(id, curSelId) {
      this.dataForm.id = id || 0;
      this.curSelId = curSelId;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(
              `/sys/sysDictionaryManage/info/${this.dataForm.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.did = data.sysDictionaryManage.did;
              this.dataForm.name = data.sysDictionaryManage.name;
              this.dataForm.value = data.sysDictionaryManage.value;
            }
          });
        }
      });
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              `/sys/sysDictionaryManage/${
                !this.dataForm.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData({
              id: this.dataForm.id || undefined,
              did: this.curSelId,
              name: this.dataForm.name,
              value: this.dataForm.value
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.visible = false;
                  this.$emit("refreshDataList");
                }
              });
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    }
  }
};
</script>
