import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class NavBarHeader extends Component {
  render() {
    return (
     <div className="header wrap">
         <div className="row">
    <div class="ui pointing secondary menu">
        <span><li><a href="/" class="item">Home</a></li></span>
        
        <span><li><a href="/NewsBiasDetector" class="item">Bias Detector</a></li></span>
       
    </div>
    </div>
    </div>

    )
  }
}