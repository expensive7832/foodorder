import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { commerce } from "../CommerceKey";
import Category from "../components/Category";
import { Typography } from "@material-ui/core";
import { CssBaseline } from "@material-ui/core";
import "./home.css";
import img from "./../assets/new1.png";
import img2 from "./../assets/myImage.jpg";
import Product from "../components/Product";
import { ChevronLeft, Kitchen, Money, Star } from "@material-ui/icons";
import Footer from "../components/Footer";
import { useDispatch } from 'react-redux'
import { cartData } from './../Redux/Dataslices'

const Home = () => {
  

  const dispatch = useDispatch()

  const [categories, setCategories] = useState("");
  const [products, setProducts] = useState("");
  const [cart, setCart] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      await commerce.categories.list().then(({ data }) => setCategories(data));
    };
    getCategories();
    return () => {
      getCategories();
    };
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      await commerce.products
        .list({
          limit: 3,
          sortBy: "created",
          sortOrder: "desc",
        })
        .then(({ data }) => setProducts(data));
    };
    getProducts();
    return () =>{
      getProducts()
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      await commerce.cart.retrieve()
      .then((res) => (
        dispatch(cartData(res))
      ))
      .then((res) =>(
        setCart(res.payload)
      ))
    };
    fetchCart();
    return () =>{
      fetchCart()
    }
  }, []);
  
  return (
    <div id="home">
      <Navbar />
      <Hero />
      <div className="">
        <Typography className="catHeader" variant="h4">
          Shop By Category
        </Typography>

        <div className="category">
          {Object.entries(categories).map((cat) => (
            <Category key={cat[1].id} category={cat[1]} />
          ))}
        </div>
      </div>

      <div className="littleAbout">
        <div className="first">
          <img src={img} alt="fullsite image " />
        </div>
        <div className="second">
          <img src={img2} alt="says about ecommerce" />

          <blockquote>
            Within an hour, we had probably our best landing page yet and for a
            fraction of the price. It's amazing. Since then, I've built about 15
            sites on Strikingly – it's currently my favorite startup tech tool.
            &nbsp; <cite>Ben Murray</cite>
          </blockquote>
        </div>
      </div>

      <div className="recent">
        <Typography
          variant="h4"
          style={{ textAlign: "center", fontWeight: "bold", padding: "2rem 0" }}
        >
          Recent Products
        </Typography>
        <div className="recentProducts">
          {Object.entries(products).map((product) => (
            <Product key={product[1]?.id} product={product[1]} />
          ))}
        </div>
      </div>

      <div className="ourService">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#24299A"
            fill-opacity="1"
            d="M0,256L1440,0L1440,0L0,0Z"
          ></path>
        </svg>

        <div className="content">
          <Typography
            style={{ padding: "0 0 1rem", textAlign: "left" }}
            variant="body1"
          >
            why eMarket
          </Typography>
          <Typography
            style={{ fontWeight: "bold", color: "blue" }}
            gutterBottom
            variant="body1"
          >
            #1 multipurpose ecommerce to serve you the best{" "}
          </Typography>
          <div className="info">
            <div>
              <Star />
              <Typography>
                We are the best when it comes to eMarket We are the best when it
                comes to eMarket
              </Typography>
            </div>
            <div>
              <ChevronLeft />
              <Typography>
                We are the best when it comes to eMarket We are the best when it
                comes to eMarket
              </Typography>
            </div>
            <div>
              <Kitchen />
              <Typography>We are the best when it comes to eMarket</Typography>
            </div>
            <div>
              <Money />
              <Typography>We are the best when it comes to eMarket</Typography>
            </div>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#24299A"
            fill-opacity="1"
            d="M0,320L1440,32L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
