import React, { Component } from "react"
// import { connect } from "react-redux"
import { connect } from "./simple-react-redux"
class ReactReduxPage extends Component {
  render() {
    const { num, add, minus } = this.props
    return (
      <div>
        {" "}
        <h1>ReactReduxPage</h1> <p>{num}</p> <button onClick={add}>add</button>{" "}
        <button onClick={minus}>minus</button>{" "}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return { num: state }
}
const mapDispatchToProps = {
  add: () => {
    return { type: "ADD" }
  },
  minus: () => {
    return { type: "MINUS" }
  },
}
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage)
