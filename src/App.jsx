import React, { useState } from "react";
import "./App.css";
import List from "./List";

function App() {
  const [currentItem, setCurrentItem] = useState("");
  const [itemList, setItemList] = useState([]);

  function setvalue(e) {
    setCurrentItem(e.target.value);
    //console.log(e.target.value);
  }
  function addItem() {
    setItemList([...itemList, { item: currentItem, key: Date.now() }]);
    // console.log(itemList);
    setCurrentItem("");
  }
  function handle(e) {
    e.preventDefault();
  }
  return (
    <div className="App" on onSubmit={handle}>
      <header className="App-header">
        <div className="Wrapper">
          <div className="Input_wrapper">
            <input value={currentItem} onChange={setvalue}  placeholder="Add Items"/>
            <button onClick={addItem} disabled={currentItem.length === 0}>Add</button>
          </div>
          <List itemList={itemList} setItemList={setItemList} />
        </div>
      </header>
    </div>
  );
}

export default App;
