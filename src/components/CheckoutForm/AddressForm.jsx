import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import FormInput from './FormInput'
import { commerce } from '../../lib/commerce'

const AddressForm = ({ checkoutToken }) => {

  const [shippingCountries, setShippingCountries] = useState([])
  const [shippingCountry, setShippingCountry] = useState('')
  const [shippingSubdivisions, setShippingSubdivisions] = useState([])
  const [shippingSubdivision, setShippingSubdivision] = useState('')
  const [shippingOptions, setShippingOptions] = useState('')
  const [shippingOption, setShippingOption] = useState('')
  const methods = useForm()

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
  console.log("countries----->", countries)

  const fetchShippingCountries = async (checkoutTokenId) => {
    console.log("checkoutTokenId----->", checkoutTokenId)
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
    console.log("countries--->", countries)
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  return (
    <div>
      <Typography varient="h6" gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit=''>
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


          </Grid>

        </form>
      </FormProvider>

    </div>
  )
}

export default AddressForm
