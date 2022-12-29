import { jwtDecrypt } from "../../shared/jwtHelper";
 
const state = () => ({
    authData: {
      token: "",
      refreshToken: "",
      tokenExp: "",
      userId: "",
      userName: "",
    },
    loginStatus:"",
  });
   
  const getters = {};
   
  const actions = {};
   
  const mutations = {
    saveTokenData(state, data) {
 
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
   
      const jwtDecodedValue = jwtDecrypt(data.access_token);
      const newTokenData = {
        token: data.access_token,
        refreshToken: data.refresh_token,
        tokenExp: jwtDecodedValue.exp,
        userId: jwtDecodedValue.sub,
        userName: jwtDecodedValue.userName,
      };
      state.authData = newTokenData; 
    },
    setLoginStatu(state, value){
       state.loginStatus = value;
    }
  };
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }