<template>
  <div class="mod-demo-echarts">
    <tag-ball></tag-ball>
    <div class="row">
      <div id="stats" style="width: 100%;height: 500px;"></div>
    </div>
    <div class="row">
      <div class="col-3">
        <div id="user-gender" style="width: 100%;height: 300px;"></div>
      </div>
      <div class="col-3">
        <div id="user-channel" style="width: 100%;height: 300px;"></div>
      </div>
      <div class="col-3">
        <div id="user-hot" style="width: 100%;height: 300px;"></div>
      </div>
      <div class="col-3">
        <div id="user-reg-channel" style="width: 100%;height: 300px;"></div>
      </div>
    </div>
    <div class="row">
      <div id="user-reg-count" style="width: 50%;height: 400px;"></div>
      <div id="user-order-count" style="width: 50%;height: 400px;"></div>
    </div>
    <div class="row marketing">
      <div class="col-3 offset-3">
        <div id="new-user-coupon" style="width: 100%;height: 300px;"></div>
      </div>
      <div class="col-3">
        <div id="user-coupon-invalid" style="width: 100%;height: 300px;"></div>
      </div>
    </div>
    <div class="row justify-content-center" style="margin-top:60px;">
      <div id="funnel" style="width: 800px;height: 600px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import TagBall from "@/views/common/tag-ball";
export default {
  components: { TagBall },
  data() {
    return {
      userWXSubChart: null,
      userGenderChart: null,
      userChannelChart: null,
      userRegCountChart: null,
      userOrderCountChart: null,
      userHotChart: null,
      invalidCouponChart: null,
      funnelChart: null,
      newUserCouponChart: null,
      statsChart: null
    };
  },
  mounted() {
    this.initFunnel();
    this.intitNewUserCouponChart();
    this.initStats();
    this.initUserCouponInvalidChart();
    this.initHotChart();
    this.initOrderCountChar();
    this.initRegCountChart();
    this.initUsrChannelChart();
    this.initUsrGenderChart();
    this.initUsrWXSubChart();
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug
    if (this.userWXSubChart) {
      this.userWXSubChart.resize();
    }
    if (this.userGenderChart) {
      this.userGenderChart.resize();
    }
    if (this.userChannelChart) {
      this.userChannelChart.resize();
    }
    if (this.userRegCountChart) {
      this.userRegCountChart.resize();
    }
    if (this.userOrderCountChart) {
      this.userOrderCountChart.resize();
    }
    if (this.userHotChart) {
      this.userHotChart.resize();
    }
    if (this.invalidCouponChart) {
      this.invalidCouponChart.resize();
    }
    if (this.funnelChart) {
      this.funnelChart.resize();
    }
    if (this.newUserCouponChart) {
      this.newUserCouponChart.resize();
    }
    if (this.statsChart) {
      this.statsChart.resize();
    }
  },
  methods: {
    initUsrWXSubChart() {
      this.userWXSubChart = echarts.init(
        document.getElementById("user-reg-channel")
      );
      var userWXSubOption = {
        title: {
          text: "关注",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "关注微信公众号",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "已关注" },
              { value: 310, name: "未关注" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.userWXSubChart.setOption(userWXSubOption);
      window.addEventListener("resize", () => {
        this.userWXSubChart.resize();
      });
    },
    initUsrGenderChart() {
      this.userGenderChart = echarts.init(
        document.getElementById("user-gender")
      );
      var userGenderOption = {
        title: {
          text: "性别",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "用户性别",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "未知" },
              { value: 310, name: "男性" },
              { value: 234, name: "女性" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.userGenderChart.setOption(userGenderOption);
      window.addEventListener("resize", () => {
        this.userGenderChart.resize();
      });
    },
    initUsrChannelChart() {
      this.userChannelChart = echarts.init(
        document.getElementById("user-channel")
      );
      var userChannelOption = {
        title: {
          text: "渠道",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "接入渠道",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "IOS" },
              { value: 310, name: "Android" },
              { value: 234, name: "微信小程序" },
              { value: 135, name: "微信公众号" },
              { value: 1548, name: "H5" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.userChannelChart.setOption(userChannelOption);
      window.addEventListener("resize", () => {
        this.userChannelChart.resize();
      });
    },
    initRegCountChart() {
      this.userRegCountChart = echarts.init(
        document.getElementById("user-reg-count")
      );
      var userRegCountOption = {
        title: {
          text: "周注册量",
          left: 50
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["时间", "当期", "上期"],
            ["近一天", 43.3, 85.8],
            ["近二天", 83.1, 73.4],
            ["近三天", 86.4, 65.2],
            ["近四天", 86.4, 65.2],
            ["近五天", 86.4, 65.2],
            ["近六天", 72.4, 53.9],
            ["近七天", 72.4, 53.9]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }]
      };
      this.userRegCountChart.setOption(userRegCountOption);
      window.addEventListener("resize", () => {
        this.userRegCountChart.resize();
      });
    },
    initOrderCountChar() {
      this.userOrderCountChart = echarts.init(
        document.getElementById("user-order-count")
      );
      var userOrderCountOption = {
        title: {
          text: "周下单量",
          left: 50
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["时间", "当期", "上期"],
            ["近一天", 43.3, 85.8],
            ["近二天", 83.1, 73.4],
            ["近三天", 86.4, 65.2],
            ["近四天", 86.4, 65.2],
            ["近五天", 86.4, 65.2],
            ["近六天", 72.4, 53.9],
            ["近七天", 72.4, 53.9]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }]
      };
      this.userOrderCountChart.setOption(userOrderCountOption);
      window.addEventListener("resize", () => {
        this.userOrderCountChart.resize();
      });
    },
    initHotChart() {
      this.userHotChart = echarts.init(document.getElementById("user-hot"));
      var userHotOption = {
        title: {
          text: "热度",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "热度属性",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "已注册" },
              { value: 310, name: "已下单" },
              { value: 234, name: "已领券" },
              { value: 234, name: "已复购" },
              { value: 135, name: "已完善" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.userHotChart.setOption(userHotOption);
      window.addEventListener("resize", () => {
        this.userHotChart.resize();
      });
    },
    initUserCouponInvalidChart() {
      this.invalidCouponChart = echarts.init(
        document.getElementById("user-coupon-invalid")
      );
      var invalidCouponOption = {
        title: {
          text: "优惠券失效提醒",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "消费属性",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "三天后失效" },
              { value: 310, name: "五天后失效" },
              { value: 234, name: "七天后失效" },
              { value: 234, name: "一天后失效" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.invalidCouponChart.setOption(invalidCouponOption);
      window.addEventListener("resize", () => {
        this.invalidCouponChart.resize();
      });
    },
    initFunnel() {
      this.funnelChart = echarts.init(document.getElementById("funnel"));
      var funnelOption = {
        title: {
          text: "漏斗图"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%"
        },
        toolbox: {
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {}
          }
        },
        legend: {
          data: ["展现", "点击", "加购", "下单", "复购", "储值"]
        },
        calculable: true,
        series: [
          {
            name: "漏斗图",
            type: "funnel",
            left: "10%",
            top: 60,
            bottom: 60,
            width: "80%",
            min: 0,
            max: 100,
            minSize: "0%",
            maxSize: "100%",
            sort: "descending",
            gap: 2,
            label: {
              show: true,
              position: "inside"
            },
            labelLine: {
              length: 10,
              lineStyle: {
                width: 1,
                type: "solid"
              }
            },
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 1
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            },
            data: [
              { value: 20, name: "储值" },
              { value: 40, name: "复购" },
              { value: 55, name: "下单" },
              { value: 70, name: "加购" },
              { value: 85, name: "点击" },
              { value: 100, name: "展现" }
            ]
          }
        ]
      };
      this.funnelChart.setOption(funnelOption);
      window.addEventListener("resize", () => {
        this.funnelChart.resize();
      });
    },
    intitNewUserCouponChart() {
      this.newUserCouponChart = echarts.init(
        document.getElementById("new-user-coupon")
      );
      var newUserCouponOption = {
        title: {
          text: "首单免费提醒",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "消费属性",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "前一天" },
              { value: 310, name: "前两天" },
              { value: 234, name: "前三天" },
              { value: 234, name: "前四天" },
              { value: 234, name: "前五天" },
              { value: 234, name: "前六天" },
              { value: 135, name: "前七天" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.newUserCouponChart.setOption(newUserCouponOption);
      window.addEventListener("resize", () => {
        this.newUserCouponChart.resize();
      });
    },
    initStats() {
      this.statsChart = echarts.init(document.getElementById("stats"));
      var statsOption = {
        title: {
          text: "增长",
          left: 50
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新用户", "总用户", "订单", "GMV"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新用户",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "总用户",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "GMV",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      };
      this.statsChart.setOption(statsOption);
      window.addEventListener("resize", () => {
        this.statsChart.resize();
      });
    }
  }
};
</script>

<style lang="scss">
.mod-demo-echarts {
  .form_vav td {
    color: #a78b6f;
  }
}
</style>
