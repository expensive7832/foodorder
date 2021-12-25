import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import { commerce } from "../CommerceKey";
import Category from "../components/Category";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import "./home.css";
import img from "./../assets/chef.jpeg";
import Product from "../components/Product";
import { ChevronLeft, Kitchen, Money, Star } from "@material-ui/icons";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { cartData } from "./../Redux/Dataslices";

const Home = () => {
  const dispatch = useDispatch();

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
    return () => {
      getProducts();
    };
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      await commerce.cart
        .retrieve()
        .then((res) => dispatch(cartData(res)))
        .then((res) => setCart(res.payload));
    };
    fetchCart();
    return () => {
      fetchCart();
    };
  }, []);

  return (
    <div id="home">
      <Navbar />
      <Hero />
      <div className="">
        <Typography className="catHeader" variant="h4">
          Menu By Category
        </Typography>

        <div className="category">
          {Object.entries(categories).map((cat) => (
            <Category key={cat[1].id} category={cat[1]} />
          ))}
        </div>
      </div>

      <div className="littleAbout">
        <Grid container justifyContent="center">
          <Grid item xs={12} md={6} >
            <img src={img} alt="chef image " />
          </Grid>
          <Grid align="center" item xs={12} md={6} style={{height: "fit-content"}}>
            <Typography variant="h3" style={{fontWeight: "bold", padding: "1rem 0 2rem"}}>Food Menu</Typography>
            <div className="recentProducts">
          {Object.entries(products).map((product) => (
            <Product key={product[1]?.id} product={product[1]} />
          ))}
        </div>
          </Grid>
        </Grid>
      </div>

      <div className="recent">
      <Typography variant="h5" style={{ color: "#fff", padding: "2rem" }} >
          Subscribe To foodDelivery
        </Typography>  
            <div className="subscribe">
            <input placeholder="get notification as e deh hot....."/>
            <Button type="submit" style={{padding:"1rem", marginBottom: "2rem", backgroundColor: "#000", color: "#fff"}} variant="contained">Subscribe</Button>
            </div>
      
      </div>

      <div className="ourService">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#B8C1E8"
            fill-opacity="1"
            d="M0,256L1440,0L1440,0L0,0Z"
          ></path>
        </svg>

        <div className="content">
          <Typography
            style={{ padding: "0 0 1rem", textAlign: "left" }}
            variant="body1"
          >
            why foodOrder?
          </Typography>
          <Typography
            style={{ fontWeight: "bold", color: "blue" }}
            gutterBottom
            variant="body1"
          >
            #1 foodOrdering system to serve you the best
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
            fill="#B8C1E8"
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
