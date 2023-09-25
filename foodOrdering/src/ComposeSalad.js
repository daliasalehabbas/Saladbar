import { Component, useEffect } from "react";
import "./ComposeSalad.css";
import Salad from "./lab1.ES6";
import { Link, useNavigate } from "react-router-dom";


class ComposeSalad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foundation: "",
      protein: "",
      extras: {},
      dressing: "",
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let addExtra = false 
    if (name === "extras") {
      let extra = this.state[name];
      if (!extra[value]) {
        addExtra = true
      } else {
        addExtra = false
      }
      this.setState(oldState => ({extras: {...oldState.extras, [value]: addExtra}}))
    } else {
      e.target.parentElement.classList.add("was-validated");
      this.setState({ [name]: value }, () => {});
    }
  };



  submit = (e) => {
    e.preventDefault();
    e.target.classList.add("was-validated");

    if (e.target.checkValidity() === false) {
      return 0;
    }
    let myCaesarSalad = new Salad()
      .add(this.state.foundation, this.props.inventory[this.state.foundation])
      .add(this.state.protein, this.props.inventory[this.state.protein])
      .add(this.state.dressing, this.props.inventory[this.state.dressing]);

    Object.keys(this.state.extras).forEach((ing) => {
      if(this.state.extras[ing]) {
        myCaesarSalad.add(ing, this.props.inventory[ing]);
      } 
    });

    e.target.reset();

    this.setState({ extras: {}, foundation: "", dressing: "", protein: "" });
    this.props.parentCallback(myCaesarSalad);
    this.props.navigate("/my-cart");
  };

  testCopy() {
    let F = function () {
      this.a = 1;
      this.b = 2;
    };
    let o = new F();

    let copy = { ...o };

    console.log("not copied: " + o.a + " " + typeof o);
    console.log("copied: " + copy.a + " " + typeof copy);
  }

  displayContent = (content, nameOfType) => {
    return (
      <div>
        <select
          value={this.state[nameOfType] || ""}
          required
          className="form-select"
          aria-label="Disabled select example"
          name={nameOfType}
          onChange={this.handleChange}
        >
          <option value="" hidden>
            Gör ditt val
          </option>
          {content.map((name, idx) => (
            <option key={`myKey-${idx}`} value={name || ''} className="col-4">
              {name}
            </option>
          ))}
        </select>
        <div className="invalid-feedback"> You need to add {nameOfType} </div>
      </div>
    );
  };

  render() {
    // this.testCopy()

    let extras = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].extra
    );
    let foundation = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].foundation
    );
    let protein = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].protein
    );
    let dressing = Object.keys(this.props.inventory).filter(
      (name) => this.props.inventory[name].dressing
    );

    return (
      <div className="continer col-12">

        <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>
          <form onSubmit={this.submit} noValidate>
            <h6 className="toppingHeading">Välj bas</h6>
            {this.displayContent(foundation, "foundation")}
            <h6 className="toppingHeading">Välj protein</h6>
            {this.displayContent(protein, "protein")}
            <h6 className="toppingHeading">tillbehör:</h6>
            <div className="checkForm">
              {extras.map((name, idx) => (
                <div key={`myKey-${idx}`} className="form-check form-switch">
                  <input
                    className="form-check-input"
                    value={name || ''}
                    name="extras"
                    onChange={this.handleChange}
                    checked={this.state.extras[name] ? this.state.extras[name] : false}
                    type="checkbox"
                    id={name}
                  ></input>
                  <ul className="nav">
                    <li className="nav-item">
                      <Link to={"/view-ingredient/" + name}>
                        <label className="form-check-label" htmlFor={name}>
                          {name}{" "}
                        </label>
                      </Link>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
            <h6 className="toppingHeading">Dressing:</h6>
            {this.displayContent(dressing, "dressing")}

            <input
              className="pad"
              type="submit"
              value="Lägg till sallad"
            ></input>
          </form>
        </div>
      </div>
    );
  }
}
export default ComposeSalad;
