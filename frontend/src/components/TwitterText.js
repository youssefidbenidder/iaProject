import React, {Component} from "react";
import axios from "axios";

class TwitterText extends Component {

    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: "50%"
            },
            sentimentValue: 0,
            textInput: "GameOfThrones",
            modeAnalyse:"user"
        };
        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        this.getTextInput()
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    getTextInput = () => {
        const {textInput , modeAnalyse} = this.state;
        console.log(textInput , modeAnalyse);
        axios
            .post("http://localhost:8000/analytics/twitter", {text: textInput , mode : modeAnalyse}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
        this.setState({
                    sentimentValue: res.data.sentiment.toFixed(0),
                    style : {
                        width: res.data.sentiment.toFixed(0)+"%"
                    }
                })
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className={"form-group my-4"}>
                <h1 align="center">Extrayez des informations du réseau social "Twitter"</h1>
                <p className={"text-center mb-1"}>
                    Utilisez la démo ci-dessous pour expérimenter l'Analyse de texte.</p>
                <p className={"text-center mb-1"}> Détectez le sentiment de l'utilisateur ou bien le Keyword en cliquant sur</p>
                <p className={"text-center"}>
                    « Analyser ».
                </p>
                <h4>Choisir le mode de recherche</h4>
                <select onChange={this.onChange} name={"modeAnalyse"}>
                    <option value={"user"}>Utilisateur</option>
                    <option value={"keyword"}>Keyword</option>
                </select>
                <div className={"form-inline"}>
                    <input className={"form-control my-4 mr-4"} value={this.state.textInput} onChange={this.onChange} name={"textInput"}/>
                    <button type="submit" className="btn btn-primary" onClick={() => this.getTextInput()}>Analyser</button>
                </div>
                <div className="progress">
                    {
                        this.state.sentimentValue >= 50 ?
                            <div className="progress-bar bg-success" role="progressbar" style={this.state.style}
                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.sentimentValue+"%"}
                    </div> :
                            <div className="progress-bar bg-danger" role="progressbar" style={this.state.style}
                         aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{this.state.sentimentValue+"%"}
                    </div>
                    }
                </div>

            </div>
        )
    }
}

export default TwitterText;