<template>
    <div class="mod-config">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input v-model="dataForm.key" placeholder="商铺名称" clearable></el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="getDataList()">查询</el-button>
                <el-button v-if="isAuth('cms:shop:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
                <el-button v-if="isAuth('cms:shop:delete')" type="danger" @click="deleteHandle()"
                           :disabled="dataListSelections.length <= 0">批量删除
                </el-button>
            </el-form-item>
            <el-form-item v-if="isAuth('cms:shop:update')">
                <el-dropdown @command="enableBatch">
                    <el-button type="primary">
                        批量操作<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0" :disabled="dataListSelections.length <= 0">批量上架
                        </el-dropdown-item>
                        <el-dropdown-item command="1" :disabled="dataListSelections.length <= 0">批量下架
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item>
                <el-dropdown @command="downloadFile">
                    <el-button type="primary">
                        导出Excel表格<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">商铺信息模板
                        </el-dropdown-item>
                        <el-dropdown-item command="0">所有商铺信息
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item>
                <el-dropdown @command="openUploadDialog">
                    <el-button type="primary">
                        Excel导入<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">批量导入
                        </el-dropdown-item>
                        <el-dropdown-item command="1">批量更新
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
        </el-form>
        <el-table
                :data="dataList"
                border
                v-loading="dataListLoading"
                @selection-change="selectionChangeHandle"
                style="width: 100%;">
            <el-table-column
                    type="selection"
                    header-align="center"
                    align="center"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="id"
                    header-align="center"
                    align="center"
                    label="">
            </el-table-column>
            <el-table-column
                    prop="title"
                    header-align="center"
                    align="center"
                    label="商铺标题"
                    min-width="200">
            </el-table-column>
            <el-table-column
                    prop="description"
                    header-align="center"
                    align="center"
                    label="商铺介绍"
                    min-width="200">
            </el-table-column>
            <el-table-column
                    prop="remarkScore"
                    header-align="center"
                    align="center"
                    label="商铺评分">
            </el-table-column>
            <el-table-column
                    prop="pricePerMan"
                    header-align="center"
                    align="center"
                    label="人均消费">
            </el-table-column>
            <el-table-column
                    prop="province"
                    header-align="center"
                    align="center"
                    label="省份/直辖市">
            </el-table-column>
            <el-table-column
                    prop="city"
                    header-align="center"
                    align="center"
                    label="市级单位">
            </el-table-column>
            <el-table-column
                    prop="region"
                    header-align="center"
                    align="center"
                    label="区级单位">
            </el-table-column>
            <el-table-column
                    prop="address"
                    header-align="center"
                    align="center"
                    label="详细地址"
                    min-width="200">
            </el-table-column>
            <el-table-column
                    prop="category"
                    header-align="center"
                    align="center"
                    label="商铺类别">
            </el-table-column>
            <el-table-column
                    prop="tags"
                    header-align="center"
                    align="center"
                    label="标签"
                    min-width="200">
            </el-table-column>
            <el-table-column
                    prop="seller"
                    header-align="center"
                    align="center"
                    label="商家名称">
            </el-table-column>
            <el-table-column label="封面" min-width="200" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.coverUrl" alt="封面"
                              fit="cover"
                              width="200"
                              height="200">
                </template>
            </el-table-column>
            <el-table-column
                    prop="disabledFlag"
                    header-align="center"
                    align="center"
                    label="是否上架">
            </el-table-column>
            <el-table-column
                    prop="createdAt"
                    header-align="center"
                    align="center"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="updatedAt"
                    header-align="center"
                    align="center"
                    label="更新时间">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    header-align="center"
                    align="center"
                    width="150"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                    <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                @size-change="sizeChangeHandle"
                @current-change="currentChangeHandle"
                :current-page="pageIndex"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                :total="totalPage"
                layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
        <!-- 弹窗, 新增 / 修改 -->
        <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>

        <!-- 上传execl -->
        <el-dialog :title="'Excel导入'"
                   :visible.sync="uploadDialog"
                   :close-on-click-modal="false"
                   width="40%"
                   :before-close="handleClose">
            <el-upload class="upload-demo"
                       ref="upload"
                       :action="uploadUrl"
                       :headers="headers"
                       :before-upload="beforeUpload"
                       :on-change="onChange"
                       :file-list="fileList"
                       :on-success="uploadSuccess"
                       :auto-upload="false">
                <el-button slot="trigger"
                           size="medium "
                           type="primary">选取文件
                </el-button>
                <el-button style="margin-left: 10px;"
                           size="medium "
                           type="success"
                           @click="submitUpload">上传到服务器
                </el-button>
                <div slot="tip"
                     class="el-upload__tip"
                     style="font-size: 14px">只能上传excel文件
                </div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    import AddOrUpdate from './shop-add-or-update'
    import Vue from 'vue'
    import {judgeAndDownload} from '@/utils'

    export default {
        data() {
            return {
                dataForm: {
                    key: ''
                },
                dataList: [],
                pageIndex: 1,
                pageSize: 10,
                totalPage: 0,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                uploadDialog: false,
                fileList: [],
                headers: {
                    token: Vue.cookies.get('token')
                },
                isUpdate: '0',
            }
        },
        computed: {
            uploadUrl() {
                return `${window.SITE_CONFIG["baseUrl"]}/cms/shop/uploadExcel?isUpdate=${this.isUpdate === '0' ? 0 : 1}`
            }
        },
        components: {
            AddOrUpdate
        },
        activated() {
            this.getDataList()
        },
        methods: {
            // 获取数据列表
            getDataList() {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/cms/shop/list'),
                    method: 'get',
                    params: this.$http.adornParams({
                        'page': this.pageIndex,
                        'limit': this.pageSize,
                        'keyword': this.dataForm.key
                    })
                }).then(({data}) => {
                    if (data && data.code === 0) {
                        this.dataList = data.page.list
                        this.dataList.forEach(item => {
                            item.disabledFlag = item.disabledFlag === 0 ? '是' : '否'
                        })
                        this.totalPage = data.page.totalCount
                    } else {
                        this.dataList = []
                        this.totalPage = 0
                        this.$message.error(data.msg)
                    }
                    this.dataListLoading = false
                })
            },
            // 每页数
            sizeChangeHandle(val) {
                this.pageSize = val
                this.pageIndex = 1
                this.getDataList()
            },
            // 当前页
            currentChangeHandle(val) {
                this.pageIndex = val
                this.getDataList()
            },
            // 多选
            selectionChangeHandle(val) {
                this.dataListSelections = val
            },
            // 新增 / 修改
            addOrUpdateHandle(id) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(id)
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done()
                    })
                    .catch(_ => {
                    })
            },
            beforeUpload(file) {
                let Xls = file.name.split('.')
                if (Xls[1] === 'xls' || Xls[1] === 'xlsx') {
                    return file
                } else {
                    this.$message.error('上传文件只能是 xls/xlsx 格式!')
                    return false
                }
            },
            onChange(file, fileList) {
                // data中的fileList不会实时更新，需要用这个
                this.fileList = fileList
                this.fileList.splice(0, fileList.length - 1)
                // this.fileList.push(file)
            },
            uploadSuccess(res) {
                if (res.code === 0 && res.msg === 'success') {
                    this.$message({
                        showClose: true,
                        message: '上传成功',
                        type: 'success',
                        onClose: () => {
                            this.getDataList()
                        }
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
                this.$refs.upload.clearFiles()
                // this.fileList = []
                this.uploadDialog = false
            },
            submitUpload() {
                if (this.fileList.length > 0) {
                    this.$refs.upload.submit()
                } else {
                    this.$message.error('上传文件不能为空!')
                }
            },
            // 下载附件
            downloadFile(command) {
                let time = new Date().getTime()
                // console.log(time);
                if (time - this.lastTimeDownload < 2000) {
                    this.$message({
                        message: '请勿连续点击下载',
                        type: 'warning'
                    })
                } else {
                    this.timer = setTimeout(() => {
                        this.$http({
                            url: this.$http.adornUrl('/cms/shop/listExport'),
                            method: 'get',
                            params: this.$http.adornParams({
                                'isTemplate': parseInt(command)
                            }),
                            responseType: 'blob'
                        }).then(res => {
                            judgeAndDownload(res)
                        })
                    }, 300)
                    this.lastTimeDownload = new Date().getTime()
                }
            },
            openUploadDialog(command) {
                this.uploadDialog = true
                this.isUpdate = command
            },
            // 删除
            deleteHandle(id) {
                let ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.id
                })
                this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/cms/shop/delete'),
                        method: 'post',
                        data: this.$http.adornData(ids, false)
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                })
            },
            // 批量操作
            enableBatch(command) {
                let ids = this.dataListSelections.map(item => {
                    return item.id
                })
                let operation = command === '0' ? '上架' : '下架'
                this.$confirm(`确定对[id=${ids.join(',')}]进行批量[${operation}]操作?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl(`/cms/shop/enable?disabledFlag=${command}`),
                        method: 'post',
                        data: this.$http.adornData(ids, false)
                    }).then(({data}) => {
                        if (data && data.code === 0) {
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                                duration: 1500,
                                onClose: () => {
                                    this.getDataList()
                                }
                            })
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                })
            }
        }
    }
</script>
