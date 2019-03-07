export default {
  state:{
    orderStatus:1
  },
  getters: {
    orderStatusGet: (state, getters) => {
      return state.orderStatus;
    }
  },
  mutations:{
    orderStatusUpdate:(state,n) => state.orderStatus = n,
  }
}