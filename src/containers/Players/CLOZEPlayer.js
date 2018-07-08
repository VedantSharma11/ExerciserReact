import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {addScoreTime} from '../../store/actions/exercises';
import "../../css/CLOZEPlayer.css"
import {SUBMIT_QUESTION, FINISH_EXERCISE} from "../translation";
import {FormattedMessage} from 'react-intl';


class CLOZEPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            title: '',
            question: '',
            cloze: [],
            answers: [],
            userans: [],
            submitted: false,
            finish: false,
            scores: [],
            times: [],
            currentTime: 0,
            intervalID: -1
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            let intervalId = setInterval(this.timer, 1000);
            const {id, title, question, scores, times, answers, clozetext} = this.props.location.state.exercise;

            let userans = answers.map(() => " ");

            let cloze = clozetext.split(' ');

            this.setState({
                ...this.state,
                id: id,
                title: title,
                question: question,
                scores: scores,
                times: times,
                answers: answers,
                userans: userans,
                cloze: cloze,
                intervalId: intervalId
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalID);
    }

    handleChangeAns = e => {
        const index = Number(e.target.name.split('-')[1]);
        const ans = this.state.userans.map((ans, i) => (
            i === index-1 ? e.target.value : ans
        ));
        this.setState({
            ...this.state,
            userans:ans
        },()=>{
            console.log(this.state.userans);
        });
    };

    timer = () => {
        this.setState({currentTime: this.state.currentTime + 1});
    };

    render() {

        let clozetext = this.state.cloze.map((text, i) => {
            if (text[0] === '_' && (text[2] === '_' || text[3] === '_')) {
                let no= text[1];
                if (text[2]!=='_') no= no*10+ text[2];
                return (
                    <input
                        key={`answer-${no}`}
                        className="answers input-ans"
                        name={`answer-${no}`}
                        value={this.state.userans[no-1]}
                        required
                        onChange={this.handleChangeAns}
                    />
                )
            }
            return (
                <span key={`cloze-${i}`}>{text}&nbsp;</span>
            )
        });


        return (
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center">
                    <div className="col-sm-10">
                        <div className="jumbotron">
                            <p className="lead">{this.state.title}</p>
                            <hr className="my-4"/>
                            <p>{this.state.question}</p>
                            <p>
                                {clozetext}
                            </p>
                        </div>
                        <div className="d-flex flex-row-reverse">
                            <div className="justify-content-end">
                                {/*<button*/}
                                {/*onClick={()=>{*/}
                                {/*if(this.state.selected) this.submitQuestion();*/}
                                {/*else if (this.state.submitted) this.nextQuestion();*/}
                                {/*}}*/}
                                {/*className={"btn next-button"}*/}
                                {/*disabled={!this.state.selected && !this.state.submitted}*/}
                                {/*>*/}
                                {/*{buttonText}*/}
                                {/*</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function MapStateToProps(state) {
    return {}
}

export default withRouter(
    connect(MapStateToProps, {addScoreTime})(CLOZEPlayer));
