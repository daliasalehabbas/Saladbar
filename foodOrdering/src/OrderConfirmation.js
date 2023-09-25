function OrderConfirmation(props) {
  // console.log(props);
  return (
    <div
      key={`myKey-${props.idx}`}
      className="row h-3 p-2 bg-white border rounded-3"
    > 
      {Object.keys(props.name.mySalad).map((item) => " " + item + ", ")}
      {"pris: " + props.name.getPrice()} kr

    {/* {Object.keys(props.name.mySalad.my).map((item) => console.log("item",item))} */}
      
    </div>
  );
}

export default OrderConfirmation;
