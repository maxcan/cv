import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as moment from "moment"
import SkillsTable from "./skills"
require("./styles.css")

const cv:Cv = require("!json!yaml!../cv.yaml") as Cv

declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    // ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

const CvSocial = ({social}: {social: Social}) => {
    return (
        <ul>
            {social.linkedIn && <li>{social.linkedIn}</li>}
            {social.facebook && <li>{social.facebook}</li>}
        </ul>
    )
}
const CvWorkSkills = ({skills}: {skills:WorkSkills}) => {
    return (
        <ul className="skills">
            { skills.full && _.map(skills.full, (s, idx) => { <li key={idx}><strong>{s}</strong></li> })}
            { skills.partial && _.map(skills.partial, (s, idx) => { <li key={999+idx}>{s}</li> })}
        </ul>
    )
}

const CvWork = ({allWork}: {allWork: Array<WorkExperience>}) => {
    return (
        <article id="work" className="work">
            <h1>Work Experience</h1>
            {_.map(allWork, (work, idx) => 
                <section key={idx}>
                    <h2>{work.position}</h2>
                    <h3>
                        {work.company},&nbsp;<em>{work.loc}</em>
                    </h3>
                    <p><DtRng st={work.start} en={work.end}/></p>
                    <ul className="highlights">
                        {_.map(work.highlights, (h, idx) => <li key={idx}>{h}</li> ) }
                    </ul>
                    { work.skills && <CvWorkSkills skills={work.skills}/>}
                </section>
            )}
        </article>
    )
}

const CvEducation = ({allEdu}: {allEdu: Education[]}) => {
    return (
        <article id="education" className="education">
            <h1>Education</h1>
            {_.map(allEdu, (edu, idx) => 
                <section key={idx}>
                    <h2>{edu.degree}</h2>
                    <h3>{edu.institution}</h3>
                    <p><DtRng st={edu.start} en={edu.end}/></p>
                </section>
            )}
        </article>
    )
}

const CvPublications = ({allPub}: {allPub: Publication[]}) => {
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

const CvCertifications = ({allCerts}: {allCerts: Certification[]}) => {
    return (
        <article id="certifications" className="certification">
            <h1>Certifications</h1>
            {_.map(allCerts, (cert, idx) => 
                <section key={idx}>
                    <h2>{cert.name}</h2>
                    <p><Dt dt={cert.start}/></p>
                </section>
            )}
        </article>
    )
}

const DtRng = ({st, en}: {st: Date, en?: Date}) => {
    return <span className="dateRange"><Dt dt={st}/>&nbsp;-&nbsp;{en ? <Dt dt={en}/> : <span>Present</span>}</span>
}
const Dt = ({dt}: {dt: Date}) => {
    return <span className="date">{moment(dt).format("MMMM YYYY")}</span>
}
const CvBasic = ({basic}: {basic: Basic}) => {
    return (
        <header> 
            <h1>{basic.name}</h1>
            { basic.title && <h2>{basic.title}</h2> }
            <h3>{basic.loc}</h3>
            { basic.phone && <h3>{basic.phone}</h3> }
            { basic.email && <h3>{basic.email}</h3> }
            <hr />
            { basic.passions && basic.passions.map((s:string) =>
                <span className="comma-sep" key={s}>{s}</span>
            )}
            { basic.social && <CvSocial social={basic.social}/>}
            <hr />
            <div>{basic.description}</div>
        </header>
    )
}
// class CvRoot extends React.Component<{cv: Cv}, {} > {
const CvRoot = ({cv}: {cv: Cv}) => {
    return (
        <div className="container">
            <CvBasic basic={cv.basic} />
            <hr/>
            <CvWork allWork={cv.workExperience} />
            <hr/>
            <CvEducation allEdu={cv.education} />
            <hr/>
            <CvCertifications allCerts={cv.certifications} />
            <hr/>
            <CvPublications allPub={cv.publications} />
            <hr/>
            <div id="skills_table"><SkillsTable cv={cv}/></div>
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