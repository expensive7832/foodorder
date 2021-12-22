import { Box, Paper, Step, StepLabel, Stepper, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Address from './Address'
import './checkout.css'
import Payment from './Payment'
import Confirmation from './Confirmation'
import { commerce } from '../CommerceKey'
import { useDispatch, useSelector } from 'react-redux'
import { checkoutData } from '../Redux/Dataslices'


const Checkout = () => {

const dispatch = useDispatch()
const theme = useTheme()
const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
         width: isMobile ? 'fit-content' : '60vw',
         height: '20vh',
         marginTop: '10rem'
    }

    const cartResponse = useSelector(({ dataReducer }) => dataReducer?.cart);
  
    
    useEffect(() => {
        const generateToken = async() =>{
          await commerce.checkout.generateToken(cartResponse.id, { type: 'cart' })
        .then((checkout) => dispatch(checkoutData(checkout)))
        }
        generateToken ()
        return () => {
            generateToken()
        }
    }, [])

    

    const steps = ['address', 'payment']

    const [activeStep, setActiveStep] = useState(0)
    const [shippingData, setshippingData] = useState({})
   
    const backStep = () =>{
        setActiveStep((prevActiveStep) => prevActiveStep - 1)
    }

    const next = () =>{
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const userData = (data) =>{
        setshippingData(data)
        next()
    }

    const Form = () => activeStep === 0 ? <Address userData={userData } /> : <Payment nextStep={next} backStep={backStep} shippingData={shippingData}/>



    return (
        <Box sx={style}>
            <Paper>
                <Typography variant='h5' style={{textAlign: 'center'}}>Checkout</Typography>
                <Stepper activeStep={activeStep}>
                    {steps.map((step) =>(
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box>
                {activeStep === steps.length ? <Confirmation/> : <Form/> }
                </Box>
            </Paper>
        </Box>
    )
}

export default Checkout
