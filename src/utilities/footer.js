import React, { Component } from 'react'

export default class Footer extends Component {
  render() {
    return (
        <div className="row">
            <div className="footer-demo text-center">
                <style>position:relative;</style>
                <p>Designed by <a target="_blank" rel="noopener noreferrer">Karan Yang</a> and <a  target="_blank" rel="noopener noreferrer">Jianang Wang</a>
                <br></br>
                <a href="https://github.com/karanY2019/NewsBiasDetector" target="_blank" rel="noopener noreferrer">Github</a> | <a href="https://aws.amazon.com/terms/" target="_blank" rel="noopener noreferrer"></a> | © 2021</p>
            </div>
        </div>
    )
  }
}