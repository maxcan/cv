import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"

export default ({social}: { social: Social }) => {
    return (
        <ul>
            {social.linkedIn && <li>{social.linkedIn}</li>}
            {social.facebook && <li>{social.facebook}</li>}
        </ul>
    )
}