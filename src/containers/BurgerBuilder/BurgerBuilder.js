import React, { Component, Fragment, Suspense } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 0.5,
    purchasable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    // non-related------------------
    var x = { one: 1, two: 2 };
    var y = x;
    y.one = 100;
    console.log(y instanceof Object)
    // -----------------------------
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState(() => ({
      totalPrice: newPrice,
      ingredients: updatedIngredients
    }))
    this.updatePurchase(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount !== 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      }
      updatedIngredients[type] = updatedCount;

      const priceSubs = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceSubs

      this.setState(() => ({
        totalPrice: newPrice,
        ingredients: updatedIngredients
      }))
      this.updatePurchase(updatedIngredients);
    }
  }

  updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    console.log(sum);
    this.setState(() => ({
      purchasable: sum > 0
    }))
  }

  handlePurchase = () => {
    this.setState(() => ({
      purchasing: true
    }))
  }

  handleCancelPurchase = () => {
    this.setState(() => ({
      purchasing: false
    }))
  }

  purchaseContinueHandler = () => {
    alert('You countinue!');
    this.setState(() => ({
      purchasing: false
    }))
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    return (
      <Fragment>
        {/* {this.state.purchasing === true
          ? <Modal>
            <OrderSummary ingredients={this.state.ingredients} />
          </Modal>
          : null
        } */}
        <Modal show={this.state.purchasing} modalClosed={this.handleCancelPurchase} >
          <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients} continue={this.purchaseContinueHandler} cancel={this.handleCancelPurchase} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.addIngredientHandler}
          disabled={disableInfo}
          ingredientRemoved={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          isPurchased={this.handlePurchase} />
      </Fragment>
    )
  }
}

export default BurgerBuilder