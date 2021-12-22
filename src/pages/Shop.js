import { Box, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './shop.css'
import { commerce } from "../CommerceKey";
import Product from '../components/Product';
import { useSelector } from "react-redux";

const Shop = () => {
      
      
      const [products, setProducts] = useState("")

      useEffect(() => {
          const fetchProducts = async() => (
            await commerce.products.list().then(({ data }) => setProducts(data))
          )
          fetchProducts();
          return () => {
            fetchProducts()
          }
      }, [])
    
    return (
       
       <div id="shop">
            <Navbar />
           <div className="topNotification">
                <marquee behavior="smooth">We Offer The Best, Check and dont forget to always patronise</marquee>
           </div>
          <Box>
          <Grid container justifyContent='center' alignItems='flex-start' >
                <Grid item xs={12} md={3}>
                    <Typography variant="h5" gutterBottom>Filter</Typography>
               <input type="range" name="" id="" style={{width:"100%"}}/>

                </Grid>
                <Grid container item xs={12} md={9}>
                   {Object.entries(products).map((product) =>(
                     <Grid item xs={12} md={3}><Product key={product[1].id} product={product[1]}/></Grid>
                   ))}
                </Grid>
           </Grid>
          </Box>
       </div>

    )
}

export default Shop
