export default {
  // element form attributes
  type: 'date',
  placeholder: '请选择',
  format: 'YYYY-MM-DD',

  // ext
  valueFormat: 'yyyy-MM-dd'

  // pickerOptions: {
  //   shortcuts: [
  //     {
  //       text: "今天",
  //       onClick(picker) {
  //         picker.$emit("pick", new Date());
  //       }
  //     },
  //     {
  //       text: "昨天",
  //       onClick(picker) {
  //         const date = new Date();
  //         date.setTime(date.getTime() - 3600 * 1000 * 24);
  //         picker.$emit("pick", date);
  //       }
  //     },
  //     {
  //       text: "一周前",
  //       onClick(picker) {
  //         console.log(picker);
  //         const date = new Date();
  //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
  //         picker.$emit("pick", date);
  //       }
  //     }
  //   ]
  // },
  //
  // validateEvent: true
}
