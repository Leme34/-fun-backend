<template>
  <div class="sysDataDictionary" v-cloak>
    <el-container>
      <el-aside>
        <span class="title">数据字典</span>
        <el-menu
          default-active="2"
          @select="selectMenu"
          class="el-menu-vertical-demo"
        >
          <div v-for="data in this.dataList" :key="data.id">
            <el-submenu v-if="data.children" :index="data.id + ''">
              <template slot="title">
                <i class="el-icon-menu" />
                <span>{{ data.name }}</span>
              </template>
              <el-menu-item
                v-for="(item, index) in data.children"
                :key="index"
                :index="item.id + ''"
              >
                <i class="el-icon-edit" />
                {{ item.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="data.id + ''">
              <i class="el-icon-menu" />
              <span>{{ data.name }}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-main>
        <span class="title">字典管理</span>
        <el-form
          :inline="true"
          :model="dataForm"
          @keyup.enter.native="selectMenu()"
          class="form_headsearch"
          label-position="right"
        >
          <el-form-item label="字典名称:" class="smallInput">
            <el-input
              v-model="dataForm.keyword"
              placeholder="字典名称"
              clearable
            />
            <el-input v-show="false" />
          </el-form-item>
          <el-form-item>
            <el-button @click="selectMenu()">查询</el-button>
            <el-button
              v-if="isAuth('sys:sysDictionaryManage:save')"
              type="primary"
              @click="addOrUpdateHandle()"
              >新增</el-button
            >
            <el-button
              v-if="isAuth('sys:sysDictionaryManage:delete')"
              type="danger"
              @click="deleteHandle()"
              :disabled="dataListSelections.length <= 0"
              >批量删除</el-button
            >
          </el-form-item>
        </el-form>
        <el-table
          :data="dicManageList"
          border
          v-loading="dataListLoading"
          @selection-change="selectionChangeHandle"
          style="width: 100%;"
        >
          <el-table-column
            type="selection"
            header-align="center"
            align="center"
            width="50"
          />
          <el-table-column
            prop="id"
            header-align="center"
            align="center"
            label="字典编号"
          />
          <el-table-column
            prop="name"
            header-align="center"
            align="center"
            label="字典名"
          />
          <el-table-column
            prop="value"
            header-align="center"
            align="center"
            label="字典值"
          />
          <!-- <el-table-column prop="did"
                           header-align="center"
                           align="center"
                           label="父级id">
          </el-table-column> -->
          <el-table-column
            prop="createAt"
            header-align="center"
            align="center"
            label="创建时间"
            width="200"
          />
          <el-table-column
            fixed="right"
            header-align="center"
            align="center"
            width="150"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="addOrUpdateHandle(scope.row.id)"
                >修改</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteHandle(scope.row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
          :current-page="pageIndex"
          :total="totalPage"
          layout="total"
        />
      </el-main>
    </el-container>
    <AddOrUpdate
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="selectMenu"
    />
  </div>
</template>

<script>
import AddOrUpdate from "./sysDataDictionary-add-or-update";
import { treeDataTranslate } from "@/utils";
export default {
  data() {
    return {
      dataForm: {
        keyword: ""
      },
      dataList: [],
      dicManageList: [],
      pageIndex: 1,
      pageSize: 100,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      curSelId: ""
    };
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 获取数据列表 只需要初始化一次
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/sys/sysDataDictionary/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          key: this.dataForm.key
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = treeDataTranslate(data.data, "id", "pid");
        } else {
          this.dataList = [];
        }
        this.dataListLoading = false;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.selectMenu();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.selectMenu();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id, this.curSelId);
      });
    },
    // 删除
    deleteHandle(id) {
      var ids = id
        ? [id]
        : this.dataListSelections.map(item => {
            return item.id;
          });
      this.$confirm(
        `确定对[id=${ids.join(",")}]进行[${id ? "删除" : "批量删除"}]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.$http({
          url: this.$http.adornUrl("/sys/sysDictionaryManage/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.selectMenu();
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    selectMenu(key) {
      this.dataListLoading = true;
      key = key || this.curSelId;
      this.dicManageList = [];
      this.$http({
        url: this.$http.adornUrl("/sys/sysDictionaryManage/list"),
        method: "get",
        params: this.$http.adornParams({
          dataDictionaryId: key,
          keyword: this.dataForm.keyword,
          page: this.pageIndex,
          limit: this.pageSize
        })
      }).then(({ data }) => {
        this.dataListLoading = false;
        if (data.code === 0) {
          this.dicManageList = data.page.list;
          this.totalPage = data.page.totalCount;
        }
        this.curSelId = key;
      });
    }
  },
  mounted() {
    this.getDataList();
    this.selectMenu(2);
  }
};
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.sysDataDictionary ::v-deep {
  overflow: hidden;

  .el-header,
  .el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    width: 250px !important;
    height: 83.3vh;
    background-color: #17b3a3;
    color: #fff;
    .title {
      display: block;
      padding: 10px 0 10px 15px;
      font-size: 16px;
    }
    .el-menu-item,
    .el-submenu__title,
    .el-submenu .el-menu-item {
      height: 40px;
      line-height: 40px;
    }
  }
  .el-main {
    color: #0e2d5f;
    padding: 0 10px;
    height: 83.3vh;
    .title {
      display: block;
      padding: 10px 0 10px 15px;
      font-size: 16px;
      background-color: #17b3a3;
      color: #fff;
    }
    .el-form {
      margin-top: 10px;
    }
    .el-table {
      overflow-x: hidden;
      overflow-y: auto;
      width: 99.9% !important;
      .cell {
        font-size: 12px;
        height: 32px !important;
      }
    }
  }
}
</style>
