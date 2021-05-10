import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class NavBarHeader extends Component {
  render() {
    return (
     <div className="header wrap">
         <div className="row">
    <div class="ui pointing secondary menu">
        <span><li><a href="/" class="item">Home</a></li></span>
        {/* <span><li><a href="/transcribe"class="item">Transcribe</a></li></span> */}
        {/* <span><li><a href="/polly" class="item">Polly</a></li></span> */}
        <span><li><a href="/comprehend" class="item">Bias Detector</a></li></span>
        {/* <span><li><a href="/rekognition" class="item">Rekognition</a></li></span> */}
        {/* <span><li><a href="/translate" class="item">Translate</a></li></span> */}
    </div>
    </div>
    </div>

    )
  }
}