import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
// import inventory from './inventory.ES6';
import ComposeSalad from "./ComposeSalad";
import Cart from "./Cart";
import { Button } from "bootstrap";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import ComposeSaladWrapper from "./ComposeSaladWrapper";
import ViewIngredient from "./ViewIngredient";
// import { inventory } from "./inventory";
import ViewCart from "./ViewCart";
import CartWrapper from "./CartWrapper";
import Salad from "./lab1.ES6";

import axios from "axios";
//import { inventory } from "./inventory";

class App extends React.Component {
  state = {
    salads: [],
    inventory: {},
    request: {},
  };

  handleCallback = (newSalad) => {
    this.setState(
      (oldState) => ({ salads: [...oldState.salads, newSalad] }),
      () => {
        //console.log("state salad", this.state.salads);
        localStorage.setItem("order", JSON.stringify(this.state.salads));
      }
    );
  };

  handleViewCart = (req) => {
    this.setState({ request: req });
    this.setState({ salads: [] });
    localStorage.setItem(
      this.state.request.uuid,
      JSON.stringify(this.state.request)
    );
    localStorage.setItem("last salad", JSON.stringify(this.state.request));
  };

  async fetchIngredient(group, ingredient) {
    let url = "http://localhost:8080/";
    const data = await safeFetchJson(url + group + '/'  + ingredient);
    return {data, ingredient};
  }

  async fetchIngredientList(group) {
    let url = "http://localhost:8080/";
    const data = await safeFetchJson(url + group)
    return {data, group};
  }
  componentDidMount() {
    let loadedSalads = []
    if (localStorage.getItem("order")) {
        JSON.parse(localStorage.getItem("order")).map((e) => {
          let myCaesarSalad = new Salad();
          myCaesarSalad.setUuid(e.uuid)
          Object.keys(e.mySalad).map((ing) =>
            myCaesarSalad.add(ing, e.mySalad[ing])
          );
          loadedSalads.push(myCaesarSalad)
        });
        this.setState({salads: loadedSalads})
    }
    
    let groups = [
      this.fetchIngredientList("foundations"),
      this.fetchIngredientList("proteins"),
      this.fetchIngredientList("dressings"),
      this.fetchIngredientList("extras"),
    ];
    let ingredientsArr = []
    let localInventory = {};
    Promise.all(groups).then(group => group.map(ingredients =>{
      ingredients.data.map(ingredient => ingredientsArr.push(this.fetchIngredient(ingredients.group, ingredient))
      )
      Promise.all(ingredientsArr).then(promise => {
        promise.map(info => localInventory[info.ingredient] = info.data)
        this.setState((prevState) => ({
          inventory: {...prevState.inventory, ...localInventory}
        }), () => console.log('updated state inventory'))
      })
      
    }))   
  }


  render() {
    // console.log("this.inventory", this.state.inventory)
    return (
      <div className="container py-4">
        <Header />
        <Navbar />
        {this.renderRouter()}
      </div>
    );
  }

  //<ComposeSalad parentCallback= {this.handleCallback} inventory={inventory} />
  // <Cart order={this.state.salads} />

  renderRouter() {
    //console.log(this.fetchIngredient("Sallad","http://localhost:8080/foundations/"))

    return (
      <Routes>
        <Route path={"/"} element={<Homepage />}></Route>
        <Route
          path={"/compose-salad"}
          element={
            <ComposeSaladWrapper
              parentCallback={this.handleCallback}
              inventory={this.state.inventory}
            />
          }
        ></Route>
        {/* {console.log("här och nu " + this.state.salads)} */}

        <Route
          path={"view-ingredient/:name"}
          element={<ViewIngredient inventory={this.state.inventory} />}
        ></Route>

        <Route
          path={"/my-cart"}
          element={
            <CartWrapper
              parentCallback={this.handleViewCart}
              order={this.state.salads}
            />
          }
        ></Route>

        <Route
          path={"/view-myorder"}
          element={<ViewCart request={this.state.request} />}
        ></Route>
        <Route path={"/*"} element={<PageNotFound />}></Route>
      </Routes>
    );
  }

  renderPageContent() {
    return (
      <>
        <Cart order={this.state.salads} />
        <ComposeSalad
          parentCallback={this.handleCallback}
          inventory={this.state.inventory}
        />
      </>
    );
  }
}

function safeFetchJson(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("${url} returned status ${response.status}");
    }
    return response.json();
  });
}

//   async function safeFetchJson(url) {
//     try {
//         const res = await fetch(url)
//         const data = await res.json()
//         // console.log('hej',data)
//         return data
//       }
//     catch(err) {
//         console.log(err)
//     }
// }

function PageNotFound() {
  return <h1>Page not Found</h1>;
}

function Header() {
  return (
    <header className="pb-3 mb-4 border-bottom">
      <span className="fs-4">Salladsbar</span>
    </header>
  );
}

function Navbar() {
  return (
    <ul className="nav nav-pills">
      <li key="compose" className="nav-item">
        <NavLink className="nav-link" to="/compose-salad">
          Komponera en sallad
        </NavLink>
      </li>

      <li key="order" className="nav-item">
        <NavLink className="nav-link" to="/my-cart">
          Visa beställning
        </NavLink>
      </li>

      <li key="confirm" className="nav-item">
        <NavLink className="nav-link" to="/view-myorder">
          Visa varukorg
        </NavLink>
      </li>
    </ul>
  );
}

function Homepage() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
