import { Component } from "react";
import RandomCocktail from "./RandomCocktail";

import CocktailSearch from "./CocktailSearch";

import IngredientSearch from "./IngredientSearch";
import CategoryCocktail from "./CategoryCocktail";
import ListCategories from "./ListCategories";


class Navigation extends Component {

  constructor(props){
    super(props)
    this.state = {
      selected: "random",
    };
    this.chooseRandom = (e) => {this.setState({ selected: "random" })};
    this.chooseCocktailSearch = (e) => {this.setState({ selected: "searchCocktails" })};
    this.chooseIngredientSearch = (e) => {this.setState({ selected: "searchIngredient" })};
    this.chooseGetAllCategories = (e) => {this.setState({ selected: "getIngredients" })};
    this.chooseSearchCategories = (e) => {this.setState({ selected: "searchCategories" })};
  }

  render() {

    const cocktailContent = 
      this.state.selected === "random" ? (
        <div>
          <RandomCocktail />
        </div>
      ) : 
      // check next state
      this.state.selected === "searchCocktails" ? (
        <div>
          <CocktailSearch />
        </div>
      ) : 
      // check next state
      this.state.selected === "searchIngredient" ? (
        <div>
          <IngredientSearch />
        </div>
      ) : 
      // check next state
      this.state.selected === "getIngredients" ? (
        <div>
          <ListCategories />
        </div>
      ) : 
      // check next state      
      this.state.selected === "searchCategories" ? (
        <div>
          <CategoryCocktail />
        </div>
      ) : (<div>Err. Unsupported Extension.</div>)
      
    return (
      <div className="full">
        <div className="navbar">
          <div className="navItem" onClick={this.chooseRandom}>
            <li><h2>Random Cocktail</h2></li>
          </div>
          <div className="navItem" onClick={this.chooseCocktailSearch}>
            <li><h2>Cocktail Search</h2></li>
          </div>
          <div className="navItem" onClick={this.chooseIngredientSearch}>
            <li><h2>Ingredient Search</h2></li>
          </div>
          <div className="navItem" onClick={this.chooseGetAllCategories}>
            <li><h2>All Categories</h2></li>
          </div>
          <div className="navItem" onClick={this.chooseSearchCategories}>
            <li><h2>Cocktail Category Search</h2></li>
          </div>
        </div>
        <div className="cocktails">
          <br></br>
          <br></br>
          {cocktailContent}
        </div>
        
      </div>
      // <div class="container">
      //   <div class="wrapper">
      //     <RandomCocktail />
      //     <CocktailSearch />
      //     <IngredientSearch />
      //     <ListCategories />
      //     <CategoryCocktail />
      //   </div>
      // </div>
    );
  }
}

export default Navigation;
