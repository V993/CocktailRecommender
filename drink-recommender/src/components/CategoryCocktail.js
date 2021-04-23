import { Component } from "react";
import axios from "axios";

class CategorySearch extends Component {
    constructor (props) {
        super(props);
        this.state = {
            apiData: [],
            category: "",
            found: false,
        };
    }

    handleInputChange = (event) => {
        this.setState({ category: event.target.value});
    };

    handleClick = async () => {
        console.log("undefined");
        alert("Enter your category below!");
    }

    handleSearchClick = async () => {
        let category = this.state.category;
        let API = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category;

        try {
            let response = await axios.get(API);
            this.setState({ apiData: response.data, found: true });
        } catch (error) {
            if (error.response) {
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
                    <td>What would you like?</td>
                </tr>
            );
            return table;
        } else {
            console.log(currData);
            currData.drinks.forEach( (cate) => {
                table.push(
                    <tr>
                        <td>{cate.strDrink}</td>
                    </tr>
                )
            })
            return table;
        }
    };

    render() {
        return (
            <div className="container">
                <div className="containerOverlay">
                    <button className="beeg-button" onClick={ this.handleClick }>
                        <h1 id="title">Find a Cocktail by category:</h1>
                    </button>
                    <br></br>
                </div>
                
                <div className="search">
                    <input className="search-bar"
                        type="text"
                        value={ this.state.city }
                        onChange={ this.handleInputChange }
                        placeholder="Enter category:"
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


export default CategorySearch;