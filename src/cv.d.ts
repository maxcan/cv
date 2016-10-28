
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
    facebook?: string
}
interface WorkSkills {
    full?: Array<string>
    partial?: Array<string>
}
interface WorkExperience {
    position: string
    _icOrMgr: string // should be const mgr | ic
    company: string
    start: Date
    end?:  Date
    loc:   string
    highlights: Array<string>
    skills?: WorkSkills
}

interface Education {
    institution:  string
    degree:       string
    start:        Date
    end?:         Date
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
    education: Array<Education>
    certifications?: Array<Certification>
    publications?: Array<Publication>
}