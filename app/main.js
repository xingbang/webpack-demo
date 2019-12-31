require('./main.scss')

console.log(process.env.NODE_ENV)

// 通过 CommonJS 规范导入 show 函数
//const show = require('./show.js');
// 执行 show 函数
//show('这是一个热更新实例');


class Class{
  constructor(){
    this.str = 'success'
  }

  appendToBody() {
    const p = document.createElement('p');
    p.innerHTML = this.str
    document.body.appendChild(p)
  }
}

const obj = new Class();
obj.appendToBody();

