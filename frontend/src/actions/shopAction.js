import axios from "axios";

export const CreateShop = (shopdata) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_SHOP_REQUEST" });

    const { data } = await axios.post("api/v1/reqshop", shopdata);
    dispatch({ type: "CREATE_SHOP_SUCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "CREATE_SHOP_FAIL",
      payload: error.response.data.message,
    });
  }
};


export const CreateSProduct=(productdata)=>async(dispatch)=>{
  try {
    dispatch({type:"CRETAE_SHOP_PRODUCT"});
    const {data}=await axios.post("api/v1/createshopProduct",productdata);
    dispatch({ type: "CREATE_PRODUCT_SUCESS", payload: data });  
  } catch (error) {
    dispatch({
      type: "CREATE_PRODUCT_FAIL",
      payload: error.response.data.message,
    }); 
  }
}
export const getShopDetails=()=>async(dispatch)=>{

  try {
     dispatch({ type: "GET_SHOPDETAILS_REQUEST" });

     const { data } = await axios.get("api/v1/getshopdetail");
     dispatch({ type: "GET_SHOPDETAILS_SUCESS", payload: data.shop }); 

    
  } catch (error) {
      dispatch({
        type: "GET_SHOPDETAIL_FAIL",
        payload: error.response.data.message,
      }); 
  }

}
export const getNearByShops = (latitude, longitude) => async (dispatch) => {
  try {
    dispatch({ type: "GET_NEAR_REQUEST" });
     const config = {
       headers: { "Content-Type": "application/json" },
     };
    const { data } = await axios.post(
      "api/v1/getNearByshops",
      {latitude,longitude}
    );
    console.log(data);
    dispatch({ type: "GET_NEAR_SUCESS", payload: data.nearbyShops });
  } catch (error) {
    dispatch({
      type: "GET_NEAR_FAIL",
      payload: error.response.data.message,
    });
  }
};
export const getShopProducts =(id)=>async(dispatch)=>{

  try {
    dispatch({ type: "GET_SHOP_PRODUCT_REQUEST" });

    const { data } = await axios.get(`/api/v1/getShopProducts/${id}`);
    console.log(data);
    dispatch({ type: "GET_SHOP_PRODUCTS_SUCESS", payload: data }); 

    
  } catch (error) {
    dispatch({
      type: "GET_SHOP_PRODUCT_FAIL",
      payload: error.response.data.message,
    }); 
    
  }

}