import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartlist: JSON.parse(localStorage.getItem('cartItems')) || [],
    loading: false,
    carts: {}
  },
  reducers: {
    add(state, action) {
      const updatedList = state.cartlist.concat({ ...action.payload, quantity: 1 });
   
      return { ...state,  cartlist: updatedList };
    },
    remove(state, action) {
      const updatedList = state.cartlist.filter(list => list._id !== action.payload._id);
      
      return { ...state, cartlist: updatedList };
    },
    updateCartQuantity(state, action) {
      const { productId, newQuantity } = action.payload;
      const updatedList = state.cartlist.map(item => {
        if (item._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return { ...state, cartlist: updatedList };
    },
    showloading(state) {
      return { ...state, loading: true }
    },
    hideloading(state) {
      return { ...state, loading: false }
    },
    edit(state, action) {
      const editItem = state.cartlist.find(item => item._id === action.payload._id)
      return { ...state, carts: editItem }
    },
  }
});

export const { add, remove, updateCartQuantity, showloading, hideloading, edit } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

