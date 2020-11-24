<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">Fun运营后台</h2>
          <p class="brand-info__intro">
            吃喝玩乐，衣食住行，Just have fun!
          </p>
        </div>
        <div class="login-main">
          <h3 class="login-title">管理员登录</h3>
          <el-form
            :model="dataForm"
            :rules="dataRule"
            ref="dataForm"
            @keyup.enter.native="dataFormSubmit()"
            status-icon
          >
            <el-form-item prop="userName">
              <el-input v-model="dataForm.userName" placeholder="帐号" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="dataForm.password"
                type="password"
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input v-model="dataForm.captcha" placeholder="验证码">
                  </el-input>
                </el-col>
                <el-col :span="10" class="login-captcha">
                  <img :src="captchaPath" @click="getCaptcha()" alt="" />
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn-submit"
                type="primary"
                @click="dataFormSubmit()"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUUID } from "@/utils";

export default {
  data() {
    return {
      dataForm: {
        userName: "",
        password: "",
        uuid: "",
        captcha: ""
      },
      dataRule: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ]
      },
      captchaPath: ""
    };
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 提交表单
    dataFormSubmit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/sys/login"),
            method: "post",
            data: this.$http.adornData({
              username: this.dataForm.userName,
              password: this.dataForm.password,
              uuid: this.dataForm.uuid,
              captcha: this.dataForm.captcha
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$cookies.set("token", data.token);
              this.$router.replace({ name: "home" }).catch(() => {});
            } else {
              this.getCaptcha();
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      this.dataForm.uuid = getUUID();
      this.captchaPath = this.$http.adornUrl(
        `/captcha.jpg?uuid=${this.dataForm.uuid}`
      );
    }
  }
};
</script>

<style lang="scss">
.site-wrapper.site-page--login {
  background-color: rgba(38, 50, 56, 0.6);
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;

  &:before {
    background-image: url("~@/assets/img/login_bg.jpg");
    background-size: cover;
    content: "";
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: -1;
  }

  .site-content__wrapper {
    background-color: transparent;
    bottom: 0;
    left: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }

  .brand-info {
    color: #fff;
    margin: 220px 100px 0 90px;
  }

  .brand-info__text {
    font-size: 48px;
    font-weight: 400;
    margin: 0 0 22px 0;
    text-transform: uppercase;
  }

  .brand-info__intro {
    font-size: 16px;
    line-height: 1.58;
    margin: 10px 0;
    opacity: 0.6;
  }

  .login-main {
    background-color: #fff;
    min-height: 100%;
    padding: 150px 60px 180px;
    position: absolute;
    right: 0;
    top: 0;
    width: 470px;
  }

  .login-title {
    font-size: 16px;
  }

  .login-captcha {
    overflow: hidden;

    > img {
      cursor: pointer;
      width: 100%;
    }
  }

  .login-btn-submit {
    margin-top: 38px;
    width: 100%;
  }
}
</style>
