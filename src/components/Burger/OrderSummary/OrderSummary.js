import React, { Fragment } from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      if(igKey === 'salad') {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} (x35g)</li>
      }
      else if(igKey === 'meat') {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} (x100g)</li>
      }
      else if(igKey === 'cheese') {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} (x50g)</li>
      }
      else if(igKey === 'bacon') {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]} (x70g)</li>
      }
    })
  return (
    <Fragment>
      <h3> Your order!</h3>
      <p>A delicous burger with the following ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>
        <strong>
          Cost: {props.price}$
        </strong>
      </p>
      <p>Continue to checkout!</p>
      <Button btnType="Danger" clicked={props.cancel}>CANCEL</Button>
      <Button btnType="Success" clicked={props.continue}>CONTINUE</Button>
    </Fragment>
  )
}

export default orderSummary