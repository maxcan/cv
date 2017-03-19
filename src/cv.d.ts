
interface Basic {
    name: string
    title?: string
    loc: string
    phone?: string
    email?: string
    social: Social
    passions?: Array<string>
    description: string
}

interface Social {
    linkedIn?: string
    web?: string
    facebook?: string
}
interface WorkSkills {
    full?: Array<string>
    partial?: Array<string>
}

interface HasSkills { skills?: WorkSkills }
interface HasDates { start: Date; end?: Date}

interface SideProject extends HasSkills, HasDates {
    name: string
    url?: string
}

interface WorkExperience extends HasSkills, HasDates {
    position: string
    numReports?: number
    company: string
    loc:   string
    highlights: Array<string>
}

interface Education extends HasDates {
    institution:  string
    degree:       string
}

interface Certification {
    name: string
    start?: Date
}

interface Publication {
    name?: string
    description?: string
    url?: string
}
interface Cv {
    basic: Basic
    workExperience: Array<WorkExperience>
    sideProjects: Array<SideProject>
    education: Array<Education>
    certifications?: Array<Certification>
    publications?: Array<Publication>
    skillsOrdering: _.Dictionary<Array<string>>
}