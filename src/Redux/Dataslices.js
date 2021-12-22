import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: null,
  checkout: null,
  receipt: null
}

export const dataSlice = createSlice({
  name: 'ecommerce',
  initialState,
  reducers: {
    cartData: (state, action) => {
      state.cart = action.payload
    },
    checkoutData: (state, action) => {
      state.checkout = action.payload
    },
    receiptData: (state, action) => {
      state.receipt = action.payload
    }
  },
})

export const { cartData, checkoutData, receiptData } = dataSlice.actions

export default dataSlice.reducer