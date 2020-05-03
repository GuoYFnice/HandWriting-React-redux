# 手写rudex

通过阅读react小书，动手实现react-rudex

## **reducer**

是一个没有副作用的纯函数，对state进行搞事情

## createStore

实现getState，dispatch方法，并且增加每次改变的监听

## connect

一个高阶组件，通过传入mapStateToProps，mapDispatchToProps，对原函数的props进行state，dispatch的绑定

## **Provider**

我们可以额外构建一个组件Provider，让这个组件成为组件树的根节点，那么它的子组件都可以获取到 context 了