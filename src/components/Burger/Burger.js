import React from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngiredient'
import { isEmpty } from 'lodash'

const burger = (props) => {
  const transIngred = Object.keys(props.ingredients)
    .map(igKey => {
      console.log(typeof igKey)
      console.log(igKey)
      return [...Array(props.ingredients[igKey])]
      .map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />
      })
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, [])
    console.log(transIngred)
    console.log(isEmpty(transIngred))

  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {isEmpty(transIngred) === false ? transIngred : <div>Kara</div>}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}

export default burger