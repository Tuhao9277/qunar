import React, { Component,memo } from 'react';
//适用于一级状态值的判断
/**
 * PureComponent 相当于 ComponentDidUpdate()
 * 自身会有渲染判断
 * 无状态组件（function）时,使用memo包裹
 * @returns
 * @memberof Foo
 */
const Foo = memo(function Foo(props) {
     console.log('foo render')
    return <div>{props.person.age}</div>
})
export class App extends Component {
  state={
    count:0,
    person:{
      age:1,
    }
  }
  callback=()=>{ 
    // this? 
  }
  render() {
    const {person} = this.state
    return (
      <div>
      <button onClick={()=>{ person.age++; this.setState({person})}}>Add</button>
        <Foo person={person} cb={this.callback}/> 
      </div>
    );
  }
}

export default App;
