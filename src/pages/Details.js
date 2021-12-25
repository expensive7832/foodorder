import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "@material-ui/icons";
import OwlCarousel from "react-owl-carousel";
import { useDispatch } from "react-redux";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link, useParams } from "react-router-dom";
import { commerce } from "../CommerceKey";
import Navbar from "../components/Navbar";
import { cartData } from "../Redux/Dataslices";
import "./details.css";

const Details = () => {
  const dispatch = useDispatch();
  const { prod_id } = useParams();

  const [product, setProduct] = useState({});
  const [prod_qty, setProd_qty] = useState(1);
  const [basePrice, setBasePrice] = useState("");

  const addItem = async (prod_id, quantity, option = {}) => {
    await commerce.cart
      .add(prod_id, quantity, { ...option })
      .then(({ cart }) => dispatch(cartData(cart)));
  };

  const priceCalc = (optionPrice) => {
    if (optionPrice <= 0) {
      return product.amount;
    } else {
      const sym = product?.amount?.split(" ");
      const total = `${basePrice + optionPrice}.00`;
      return `${total} ${sym[1]}`;
    }
  };

  const carouselResp = {
    0: {
      items: 1,
    },
    768: {
      items: 2,
    },
  };
  const carouselRespRelated = {
    0: {
      items: 1,
    },
    768: {
      items: 1,
    },
  };

  const getImg = (vId) => {
    const relative = product?.assets?.find((pro) => pro.id === vId);
    return relative?.url;
  };

  const updateProduct = async (vG, vO) => {
    setProduct({
      ...product,
      name: vO.name,
      src: getImg(vO?.assets[0]),
      amount: priceCalc(vO?.price?.raw),
      option: { [vG]: vO?.id },
    });
  };

  useEffect(() => {
    const getProductById = async () => {
      const getProduct = await commerce.products.retrieve(prod_id);
      const {
        name,
        image,
        price,
        description,
        related_products,
        variant_groups,
        id,
        assets,
      } = getProduct;

      setBasePrice(price.raw);

      setProduct({
        name,
        src: image.url,
        amount: price.formatted_with_code,
        related_products,
        variant_groups,
        id,
        assets,
        description,
      });
    };
    getProductById();
    return () => {
      getProductById();
    };
  }, [prod_id]);

  return (
    <div id="details">
      <Navbar />
      <Grid
        style={{ paddingTop: "2rem" }}
        container
        justifyContent="space-between"
      >
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              style={{ width: "100%", height: "50vh", objectFit: "cover" }}
              image={product?.src}
              component="img"
              alt={product.name}
            />
          </Card>
        </Grid>
        <Grid style={{ padding: "0 1rem" }} item xs={12} sm={6}>
          <Typography
            variant="h4"
            gutterBottom
            align="justify"
            style={{ fontWeight: "bold", margin: "0 1rem" }}
          >
            {product.name}
          </Typography>
          <Typography
            dangerouslySetInnerHTML={{ __html: product?.description }}
            paragraph
            align="justify"
            style={{ margin: "1rem" }}
          />
          <div
            style={{ display: "flex", alignItems: "center", padding: "1rem 0" }}
          >
            <Typography style={{ marginRight: "2rem" }} variant="h6">
              Quantity
            </Typography>
            <Button
              onClick={() => {
                setProd_qty(prod_qty + 1);
              }}
              color="primary"
              variant="contained"
            >
              +
            </Button>
            <Box
              style={{
                width: "3rem",
                border: "1px thin #000",
                borderRadius: "20%",
                padding: ".7rem",
                backgroundColor: "white",
              }}
              align="center"
            >
              {prod_qty}
            </Box>
            <Button
              onClick={() => {
                setProd_qty(prod_qty >= 2 && prod_qty - 1);
              }}
              variant="contained"
              color="secondary"
            >
              -
            </Button>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 0",
            }}
          >
            <Typography>Price: &nbsp; &nbsp; {product?.amount}</Typography>
            <Button
              onClick={() => {
                addItem(product.id, prod_qty ? prod_qty : 1, product.option);
              }}
              variant="contained"
              color="secondary"
            >
              Add To Cart
            </Button>
          </div>
          <Divider />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: "3rem" }}>
      
        {product?.variant_groups?.length > 0 && (
          <Grid item xs={12} md={8}>
            {product?.variant_groups?.map(
              (
                vG //vG -- variant group
              ) => (
                <Box key={vG.id}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ margin: "0 1rem" }}
                  >
                    Select {vG.name}
                  </Button>
                
                  <Box id="variant">
                    <OwlCarousel
                      className="owl-theme"
                      dots={false}
                      lazyLoad={true}
                      responsive={carouselResp}
                      loop
                      margin={10}
                      nav
                    >
                      {vG.options.map((vO) => (
                        <Box
                          className=""
                          key={vO.id}
                          onClick={() => updateProduct(vG?.id, vO)}
                        >
                          {console.log(vO)}
                          <Card style={{ backgroundColor: "inherit" }}>
                            <CardMedia
                              style={{ padding: "2rem", objectFit: "contain" }}
                              image={getImg(vO?.assets[0])}
                              component="img"
                              alt={vO?.assets}
                            />
                            <CardActions
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div style={{display: "flex", justifyContent: "space-between", minWidth: "100%", maxWidth: "auto" }}>
                                <Grid item xs={6}>
                                <Typography>
                                +{vO?.price?.formatted_with_symbol}
                              </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                <Button variant="contained" color="primary" >
                                {vO?.name}
                              </Button>
                                </Grid>
                              </div>
                            </CardActions>
                          </Card>
                        </Box>
                      ))}
                    </OwlCarousel>
                  </Box>
                </Box>
              )
            )}
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" gutterBottom align="center">
            Related Food
          </Typography>
          {product?.related_products?.length > 0 ? (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OwlCarousel
                className="owl-theme"
                dots={false}
                lazyLoad={true}
                responsive={carouselRespRelated}
                loop
                margin={10}
                nav
              >
                {product?.related_products?.map((rP) => (
                  <Card component={Link} to={`/details/${rP.id}`} key={rP.id}>
                    <CardMedia
                      style={{
                        width: "100%",
                        height: "30vh",
                        objectFit: "contain",
                      }}
                      image={rP?.image?.url}
                      component="img"
                      alt={rP.name}
                    />
                  </Card>
                ))}
              </OwlCarousel>
            </Box>
          ) : (
            <Typography align="center">No related food Available</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
