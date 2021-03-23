import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken, next }) => {

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState([])
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm()

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id:code, label:name}))
  console.log("shippingOptions---->", shippingOptions)
  const options = shippingOptions.map((sO) => ({id:sO.id, label:`${sO.description} - (${sO.price.formatted_with_symbol})`}))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
    console.log("subdivisions--->", subdivisions)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region=null) => {
    console.log("country, region--->", country, region)
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
    console.log("options---->fetch", options)
    setShippingOptions(options)
    // setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if(shippingCountry) fetchSubdivisions(shippingCountry)
  }, [shippingCountry])

  useEffect(() => {
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [checkoutToken.id, shippingCountry, shippingSubdivision])

  return (
    <div>
      <Typography varient="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, shippingOption }) )}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="Fist Name"/>
            <FormInput required name="lastName" label="Last Name"/>
            <FormInput required name="Address1" label="Address"/>
            <FormInput required name="email" label="Email"/>
            <FormInput required name="city" label="city"/>
            <FormInput required name="zipCode" label="zipCode"/>

            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value) }>
                  { countries.map((country) => (
                        <MenuItem key={country.id} value={country.id}>
                          {country.label}
                        </MenuItem>
                  ))}
              </Select>
            </Grid>

            <Grid item xs={12} sm={6}>
               <InputLabel>Shipping Subdivision</InputLabel>
               <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value) }>
                   { subdivisions.map((subdivision) => (
                         <MenuItem key={subdivision.id} value={subdivision.id}>
                           {subdivision.label}
                         </MenuItem>
                   ))}
               </Select>
           </Grid>

           <Grid item xs={12} sm={6}>
             <InputLabel>Shipping Options</InputLabel>
             <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value) }>
                 { options.map((option) => (
                       <MenuItem key={option.id} value={option.id}> {option.label}</MenuItem>
                  ))}
             </Select>
           </Grid>


          </Grid>
          <br />
          <div styles={{ display:'flex', justifyContent:'space-between'}}>
            <Button component={Link} to="/cart" varient="outlined">Back to Cart</Button>
            <Button type="submit" varient="contained" color="primary">Next</Button>
          </div>
        </form>
      </FormProvider>

    </div>
  )
}

export default AddressForm
