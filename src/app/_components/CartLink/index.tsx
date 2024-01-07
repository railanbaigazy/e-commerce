'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()
  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <div className={classes.cartWrapper}>
        <Image
          src="/assets/icons/cart.svg"
          alt="cart"
          width={20}
          height={20}
          className={classes.cartIcon}
        />
        {typeof length === 'number' && length > 0 && length < 10 && (
          <div className={classes.quantity}>{length}</div>
        )}
        {typeof length === 'number' && length > 9 && (
          <div className={classes.quantityGreater}>9+</div>
        )}
      </div>
    </Link>
  )
}
