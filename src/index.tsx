import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as moment from "moment"
import SkillsTable from "./skills"
require("./styles.css")

const cv: Cv = require("!json!yaml!../cv.yaml") as Cv

declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    // ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

const CvSocial = ({social}: { social: Social }) => {
    return (
        <ul>
            {social.linkedIn && <li>{social.linkedIn}</li>}
            {social.facebook && <li>{social.facebook}</li>}
        </ul>
    )
}
const CvWorkSkills = ({skills}: { skills: WorkSkills }) => {
    return (
        <ul className="skills">
            {skills.full && _.map(skills.full, (s, idx) => { <li key={idx}><strong>{s}</strong></li> })}
            {skills.partial && _.map(skills.partial, (s, idx) => { <li key={999 + idx}>{s}</li> })}
        </ul>
    )
}

const CvWork = ({allWork}: { allWork: Array<WorkExperience> }) => {
    return (
        <article id="work" className="work">
            <h1>Work Experience</h1>
            {_.map(allWork, (work, idx) =>
                <section key={idx}>
                    <h2>{work.position}</h2>
                    <h3>
                        {work.company},&nbsp;<em>{work.loc}</em>
                    </h3>
                    <p><DtRng st={work.start} en={work.end} /></p>
                    <ul className="highlights">
                        {_.map(work.highlights, (h, idx) => <li key={idx}>{h}</li>)}
                    </ul>
                    {work.skills && <CvWorkSkills skills={work.skills} />}
                </section>
            )}
        </article>
    )
}

const CvEducation = ({allEdu}: { allEdu: Education[] }) => {
    return (
        <article id="education" className="education">
            <h1>Education</h1>
            {_.map(allEdu, (edu, idx) =>
                <section key={idx}>
                    <h2>{edu.degree}</h2>
                    <h3>{edu.institution}</h3>
                    <p><DtRng st={edu.start} en={edu.end} /></p>
                </section>
            )}
        </article>
    )
}

const CvPublications = ({allPub}: { allPub: Publication[] }) => {
    return (
        <article id="publications" className="publication">
            <h1>Publications</h1>
            {_.map(allPub, (pub, idx) =>
                <section key={idx}>
                    <a href={pub.url}><h2>{pub.name}</h2></a>
                    <a href={pub.url}><p>{pub.description}</p></a>
                </section>
            )}
        </article>
    )
}

const CvCertifications = ({allCerts}: { allCerts: Certification[] }) => {
    return (
        <article id="certifications" className="certification">
            <h1>Certifications</h1>
            {_.map(allCerts, (cert, idx) =>
                <section key={idx}>
                    <h2>{cert.name}</h2>
                    <p><Dt dt={cert.start} /></p>
                </section>
            )}
        </article>
    )
}

const DtRng = ({st, en}: { st: Date, en?: Date }) => {
    return <span className="dateRange"><Dt dt={st} />&nbsp;-&nbsp;{en ? <Dt dt={en} /> : <span>Present</span>}</span>
}
const Dt = ({dt}: { dt: Date }) => {
    return <span className="date">{moment(dt).format("MMMM YYYY")}</span>
}
const CvBasic = ({basic}: { basic: Basic }) => {
    return (
        <div>
            <div className="clearfix">
                <h1>{basic.name}</h1>
                {basic.title && <h2>{basic.title}</h2>}
                <div className="pull-right">
                    <h3>{basic.loc}</h3>
                    {basic.phone && <h3>{basic.phone}</h3>}
                    {basic.email && <h3>{basic.email}</h3>}
                </div>
            </div>
            <hr />
            {basic.passions &&
                <span>
                    passions in life:&nbsp;
                    <ul className="strong comma-sep">
                        {basic.passions.map((s: string) =>
                           <li className="comma-sep" key={s}><strong>{s}</strong></li>
                        )}
                    </ul>
                </span>
            }
            {basic.social && <CvSocial social={basic.social} />}
        </div>
    )
}
// class CvRoot extends React.Component<{cv: Cv}, {} > {
const CvRoot = ({cv}: { cv: Cv }) => {
    return (
        <div className="cv-main " data-spy="scroll" data-target="#navbar">
            <nav id="navbar" className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">CV Navigation</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li><a href="#work">Work Experience</a></li>
                        <li><a href="#education">Education</a></li>
                        <li><a href="#publications">Publications</a></li>
                        <li><a href="#certifications">Certifications</a></li>
                    </ul>
                    <ul className="navbar-right nav navbar-nav">
                        <li><a href="#skills_table">Skills Timeline</a></li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid cv-body">
                <div className="row">
                <div className="col-md-3 ">
                    <div className="afxfix">
                        <CvBasic basic={cv.basic} />
                    </div>
                </div>
                <div className="pull-right col-md-9">
                    <hr />
                    <CvWork allWork={cv.workExperience} />
                    <hr />
                    <CvEducation allEdu={cv.education} />
                    <hr />
                    <CvCertifications allCerts={cv.certifications} />
                    <hr />
                    <CvPublications allPub={cv.publications} />
                    <hr />
                    <div id="skills_table"><SkillsTable cv={cv} /></div>
                </div>
            </div>
            </div>
        </div>
    )
}

// const cvYamlUrl = "./cv.yaml"
// $.get(cvYamlUrl)
//     .done(rawYaml => {
//         const cv:Cv = YAML.parse(rawYaml) as Cv
ReactDOM.render(
    <CvRoot cv={cv} />
    , document.getElementById("root"))
    // })