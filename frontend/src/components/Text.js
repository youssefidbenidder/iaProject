import React, {Component} from "react";
import axios from "axios";

class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: "90%",
            },
            sentimentValue: 90,
            lang: "en",
            textInput: "I had a wonderful trip to Seattle and enjoyed seeing the Space Needle!"
        };
        this.onChange = this.onChange.bind(this)
    }

    onChange(event) {
        this.setState({textInput: event.target.value});
    }

    getTextInput = () => {
        const {textInput} = this.state;
        console.log(textInput);
        axios
            .post("http://localhost:8000/analytics/text", {text: textInput}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                this.setState({
                    lang: res.data.lang,
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
                <h1 align="center">Extrayez des informations de votre texte</h1>
                <p className={"text-center mb-1"}>
                    Utilisez la démo ci-dessous pour expérimenter l'Analyse de texte.</p>
                <p className={"text-center mb-1"}> Détectez la langue, le sentimentde votre texte en cliquant sur</p>
                <p className={"text-center"}>
                    « Analyser ».
                </p>
                <div className={"row"}>
                    <div className={"col-6"}>
                        <textarea value={this.state.textInput} className={"form-control my-4 areatext"} rows={"12"}
                                  onChange={this.onChange}/>
                        <button onClick={() => this.getTextInput()} className={"btn btn-success col-12"}>Analyser
                        </button>
                    </div>
                    <div className={"card col-6 my-4"}>
                        <div className={"my-3"}><span className={"mt-4 text"}>Text analysé</span></div>
                        <div>
                            <table className={"container"}>
                                <tbody>
                                <tr className={"tr-border row my-4 py-4"}>
                                    <th className={"col-3"}>Langues :</th>
                                    <td className={"col-6"}>{this.state.lang}</td>
                                </tr>
                                <tr className={"tr-border row my-4 py-4"}>
                                    <th className={"col-3"}>SENTIMENT :</th>
                                    <td className={"col-6"}>
                                        <div className="progress">
                                            {
                                                this.state.sentimentValue >= 50 ?
                                                    <div
                                                className="progress-bar bg-danger" role="progressbar"
                                                 style={this.state.style}
                                                 aria-valuenow="25" aria-valuemin="0"
                                                 aria-valuemax="100">{this.state.sentimentValue+"%"}
                                            </div> :
                                                    <div
                                                className="progress-bar bg-success" role="progressbar"
                                                 style={this.state.style}
                                                 aria-valuenow="25" aria-valuemin="0"
                                                 aria-valuemax="100">{this.state.sentimentValue+"%"}
                                            </div>
                                            }

                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Text;