<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
            <el-input v-model="formInline" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "ClForm",
        componentName: 'ClForm',
        props: {}, watch: {}, created() {
        }, data() {
            return {formInline:''}
        }, methods: {onSubmit(){
            this.$message.success(this.formInline)
            }}
    }
</script>

<style scoped>

</style>