// import '@babel/polyfill';
// import a from './a'
// import b from './b'
// import axios from 'axios';
// import pic from './img/circle.png'
// import "./index.scss"
// a();
// b();

// HMR默认对css模块支持较好， 对js模块需要额外处理， 通过module.hot.accept来对需要更新模块来进行监控


// if (module.hot) {
//   module.hot.accept("./a", () => {
//     console.log('a 更新了');
//     document.body.removeChild(document.getElementById('number'));
//     a();
//   })
// }
// // console.log(pic);
// function test() {
//   console.log('test webpack')
// }
// test();
// axios.get('/api/info')
// .then(res => {
//   console.log(res);
// })

// let img = new Image;
// img.src = pic;
// img.classList.add("pic");
// let root = document.querySelector("#root");
// root.append(img);

// function run(gen){
//   var g = gen();

//   function next(data){
//     var result = g.next(data);
//     if (result.done) return result.value;
//     result.value.then(function(data){
//       next(data);
//     });
//   }

//   next();
// }

// function* foo() {
//   let response1 = yield fetch('https://xxx') //返回promise对象
//   console.log('response1')
//   console.log(response1)
//   let response2 = yield fetch('https://xxx') //返回promise对象
//   console.log('response2')
//   console.log(response2)
// }
// run(foo);




// let btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
//   let div = document.createElement('div');
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// }


// let obj = {};
// const arr = [new Promise(() => {}), new Promise(() => {})];
// arr.map(item => {
//   console.log(item);
// })



// import React, { Component } from 'react';
// import ReactDom from 'react-dom';
// import Child from './index.jsx';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Child></Child>
//         hello react webpack
//       </div>
//     )
//   }
// }

// ReactDom.render(<App/>, document.getElementById("app"));


// import {add} from './a';
// import "./index.css";

// add(1, 2);
// console.log(process.env.NODE_ENV);
// import _ from "lodash";
// console.log(_.join(["a", "b", "c"], "****"))

document.addEventListener("click", () => {
  // yarn add @babel/plugin-syntax-dynamic-import --save
  // 在网络空闲的时候直接异步加载 增加用户体验
  import(/* webpackPrefetch: true */ "./click.js").then(({ default: func }) => {
    func();
  })
});