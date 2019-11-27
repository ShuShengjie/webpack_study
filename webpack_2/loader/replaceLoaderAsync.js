const loaderUtils = require("loader-utils");


// 拿到入口文件的源码， 替换里面的字符串
// 不能是箭头函数 使用普通函数this具有上下文， 箭头函数this指向不对
module.exports = function(source) {
  // const options =this.query;
  const options = loaderUtils.getOptions(this);
  const callback = this.async();
  console.log(options);
  // source就是源文件
  setTimeout(() => {
    const result = source.replace('webpack', options.name);
    callback(null, result)
  }, 100)
}