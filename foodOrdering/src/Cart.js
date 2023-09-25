import { Component } from "react";
import axios from "axios";
import OrderConfirmation from "./OrderConfirmation";
import Salad from "./lab1.ES6";

class Cart extends Component {
 
  constructor(props) {
    super(props);
  }

  submit = (e) => {
    e.preventDefault();

    const allSallads = [];
    this.props.order.forEach((name) =>
      allSallads.push(Object.keys(name.mySalad))
    );

    if (allSallads.length > 0) {
      const req = axios.post("http://localhost:8080/orders", allSallads);

      req.then((r) => this.props.parentCallback(r.data));
      this.props.navigate("/view-myorder");
    }
    localStorage.removeItem("order")
    // this.state.order = []
    // this.props.navigate("/view-myorder");

    // Promise.all(promises).then((result) => {
    //   result.map((res) => console.log("res", res.data));
    // });
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Din beställning</h2>
          {/* {console.log('testishmain',this.state.order)} */}
          {this.props.order.map((name, idx) => (
            <OrderConfirmation name={name} idx={idx} key={idx}/>
          ))}

          {/* {this.props.order.map(name => console.log("price", Object.keys(name.mySalad)))}  */}
          <input className="pad" type="submit" value="Beställ"></input>
        </div>
      </form>
    );
  }
}

export default Cart;
