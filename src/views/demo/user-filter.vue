<template>
  <div class="mod-home">
    <p class="title">用户相关</p>
    <div class="row">
      <div class="col-3">
        <h6>性别标签</h6>
        <el-tag
          v-for="item in sexTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>渠道标签</h6>
        <el-tag
          v-for="item in channelTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>热度标签</h6>
        <el-tag
          v-for="item in hotTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>关注标签</h6>
        <el-tag
          v-for="item in subTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3" style="margin-top: 10px;">
        <h6>注册时间</h6>
        <el-tag
          v-for="item in regTimeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3" style="margin-top: 10px;">
        <h6>下单时间</h6>
        <el-tag
          v-for="item in orderTimeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <p class="title">营销提醒</p>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <h6>首单免费失效</h6>
        <el-tag
          v-for="item in freeTimeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>优惠券失效</h6>
        <el-tag
          v-for="item in couponInvalidTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <p class="title">消费等级</p>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <h6>充值金额</h6>
        <el-tag
          v-for="item in chargeMoneyTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>下单金额</h6>
        <el-tag
          v-for="item in orderMoneyTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
    </div>

    <div class="row"></div>

    <p class="title">用户喜好</p>
    <div class="row">
      <div class="col-3">
        <h6>商圈</h6>
        <el-tag
          v-for="item in circleLikeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>商家</h6>
        <el-tag
          v-for="item in sellerLikeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>特色</h6>
        <el-tag
          v-for="item in categoryLikeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>周边</h6>
        <el-tag
          v-for="item in aroundTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
    </div>

    <p class="title">评价反馈</p>
    <div class="row">
      <div class="col-3">
        <h6>超时</h6>
        <el-tag
          v-for="item in overTimeTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
      <div class="col-3">
        <h6>反馈</h6>
        <el-tag
          v-for="item in feedbackTags"
          :key="item.label"
          :type="item.effect == 'light' ? 'info' : 'success'"
          @click="addTag(item)"
          >{{ item.label }}</el-tag
        >
      </div>
    </div>

    <div
      style="display: flex;justify-content: center;margin-bottom: 10px;"
      class="btn-div"
      d
    >
      <el-button type="primary" round @click="gen">生成</el-button>
      <el-button type="danger" round @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
import { judgeAndDownload } from "@/utils";
export default {
  data() {
    return {
      sexTags: [
        {
          effect: "light",
          label: "男性",
          name: "sex",
          value: "1",
          type: "match"
        },
        {
          effect: "light",
          label: "女性",
          name: "sex",
          value: "2",
          type: "match"
        },
        {
          effect: "light",
          label: "未知",
          name: "sex",
          value: "-1",
          type: "match"
        }
      ],
      channelTags: [
        {
          effect: "light",
          label: "IOS",
          name: "channel",
          value: "1",
          type: "match"
        },
        {
          effect: "light",
          label: "Android",
          name: "channel",
          value: "2",
          type: "match"
        },
        {
          effect: "light",
          label: "微信小程序",
          name: "channel",
          value: "3",
          type: "match"
        },
        {
          effect: "light",
          label: "微信公众号",
          name: "channel",
          value: "4",
          type: "match"
        },
        {
          effect: "light",
          label: "H5",
          name: "channel",
          value: "5",
          type: "match"
        }
      ],
      hotTags: [
        {
          effect: "light",
          label: "注册",
          name: "regTime",
          value: "",
          type: "exists"
        },
        {
          effect: "light",
          label: "待完善",
          name: "address",
          value: "-1",
          type: "match"
        },
        {
          effect: "light",
          label: "已领券",
          name: "freeCouponTime",
          value: "",
          type: "exists"
        },
        {
          effect: "light",
          label: "已下单",
          name: "orderCount",
          value: "1",
          type: "match"
        },
        {
          effect: "light",
          label: "已复购",
          name: "orderCount",
          value: "2",
          type: "rangeGte"
        }
      ],
      subTags: [
        {
          effect: "light",
          label: "已关注",
          name: "subOpenId",
          value: "null",
          type: "notMatch"
        },
        {
          effect: "light",
          label: "未关注",
          name: "subOpenId",
          value: "null",
          type: "match"
        }
      ],
      // 2019-11-30
      regTimeTags: [
        {
          effect: "light",
          label: "近一天",
          name: "regTime",
          value: "2020-04-08",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近二天",
          name: "regTime",
          value: "2020-04-07",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近三天",
          name: "regTime",
          value: "2020-04-06",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近四天",
          name: "regTime",
          value: "2020-04-05",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近五天",
          name: "regTime",
          value: "2020-04-04",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近六天",
          name: "regTime",
          value: "2020-04-03",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近七天",
          name: "regTime",
          value: "2020-04-02",
          type: "rangeGte"
        }
      ],

      orderTimeTags: [
        {
          effect: "light",
          label: "近一天",
          name: "orderTime",
          value: "2020-04-08",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近二天",
          name: "orderTime",
          value: "2020-04-07",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近三天",
          name: "orderTime",
          value: "2020-04-06",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近四天",
          name: "orderTime",
          value: "2020-04-05",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近五天",
          name: "orderTime",
          value: "2020-04-04",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近六天",
          name: "orderTime",
          value: "2020-04-03",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "近七天",
          name: "orderTime",
          value: "2020-04-02",
          type: "rangeGte"
        }
      ],
      //2019-11-30 8
      freeTimeTags: [
        {
          effect: "light",
          label: "近一天",
          name: "freeCouponTime",
          value: "2020-04-08",
          type: "match"
        },
        {
          effect: "light",
          label: "近二天",
          name: "freeCouponTime",
          value: "2020-04-07",
          type: "match"
        },
        {
          effect: "light",
          label: "近三天",
          name: "freeCouponTime",
          value: "2020-04-06",
          type: "match"
        },
        {
          effect: "light",
          label: "近四天",
          name: "freeCouponTime",
          value: "2020-04-05",
          type: "match"
        },
        {
          effect: "light",
          label: "近五天",
          name: "freeCouponTime",
          value: "2020-04-04",
          type: "match"
        },
        {
          effect: "light",
          label: "近六天",
          name: "freeCouponTime",
          value: "2020-04-03",
          type: "match"
        },
        {
          effect: "light",
          label: "近七天",
          name: "freeCouponTime",
          value: "2020-04-02",
          type: "match"
        }
      ],
      couponInvalidTags: [
        {
          effect: "light",
          label: "近一天",
          name: "couponTimes",
          value: "2020-04-08",
          type: "match"
        },
        {
          effect: "light",
          label: "近三天",
          name: "couponTimes",
          value: "2020-04-06",
          type: "match"
        },
        {
          effect: "light",
          label: "近五天",
          name: "couponTimes",
          value: "2020-04-04",
          type: "match"
        },
        {
          effect: "light",
          label: "近七天",
          name: "couponTimes",
          value: "2020-04-02",
          type: "match"
        }
      ],
      chargeMoneyTags: [
        {
          effect: "light",
          label: "10~50",
          name: "chargeMoney",
          value: "10-50",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "50~100",
          name: "chargeMoney",
          value: "50-100",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "100~200",
          name: "chargeMoney",
          value: "100-200",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "200~500",
          name: "chargeMoney",
          value: "200-500",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "500~1000",
          name: "chargeMoney",
          value: "500-1000",
          type: "rangeBoth"
        }
      ],
      orderMoneyTags: [
        {
          effect: "light",
          label: "10~50",
          name: "orderMoney",
          value: "10-50",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "50~100",
          name: "orderMoney",
          value: "50-100",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "100~200",
          name: "orderMoney",
          value: "100-200",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "200~500",
          name: "orderMoney",
          value: "200-500",
          type: "rangeBoth"
        },
        {
          effect: "light",
          label: "500~1000",
          name: "orderMoney",
          value: "500-1000",
          type: "rangeBoth"
        }
      ],
      circleLikeTags: [
        {
          effect: "light",
          label: "大良清晖园",
          name: "favGoods",
          value: "2",
          type: "match"
        },
        {
          effect: "light",
          label: "南海新都会",
          name: "favGoods",
          value: "675",
          type: "match"
        },
        {
          effect: "light",
          label: "东方广场",
          name: "favGoods",
          value: "128",
          type: "match"
        },
        {
          effect: "light",
          label: "祖庙",
          name: "favGoods",
          value: "197",
          type: "match"
        }
      ],
      sellerLikeTags: [
        {
          effect: "light",
          label: "小猪配齐",
          name: "favGoods",
          value: "3",
          type: "match"
        },
        {
          effect: "light",
          label: "sam之家",
          name: "favGoods",
          value: "1",
          type: "match"
        },
        {
          effect: "light",
          label: "哥顿酒店",
          name: "favGoods",
          value: "1232",
          type: "match"
        },
        {
          effect: "light",
          label: "禾风寿司",
          name: "favGoods",
          value: "1228",
          type: "match"
        },
        {
          effect: "light",
          label: "麦多乐",
          name: "favGoods",
          value: "1202",
          type: "match"
        }
      ],
      categoryLikeTags: [
        {
          effect: "light",
          label: "自助餐",
          name: "favGoods",
          value: "1183",
          type: "match"
        },
        {
          effect: "light",
          label: "烤鱼",
          name: "favGoods",
          value: "888",
          type: "match"
        },
        {
          effect: "light",
          label: "海鲜",
          name: "favGoods",
          value: "844",
          type: "match"
        },
        {
          effect: "light",
          label: "日式料理",
          name: "favGoods",
          value: "921",
          type: "match"
        },
        {
          effect: "light",
          label: "西餐",
          name: "favGoods",
          value: "791",
          type: "match"
        }
      ],
      aroundTags: [
        {
          effect: "light",
          label: "奶茶",
          name: "favGoods",
          value: "700",
          type: "match"
        },
        {
          effect: "light",
          label: "豪华酒店",
          name: "favGoods",
          value: "53",
          type: "match"
        },
        {
          effect: "light",
          label: "披萨",
          name: "favGoods",
          value: "1018",
          type: "match"
        },
        {
          effect: "light",
          label: "民宿",
          name: "favGoods",
          value: "80",
          type: "match"
        },
        {
          effect: "light",
          label: "蛋糕",
          name: "favGoods",
          value: "1286",
          type: "match"
        }
      ],
      overTimeTags: [
        {
          effect: "light",
          label: "15分钟",
          name: "overTime",
          value: "900",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "30分钟",
          name: "overTime",
          value: "1800",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "45分钟",
          name: "overTime",
          value: "2700",
          type: "rangeGte"
        },
        {
          effect: "light",
          label: "1小时以上",
          name: "overTime",
          value: "3600",
          type: "rangeGte"
        }
      ],
      feedbackTags: [
        {
          effect: "light",
          label: "破损",
          name: "feedBack",
          value: "1",
          type: "match"
        },
        {
          effect: "light",
          label: "缺货",
          name: "feedBack",
          value: "2",
          type: "match"
        },
        {
          effect: "light",
          label: "错货",
          name: "feedBack",
          value: "3",
          type: "match"
        },
        {
          effect: "light",
          label: "投诉",
          name: "feedBack",
          value: "4",
          type: "match"
        }
      ],
      selectedTags: new Set()
    };
  },
  methods: {
    addTag(item) {
      item.effect = item.effect == "light" ? "dark" : "light";
      if (item.effect == "dark") {
        this.selectedTags.add(item);
      } else {
        this.selectedTags.delete(item);
      }
    },
    gen() {
      if (this.selectedTags.size == 0) {
        this.$message.error("请先选择会员用户标签");
      }
      let tags = [];
      Array.from(this.selectedTags).forEach(tag => {
        tags.push({
          name: tag.name,
          value: tag.value,
          type: tag.type
        });
      });
      // axios 发送一个 post 请求
      this.$http({
        url: this.$http.adornUrl("/etl/gen"),
        method: "post",
        data: this.$http.adornData(tags, false),
        responseType: "blob"
      }).then(res => judgeAndDownload(res));
    },
    reset() {
      this.selectedTags.forEach(tag => {
        tag.effect = "light";
      });
      this.selectedTags.clear();
    }
  }
};
</script>

<style>
.mod-home {
  line-height: 1.5;
}
.title {
  padding-top: 10px;
  font-size: 30px;
}

.el-tag {
  margin: 5px 5px 5px 5px;
}

.btn-div {
  margin-top: 20px;
}
</style>
