import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, Button} from '@material-ui/core'
import useStyles from './styles'

const CartItem = ({ item,  onUpdateCartQty, onRemoveFromCart }) => {
  const classes = useStyles()

  return (
    <Card>
      <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
      <CardContent className={classes.CardContent}>
       <Typography varient="h4"> {item.name} </Typography>
       <Typography varient="h5"> {item.line_total.formatted_with_symbol} </Typography>
      </CardContent>
      <CardActions className={classes.CardActions}>
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity-1)}>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type="button" size="small" onClick={() => onUpdateCartQty(item.id, item.quantity+1)}>+</Button>
        </div>
        <Button varient="contained" type="button" color="secondary" onClick={() => onRemoveFromCart(item.id)}> Remove </Button>
      </CardActions>
   </Card>
  )
}

export default CartItem
