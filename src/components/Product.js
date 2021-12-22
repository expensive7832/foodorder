import { Badge, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import React from "react";
import "./product.css";
import { commerce} from "./../CommerceKey";
import { useDispatch } from 'react-redux'
import { cartData } from "../Redux/Dataslices";
import { Link } from "react-router-dom";
const Product = ({ product }) => {

  

  const dispatch = useDispatch();

  const addItem = async(prod_id, quantity) =>{
    await commerce.cart.add(prod_id, quantity)
    .then(({cart}) => dispatch(cartData(cart)))
  }

  return (
    <article style={{padding: "2rem 1rem"}} key={product.id}>
      <Card>
        <CardMedia
          style={{height: "5rem", objectFit: "contain"}}
          image={product.assets[0].url}
          component="img"
          alt={product.name}
        />
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" style={{fontWeight: "bold"}}>{product.name}</Typography>
          <Badge color="primary" badgeContent={product.price.formatted_with_symbol}/>
        </CardContent>
        <Typography style={{wordWrap: "break-word", padding: "0 .5rem"}} dangerouslySetInnerHTML={{__html: product.description.length > 40 ? `${product.description.substr(0, 40)}...` : product.description }}></Typography>
          <CardActions style={{display: "flex",justifyContent: "space-between"}}>
              <Button component={ Link } to={`/details/${product.id}`} color='primary' size="small" variant="contained">Details</Button>
              <IconButton onClick={() =>{addItem(product.id, 1)}}>
                  <ShoppingCart/>
              </IconButton>
          </CardActions>
      </Card>
    </article>
  );
};

export default Product;
