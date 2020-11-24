<template>
  <div class="site-wrapper site-page--not-found">
    <div class="site-content__wrapper">
      <div class="site-content">
        <h2 class="not-found-title">400</h2>
        <p class="not-found-desc">抱歉！您访问的页面<em>失联</em>啦 ...</p>
        <el-button @click="$router.go(-1)">返回上一页</el-button>
        <el-button
          type="primary"
          class="not-found-btn-gohome"
          @click="$router.push({ name: 'home' })"
        >
          进入首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.site-wrapper.site-page--not-found {
  bottom: 0;
  left: 0;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;

  .site-content__wrapper {
    background-color: #fff;
    margin: 0;
    padding: 0;
  }

  .site-content {
    left: 50%;
    padding: 30px;
    position: fixed;
    text-align: center;
    top: 15%;
    transform: translate(-50%, 0);
    z-index: 2;
  }

  .not-found-title {
    color: rgb(55, 71, 79);
    font-size: 10em;
    font-weight: 400;
    margin: 20px 0 15px;
  }

  .not-found-desc {
    color: rgb(118, 131, 143);
    font-size: 26px;
    margin: 0 0 30px;
    text-transform: uppercase;

    > em {
      color: #ee8145;
      font-style: normal;
    }
  }

  .not-found-btn-gohome {
    margin-left: 30px;
  }
}
</style>
