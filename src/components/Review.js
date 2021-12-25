import { ListItemText, List, ListItem, Typography, Divider, CircularProgress, Box } from '@material-ui/core'
import React, { useState } from 'react'
import './review.css'


const Review = ({products, loading}) => {

    
   
    return (
        <div id="review">
            <Typography gutterBottom align="center" variant="h5">Review</Typography>
            {loading ? <Box style={{display: "flex", justifyContent: "center"}}> <CircularProgress /></Box> :
            
            <List>
            {products?.line_items?.map((product) =>(
                <div style={{display: "flex",justifyContent: "space-between", alignItems: "center"}}> 
                    <ListItem key={product.id}>
                    <ListItemText primary={product?.name} secondary={`Quantity: ${product?.quantity}`}></ListItemText>
                </ListItem>
                <Typography paragraph>{product?.line_total.formatted_with_code}</Typography>
                </div>
                
             ))}
             
            </List>
            
            }
            
            <Typography paragraph style={{fontWeight: '600'}}>Total: {products?.subtotal?.formatted_with_symbol}</Typography>
                <Divider/>
        </div>
    )
}

export default Review
