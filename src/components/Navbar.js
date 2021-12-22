import Commerce from "@chec/commerce.js";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  ArrowBack,
  Cancel,
  Menu,
  SearchOutlined,
  ShoppingCart,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { cartData } from "../Redux/Dataslices";
import "./navbar.css";
import { commerce } from "../CommerceKey";

const Navbar = ({cart}) => {

const loc = useLocation()

const {prod_id} = useParams()

  const style = {
    padding: "0 2rem",
  };

  const dispatch = useDispatch();

  const itemLength = useSelector(
    ({ dataReducer }) => dataReducer?.cart?.total_items
  )

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openCart, setOpenCart] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const cartResponse = useSelector(({ dataReducer }) => dataReducer?.cart);

  const updateCart = async(item_id, qty) => {
    await commerce.cart
      .update(item_id, { quantity: qty })
      .then(({ cart }) => dispatch(cartData(cart)))
      .catch((err) => console.log(err));
  };
  const emptyCart = async () => {
    await commerce.cart
      .empty()
      .then(({ cart }) => dispatch(cartData(cart)))
      .catch((err) => console.log(err));
  };

  const removeProduct = async (item_id) => {
    await commerce.cart
      .remove(item_id)
      .then(({ cart }) => dispatch(cartData(cart)))
      .catch((err) => console.log(err));
  };

  return (
    <header id="header">
      <Box>
        <AppBar position="static">
          <Paper>
            <div className="nav">
              <div className="left">
                <Typography
                  component={Link}
                  to="/"
                  variant="h5"
                  color="primary"
                >
                  eMarket
                </Typography>
              </div>
              
              <div className="center" style={{display: `${loc.pathname === `/details/${prod_id && prod_id}`  && "none"}`}}>
                <input placeholder="Enter Your Search....." />
                <IconButton className="searchBtn">
                  <SearchOutlined />
                </IconButton>
              </div>
              

              <div className="cart">
                <Drawer
                  hideBackdrop
                  anchor="right"
                  open={openCart}
                  onClose={() => setOpenCart(false)}
                >
                  <Box>
                    <IconButton
                      onClick={() => setOpenCart(false)}
                      style={{ color: "#000", textAlign: "center" }}
                    >
                      <Cancel />
                    </IconButton>
                    <List>
                      
                      {cartResponse &&
                        cartResponse.line_items.map((cart) => (
                          <ListItem key={cart.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <ListItemText
                              primary={cart.name}
                              secondary={
                                <>
                                  <Button
                                    onClick={() =>
                                      updateCart(
                                        cart.id,
                                        cart.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                  {cart.quantity}
                                  <Button
                                    onClick={() =>
                                      updateCart(
                                        cart.id,
                                        cart.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </Button>
                                </>
                              }
                            />

                            <Typography>
                              {cart?.line_total?.formatted_with_symbol}
                            </Typography>

                            <IconButton
                              onClick={() => removeProduct(cart.id)}
                              style={{ color: "red", textAlign: "center" }}
                            >
                              <Cancel />
                            </IconButton>
                          </ListItem>
                        ))}

                      <Divider />
                      <Box
                        style={{ padding: "1rem .6rem", fontWeight: "bold" }}
                      >
                        Total: &nbsp; &nbsp;{" "}
                        {cartResponse &&
                          cartResponse.subtotal.formatted_with_symbol}
                      </Box>
                      <Divider />

                      <Grid container style={{ marginTop: "2rem" }}>
                        <Grid item xs={4}>
                          <Button component={Link} to="/" color="secondary">
                            Back
                          </Button>
                        </Grid>
                        <Grid
                          item
                          xs={4}
                          onClick={() => {
                            emptyCart();
                          }}
                        >
                          <Button variant="contained" color="secondary">
                            Empty
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            component={Link}
                            to="/checkout"
                            variant="contained"
                            color="primary"
                          >
                            Checkout
                          </Button>
                        </Grid>
                      </Grid>
                    </List>
                  </Box>
                </Drawer>
                <IconButton
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenCart(!openCart)}
                >
                  <Badge
                    badgeContent={itemLength && itemLength}
                    color="secondary"
                  >
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </div>
              <div className="right" style={{display: `${loc.pathname === `/details/${prod_id && prod_id}`  && "none"}`}}>
                {!isMobile ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Typography
                      component={Link}
                      to="/shop"
                      style={{ cursor: "pointer", paddingRight: "1rem" }}
                    >
                      Shop
                    </Typography>
                    <Typography
                      component={Link}
                      to="/about"
                      style={{ cursor: "pointer", paddingRight: "1rem" }}
                    >
                      About
                    </Typography>
                    <Typography
                      component={Link}
                      to="/contact"
                      style={{ cursor: "pointer" }}
                    >
                      Contact
                    </Typography>
                  </div>
                ) : (
                  <div>
                    <Box>
                      <Drawer
                        hideBackdrop
                        variant="temporary"
                        anchor="right"
                        open={openDrawer}
                        onClose={() => setOpenDrawer(false)}
                      >
                        <Box sx={style}>
                          <List>
                            <ListItem
                              onClick={() => {
                                setOpenDrawer(false);
                              }}
                            >
                              <IconButton>
                                <ArrowBack />
                              </IconButton>
                            </ListItem>
                            <Divider />
                            <ListItem
                              onClick={() => {
                                setOpenDrawer(false);
                              }}
                            >
                              <Typography
                                component={Link}
                                to="/shop"
                                style={{ cursor: "pointer" }}
                              >
                                Shop
                              </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem
                              onClick={() => {
                                setOpenDrawer(false);
                              }}
                            >
                              <Typography
                                component={Link}
                                to="/about"
                                style={{ cursor: "pointer" }}
                              >
                                About
                              </Typography>
                            </ListItem>
                            <Divider />
                            <ListItem
                              onClick={() => {
                                setOpenDrawer(false);
                              }}
                            >
                              <Typography
                                component={Link}
                                to="/contact"
                                style={{ cursor: "pointer" }}
                              >
                                Contact
                              </Typography>
                            </ListItem>
                            <Divider />
                          </List>
                        </Box>
                      </Drawer>
                    </Box>
                    <IconButton
                      onClick={() => setOpenDrawer(!openDrawer)}
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                    >
                      <Menu />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        </AppBar>
      </Box>
    </header>
  );
};

export default Navbar;
