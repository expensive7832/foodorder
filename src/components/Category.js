import { Badge, Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./category.css";


const Category = ({ category }) => {
  return (
    <article id="categorySingle" key={category.id}>
      <Card component={Link} to={`categories/${category.id}`}>
        <CardMedia
          image={category?.assets[0]?.url}
          component="img"
          alt={category.name}
          style={{width: "auto", height: "10vh", objectFit: "contain"}}
        />
        <CardContent style={{display: "flex", justifyContent: "space-between", opacity: "0.5"}}>
        <Typography>{category.name}</Typography>
        <Badge badgeContent={category.products} color="primary"/>
        </CardContent>
      </Card>
      
    </article>
  );
};

export default Category;
