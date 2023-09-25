function renderSwitch(e) {
  switch (e) {
    case "price":
      return "Pris";
    case "uuid":
      return "Ordernummer";
    case "order":
      return "Antal sallader";
    default:
      return e;
  }
}

function ViewCart(props) {
  var req = props.request;
  

//   console.log("props", Object.keys(req).length);
  if (Object.keys(req).length === 0) {
    if(localStorage.getItem("last salad")) {
      req = JSON.parse(localStorage.getItem("last salad"));
    } else {
      req = []
    }
    
  }

  return (
    <div className="row h-200 p-5 bg-light border rounded-10">
      <h1 className="row h-10 p-10 bg-white alert alert-primary border rounded-10">
        Din varukorg
      </h1>
      <div className="row h-200 p-5 bg-white border rounded-10">
        <h3>Orderbekräftelse</h3>

        {Object.keys(req).map((e, idx) => (
          <p key={idx}>
            {" "}
            <b>{renderSwitch(e)}: </b>
            {e === "order" ? req[e].length : req[e]}{" "}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ViewCart;
