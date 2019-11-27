const fs = require("fs");
const path = require("path");
// 将源代码解析成 AST语法树
const parser = require("@babel/parser");
// 用途是来便利AST树
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

// 分析入口文件
const entryAnalyer = (entry) => {
  const content = fs.readFileSync(entry, "utf-8");
  // console.log(content);
  const ast = parser.parse(content, {
    sourceType: "module"
  })
  // console.log(ast.program.body)
  // console.log(traverse);
  const yilai = {};  //入口文件依赖
  traverse(ast, {
    ImportDeclaration({ node }) {
      // console.log(node)
      // 分析路径的目录
      const dirname = "./" + path.dirname(entry);
      // 使用path.join() 转义输出为./src\a   ./src\b
      // 所以使用path.posix.join() 转义输出为./src/a  ./src/b
      const newFile = "./" + path.posix.join(dirname, node.source.value);
      // console.log(newFile);
      // yilai.push(node.source.value);
      yilai[node.source.value] = newFile;
    }
  })
  // console.log(yilai)
  // 将ast语法树转换为游览器可识别的语法
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  })
  // console.log(code);
  return {
    entry,
    yilai,
    code
  }
}

const yilaifenxi = (entry) => {
  const rukou = entryAnalyer(entry);
  const yilaiArr = [rukou];
  for (let i = 0; i < yilaiArr.length; i++) {
    const item = yilaiArr[i];
    const { yilai } = item;
    if (yilai) {
      for (let j in yilai) {
        // const y = entryAnalyer(yilai[j]);
        yilaiArr.push(entryAnalyer(yilai[j]));
      }
    }
  }
  const newData = {};
  yilaiArr.forEach((item) => {
    newData[item.entry] = {
      yilai: item.yilai,
      code: item.code,
    }
  })
  return newData;
}

// entry: './src/index.js'
const generateCode = (entry) => {
  const data = JSON.stringify(yilaifenxi(entry));
  return `(function(data) {
    function require(module) {
      function localRequire(relativePath) {
        return require(data[module].yilai[relativePath])
      }
      exports = {};
      (function(require,exports,code) {
        eval(code)
      })(localRequire,exports,data[module].code)
      return exports
    }
    require('${entry}')
  }(${data}))`
}


const code = generateCode("./src/index.js");

console.log(code);

