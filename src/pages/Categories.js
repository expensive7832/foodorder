import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../CommerceKey";
import "./categories.css";

const Categories = () => {
  const { cat_id } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      await commerce.categories
        .retrieve(cat_id)
        .then((res) => console.log(res));
    };
    getProducts();
    return () => {
      getProducts();
    };
  }, [cat_id]);
  return <div id="categories"></div>;
};

export default Categories;
