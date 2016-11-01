import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as moment from "moment"
import SkillsTable from "./components/skills"
require("./styles.css")

const cv: Cv = require("!json!yaml!../cv.yaml") as Cv
import CvRoot from "./components/root"

// const cvYamlUrl = "./cv.yaml"
// $.get(cvYamlUrl)
//     .done(rawYaml => {
//         const cv:Cv = YAML.parse(rawYaml) as Cv
ReactDOM.render( <CvRoot cv={cv} />, document.getElementById("root"))
    // })