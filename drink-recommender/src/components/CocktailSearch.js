import { Component } from "react";
import axios from "axios";

class CocktailSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      found: false,
      cocktailName: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({ cocktailName: event.target.value });
  };

  handleClick = async () => {
    console.log("you've been duped");
    alert("enter cocktail name!");
  };

  handleSearchClick = async () => {
    let cocktailName = this.state.cocktailName;
    let linkToAPI =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
      cocktailName;
    //trying to catch empty strings
    if (cocktailName.length === 0) {
      alert("Please enter a cocktail name");
      this.setState({ found: false });
      return console.error("no input found");
    }

    try {
      let response = await axios.get(linkToAPI);
      this.setState({ apiData: response.data, found: true });
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data); //Not Found
        console.log(error.response.status); //404
      }
    }
  };

  makeTable = () => {
    let currData = this.state.apiData;
    let foundMatch = this.state.found;
    let table = [];
    console.log(currData);
    //found is false when we get 404 error
    if (!foundMatch) {
      table.push(
        <tr key={-3}>
          <td>Discover new cocktails</td>
        </tr>
      );
      return table;
    } else {
      // console.log(currData.drinks[0]);
      let ingredients = [];
      let amounts = [];

      for (const [key, value] of Object.entries(currData.drinks[0])) {
        // console.log(`${key}: ${value}`);
        if (key.includes("strIngredient"))
          if (value != null) ingredients.push(value);

        if (key.includes("strMeasure")) if (value != null) amounts.push(value);
      }

      currData.drinks.forEach((drink) => {
        table.push(
          <tr>
            <td colspan="2">
              <img src={drink.strDrinkThumb + "/preview"} alt={ingredients} />
            </td>
          </tr>
        );

        table.push(
          <tr>
            <td colspan="2">
              {" "}
              <b>{drink.strDrink} </b>{" "}
            </td>
          </tr>
        );

        table.push(
          <tr>
            <td colspan="2">{drink.strInstructions}</td>
          </tr>
        );

        table.push(
          <tr>
            <td>Ingredients:</td>
            <td>Amount:</td>
          </tr>
        );
        let i = 0;
        ingredients.forEach((ingredient) => {
          if (ingredient)
            table.push(
              <tr>
                <td>{ingredient}</td>
                <td>{amounts[i]}</td>
              </tr>
            );
          i++;
        });
      });
      // let name = currData.drinks[0].strDrink;
      // let alcoholic = currData.drinks[0].strAlcoholic;
      // table.push(
      //     <tr>
      //         <td> { name } : { alcoholic } </td>
      //     </tr>

      // )
      return table;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="containerOverlay">
          <button className="beeg-button" onClick={this.handleClick}>
            <h1 id="title"> Search Cocktail by Name : </h1>
          </button>
          <br></br>
        </div>
        <div className="search">
          <input
            type="text"
            value={this.state.cocktailName}
            onChange={this.handleInputChange}
            placeholder="Enter cocktail"
          />

          <button className="search-button" onClick={this.handleSearchClick}>
            Search
          </button>
        </div>
        <br />

        <table id="drink">
          <tbody>{this.makeTable()}</tbody>
        </table>
      </div>
    );
  }
}

export default CocktailSearch;
