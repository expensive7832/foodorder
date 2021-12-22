import { Button, Grid, Typography } from '@material-ui/core'
import { Home } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './confirmation.css'
import { useDispatch, useSelector } from 'react-redux'
import { receiptData } from '../Redux/Dataslices'


const Confirmation = () => {

    const receipt = useSelector(({ dataReducer }) => dataReducer?.receipt);
console.log(receipt)
    return (
        <div id="confirmation" style={{padding: "1rem 1rem 2rem"}}>
            <Typography gutterBottom variant="h6" style={{fontWeight: "bold", padding: "0 0 1rem"}}>Confirmation</Typography>
            <Typography gutterBottom paragraph>Thanks for purchasing! <strong>{receipt.firstname}</strong> you can check for more <Button variant="contained" color="success" component={ Link } to="/"><Home/></Button></Typography>   
           <a style={{fontSize: "1.2rem", float: "right"}} href="/receipt" >Download Receipt</a>
         
        </div>
    )
}

export default Confirmation
