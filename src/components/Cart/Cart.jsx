import React from 'react'
import { Container, Grid, Typography, Button } from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import useStyles from './styles'
import { Link } from 'react-router-dom'

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {

  const classes = useStyles()

  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1"> You have no items in your shopping cart.
        <Link to="/" className={classes.link}>
          Add Items
        </Link>
      </Typography>
    )

  }

  const FilledCart = () => {
    return (
      <>
      <Grid container spacing= {3}>
        {cart.line_items.map((item) => (
          <Grid item sm={4} xs={12} key={item.id}>
              <CartItem item={item} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart}/>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography varient="h4">
            Subtotal:{ cart.subtotal.formatted_with_symbol }
        </Typography>
        <div>
          <Button className={classes.emptyButton} size="large" type="button" varient="contained" color="secondary" onClick={handleEmptyCart}>
            Empty Cart
          </Button>
          <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" varient="contained" color="primary">
            Checkout
          </Button>
        </div>
      </div>
    </>
    )

  }

  if (!cart.line_items) {
    return "Loading....."
  }
  return (
    <Container>
      <div className={classes.toolbar}/>
      <Typography className={classes.title} varient="h3"> Your Shopping Cart </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart
