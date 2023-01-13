import { useState } from "react";
import { items } from "./data";

/*
 *App() - Initial functional component
 *@author Ajna Cancar <ajna.cancar2019@size.ba>
 */
function App() {
  //Use state for items
  const [Items, setItems] = useState(items);

  //Initial state for display form after click
  const [loadForm, setLoadForm] = useState(false);

  //Index of first item in form
  const [firstItem, setFirstItem] = useState(0);

  //Index of second item in form
  const [secondItem, setSecondItem] = useState(1);

  //State for store value from first input field
  const [firstValue, setFirstValue] = useState(0);

  //State for store value from first input field
  const [secondValue, setSecondValue] = useState(0);

  /*
   * subitScore function - after submit form with values there is changes in table
   * @author Ajna Cancar <ajna.cancar2019@size.ba>
   * @param - e (event) for prevet the default behavior after submitting forms
   * @return - no return value
   */
  const submitScore = (e) => {
    e.preventDefault();

    //Use temp variable for storage items
    let tempItems = Items;

    //Variable to store position of higer value
    let higherValue = null;

    /*
      * Compare values from input fields 
      * parseInt function - get Int value from string value

      * After comparing the values, index of higher value stores in variable
    */
    if (parseInt(firstValue) > parseInt(secondValue)) {
      higherValue = firstItem;
    } else if (parseInt(firstValue) < parseInt(secondValue)) {
      higherValue = secondItem;
    }
    /*
     * If position of higherValue exists, then map Items array and update score of items on that position
     * Beacuse on the end I sort array, I compare position of element insted of index
     *
     */
    if (higherValue !== null) {
      tempItems = Items.map((item) => {
        if (item.position === higherValue + 1) {
          item.score += 1;
        }

        return item;
      });
    }

    /**
     *If values from inputs fields are not the same, than go to next item pair
     *
     */
    if (higherValue !== null) {
      //If index of first value lower then 5, then update index of first item in form
      if (firstItem < 5) {
        if (firstItem + 1 === secondItem && secondItem < 5) {
          setFirstItem(firstItem + 2); //This is update for two because there is no need to compare values on same positions
        } else {
          setFirstItem(firstItem + 1);
        }
      }

      //When is index of first item 5 (last in array), then reset index of first item and update index of second item in form
      if (firstItem === 5) {
        setFirstItem(0);
        if (secondItem < 5) {
          setSecondItem(secondItem + 1);
        }
      }

      //After every submit - reset inputs value in form
      setFirstValue(0);
      setSecondValue(0);
    }

    //Set updated items array, so chages can be displayed in table
    setItems([...tempItems].sort((a, b) => b.score - a.score)); // Also sort array based on score value
  };

  return (
    <div className="container">
      <div>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Items.map((item) => (
              <tr key={item.position}>
                <td>{item.position}</td>
                <td> {item.name} </td>
                <td> {item.score} </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loadForm && (
          <button className="start-button" onClick={() => setLoadForm(true)}>
            Start
          </button>
        )}

        {loadForm && (
          <div className="form-container">
            <form onSubmit={submitScore}>
              <label>{items[firstItem].name}</label>
              <input
                value={firstValue}
                onChange={(e) => setFirstValue(e.target.value)}
                type="number"
                pattern="[0-9]"
              />
              <label>{items[secondItem].name}</label>
              <input
                value={secondValue}
                onChange={(e) => setSecondValue(e.target.value)}
                type="number"
                pattern="[0-9]"
              />

              <input
                type="submit"
                disabled={firstItem === 5 && secondItem === 5}
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
