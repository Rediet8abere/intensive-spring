import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product/Product'
import useStyles from './styles'

const products = [
  { id:1, name:"spoon", description: "metal", price: "$5", image: "https://www.thoughtco.com/thmb/bXfXbRm5PbnIRIHhXDlCa7fWAJA=/2121x1193/smart/filters:no_upscale()/GettyImages-1097037546-35e5377d07704fa69c8ce93833b7afdd.jpg" },
  { id:1, name:"fork", description: "silver", price: "$10", image: "https://images-na.ssl-images-amazon.com/images/I/71RRthv0TkL._AC_SL1500_.jpg" },
]
const Products = () => {
  const classes = useStyles()
  return (
    <main className={classes.content}> 
    <div className={classes.toolbar} />
    <Grid container justify='center' spacing={4}>
      {products.map((product) => (
        // mobile device small device medium device larger device
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={product}/>
        </Grid>
      ))}
    </Grid>

  </main>

  )

}

export default Products
