import { Button, Divider, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Review from "../components/Review";
import { usePaystackPayment } from "react-paystack";
import { useDispatch, useSelector } from "react-redux";
import { commerce } from "../CommerceKey";
import { cartData, checkoutData, receiptData } from "../Redux/Dataslices";

const Payment = ({ shippingData, backStep, nextStep }) => {

  const dispatch = useDispatch()

  const checkoutRes = useSelector(({ dataReducer }) => dataReducer?.checkout);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const amount = products.subtotal?.formatted_with_symbol
  const amountRaw = products.subtotal?.raw
  const currencyNote = products.currency?.code

  const refresh = async() =>{
    const { cart } = await commerce.cart.refresh();
    dispatch(cartData(cart))
    dispatch(checkoutData(null))
  }

 
  useEffect(() => {
    const getCart = async () => {
     const res = await commerce.checkout.getLive(checkoutRes?.id)
    setProducts(res);
    setLoading(false);
    };
    getCart();
    return () => {
      getCart();
    };
  }, [checkoutRes]);
  const {
    email,
    city,
    shippingCountry,
    shippingSubDivision,
    shippingOption,
    add,
    firstname,
    lastname,
    phone,
  } = shippingData;

  const onCapture = async(id, newOrder) =>{
   try {
     const res = await commerce.checkout.capture(id, newOrder )
     console.log(res)
   } catch (error) {
     console.log(error)
   }

     }


  {/** dispatch(receiptData({
      res
     })) */}

  const config = {
    reference: new Date().getTime().toString(),
    currency: currencyNote,
    email: email,
    amount:  amountRaw  * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    
  };


  const onSuccess = (reference) => {
    {/*const captureData = {
      line_items: products.line_items,
      customer: {
        firstname: shippingData.firstname,
        lastname: shippingData.lastname,
        email: shippingData.email,
      },
      shipping: {
        name: 'primary'  ,
        street: shippingData.add,
        town_city: shippingData.city,
        county_state: `${shippingCountry}-${shippingSubDivision}`,
        country: shippingCountry
      },
      fulfillment: {
        shipping_method: shippingOption
      },
      billing: {
        name: `${shippingData.lastname} ${shippingData.firstname}`  ,
        street: shippingData.add,
        town_city: shippingData.city,
        county_state: `${shippingCountry}-${shippingSubDivision}`,
        country: shippingCountry
      },
      payment: {
        gateway: 'paystack',
        card: {
          token: reference.reference
        }
      },
    }
  onCapture(checkoutRes.id, captureData)*/}
  dispatch(receiptData({
    ...shippingData,
    reference,
    products
  }))
    refresh()
    nextStep()
  }

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    alert('Wait You need This items!!!')
  }

  const Pay = () => {
      const initializePayment = usePaystackPayment(config);
      return (
        <div>
            <Button variant='contained' color='primary' onClick={() => {
                initializePayment(onSuccess, onClose)
            }}>Pay {amountRaw}</Button>
        </div>
      );
  };
  return (
    <div id="payment">
      <Review products={products} loading={loading}/>
      <Divider />
     
      <div style={{display: 'flex',justifyContent: 'space-between', alignitems: 'center', padding: '1rem 2rem' }}>
      <Button variant='contained' color='secondary' onClick={backStep}>Back</Button>
       <Pay/>
       </div>
     
    </div>
  );
};

export default Payment;
