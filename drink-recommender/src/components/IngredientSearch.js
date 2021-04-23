import { Component } from "react";
import axios from "axios";

class IngredientSearch extends Component {
    constructor (props) {
        super(props);
        this.state = {
            apiData: [],
            ingredient: "",
            found: false,
        };
    }

    handleInputChange = (event) => {
        this.setState({ ingredient: event.target.value});
    };

    handleClick = async () => {
        console.log("you've been duped");
        alert("enter your ingredient below!");
    }

    handleSearchClick = async () => {
        let ingredient = this.state.ingredient;
        let linkToAPI = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient;

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
                this.setState({ found: false });
            }
        }
    };

    makeTable = () => {
        let currData = this.state.apiData;
        let foundMatch = this.state.found;
        let table = [];
        //found is false when we get 404 error or do not find a match
        if (!foundMatch) {
            table.push(
                <tr key={ -3 }>
                    <td>Discover your inner alcoholism!</td>
                </tr>
            );
            return table;
        } else {
            console.log(currData);
            if (currData.length > 0) {
                currData.drinks.forEach( (drink) => {
                    table.push(
                        <tr>
                            <td>{drink.strDrink}</td>
                        </tr>
                    )
                })
                return table;    
            }
        }
    };

    render() {
        return (
            <div className="container">
                <div className="containerOverlay">
                    <button className="beeg-button" onClick={ this.handleClick }>
                        <h1 id="title">Find a Cocktail by ingredient:</h1>
                    </button>
                    <br></br>
                </div>
                
                <div className="search">
                    <input className="search-bar"
                        type="text"
                        value={ this.state.city }
                        onChange={ this.handleInputChange }
                        placeholder="Enter ingredient:"
                    />
                    <button className="search-button" onClick={ this.handleSearchClick }>
                        Search
                    </button>
                </div>

                <table id="drink">
                    <tbody>{ this.makeTable() }</tbody>
                </table>
            </div>
        )
    }
}


export default IngredientSearch;