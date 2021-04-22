import { Component } from "react";
import axios from "axios";

class RandomCocktail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            apiData: [],
            found: false,
        };
    }

    handleSearchClick = async () => {
        let linkToAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
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
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(
                <tr>
                    <td>Become an alcoholic!</td>
                </tr>
            );
            return table;
        } else {
            console.log(currData.drinks[0]);
            console.log(currData.drinks[0].strDrink);
            let name = currData.drinks[0].strDrink;
            let alcoholic = currData.drinks[0].strAlcoholic;
            let instructions = currData.drinks[0].strInstructions;
            let ingredients = []
           
            for (const [key, value] of Object.entries(currData.drinks[0])) {
                // console.log(`${key}: ${value}`);
                if (key.includes("strIngredient"))
                    if(value != null)
                        ingredients.push(value);
            }

            console.log(ingredients);

            table.push(
                <tr>
                    <td id="cell">{name} ({alcoholic})</td>
                </tr>
            );
            table.push(
                <tr>
                    <td>{instructions}</td>
                </tr>
            )
            ingredients.forEach(ingredient => {
                if (ingredient)
                table.push(
                    <tr>
                        <td>{ingredient}</td>
                    </tr>
                )
                
            });
            return table;
        }
    };

    render() {
        return (
            <div className="container">
                <div className="search">
                    <button className="beeg-button" onClick={ this.handleSearchClick }>
                        <h1 id="title">Random Cocktail Generator</h1>
                    </button>
                </div>
                <br></br>

                <table id="drink">
                    <tbody>{ this.makeTable() }</tbody>
                </table>
            </div>
        )
    }
}

export default RandomCocktail;