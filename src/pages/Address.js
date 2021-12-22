import { Button, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./address.css";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import NestedInput from "../components/NestedInput";
import { commerce } from "../CommerceKey";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Address = ({userData }) => {
  const methods = useForm();

  const checkoutToken = useSelector(
    ({ dataReducer }) => dataReducer?.checkout?.id
  )

const [shippingCountries, setShippingCountries] = useState([])
const [shippingCountry, setShippingCountry] = useState({})
const [shippingSubDivisions, setShippingSubDivisions] = useState([])
const [shippingSubDivision, setShippingSubDivision] = useState({})
const [shippingOptions, setShippingOptions] = useState([])
const [shippingOption, setShippingOption] = useState({})

const sCs = Object.entries(shippingCountries).map(([code, name]) =>({id: code, label: name}));
const sDs = Object.entries(shippingSubDivisions).map(([code, name]) =>({id: code, label: name}))

  useEffect(() => {
    const getSC = async() =>{
      const {countries} =  await commerce.services.localeListShippingCountries(checkoutToken)
      const sc = Object.entries(countries).map(([code, name]) =>({id: code, label: name}))
      setShippingCountries(countries);
      setShippingCountry(sc[0]);
      }
    getSC()
   
    return () => {
      getSC()
    }
     }, [])

     useEffect(() => {
           if(shippingCountry){
            const getSD = async() =>{
              const {subdivisions} =  await commerce.services.localeListShippingSubdivisions(checkoutToken, shippingCountry)
            const sd = Object.entries(subdivisions).map(([code, name]) =>({id: code, label: name}))
            setShippingSubDivisions(subdivisions);
            setShippingSubDivision(sd[0]);
            }
          getSD()
           }
    
       }, [shippingCountry])

     useEffect(() => {
           if(shippingSubDivision){
            const getSO = async() =>{
              const res =  await commerce.checkout.getShippingOptions(checkoutToken, {
                country: shippingCountry,
                region: shippingSubDivision,
              })
              setShippingOptions(res);
              setShippingOption(res[0])
            }
          getSO()
           }
    
       }, [shippingSubDivision])


     
 
  return (
 
    <div id="address" style={{margin:  "0 1rem"}}>
      <Typography
        gutterBottom
        style={{ fontWeight: "bold", paddingLeft: "1rem" }}
      >
        Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(data => userData ({...data, shippingCountry, shippingSubDivision, shippingOption}))}>
          <Grid alignItems="center" justifyContent="space-between" spacing={1} container>
            <NestedInput
            name="firstname"
            label="FirstName"
            />

            <NestedInput
            name="lastname"
            label="LastName"
            />
            <NestedInput
            name="phone"
            label="Phone"
            />
            <NestedInput
            name="email"
            label="Email"
            />
            <NestedInput
            name="add"
            label="Address"
            />
            <NestedInput
            name="city"
            label="City"
            />
           <Grid item xs={12} sm={6}>
           <InputLabel>Shipping Country</InputLabel>
                <Select value={shippingCountry?.id} label={shippingCountry?.label} fullWidth onChange={(e) => setShippingCountry( e.target.value)} >
                    {sCs.map(sC =>(
                      <MenuItem value={sC?.id} key={sC.id}>{sC.label}</MenuItem>
                    ))}
                    
                </Select>
           </Grid>
           
           <Grid item xs={12} sm={6}>
           <InputLabel>Shipping SubDivision</InputLabel>
           <Select value={shippingSubDivision?.id} label={shippingSubDivision?.id} fullWidth onChange={(e) => setShippingSubDivision(e.target.value)} >
                    {sDs.map(sD =>(
                      <MenuItem value={sD?.id} key={sD.id}>{sD.label}</MenuItem>
                    ))}
                    
                </Select>
           </Grid>
            
           <Grid item xs={12} sm={6}>
           <InputLabel>Shipping Option</InputLabel>
           <Select value={shippingOption?.id} label={shippingOption?.description} fullWidth onChange={(e) => setShippingOption(e.target.value)} >
                    {shippingOptions.map((sO) =>(
                       <MenuItem value={sO?.id} key={sO.id}>{`${sO.description} - ${sO.price.formatted_with_code}`}</MenuItem>
                    ))}
                    
                </Select>
           </Grid>
           <Grid item xs={12} >
                <div style={{display: "flex", justifyContent: "space-between"}}>
                <Button component={ Link } to="/shop" color="secondary" variant="contained">Back To Shop</Button>
                <Button type="submit"  color="primary" variant="contained">Submit</Button>
                </div>
           </Grid>
            
          </Grid>
        </form>
      </FormProvider>
    </div>
  
  );
};

export default Address;
