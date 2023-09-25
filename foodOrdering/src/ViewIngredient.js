import React from "react";
import { useParams } from "react-router-dom";

function ViewIngredient(props) {

    const {name} = useParams();
    let ingredient=props.inventory[name]

    return (
        <div className="row h-200 p-5 bg-light border rounded-10">
        <h1>Information about {name}:</h1>
        {Object.keys(ingredient).map((comp) =>
        
        
        <h2>{comp}: { comp.toString() === "price" ?  (ingredient[comp].toString() + " kr") :  ingredient[comp].toString()}</h2>)
        }</div>
    );
}

export default ViewIngredient;