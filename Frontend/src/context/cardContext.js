import { createContext, useContext, useReducer } from "react";
import { cardReducer } from "../reducer/cardReducer";

const initialstate = {
  cardlist: JSON.parse(localStorage.getItem('cartItems')) || []
};

const Cardcontext = createContext(initialstate);

export const Cardprovider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, initialstate);

  const addtocart = (product) => {
    const updatecardlist = state.cardlist.concat({ ...product, quantity: 1 });
    dispatch({
      type: "ADD_TO_CART",
      payload: { products: updatecardlist }
    });
  };

  const removefromcart = (product) => {
    const updatecartlist = state.cardlist.filter(current => current._id !== product._id);
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { products: updatecartlist }
    });
  };

  const updateCartQuantity = (product, newQuantity) => {
    const updatedCardList = state.cardlist.map(item => {
      //  console.log(product)
      if (item._id === product._id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    dispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { products: updatedCardList }
    });
  };

  const value = {
    cardlist: state.cardlist,
    addtocart,
    removefromcart,
    updateCartQuantity
  };

  return (
    <Cardcontext.Provider value={value}>
      {children}
    </Cardcontext.Provider>
  );
};

export const Usecart = () => {
  const context = useContext(Cardcontext);
  return context;
};
