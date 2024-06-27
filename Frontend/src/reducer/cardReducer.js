export const cardReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
      case "ADD_TO_CART":
        return { ...state, cardlist: payload.products };
      case "REMOVE_FROM_CART":
        return { ...state, cardlist: payload.products };
      case "UPDATE_CART_QUANTITY":
        return { ...state, cardlist: payload.products };
      default:
        throw new Error("Case not match");
    }
  };
  