import * as _ from "lodash"
import * as React from "react"
import * as moment from "moment"

const years = [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]

enum Level {
    Full,
    Partial
}

export default ({cv}: { cv: Cv }) => {
    let allSkills: _.Dictionary<_.Dictionary<Level>> = {}
    let addExperience = (job: HasDates & HasSkills) => {
        if (job.skills != null) {
            const st = new Date(job.start).getFullYear()
            const en = (job.end ? (new Date(job.end).getFullYear()) : new Date().getFullYear())
            const checkSkills = (level: Level, skills?: Array<string>) => {
                if (!skills) { return }
                for (let skill of skills) {
                    if (!allSkills[skill]) { allSkills[skill] = {} }
                    for (let yr = st; yr <= en; yr++) {
                        // console.log("checking ", yr, "and", skill)
                        if (allSkills[skill][yr] !== Level.Full) {
                            allSkills[skill][yr] = level
                        }
                    }
                }
            }
            checkSkills(Level.Full, job.skills.full)
            checkSkills(Level.Partial, job.skills.partial)

        }
    }
    for (let job of cv.workExperience) { addExperience(job) }
    for (let sp of cv.sideProjects) { addExperience(sp) }
    const skillKeysUnsorted = _.keys(allSkills)
    const skillKeys = _.sortBy(skillKeysUnsorted, (s) => {
        return _.min(_.keys(allSkills[s]))
    })
    const SkillCell = ({level}: { level: Level }) => {
        let skillClassName = "no-skill"
        if (level == Level.Full) { skillClassName = "skill-full" }
        if (level == Level.Partial) { skillClassName = "skill-partial" }
        return (
            <td className={skillClassName}></td>
        )
    }
    let allCategorizedSkills = _.flatten(_.values(cv.skillsOrdering))
    // console.log("all ckills" , allSkills)
    let uncategorizedSkills = _.filter(skillKeys, (sk => !_.includes(allCategorizedSkills, sk)))
    const SkillSection = ({skillName, skillGroup}: {skillName: string, skillGroup:Array<string>}) => {
        const presentSkills = _.filter(skillKeys, (sk => _.includes(skillGroup, sk)))
        if (presentSkills.length === 0) { return <tbody></tbody> }
        return (
            <tbody>
                <tr>
                    <td className="category" colSpan={1 + years.length}>{skillName}</td>
                </tr>
                { presentSkills.map(sk =>
                    <tr key={sk}>
                        <td>{sk}</td>
                        {years.map(yr => <SkillCell key={yr + '-' + sk} level={allSkills[sk][yr]} />)}
                    </tr>
                )}
            </tbody>
        )
    }
    return (
        <table className="skills-table table skills-table table-bordered">
            <thead>
                <tr>
                    <th></th>
                    {years.map(yr => <th key={yr}>{yr}</th>)}
                </tr>
            </thead>
            { _.map(cv.skillsOrdering, (v, k) => <SkillSection key={k} skillName={k || ""} skillGroup={v}/> )}
            { uncategorizedSkills.length > 0 && <SkillSection skillName="other" skillGroup={uncategorizedSkills}/>}
        </table>
    )
}
