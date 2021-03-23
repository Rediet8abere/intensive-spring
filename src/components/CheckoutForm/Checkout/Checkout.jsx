import React, { useState, useEffect } from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divder, Button} from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'

import useStyles from './styles'

const steps = ['Shipping address', 'Payment details']
const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()

  useEffect(()=> {
    const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})
            setCheckoutToken(token)
        } catch (err) {

        }
      }
      generateToken()
    }, [cart])


  const nextStep = () => setActiveStep(activeStep + 1)
  // onClick={() => setCount(count + 1)}
  const backStep = () => setActiveStep((activeStep) => activeStep - 1)

  const next = (data) => {
    setShippingData(data)
    console.log("activeStep before----->", activeStep)
    nextStep()
    console.log("activeStep after----->", activeStep)
  }

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  )
  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next} />
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}/>
  return (
    <>
      <div className={classes.toolbar}/>
      <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography varient="h4" align="center">Checkout</Typography>
        <Stepper activeStep={0} className={classes.Stepper}>
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
      </Paper>
      </main>
    </>
  )
}

export default Checkout
