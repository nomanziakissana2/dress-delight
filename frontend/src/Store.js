import { createContext, useReducer } from 'react';
export const Store = createContext();
const initState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: localStorage.getItem('paymentMethod')
      ? JSON.parse(localStorage.getItem('paymentMethod'))
      : '',
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
// reducer for use context dispatch
const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      // add to cart
      // add new item and check if aleardy exist this item then increase only its quantity
      const newItem = action.payload; // load new item into variable

      //check if item already exsit  if exist then load existing item to existingItem variable
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );
      // check if exist item is true then cart item value is exist item otherwise new item
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id && item.size === existItem.size
              ? newItem
              : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter((item) => {
        return (
          item.size !== action.payload.size || item._id !== action.payload._id
        );
      });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    //clear cart after place order data comes from place order screen
    case 'CART_CLEAR':
      //save previous state, cart previous state butt cartItem state clear
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    //when user sign in then return user info back to page
    //comes from sgin in
    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload };
    }
    // after signout clear all data from state
    case 'USER_SIGNOUT': {
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: '',
        },
      };
    }
    //comes from shipping addres
    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
