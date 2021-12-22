import React, { useState } from "react";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store, { persistor }  from './Redux/store'
import { Provider } from 'react-redux'
import Checkout from "./pages/Checkout";
import { PersistGate } from 'redux-persist/integration/react'
import Details from "./pages/Details";
import Categories from "./pages/Categories";
import Receipt from "./pages/Receipt";



const App = () => {


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/details/:prod_id" element={<Details/>} />
        <Route path="/receipt" element={<Receipt/>} />
        <Route path="/categories/:cat_id" element={<Categories/>} />
      </Routes>
    </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
