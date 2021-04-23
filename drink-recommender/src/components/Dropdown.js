import { Component } from "react";
import RandomCocktail from "./RandomCocktail"
import CocktailSearch from "./CocktailSearch"


class Dropdown extends Component {
    render() {
        return (
            <div class="container">
                <div class="wrapper">
                    <RandomCocktail />
                    <CocktailSearch />

                </div>
            </div>
        )
    }
}

export default Dropdown;