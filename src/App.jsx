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
