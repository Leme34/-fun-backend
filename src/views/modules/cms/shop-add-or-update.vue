<template>
    <el-dialog
            :title="!dataForm.id ? '新增' : '修改'"
            :close-on-click-modal="false"
            :visible.sync="visible">
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
                 label-width="80px">
            <el-form-item label="商铺标题" prop="title">
                <el-input v-model="dataForm.title" placeholder="商铺标题"></el-input>
            </el-form-item>
            <el-form-item label="商铺介绍" prop="description">
                <el-input v-model="dataForm.description" placeholder="商铺介绍"></el-input>
            </el-form-item>
            <el-form-item label="商铺评分" prop="remarkScore">
                <el-input v-model="dataForm.remarkScore" placeholder="商铺评分"></el-input>
            </el-form-item>
            <el-form-item label="人均消费" prop="pricePerMan">
                <el-input v-model="dataForm.pricePerMan" placeholder="人均消费"></el-input>
            </el-form-item>
            <!--            <el-form-item label="省份/直辖市" prop="province">-->
            <!--            <el-input v-model="dataForm.province" placeholder="省份/直辖市"></el-input>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="市级单位" prop="city">-->
            <!--                <el-input v-model="dataForm.city" placeholder="市级单位"></el-input>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="区级单位" prop="region">-->
            <!--                <el-input v-model="dataForm.region" placeholder="区级单位"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="地区">
                <el-cascader
                        v-model="areaName"
                        :options="areaTreeOptions"
                        :props="areaTreeProps"
                        @change="handleAreaChange"
                        clearable>
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input v-model="dataForm.address" placeholder="详细地址"></el-input>
            </el-form-item>
            <el-form-item label="商铺类别" prop="categoryId">
                <el-select v-model="dataForm.categoryId"
                           placeholder="请选择商铺类别"
                           filterable
                           style="width:100%;">
                    <el-option v-for="item in categories"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标签" prop="tags">
                <el-input v-model="dataForm.tags" placeholder="标签"></el-input>
            </el-form-item>
            <!--            <el-form-item label="创建时间" prop="createdAt">-->
            <!--                <el-input v-model="dataForm.createdAt" placeholder="创建时间"></el-input>-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="更新时间" prop="updatedAt">-->
            <!--                <el-input v-model="dataForm.updatedAt" placeholder="更新时间"></el-input>-->
            <!--            </el-form-item>-->
            <el-form-item label="商家" prop="sellerId">
                <el-select v-model="dataForm.sellerId"
                           placeholder="请选择商家"
                           filterable
                           style="width:100%;">
                    <el-option v-for="item in sellers"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面" prop="coverUrl">
                <el-upload
                        class="avatar-uploader"
                        :accept="'image/*'"
                        :action="uploadUrl"
                        :headers="headers"
                        :show-file-list="false"
                        :on-success="handleUploadSuccess">
                    <img v-if="dataForm.coverUrl" :src="dataForm.coverUrl" class="avatar" width="560" height="600"
                         fit="cover">
                    <i v-else class="el-icon-plus avatar-uploader-icon"/>
                </el-upload>
            </el-form-item>
            <el-table-column
                    prop="disabledFlag"
                    header-align="center"
                    align="center"
                    label="是否上架">
            </el-table-column>
        </el-form>
        <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
    </el-dialog>
</template>

<script>
    import Vue from "vue";

    export default {
        data() {
            return {
                visible: false,
                dataForm: {
                    id: 0,
                    title: '',
                    description: '',
                    remarkScore: '',
                    pricePerMan: '',
                    province: '',
                    city: '',
                    region: '',
                    address: '',
                    categoryId: '',
                    tags: '',
                    createdAt: '',
                    updatedAt: '',
                    sellerId: '',
                    coverUrl: '',
                    coverFileId: '',
                    disabledFlag: ''
                },
                headers: {
                    token: Vue.cookies.get('token')
                },
                categories: [],  //商铺类别
                sellers: [],  //商家
                areaTreeOptions: [],  //地区树
                areaTreeProps: {      //地区树字段定义
                    // checkStrictly: true,
                    value: 'name',
                    label: 'name',
                    children: 'subAreas',
                },
                areaName: [],   //完整地区,级联选择器绑定使用
                dataRule: {
                    title: [
                        {required: true, message: '商铺标题不能为空', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '商铺介绍不能为空', trigger: 'blur'}
                    ],
                    remarkScore: [
                        {required: true, message: '商铺评分不能为空', trigger: 'blur'}
                    ],
                    pricePerMan: [
                        {required: true, message: '人均消费不能为空', trigger: 'blur'}
                    ],
                    province: [
                        {required: true, message: '省份/直辖市不能为空', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: '市级单位不能为空', trigger: 'blur'}
                    ],
                    // region: [
                    //     {required: true, message: '区级单位不能为空', trigger: 'blur'}
                    // ],
                    address: [
                        {required: true, message: '详细地址不能为空', trigger: 'blur'}
                    ],
                    categoryId: [
                        {required: true, message: '商铺类别id不能为空', trigger: 'blur'}
                    ],
                    tags: [
                        {required: true, message: '标签不能为空', trigger: 'blur'}
                    ],
                    createdAt: [
                        {required: true, message: '创建时间不能为空', trigger: 'blur'}
                    ],
                    updatedAt: [
                        {required: true, message: '更新时间不能为空', trigger: 'blur'}
                    ],
                    sellerId: [
                        {required: true, message: '商家id不能为空', trigger: 'blur'}
                    ],
                    disabledFlag: [
                        {required: true, message: '是否上架不能为空', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            uploadUrl() {
                return `${window.SITE_CONFIG["baseUrl"]}/cos/save?fileType=2`
            }
        },
        methods: {
            init(id) {
                this.dataForm.id = id || 0
                this.visible = true
                // 加载地区树
                this.$http({
                    url: this.$http.adornUrl('/cms/area/listTree'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(res => {
                    let list = res.data.data
                    this.areaTreeOptions = list
                })
                // 加载商铺类别
                this.$http({
                    url: this.$http.adornUrl('/cms/category/listAll'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(res => {
                    let list = res.data.data
                    this.categories = list
                })
                // 加载商家
                this.$http({
                    url: this.$http.adornUrl('/cms/seller/listAll'),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(res => {
                    let list = res.data.data
                    this.sellers = list
                })
                this.$nextTick(() => {
                    this.$refs['dataForm'].resetFields()
                    if (this.dataForm.id) {
                        this.$http({
                            url: this.$http.adornUrl(`/cms/shop/info/${this.dataForm.id}`),
                            method: 'get',
                            params: this.$http.adornParams()
                        }).then(({data}) => {
                            if (data && data.code === 0) {
                                this.dataForm.title = data.shop.title
                                this.dataForm.description = data.shop.description
                                this.dataForm.remarkScore = data.shop.remarkScore
                                this.dataForm.pricePerMan = data.shop.pricePerMan
                                this.dataForm.province = data.shop.province
                                this.dataForm.city = data.shop.city
                                this.dataForm.region = data.shop.region
                                this.areaName = []  //手动清空旧的地区数据
                                this.areaName[0] = data.shop.province
                                this.areaName[1] = data.shop.city
                                this.areaName[2] = data.shop.region
                                this.dataForm.address = data.shop.address
                                this.dataForm.categoryId = data.shop.categoryId
                                this.dataForm.tags = data.shop.tags
                                this.dataForm.createdAt = data.shop.createdAt
                                this.dataForm.updatedAt = data.shop.updatedAt
                                this.dataForm.sellerId = data.shop.sellerId
                                this.dataForm.coverUrl = data.shop.coverUrl
                                this.disabledFlag = this.disabledFlag === 0 ? '是' : '否'
                            }
                        })
                    }
                })
            },
            // 表单提交
            dataFormSubmit() {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`/cms/shop/${!this.dataForm.id ? 'save' : 'update'}`),
                            method: 'post',
                            data: this.$http.adornData({
                                'id': this.dataForm.id || undefined,
                                'title': this.dataForm.title,
                                'description': this.dataForm.description,
                                'remarkScore': this.dataForm.remarkScore,
                                'pricePerMan': this.dataForm.pricePerMan,
                                'province': this.dataForm.province,
                                'city': this.dataForm.city,
                                'region': this.dataForm.region,
                                'address': this.dataForm.address,
                                'categoryId': this.dataForm.categoryId,
                                'tags': this.dataForm.tags,
                                'createdAt': this.dataForm.createdAt,
                                'updatedAt': this.dataForm.updatedAt,
                                'sellerId': this.dataForm.sellerId,
                                'coverFileId': this.dataForm.coverFileId,
                                'disabledFlag': this.dataForm.disabledFlag
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
            },
            handleUploadSuccess(res) {
                if (res.code === 0 && res.msg === 'success') {
                    this.$message({
                        showClose: true,
                        message: '上传成功',
                        type: 'success',
                        onClose: () => {
                            this.dataForm.coverFileId = res.data.id
                            this.dataForm.coverUrl = res.data.path
                        }
                    })
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            },
            handleAreaChange(value) {
                this.province = value[0]
                this.city = value[1]
                this.region = value[2]
                console.log(this.province, this.city, this.region)
            }
        }
    }
</script>
