import { Component } from "react";
import axios from "axios";

class ListCategories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: [],
      found: false,
    };
  }

  handleSearchClick = async () => {
    let API = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    try {
      let response = await axios.get(API);
      this.setState({ apiData: response.data, found: true });
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data); //Not Found
        console.log(error.response.status); //404
        this.setState({ found: false });
      }
    }
  };

  makeTable = () => {
    let currData = this.state.apiData;
    let foundMatch = this.state.found;
    let table = [];
    //found is false when we get 404 error
    if (!foundMatch) {
      table.push(
        <tr>
          <td>Categories!</td>
        </tr>
      );
      return table;
    } else {
      let i = 0;
      currData.drinks.forEach((cate) => {
        if (cate) {
          let category = currData.drinks[i].strCategory;
          table.push(
            <tr>
              <td>{category}</td>
            </tr>
          );
          i++;
        }
      });
      return table;
    }
  };

  componentDidMount() {
    this.handleSearchClick()
  }

  render() {
    return (
      <div className="">
        <div className="containerOverlay">
          <button className="beeg-button" onClick={this.handleSearchClick}>
            <h1 id="title">All categories of Alcohol : </h1>
          </button>
        </div>
        <br></br>

        <table id="drink">
          <tbody>{this.makeTable()}</tbody>
        </table>
        <br></br>
      </div>
    );
  }
}

export default ListCategories;
