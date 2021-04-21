import { Component } from "react";
import axios from "axios";

class CitySearchAPI extends Component {
    constructor (props) {
        super(props);
        this.state = {
            apiData: [],
            found: false,
        };
    }

    handleInputChange = (event) => {
        this.setState({ city: (event.target.value).toUpperCase() });
    };

    handleSearchClick = async () => {
        let city = this.state.city;
        let linkToAPI = "https://ctp-zip-api.herokuapp.com/city/" + city;

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
        console.log(currData);
        //found is false when we get 404 error
        if (!foundMatch) {
            table.push(
                <tr key={ -3 }>
                    <td>No Results</td>
                </tr>
            );
            return table;
        } else {
            let i = 0;
            currData.forEach(zip => {
                i++;
                table.push(
                    <tr key={ i }>
                        <td>Zipcode { i }: { zip }</td>
                    </tr>
                );
            });
            return table;
        }
    };

    render() {
        return (
            <div className="container">
                <div className="search">
                    <h3>Search by city:</h3>
                    <input
                        type="text"
                        value={ this.state.city }
                        onChange={ this.handleInputChange }
                        placeholder="Enter city"
                    />
                    <button className="search-button" onClick={ this.handleSearchClick }>
                        Search
                    </button>
                </div>

                <table id="data">
                    <tbody>{ this.makeTable() }</tbody>
                </table>
            </div>
        )
    }
}

export default CitySearchAPI;