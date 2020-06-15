<template>
    <span>
        {{showLabel}}
    </span>
</template>

<script>
    import Axios from "axios";
    import dicUtil from "../util/dic-util";
    import beanUtil from "../util/bean-util";

    export default {
        name: "dic-label",
        props: {value: {}, item: {}},
        data() {
            return {
                myAxios: this.axios ? this.axios : Axios,
                dicData: [],
                props: {                             //字典的prop修改
                    label: 'label',
                    value: 'value',
                    children: 'children',
                    data: 'data'
                },
                showLabel: ''
            }
        },
        created() {
            this.props = beanUtil.copyPropertiesNotEmpty(this.props, this.item.props)
            dicUtil.getData(this.myAxios, this.item.dicUrl, this.props, (data) => {
                this.dicData = data ? data : this.item.dicData
                this.setLabel()
            })
        },
        methods: {
            setLabel() {
                const find = this.dicData.find(dic => dic[this.props.value] === this.value)
                if (find) {
                    this.showLabel = find[this.props.label]
                } else {
                    this.showLabel = this.value
                }
            }
        }
    }
</script>

<style scoped>

</style>
