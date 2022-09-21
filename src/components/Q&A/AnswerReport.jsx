import React from "react";
import ReactDOM from "react-dom";
import { API_KEY } from "../../config/config.js";
import {handleInteractions} from '../../utils.js';
const axios = require("axios");

class AnswerReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAns: this.props.ansObj,
    };
    this.handleReport = this.handleReport.bind(this);
  }

  handleReport(e) {
    var temp = parseInt(this.state.currentAns.answer_id);
    axios
      .put(
        `http://3.83.131.32:8080/qa/answers/${temp}/report`,
        {}
      )
      .then((res) => {
        console.log(res);
        handleInteractions(e, 'Q&A');
      })
      .catch((err) => {
        console.log(err);
      });
    var tempObj = this.state.currentAns;
    tempObj.reported = true;
    this.setState({ currentAns: tempObj });
    }

  render() {
    let reportButton;
    if (this.state.currentAns.reported) {
      reportButton = <span>Reported</span>;
    } else {
      reportButton = (
        <button id='ans-report' onClick={(e) => this.handleReport(e)}> Report? </button>
      );
    }
    return <span>{reportButton}</span>;
  }
}

export default AnswerReport;
