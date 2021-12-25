import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import sig from "./../assets/download.png";

const Receipt = () => {
  const receipt = useSelector(({ dataReducer }) => dataReducer?.receipt);
  

  
  const style = {
    width: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid grey",
    borderRadius: "1rem",
    padding: "0 1rem",
  };

  return (
    <>
      <div id="receipt">
       <Box sx={style}>
         <Typography
           gutterBottom
           style={{ padding: "0 1rem" }}
           variant="h5"
           align="center"
         >
           RECEIPT
         </Typography>
         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
           }}
         >
           <Typography paragraph>Shop</Typography>
           <Typography paragraph>OnlineCuisineTreat</Typography>
         </div>
         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
           }}
         >
           <Typography paragraph>Date</Typography>
           <Typography paragraph>{new Date().toLocaleDateString()}</Typography>
         </div>
         <div
           style={{
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
           }}
         >
           <Typography paragraph>ref</Typography>
           <Typography paragraph>{receipt?.reference?.reference}</Typography>
         </div>
         <Divider />

         <Box style={{ padding: "1rem 0" }}>
           <div
             style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
             }}
           >
             <Typography paragraph>Description</Typography>
             <Typography paragraph>Price</Typography>
           </div>
           <List>
             {receipt?.products?.line_items.map((product) => (
               <div
                 style={{
                   display: "flex",
                   justifyContent: "space-between",
                   alignItems: "center",
                 }}
               >
                 <ListItem key={product?.id}>
                   <ListItemText
                     primary={product?.name}
                     secondary={`Quantity: ${product.quantity}`}
                   ></ListItemText>
                 </ListItem>
                 <Typography>
                   {product?.price?.formatted_with_symbol}
                 </Typography>
               </div>
             ))}
           </List>
           <Typography paragraph>
             Total: {receipt?.products?.total_with_tax?.formatted_with_symbol}
           </Typography>
           <Divider />
           <Typography align="center" paragraph>
             Thanks For Shopping!
           </Typography>
           <img
             style={{ height: "4rem", objectFit: "contain" }}
             src={sig}
             alt="signature"
           />
         </Box>
         <Button Onclick={window.print()}>Print</Button>
       </Box>
     </div>  

    </>
  );
};

export default Receipt;
