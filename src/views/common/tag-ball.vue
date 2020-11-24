<template>
  <div class="row justify-content-center">
    <div class="offset-3 offset-md-2"></div>
    <div class="tag-cloud col-lg-6">
      <div class="dadiv">
        <div class="tagBall">
          <a class="tag" href="#" v-for="tag in tagCloudList" :key="tag.name">
            {{ tag.name }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "TagBall",
  data() {
    return {
      tagCloudList: [],
      chartArr: [],
      tags: [],
      angleX: Math.PI / 500,
      angleY: Math.PI / 500,
      tagEle: null,
      paper: null,
      RADIUS: 220,
      fallLength: 500,
      CX: null,
      CY: null,
      EX: null,
      EY: null
    };
  },
  async mounted() {
    await this.getTagCloudList();

    this.tagEle =
      "querySelectorAll" in document
        ? document.querySelectorAll(".tag")
        : getClass("tag");
    this.paper =
      "querySelectorAll" in document
        ? document.querySelector(".tagBall")
        : getClass("tagBall")[0];
    this.CX = this.paper.offsetWidth / 2;
    this.CY = this.paper.offsetHeight / 2;
    this.EX =
      this.paper.offsetLeft +
      document.body.scrollLeft +
      document.documentElement.scrollLeft;
    this.EY =
      this.paper.offsetTop +
      document.body.scrollTop +
      document.documentElement.scrollTop;
    if ("addEventListener" in window) {
      this.paper.addEventListener("mousemove", event => {
        let x = event.clientX - this.EX - this.CX;
        let y = event.clientY - this.EY - this.CY;
        this.angleY = x * 0.0001;
        this.angleX = y * 0.0001;
      });
    } else {
      this.paper.attachEvent("onmousemove", event => {
        let x = event.clientX - this.EX - this.CX;
        let y = event.clientY - this.EY - this.CY;
        this.angleY = x * 0.0001;
        this.angleX = y * 0.0001;
      });
    }

    for (var i = 0; i < this.tagEle.length; i++) {
      let k = -1 + (2 * (i + 1) - 1) / this.tagEle.length;
      let a = Math.acos(k);
      let b = a * Math.sqrt(this.tagEle.length * Math.PI);
      let x = this.RADIUS * Math.sin(a) * Math.cos(b);
      let y = this.RADIUS * Math.sin(a) * Math.sin(b);
      let z = this.RADIUS * Math.cos(a);
      let t = {
        ele: this.tagEle[i],
        x: x,
        y: y,
        z: z
      };
      this.tagEle[i].style.color =
        "rgb(" +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        "," +
        parseInt(Math.random() * 255) +
        ")";
      this.tags.push(t);
      this.move(t);
    }
    // 动画
    this.animate();
  },
  activated() {},
  methods: {
    getTagCloudList() {
      // todo
      this.tagCloudList = [
        { name: "男性" },
        { name: "女性" },
        { name: "IOS" },
        { name: "Android" },
        { name: "微信小程序" },
        { name: "微信公众号" },
        { name: "H5" },
        { name: "注册" },
        { name: "待完善" },
        { name: "已领券" },
        { name: "已下单" },
        { name: "已复购" },
        { name: "已关注" },
        { name: "未关注" },
        { name: "大良清晖园" },
        { name: "南海新都会" },
        { name: "东方广场" },
        { name: "祖庙" },
        { name: "小猪配齐" },
        { name: "sam之家" },
        { name: "哥顿酒店" },
        { name: "禾风寿司" },
        { name: "麦多乐" },
        { name: "自助餐" },
        { name: "烤鱼" },
        { name: "海鲜" },
        { name: "日式料理" },
        { name: "西餐" },
        { name: "奶茶" },
        { name: "豪华酒店" },
        { name: "披萨" },
        { name: "民宿" },
        { name: "蛋糕" },
        { name: "破损、撒漏" },
        { name: "错货" },
        { name: "缺货" },
        { name: "投诉" }
      ];
    },
    animate() {
      setInterval(() => {
        this.rotateX();
        this.rotateY();
        this.tags.forEach(tag => {
          this.move(tag);
        });
      }, 20);
    },
    move(tag) {
      var scale = this.fallLength / (this.fallLength - tag.z);
      var alpha = (tag.z + this.RADIUS) / (2 * this.RADIUS);
      tag.ele.style.fontSize = 15 * scale + "px";
      tag.ele.style.opacity = alpha + 0.5;
      tag.ele.style.filter = "alpha(opacity = " + (alpha + 0.5) * 100 + ")";
      tag.ele.style.zIndex = parseInt(scale * 100);
      tag.ele.style.left = tag.x + this.CX - tag.ele.offsetWidth / 2 + "px";
      tag.ele.style.top = tag.y + this.CY - tag.ele.offsetHeight / 2 + "px";
    },
    rotateX() {
      var cos = Math.cos(this.angleX);
      var sin = Math.sin(this.angleX);
      this.tags.forEach(tag => {
        var y1 = tag.y * cos - tag.z * sin;
        var z1 = tag.z * cos + tag.y * sin;
        tag.y = y1;
        tag.z = z1;
      });
    },
    rotateY() {
      var cos = Math.cos(this.angleY);
      var sin = Math.sin(this.angleY);
      this.tags.forEach(tag => {
        var x1 = tag.x * cos - tag.z * sin;
        var z1 = tag.z * cos + tag.x * sin;
        tag.x = x1;
        tag.z = z1;
      });
    }
  }
};
</script>

<style lang="scss">
.tagBall {
  width: 500px;
  height: 500px;
  /*position:absolute;*/
  /*top:20px;*/
  /*left:20px;*/
}
.tag {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  color: #000;
  text-decoration: none;
  font-size: 15px;
  font-family: "微软雅黑";
  font-weight: bold;
}
.tag:hover {
  border: 1px solid #666;
}
.form_vav td {
  color: #a78b6f;
}
</style>
