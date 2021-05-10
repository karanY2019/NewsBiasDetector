import React, {Component} from 'react'
import GitHubButton from 'react-github-btn'
import Footer from '../utilities/footer';
import '../App.css';
//import * as THREE from "three";

class Main extends Component {

    render() {
        return(<div className="container">
                    <div className="bg-pattern"></div>
                    <div className="hero">
                        <div className="row">
                            <div className="col-xs-3 offset-1">
                            
                            </div>
                            <div className="col-xs-4 offset-1">
                                    <h1>Bias Detector Demo</h1>
                                   
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xs-12">
                        <div className="row flex-container">
                            
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">News Bias Detector</h5>
                                    <div class="bar">
                                        <div class="emptybar"></div>
                                        <div class="filledbar"></div>
                                    </div>
                                    <br></br>
                                    <a href="/NewsBiasDetector" className="btn btn-info">Dashboard</a>
                                </div>
                            </div>
                            
                        </div>
                       
                    </div>       
                    <div className="footer text-center">
                        <Footer></Footer>
                    </div>
                            
        </div>)
    }
}
export default Main