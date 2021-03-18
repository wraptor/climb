// BeanUtils
const dicUtil = {
  getData(http, url, props, callback) {
    if (http) {
      if (url) {
        http
          .get(url)
          .then(response => {
            if (props.data) {
              callback(response.data[props.data]);
            } else {
              callback(response.data);
            }
          })
          .catch(error => {
            console.error(error);
            callback();
          });
      } else {
        callback();
      }
    } else {
      console.error(
        "axios is null,please install axios and install in this.axios"
      );
    }
  }
};

export default dicUtil;
