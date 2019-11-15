React Hooks

- Context 

- ContentType
- lazy 
- Suspense
- Memo 优化渲染性能



# Content

定义：使组件可以在组件树中传递而不用一级级传递

结构：  ![image-20191030202428777](/Users/hys/Library/Application Support/typora-user-images/image-20191030202428777.png)



API:	createContext()

```js
import React,{Component,createContext,useState} from 'react';
import './App.css';
const BatteryContext = createContext()

class Leaf extends Component {
  static contextType = BatteryContext
  render(){
    const battery = this.context
    return (<h1>{battery}</h1>)
    
  }
}
const Middle  = ()=>{
  return (
    <Leaf />
  )
}
function App() {
  const [battery, setBattery] = useState(60);
  return (
    <div className="App">
      <BatteryContext.Provider value={battery}>
      <button type="button" onClick={()=>setBattery(battery-1)}>Press</button>
        <Middle />
      
      </BatteryContext.Provider>
    </div>
  );
}

export default App;

```



# lazy Suspense(延迟加载|懒加载)



- webpack - code Splitting 代码拆分

- import 动态导入模块

  react提供lazy函数，封装导入行为成react组件， 封装的是导入行为而不是组件本身

```jsx
import React, { Component,lazy,Suspense } from 'react';
const About = lazy(()=> import(/* webpackChunkName:'about' */'./About.jsx'))
// ErrorBoundary
// componentDidCatch
export class App extends Component {
  state = {
    hasError:false
  }
  static getDerivedStateFromError(){
    return {
      hasError:true,
    }
  }
  // componentDidCatch(){
  //   this.setState({
  //     hasError:true
  //   })
  // }
  render() {
    if(this.state.hasError){
      return <div>HAS ERROR</div>
    }
    return (
      <div>
      <Suspense fallback={<div>Loading</div>}>
        <About/>
      </Suspense>
      </div>
    );
  }
}

export default App;
	
```



# 类组件不足

1.复用逻辑困难，缺少服用机制

2.渲染属性和高阶组件导致层级冗余

### 趋向复杂难以维护

1.生命周期函数混杂不相干逻辑

2.想干逻辑分散在不同的生命周期，绑定解绑

3.this指向困扰

- 内联函数过度创建新句柄
- 类成员函数不能保证this

# hooks优势

- 函数组件无this问题

- 可自定义hooks 方便服用状态逻辑

- 副作用的关注点分离 （数据渲染之外的，如网络请求，ls存储） 

  # PWA
  渐进式网络应用
## 组成技术
- Service Worker（webWorker 独立于浏览器主线程的环境，执行较复杂的界面操作）
  - 常驻内存运行
  - 代理网络请求
  - 以来https
- Promise
- fetch 比xmlhttpRequest 更简洁
  - promise风格
- cacge API
  -  支持资源的缓存系统
  - 缓存资源
  - 依赖ServiceWorker 代理网络请求
  - 支持离线程序运行
- Notification APi
  - 消息推送
  - 依赖用户授权
