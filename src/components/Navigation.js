import RandomCocktail from "./RandomCocktail";
import CocktailSearch from "./CocktailSearch";
import IngredientSearch from "./IngredientSearch";
import CategoryCocktail from "./CategoryCocktail";
import ListCategories from "./ListCategories";

import { Component } from 'react';

class Navigation extends Component {

  constructor(props){
    super(props)
    this.state = {
      selected: "random",
      width: 0
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.chooseRandom = (e) => {this.setState({ selected: "random" })};
    this.chooseCocktailSearch = (e) => {this.setState({ selected: "searchCocktails" })};
    this.chooseIngredientSearch = (e) => {this.setState({ selected: "searchIngredient" })};
    this.chooseGetAllCategories = (e) => {this.setState({ selected: "getIngredients" })};
    this.chooseSearchCategories = (e) => {this.setState({ selected: "searchCategories" })};

    
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {

    const cocktailContent = 
      <div className="center">
        {
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
        }                                     
      </div>
    
    let width = this.state.width
    if (width > 800) {
      return (
        <div className="full">
          <div className="navbar">
            <div className="navItem" onClick={this.chooseRandom}>
              <li id="beegLetter">Random Cocktail</li>
            </div>
            <div className="navItem" onClick={this.chooseCocktailSearch}>
              <li id="beegLetter">Cocktail Search</li>
            </div>
            <div className="navItem" onClick={this.chooseIngredientSearch}>
              <li id="beegLetter">Ingredient Search</li>
            </div>
            <div className="navItem" onClick={this.chooseGetAllCategories}>
              <li id="beegLetter">All Categories</li>
            </div>
            <div className="navItem" onClick={this.chooseSearchCategories}>
              <li id="beegLetter">Cocktail Category Search</li>
            </div>
          </div>
          <div className="cocktails">
            <br></br>
            <br></br>
            {cocktailContent}
          </div>
        </div>
      );
    } else {
      return(
        <div class="container">
          <div class="wrapper">
            <RandomCocktail />
            <CocktailSearch />
            <IngredientSearch />
            <ListCategories />
            <CategoryCocktail />
          </div>
        </div>
      )
    }
  }
}

export default Navigation;
