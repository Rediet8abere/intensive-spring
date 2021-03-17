import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import useStyles from './styles'

const Product = ({product}) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={product.image} title={product.name}/>
      <CardContent>
        <div className={classes.cardContent}>
          <Typography varient="h5" gutterButtom>
              {product.name}
          </Typography>
          <Typography varient="h5">
              {product.price}
          </Typography>
          <Typography varient="h2" color="textSecondary">
            {product.description}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className= {classes.cardActions}>
        <IconButton aria-label="Add to cart">
            <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product
