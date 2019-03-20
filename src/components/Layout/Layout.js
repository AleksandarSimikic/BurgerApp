import React, { Component, Fragment } from 'react'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const layout = (props) => (
  <Fragment>
    <div>
      <Toolbar />
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Fragment>
);

export default layout