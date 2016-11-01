import * as _ from "lodash"
import * as React from "react"
import * as ReactDOM from "react-dom"
import CvSocial from "./social"
import * as CSSModules from 'react-css-modules';
import { styleName } from 'react-css-modules';
const styles = require('./basic.css')

const avatarBase64: string = require("base64-image!../../avatar.jpg") as string

const basic = ({basic}: { basic: Basic }) => {
    return (
        <div className="basic">
        <div className="row">
            <div className="col-md-6">
                <div styleName="avatar"><img src={avatarBase64}/></div>
                <div className="name">
                    {basic.title && <h2>{basic.title}</h2>}
                    <h1>{basic.name}</h1>
                </div>
            </div>
            <div className="col-md-3">
            </div>
            <div className="col-md-3">
                <div className="right">
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
        </div>
    )
}
export default CSSModules(basic, styles)