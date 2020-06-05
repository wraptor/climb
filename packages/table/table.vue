<template>
    <div v-loading="defaultLoading">
        <el-row>
            <el-button
                    :type="defaultOption.addBtn.type"
                    :icon="defaultOption.addBtn.icon"
                    v-if="defaultOption.addBtn!==false || defaultOption.addBtn.display!==false"
                    :size="defaultOption.addBtn.size"
                    @click="handleAdd">{{defaultOption.addBtn.text}}
            </el-button>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-table
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
                    :data="data">
                <el-table-column
                        v-for="(item,index) in defaultOption.columns"
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
                        :filtered-value="item.filteredValue"
                >
                </el-table-column>

                <el-table-column fixed="right" label="操作" v-if="defaultOption.menu!==false"
                                 :width="defaultOption.menuWidth">
                    <template slot-scope="scope">
                        <el-button
                                :type="defaultOption.viewBtn.type"
                                :icon="defaultOption.viewBtn.icon"
                                v-if="defaultOption.viewBtn!==false || defaultOption.viewBtn.display!==false"
                                :size="defaultOption.viewBtn.size"
                                @click="handleView(scope.$index, scope.row)">{{defaultOption.viewBtn.text}}
                        </el-button>
                        <el-button
                                :type="defaultOption.editBtn.type"
                                :icon="defaultOption.editBtn.icon"
                                v-if="defaultOption.editBtn!==false || defaultOption.editBtn.display!==false"
                                :size="defaultOption.editBtn.size"
                                @click="handleEdit(scope.$index, scope.row)">{{defaultOption.editBtn.text}}
                        </el-button>
                        <el-button
                                :type="defaultOption.delBtn.type"
                                :icon="defaultOption.delBtn.icon"
                                v-if="defaultOption.delBtn!==false || defaultOption.delBtn.display!==false"
                                :size="defaultOption.delBtn.size"
                                @click="handleDel(scope.$index, scope.row)">{{defaultOption.delBtn.text}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog :visible.sync="dialogVisible" :before-close="closeDialog">
            <cl-form :option="defaultFormOption" v-model="form" @submit="handleSubmit"/>
        </el-dialog>
    </div>
</template>

<script>
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
        }, mounted() {
        }, data() {
            return {
                defaultOption: JSON.parse(JSON.stringify(deOp)),
                defaultFormOption: {},
                form: {},
                defaultLoading: false,
                dialogVisible: false,
                crudObj: {}
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
                if (this.defaultOption.columns) {
                    this.defaultFormOption.items = []
                    this.defaultOption.columns.forEach(item => {
                        if (item[type + ''])
                            this.defaultFormOption.items.push(item)
                    })
                }
                this.crudObj = {type: type, index: index, row: row}
                if (this.defaultLoading.repeat) {
                    this.defaultLoading = true
                }
                if (type === 'add') {
                    this.form = {}
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
                            this.execDel(index, row)
                        }, index)
                    } else {
                        this.execDel(index, row)
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
            }, execDel(index, row) {
                if (!this.defaultOption.delBtn.options.beforeClose) {
                    this.defaultOption.delBtn.options.beforeClose = (action, instance, done) => {
                        if (action === 'confirm') {
                            this.delSuccess(row, index, done)
                        } else if (action === 'cancel') {
                            this.$emit('delCancel', index, row)
                            done()
                        }
                    }
                }
                this.$confirm(this.defaultOption.delBtn.message,
                    this.defaultOption.delBtn.title,
                    this.defaultOption.delBtn.options).then(() => {
                }).catch(() => {
                    this.$emit('delCancel', index, row)
                });
            }, delSuccess(row, index, done) {
                this.$emit('del', row, () => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    done()
                }, index)
            }, handleSubmit(form, done) {
                this.$emit(this.crudObj.type, form, () => {
                    this.dialogVisible = false
                    done()
                }, this.crudObj.index)
            }
        }
    }
</script>

<style scoped>
    /deep/ .el-table th {
        word-break: break-word;
        color: rgba(0, 0, 0, .85);
    }

    /deep/ .el-table__header, /deep/ .el-table__body {
        margin: 0 0;
    }
</style>
