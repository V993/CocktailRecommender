import { Component } from "react";
import RandomCocktail from "./RandomCocktail"
import IngredientSearch from "./IngredientSearch"


class Dropdown extends Component {
    render() {
        return(
            <div class="container">
                <div class="wrapper">
                    <RandomCocktail />
                    <IngredientSearch />
                </div>
            </div>
        )
    }
}

export default Dropdown;