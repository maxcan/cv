import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import * as moment from "moment"

import SkillsTable from "./skills"
var FontAwesome = require('react-fontawesome') as any

require("./styles.less")

const cv: Cv = require("!json!yaml!../cv.yaml") as Cv

declare var require: {
    <T>(path: string): T
    (paths: string[], callback: (...modules: any[]) => void): void
    // ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
}

const strToId = (s: string) => s.replace(/\s/g, '_').toLowerCase()
// const noBreakStr = (s: string) => String(s.replace(/\s/g, '&nbsp;'))

const CvArticle = ({name, children = null}: { children?: JSX.Element, name: string }) => {
    let noSpace = strToId(name)
    return (
        <article id={noSpace}>
            <div className="row">
                <div className="col-xs-3">
                    <h1 className="text-right">{name}</h1>
                </div>
                <div className="col-xs-9">
                    {children}
                </div>
            </div>
        </article>
    )
}

interface CvArticleSectionProps {
    title: string
    subtitle?: string
    loc?: string
    en?: Date
    st?: Date
    url?: string
    desc?: string
    children?: JSX.Element
}

const CvArticleSection = (props: CvArticleSectionProps) => {
    return (
        <section>
            { props.url
            ? <a href={props.url}><h2>{props.title}</h2></a>
            : <h2>{props.title}</h2>
            }
            {props.subtitle && <h3>{props.subtitle}</h3>}
            <p>
                <DtRng st={props.st} en={props.en} />
                {props.loc && <em className="pxxull-right">,&nbsp;{props.loc}</em>}
            </p>
            { props.desc && <p>{props.desc}</p>}
            {props.children}
        </section>
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
        <CvArticle name="Work Experience">
            {_.map(allWork, (work, idx) =>
                <CvArticleSection key={idx}
                    title={work.position}
                    subtitle={work.company}
                    st={work.start} en={work.end} 
                    loc={work.loc}>
                    <ul className="highlights">
                        {_.map(work.highlights, (h, idx) => <li key={idx}>{h}</li>)}
                    </ul>
                    {work.skills && <CvWorkSkills skills={work.skills} />}
                </CvArticleSection>
            )}
        </CvArticle>
    )
}

const CvEducation = ({allEdu}: { allEdu: Education[] }) => {
    return (
        <CvArticle name="Education">
            {_.map(allEdu, (edu, idx) =>
                <CvArticleSection key={idx}
                    title={edu.degree}
                    subtitle={edu.institution}
                    st={edu.start} en={edu.end}
                >
                </CvArticleSection>
            )}
        </CvArticle>
    )
}

const CvPublications = ({allPub}: { allPub: Publication[] }) => {
    return (
        <CvArticle name="Publications">
            {_.map(allPub, (pub, idx) =>
                <CvArticleSection key={idx}
                    url={pub.url}
                    title={pub.name}
                    desc={pub.description}
                    >
                </CvArticleSection>
            )}
        </CvArticle>
    )
}

const CvCertifications = ({allCerts}: { allCerts: Certification[] }) => {
    return (
        <CvArticle name="Certifications">
            {_.map(allCerts, (cert, idx) =>
                <CvArticleSection key={idx}
                    title={cert.name}
                    en={cert.start}
                    >
                </CvArticleSection>
            )}
        </CvArticle>
    )
}

const DtRng = ({st, en}: { st?: Date, en?: Date }) => {
    if (!st && !en) return <span style={{ display: "none" }}></span>
    if (!st) return <Dt dt={en} />
    return <span className="dateRange"><Dt dt={st} />&nbsp;-&nbsp;{en ? <Dt dt={en} /> : <span>Present</span>}</span>
}
const Dt = ({dt}: { dt: Date }) => {
    return <span className="date">{moment(dt).format("MMMM YYYY")}</span>
}


const CvSocialItem = ({iconName, val, isUrl}: {iconName: string, val?: string, isUrl?:Boolean}) => {
    return ( val ?
        <h3 className="social-item">
            <FontAwesome name={iconName}/>
            { isUrl ? <a href={val} className="social-val no-print-url">{val}</a> : <span className="social-val">{val}</span> }
        </h3>
    : <span></span>
    )
}
const CvSocial = ({social}: { social: Social }) => {
    return (
        <div className="contact social">
            <CvSocialItem val={social.linkedIn} iconName="linkedin-square"/>
            <CvSocialItem val={social.web} iconName="link" isUrl={true}/>
            <CvSocialItem val={social.facebook} iconName="facebook-square"/>
        </div>
    )
}


const CvBasic = ({basic}: { basic: Basic }) => {
    return (
        <div className="basic">
            <h1>{basic.name}</h1>
            {basic.title && <h2>{basic.title}</h2>}
            <div className="contact">
                <CvSocialItem val={basic.loc} iconName="map-marker"/>
                <CvSocialItem val={basic.phone} iconName="phone"/>
                <CvSocialItem val={basic.email} iconName="envelope"/>
                { /*
                <h3>{basic.loc}</h3>
                {basic.phone && <h3><FontAwesome name="phone"/>{basic.phone}</h3>}
                {basic.email && <h3><FontAwesome name="envelope"/>{basic.email}</h3>}
                     */}
            </div>
            {basic.social && <CvSocial social={basic.social} />}
            <hr />
            {basic.passions &&
                <span className="h4">
                    passions in life:&nbsp;
                    <ul className="strong comma-sep">
                        {basic.passions.map((s: string) =>
                            <li className="comma-sep" key={s}><strong>{s}</strong></li>
                        )}
                    </ul>
                </span>
            }
        </div>
    )
}
// class CvRoot extends React.Component<{cv: Cv}, {} > {
const CvRoot = ({cv}: { cv: Cv }) => {
    return (
        <div className="cv-main " >
            <nav id="navbar" className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="row">
                        <ul className="nav navbar-nav">
                            <li><a className="navbar-brand" href="#top">CV Navigation</a></li>
                            <li><a href="#work_experience">Work Experience</a></li>
                            <li><a href="#education">Education</a></li>
                            <li><a href="#publications">Publications</a></li>
                            <li><a href="#certifications">Certifications</a></li>
                        </ul>
                        <ul className="navbar-right nav navbar-nav">
                            <li><a href="#skills_table">Skills Timeline</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="cv-body" data-spy="scroll" data-target="#navbar">
                <div className="container">
                            <div id="top" className="">
                                <CvBasic basic={cv.basic} />
                            </div>
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