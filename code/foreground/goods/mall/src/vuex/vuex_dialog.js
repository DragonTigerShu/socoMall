export default {
  state:{
    loading:false
  },
  getters: {
    loadingGet:(state, getters) => {
      return state.loading;
    }
  },
  mutations:{
    loadingUpdate:(state,n) =>{
      state.loading = n;
    },
  }
}