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
    for (let job of cv.workExperience) {
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
    const skillKeysUnsorted = _.keys(allSkills)
    const skillKeys = _.sortBy(skillKeysUnsorted, (s) => {
        return _.min(_.keys(allSkills[s]))
    })
    const SkillCell = ({level}: { level: Level }) => {
        let skillClassName = "no-skill"
        if (level == Level.Full) {skillClassName = "skill-full"}
        if (level == Level.Partial) {skillClassName = "skill-partial"}
        return (
            <td className={skillClassName}></td>
        )
    }
    // console.log("all ckills" , allSkills)
    return (
        <table className="skills-table table skills-table table-bordered">
            <thead>
                <tr>
                    <th></th>
                    {years.map(yr => <th key={yr}>{yr}</th>)}
                </tr>
            </thead>
            <tbody>
                {skillKeys.map(s =>
                    <tr key={s}>
                        <td>{s}</td>
                        {years.map(yr => <SkillCell key={yr + '-' + s} level={allSkills[s][yr]} />)}
                    </tr>
                )}
            </tbody>
        </table>
    )
}
