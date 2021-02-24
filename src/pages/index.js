import React from "react"
import { navigate } from "gatsby"

import "./styles.scss"

export default () => {
  // navigate("/blog")
  return (
    <>
      {/* Hello world!
      <p>
        <Link to="/blog">View Blog</Link>
        <p>
          <Link to="/account">My Account</Link>
        </p>
      </p> */}
      <div className="row">
        <div class="column">hello</div>
        <div class="column">world</div>
      </div>
    </>
  )
}
