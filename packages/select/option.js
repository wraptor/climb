export default {
    //element attributes
    clearable: true,
    //ext
    dicData: [],                            //字典数据
    dicUrl: undefined,                      //字典数据Url，优先级比dicData高，当url获取数据失败时，默认展示dicData
    dicProps: {                             //字典的prop修改
        label: 'label',
        value: 'value',
        children: 'children',
        data: 'data'
    }
}
