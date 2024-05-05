import React from "react";
import ToggleTheme from "./ToggleTheme";
import { BsTranslate } from "react-icons/bs";
import { LocaleConsumer } from "../../contexts/LocaleContext";


function Navigation() {

    return (
        <LocaleConsumer>
            {
                ({locale, toggleLocale}) => {
                    return (
                        <nav className="navigation">
                    <ul>
                        <li>
                            <button onClick={toggleLocale}> <BsTranslate /> </button> 
                        </li>
                        <li>
                            <ToggleTheme />
                        </li>
                    </ul>
                </nav>
                    )
                }
            }
        </LocaleConsumer>
        
    )
}



export default Navigation;