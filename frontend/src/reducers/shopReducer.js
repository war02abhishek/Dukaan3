export const ShopRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_SHOP_REQUEST":
    case "CRETAE_SHOP_PRODUCT":
    case "GET_SHOPDETAILS_REQUEST":
    case "GET_ALL_SHOP_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CREATE_SHOP_SUCESS":
    case "CREATE_PRODUCT_SUCESS":
    case "GET_SHOPDETAILS_SUCESS":
    case "GET_ALL_SHOP_SUCCESS":
      return {
        sucess: true,
        loading: false,
        shop: action.payload,
      };
    case "CREATE_SHOP_FAIL":
    case "CREATE_PRODUCT_FAIL":
    case "GET_SHOPDETAIL_FAIL":
    case "GET_ALL_SHOP_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const getNearByShopsReducer =(state={},action)=>{
  switch (action.type) {
    case "GET_NEAR_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_NEAR_SUCESS":
      return {
        sucess: true,
        loading: false,
        shop: action.payload,
      };
    case "GET_NEAR_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
export const getShopProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_SHOP_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SHOP_PRODUCTS_SUCESS":
      return {
        sucess: true,
        loading: false,
        shop: action.payload.data,
      };
    case "GET_SHOP_PRODUCT_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
