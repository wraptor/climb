<template>
    <div v-loading="defaultLoading">
        <el-row type="flex" justify="space-between" v-if="defaultSearchFormOption.items.length>0">
            <el-col :span="24">
                <cl-form :option="defaultSearchFormOption" v-model="searchForm" :loading="defaultLoading"
                         @submit="handleLoad"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
            <el-col :span="12">
                <el-button
                        :type="defaultOption.addBtn.type"
                        :icon="defaultOption.addBtn.icon"
                        v-if="defaultOption.addBtn!==false && defaultOption.addBtn.display===true"
                        :size="defaultOption.addBtn.size"
                        @click="handleAdd">{{defaultOption.addBtn.text}}
                </el-button>
                <slot name="menuLeft"></slot>
            </el-col>
            <el-col :span="12" style="text-align: right">
                <el-tooltip content="刷新" placement="top">
                    <el-button icon="el-icon-refresh" size="small" circle @click="handleLoad"></el-button>
                </el-tooltip>
                <slot name="menuRight"></slot>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-table
                    ref="clTableRef"
                    :height="defaultOption.height"
                    :max-height="defaultOption.maxHeight"
                    :stripe="defaultOption.stripe"
                    :border="defaultOption.border"
                    :size="defaultOption.size"
                    :fit="defaultOption.fit"
                    :show-header="defaultOption.showHeader"
                    :highlight-current-row="defaultOption.highlightCurrentRow"
                    :current-row-key="defaultOption.currentRowKey"
                    :row-class-name="defaultOption.rowClassName"
                    :row-style="defaultOption.rowStyle"
                    :cell-class-name="defaultOption.cellClassName"
                    :cell-style="defaultOption.cellStyle"
                    :header-row-class-name="defaultOption.headerRowClassName"
                    :header-row-style="defaultOption.headerRowStyle"
                    :header-cell-class-name="defaultOption.headerCellClassName"
                    :header-cell-style="defaultOption.headerCellStyle"
                    :row-key="defaultOption.rowKey"
                    :empty-text="defaultOption.emptyText"
                    :default-expand-all="defaultOption.defaultExpandAll"
                    :expand-row-keys="defaultOption.expandRowKeys"
                    :default-sort="defaultOption.defaultSort"
                    :tooltip-effect="defaultOption.tooltipEffect"
                    :show-summary="defaultOption.showSummary"
                    :sum-text="defaultOption.sumText"
                    :summary-method="defaultOption.summaryMethod"
                    :span-method="defaultOption.spanMethod"
                    :select-on-indeterminate="defaultOption.selectOnIndeterminate"
                    :indent="defaultOption.indent"
                    :lazy="defaultOption.lazy"
                    :load="defaultOption.load"
                    :tree-props="defaultOption.treeProps"
                    :data="data"
                    @selection-change="handleSelectionChange">

                <el-table-column type="selection" v-if="defaultOption.selection===true"
                                 :width="defaultOption.selectionWidth"
                                 :selectable="defaultOption.selectable"></el-table-column>
                <el-table-column type="index" v-if="defaultOption.index===true"
                                 :width="defaultOption.indexWidth"
                                 :label="defaultOption.indexLabel"></el-table-column>
                <template v-for="(item,index) in defaultOption.columns">
                    <el-table-column
                            v-if="item.display!==false"
                            v-bind:key="index"
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width"
                            :min-width="item.minWidth"
                            :fixed="item.fixed"
                            :render-header="item.renderHeader"
                            :sortable="item.sortable"
                            :sort-method="item.sortMethod"
                            :sort-by="item.sortBy"
                            :sort-orders="item.sortOrders"
                            :resizable="item.resizable"
                            :formatter="item.formatter"
                            :show-overflow-tooltip="item.showOverflowTooltip!==false"
                            :align="item.align"
                            :headerAlign="item.headerAlign"
                            :class-name="item.className"
                            :label-class-name="item.labelClassName"
                            :selectable="item.selectable"
                            :reserve-selection="item.reserveSelection"
                            :filters="item.filters"
                            :filter-placement="item.filterPlacement"
                            :filter-multiple="item.filterMultiple"
                            :filter-method="item.filterMethod"
                            :filtered-value="item.filteredValue">
                        <template slot-scope="scope">
                            <slot :index="scope.$index" :row="scope.row" :name="item.prop"
                                  v-if="item.slot===true"></slot>
                            <template v-if="item.slot!==true">
                                <template v-if="radioTypeArray.indexOf(item.type)>=0
                                ||checkboxTypeArray.indexOf(item.type)>=0
                                ||selectTypeArray.indexOf(item.type)>=0">
                                    {{ scope.row[item.prop] | getDicLabel(item)}}
                                </template>
                                <template v-else>
                                    {{scope.row[item.prop]}}
                                </template>
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <el-table-column label="操作" v-if="defaultOption.menu!==false"
                                 :width="defaultOption.menuWidth">
                    <template slot-scope="scope">
                        <el-button
                                :type="defaultOption.viewBtn.type"
                                :icon="defaultOption.viewBtn.icon"
                                v-if="defaultOption.viewBtn!==false && defaultOption.viewBtn.display===true"
                                :size="defaultOption.viewBtn.size"
                                @click="handleView(scope.$index, scope.row)">{{defaultOption.viewBtn.text}}
                        </el-button>
                        <el-button
                                :type="defaultOption.editBtn.type"
                                :icon="defaultOption.editBtn.icon"
                                v-if="defaultOption.editBtn!==false && defaultOption.editBtn.display===true"
                                :size="defaultOption.editBtn.size"
                                @click="handleEdit(scope.$index, scope.row)">{{defaultOption.editBtn.text}}
                        </el-button>
                        <el-button
                                :type="defaultOption.delBtn.type"
                                :icon="defaultOption.delBtn.icon"
                                v-if="defaultOption.delBtn!==false && defaultOption.delBtn.display===true"
                                :size="defaultOption.delBtn.size"
                                @click="handleDel(scope.$index, scope.row)">{{defaultOption.delBtn.text}}
                        </el-button>
                        <slot name="menu" :index="scope.$index" :row="scope.row"></slot>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align: right;margin-top: 20px">
                <el-pagination
                        @current-change="handleCurrentChange"
                        @size-change="handleSizeChange"
                        :current-page="page.current"
                        :page-size="page.size"
                        :total="page.total"
                        layout="total, sizes, prev, pager, next, jumper"
                >
                </el-pagination>
            </el-col>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" :title="crudObj.type==='add'?'新增':'编辑'" :before-close="closeDialog" :destroy-on-close="true">
            <cl-form :option="defaultFormOption" v-model="form" @submit="handleSubmit">
                <template v-for="(item) in defaultFormOption.items">
                    <template :slot="item.prop"
                              v-if="item.slotForm===true">
                        <slot :name="item.prop+'Form'"></slot>
                    </template>
                </template>
            </cl-form>
        </el-dialog>
        <el-dialog :visible.sync="delDialogVisible" :title="this.defaultOption.delBtn.title"
                   width="400px">
            <div class="el-message-box__container">
                <div class="el-message-box__status el-icon-warning"></div>
                <div class="el-message-box__message">{{this.defaultOption.delBtn.message}}</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delDialogVisible = false" :disabled="delLoading"
                           :icon="delLoading?'el-icon-loading':'el-icon-close'"
                           size="small">{{this.defaultOption.delBtn.cancelBtnText}}</el-button>
                <el-button type="primary" @click="delSuccess" :disabled="delLoading"
                           :icon="delLoading?'el-icon-loading':'el-icon-check'"
                           size="small">{{this.defaultOption.delBtn.confirmBtnText}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {radioTypeArray, checkboxTypeArray, selectTypeArray} from '../util/type'
    import deOp from './option'
    import beanUtil from '../util/bean-util'

    export default {
        name: "ClTable",
        componentName: 'ClTable',
        props: {
            option: {type: Object, default: undefined},
            loading: {type: Boolean, default: false},
            data: {
                type: Array,
                default: () => {
                    return []
                }
            },
            page: {
                type: Object,
                default: () => {
                    return {
                        total: 0,
                        size: 10,
                        current: 1,
                    }
                }
            }
        }, watch: {
            option: {
                deep: true,
                handler(val) {
                    this.initOption(val)
                }
            }, loading: {
                handler(val) {
                    this.defaultLoading = val
                }
            }
        }, created() {
            if (this.option) {
                this.initOption(this.option)
            }
            this.handleLoad()
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                defaultFormOption: {items: []},
                form: {},
                searchForm: undefined,
                defaultLoading: false,
                dialogVisible: false,
                delDialogVisible: false,
                delLoading: false,
                crudObj: {},
                radioTypeArray: radioTypeArray,
                checkboxTypeArray: checkboxTypeArray,
                selectTypeArray: selectTypeArray,
                dicProps: {                             //字典的prop修改
                    label: 'label',
                    value: 'value',
                    children: 'children',
                    data: 'data'
                },
                prop: 'sex'
            }
        }, computed: {
            defaultSearchFormOption: function () {
                let option = {
                    submitBtn: this.defaultOption.searchBtn,
                    resetBtn: this.defaultOption.searchResetBtn,
                    items: []
                }
                if (this.defaultOption.columns) {
                    let form = {}
                    option.items = []
                    this.defaultOption.columns.forEach(item => {
                        if (item.search === true) {
                            let theItem = beanUtil.deepClone(item)
                            form[item.prop] = item.searchValue
                            theItem.rules = item.searchRules
                            option.items.push(theItem)
                        }
                    })
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.searchForm = form
                }
                return option
            }
        }, filters: {
            getDicLabel: function (value, item) {
                let valueProps = 'value'
                let labelProps = 'label'
                if (item.dicProps) {
                    valueProps = item.dicProps.value ? item.dicProps.value : 'value'
                    labelProps = item.dicProps.label ? item.dicProps.label : 'label'
                }
                const find = item.dicData.find(dic => dic[valueProps] === value)
                if (find) {
                    return find[labelProps]
                }
                return ""
            }
        }, methods: {
            initOption(val) {
                this.defaultOption = beanUtil.copyPropertiesNotEmpty(val, this.defaultOption)
                this.defaultFormOption = beanUtil.copyPropertiesNotEmpty(val, this.defaultFormOption)

            },
            handleAdd() {
                this.openDialog('add')
            },
            handleView(index, row) {
                this.openDialog('view', index, row)
            },
            handleEdit(index, row) {
                this.openDialog('edit', index, row)
            },
            handleDel(index, row) {
                this.openDialog('del', index, row)
            }, openDialog(type, index, row) {
                this.dialogVisible = false
                let form = {}
                if (this.defaultOption.columns) {
                    this.defaultFormOption.items = []
                    this.defaultOption.columns.forEach(item => {
                        form[item.prop] = item.value
                        if (item[type + 'Display'] !== false) {
                            let theItem = beanUtil.deepClone(item)
                            if (item[type + 'Disabled'] === true) {
                                theItem.disabled = true
                            }
                            this.defaultFormOption.items.push(theItem)
                        }
                    })
                    console.log(this.defaultFormOption.items, this.defaultFormOption.items.length)
                }
                this.crudObj = {type: type, index: index, row: row}
                if (this.defaultLoading.repeat) {
                    this.defaultLoading = true
                }
                if (type === 'add') {
                    this.form = form
                } else {
                    this.form = JSON.parse(JSON.stringify(row))
                }
                if (type === 'view') {
                    beanUtil.copyPropertiesNotEmpty({disabled: true, btn: false}, this.defaultFormOption)
                } else {
                    beanUtil.copyPropertiesNotEmpty({disabled: false, btn: true}, this.defaultFormOption)
                }

                this.defaultFormOption = beanUtil.deepClone(this.defaultFormOption)
                if (type !== 'del') {
                    if (this.$listeners['before-open']) {
                        this.$emit('before-open', type, row, () => {
                            this.dialogVisible = true
                            this.defaultLoading = false
                        }, index)
                    } else {
                        this.dialogVisible = true
                        this.defaultLoading = false
                    }
                } else {
                    if (this.$listeners['before-open']) {
                        this.$emit('before-open', type, row, () => {
                            this.execDel()
                        }, index)
                    } else {
                        this.execDel()
                    }
                }
            }, closeDialog(done) {
                if (this.$listeners['before-close']) {
                    if (this.crudObj.type === 'add') {
                        this.$emit('before-close', this.crudObj.type, this.form, () => {
                            done()
                        }, this.crudObj.index)
                    } else {
                        this.$emit('before-close', this.crudObj.type, this.crudObj.row, () => {
                            done()
                        }, this.crudObj.index)
                    }
                } else {
                    done()
                }
            }, execDel() {
                if (this.defaultOption.delBtn.confirm === true) {
                    this.delDialogVisible = true
                } else {
                    this.delSuccess()
                }
            }, delSuccess() {
                if (this.crudObj.type === 'del') {
                    this.delLoading = true
                    this.$emit('del', this.crudObj.row, () => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.delDialogVisible = false
                        this.delLoading = false
                    }, this.crudObj.index)
                } else {
                    this.$message.warning('非删除操作')
                }
            }, handleSubmit(form, done) {
                this.$emit(this.crudObj.type, form, () => {
                    this.dialogVisible = false
                    done()
                }, this.crudObj.index)
            }, handleSelectionChange(selection) {
                this.$emit('selection-change', selection)
            }, clearSelection() {
                this.$refs.clTableRef.clearSelection()
            }, toggleRowSelection(row, selected) {
                this.$refs.clTableRef.toggleRowSelection(row, selected)
            }, toggleAllSelection() {
                this.$refs.clTableRef.toggleAllSelection()
            }, setCurrentRow() {
                this.$refs.clTableRef.setCurrentRow()
            }, clearSort() {
                this.$refs.clTableRef.clearSort()
            }, clearFilter(columnKey) {
                this.$refs.clTableRef.clearFilter(columnKey)
            }, doLayout() {
                this.$refs.clTableRef.doLayout()
            }, sort(prop, order) {
                this.$refs.clTableRef.sort(prop, order)
            }, handleLoad() {
                this.$nextTick(() => {
                    if (this.$listeners['load']) {
                        this.defaultLoading = true
                        this.$emit('load', this.page, () => {
                            this.defaultLoading = false
                        }, this.searchForm)
                    }else{
                        this.defaultLoading = false
                    }
                })
            }, handleCurrentChange(current) {
                this.page.current = current
                this.handleLoad()
            }, handleSizeChange(size) {
                this.page.size = size
                this.handleLoad()
            }
        }
    }
</script>

<style scoped>
    ::v-deep .el-table th {
        word-break: break-word;
        color: rgba(0, 0, 0, .85);
    }

    ::v-deep .el-table__header, ::v-deep .el-table__body {
        margin: 0 0;
    }

    ::v-deep .el-dialog {
        display: flex;
        flex-direction: column;
        margin: 0 !important;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*height:600px;*/
        max-height: calc(100% - 30px);
        max-width: calc(100% - 30px);
    }

    ::v-deep .el-dialog ::v-deep .el-dialog__body {
        flex: 1;
        overflow: auto;
    }
</style>
