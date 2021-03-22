import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import useStyles from './styles'

const Product = ({product, onAddToCart}) => {
  const classes = useStyles()
  console.log("---------->", product)
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.media.source} title={product.name}/>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography varient="h5" gutterBottom>
              {product.name}
          </Typography>
          <Typography varient="h5">
              {product.price.formatted_with_symbol}
          </Typography>
          <Typography dangerouslySetInnerHTML={{ __html:product.description }} varient="h2" color="textSecondary" />
        </div>
      </CardContent>
      <CardActions disableSpacing className= {classes.cardActions}>
        <IconButton aria-label="Add to cart" onClick={() => onAddToCart(product.id, 1)}>
            <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
