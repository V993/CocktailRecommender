import { Component } from "react";
import SearchAPI from "./SearchAPI"

class Dropdown extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        /**********************************************************/
        var acc = document.getElementsByTagName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                console.log(acc[i]);
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
        /**********************************************************/
        return(
            <div id="body">
                <button id="accordion">Random Cocktail Generator:</button>
                <div class="panel">
                    <p>Lorem ipsum...</p>
                </div>

                <button class="accordion">Cocktail by Liquor:</button>
                <div class="panel">
                    <p>Lorem ipsum...</p>
                </div>

                <button class="accordion">Another option:</button>
                <div class="panel">
                    <p>Lorem ipsum...</p>
                </div>
            </div>
        )
    }

}

export default Dropdown;