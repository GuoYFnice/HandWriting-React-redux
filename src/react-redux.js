import React ,{Component} from 'react'
import PropTypes from 'prop-types'




const reducer = (state,action) => {
    // 如果没有state设置默认值
    if(!state){
        return{
            color : 'red'
        }
    }
    switch(action.type){
        case 'UPDATE_THEME':
            return {
                ...state,
                color : action.color
            }
        default :
            return state
    }
  } 
  function createStore (reducer){
    let state = null
    const listeners = []
    // 增加监听
    const subscribe = (listener) => {
        listeners.push(listener)
    }
    // 获取state的函数
    const getState = () => state
    // 修改state的函数
    const dispatch = (action) => {
        state = reducer(state,action)
        // 执行每一个监听
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return {getState,dispatch,subscribe}
  }
  export const store = createStore(reducer)




export class Provider extends Component {
    static propTypes = {
        store : PropTypes.object,
        children : PropTypes.any
    }
    // 将state与context相关联
    static childContextTypes = {
        store: PropTypes.object
    }
    
    getChildContext () {
        return {
            store: this.props.store
        }
    }
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

// mapStateToProps = (state) => {
//     return {
//         xxx:xxxx
//     }
// }
// 这个函数会接受 store.getState() 的结果作为参数，然后返回一个对象，这个对象是根据 state 生成的。
// mapStateTopProps 相当于告知了 Connect 应该如何去 store 里面取数据，然后可以把这个函数的返回结果传给被包装的组件


// 高阶组件，通过传入mapStateToProps与组件，将mapStateTopProps函数规定的格式传入组件的porps
export const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        // 只有mapStateToProps的时候
    //     static contextTypes = {
    //         store: PropTypes.object
    //     }
    //     render(){
    //         const { store }  = this.context
    //         let porpStore = mapStateToProps(store)
    //         return(
    //             <WrappedComponent {...porpStore}/>
    //         )
    //     }

    // }
    // 增加mapDispatchToProps，并对接着把 stateProps、dispatchProps、this.props 三者合并到 this.state.allProps 里面去，
    // 这三者的内容都会在 render 函数内全部传给被包装的组件
    static contextTypes = {
        store: PropTypes.object
      }
  
      constructor () {
        super()
        this.state = {
          allProps: {}
        }
      }
  
      componentWillMount () {
        const { store } = this.context
        this._updateProps()
        store.subscribe(() => this._updateProps())
      }
      _updateProps () {
        const { store } = this.context
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {} // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {} // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props
          }
        })
      }
  
      render () {
        return <WrappedComponent {...this.state.allProps} />
      }
    }
    return Connect
}
