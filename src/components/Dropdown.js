import { Component } from "react";
import RandomCocktail from "./RandomCocktail";

import CocktailSearch from "./CocktailSearch";

import IngredientSearch from "./IngredientSearch";
import CategoryCocktail from "./CategoryCocktail";
import ListCategories from "./ListCategories";

class Dropdown extends Component {
  render() {
    return (
      <div class="container">
        <div class="wrapper">
          <RandomCocktail />
          <CocktailSearch />
          <IngredientSearch />
          <ListCategories />
          <CategoryCocktail />
        </div>
      </div>
    );
  }
}

export default Dropdown;
