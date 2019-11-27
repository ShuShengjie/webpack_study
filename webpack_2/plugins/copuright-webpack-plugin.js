class CopyrightWebpackPlugin {
  constructor(options) {
    console.log(options.name + '被调用了')
  }
  // compiler: webpack实例， 包括配置信息
  apply(compiler) {
    // emit 生成资源到出口目录之前触发， 这是一个异步串行AsyncSeriesHook钩子
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', 
    (compilation) => {
      console.log('开始')
    })


    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', 
    (compilation, cb) => {
      // console.log(compilation.assets)
      compilation.assets['test.txt'] = {
        source: () => {
          return 'test.txt hhh'
        },
        size: () => {
          return 1024;
        }
      }
      cb();
    })
  }
}
module.exports = CopyrightWebpackPlugin;