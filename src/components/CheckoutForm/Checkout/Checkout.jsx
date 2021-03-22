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
  const classes = useStyles()

  useEffect(()=> {
    const generateToken = async () => {
        try {
            const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})
            console.log("-----> token", token)
            setCheckoutToken(token)
        } catch (err) {

        }
      }
      generateToken()
    }, [cart])

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  )
  const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken}/>
    : <PaymentForm />
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
