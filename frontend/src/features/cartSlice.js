import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveCart = createAsyncThunk(
  "cart/save",
  async (cartData) => {
    const response = await fetch("/api/cart/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartData),
    });

    return await response.json();
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetch",
  async (userId) => {
    const response = await fetch(`/api/cart/${userId}`);
    return await response.json();
  }
);

const initialState = {
  CartItems: [],
  TotalPrice: 0,
  TotalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "Cart",
  initialState,

  reducers: {
    addToCart: (state, actions) => {
      const find = state.CartItems.findIndex((value) => {
        return value._id === actions.payload._id;
      });

      if (find !== -1) {
        state.CartItems[find] = {
          ...state.CartItems[find],
          quantity: state.CartItems[find].quantity + 1,
        };
      } else {
        state.CartItems.push({
          ...actions.payload,
          quantity: 1,
        });
      }
    },

    deleteCartItems: (state, actions) => {
      state.CartItems = state.CartItems.filter((value) => {
        return value._id !== actions.payload._id;
      });
    },

    carttotalPrice: (state) => {
      const { TotalPrice, TotalQuantity } = state.CartItems.reduce(
        (cartTotal, cartItem) => {
          const { quantity, productPrice } = cartItem;

          const itemsTotal =
            parseFloat(productPrice) * parseFloat(quantity);

          cartTotal.TotalPrice += itemsTotal;
          cartTotal.TotalQuantity += quantity;

          return cartTotal;
        },

        {
          TotalPrice: 0,
          TotalQuantity: 0,
        }
      );

      state.TotalPrice = TotalPrice.toFixed(2);
      state.TotalQuantity = TotalQuantity;
    },

    IncrementQuantity: (state, action) => {
      state.CartItems = state.CartItems.map((item) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        return item;
      });
    },

    DecrementQuantity: (state, action) => {
      state.CartItems = state.CartItems.map((item) => {
        if (item._id === action.payload._id) {
          return {
            ...item,
            quantity: item.quantity > 1
              ? item.quantity - 1
              : 1,
          };
        }

        return item;
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      console.log("fetchComplete", action.payload);

      // FIXED
      state.CartItems = action.payload.cartItems || [];

      state.TotalPrice = action.payload.TotalPrice || 0;

      state.TotalQuantity =
        action.payload.TotalQuantity || 0;
    });

    builder.addCase(saveCart.fulfilled, (state, action) => {
      console.log("Cart Save..", action.payload);
    });
  },
});

export const {
  addToCart,
  deleteCartItems,
  carttotalPrice,
  IncrementQuantity,
  DecrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;