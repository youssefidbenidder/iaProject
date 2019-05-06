import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"form-group my-4"}>
                <h1>
                    Bienvenue
                </h1>
                <Link to={"/text"}>
                    <h3>
                        Analyse sur text
                    </h3>
                </Link>
                <Link to={"/twitter"}>
                    <h3>
                        Analyse sur Twitter
                    </h3>
                </Link>

            </div>
        )
    }

}

export default Home;