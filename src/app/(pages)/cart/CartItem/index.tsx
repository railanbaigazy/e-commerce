'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'

import classes from './index.module.scss'

const CartItem = ({ product, title, metaImage, index, quantity, addItemToCart }) => {
  const [productQuantity, setProductQuantity] = useState(quantity)
  const decrementQuantity = () => {
    const updatedQuantity = productQuantity > 1 ? productQuantity - 1 : 1
    setProductQuantity(updatedQuantity)
    addItemToCart({ product, quantity: Number(updatedQuantity) })
  }
  const incrementQuantity = () => {
    const updatedQuantity = productQuantity + 1
    setProductQuantity(updatedQuantity)
    addItemToCart({ product, quantity: Number(updatedQuantity) })
  }
  const enterQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQuantity = e.target.value
    setProductQuantity(updatedQuantity)
    addItemToCart({ product, quantity: Number(updatedQuantity) })
  }
  return (
    <li className={classes.item} key={index}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>
      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>
        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQuantity}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus-sign"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
          <input
            type="text"
            className={classes.quantityInput}
            value={productQuantity}
            onChange={enterQuantity}
          />
          <div className={classes.quantityBtn} onClick={incrementQuantity}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus-sign"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>
      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={quantity} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
