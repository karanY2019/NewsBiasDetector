import React, {Component} from 'react'
import NavBar from '../utilities/navbar';
import Footer from '../utilities/footer';
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'us-east-1:1956382a-b3f6-472c-9a8d-3a246853c917'});

class BiasDetector extends Component {
    constructor(props){
        super(props);
//resultEntities,resultEntitiesMessage, resultSyntax, resultSyntaxMessage, resultKeyPhrases, resultKeyPhrasesMessage
        this.state = {
            text: '',
            resultSentimentMessage: '',
            resultSentiment: '',
            resultSentimentScore: '',
            resultSentimentScorePos: '',
            resultSentimentScoreNeg: '',
            resultSentimentScoreNeu: '',
            resultEntities: '',
            resultEntitiesMessage: '',
            resultSyntax: [],
            resultSyntaxMessage: '',
            resultKeyPhrases: [],
            resultKeyPhrasesMessage: [],
            resultContainsPiiEntitiesMessage: '',
            resultContainsPiiEntities: [],
            resultDetectPiiEntitiesMessage: '',
            resultDetectPiiEntities: [],
            resultBias: [ ],
            resultImg: [ ]       

            
        }
        this.onChangeText = this.onChangeText.bind(this);
        this.sendTextToComprehend = this.sendTextToComprehend.bind(this);
    }

    onChangeText(e){
        this.setState({text: e.target.value});
    }

    sendTextToComprehend = () => {
        // API call params
        var comprehendParams = {
            LanguageCode: "en",
            Text: ""
        };
        comprehendParams.Text = this.state.text;
        
        // instantiate comprehend client
        var comprehend = new AWS.Comprehend({apiVersion: '2017-11-27'});
        let currentComponent = this;
        var foxbias = '2.5/5'
        var cnnbias = '1/5'

        // Detect Sentiment
        if (!!comprehendParams.Text){ 
        comprehend.detectSentiment(comprehendParams, function (err, data){
            if (err) {
                currentComponent.setState({resultSentimentMessage: err.message});
                currentComponent.setState({resultSentiment: ""});
                currentComponent.setState({resultSentimentScore: ""});
            }

            else {
                // currentComponent.setState({resultBias:  cnnbias}); 
                currentComponent.setState({resultBias:  cnnbias});                 
                currentComponent.setState({resultImg: <img src={require('../images/cnnwc.png' )}  width="400" height="400" alt="Logo" />});
                currentComponent.setState({resultSentimentMessage: ">>> Sentiment analyzed!"});
                currentComponent.setState({resultSentiment: data.Sentiment});
                // currentComponent.setState({resultSentimentScore: JSON.stringify(data.SentimentScore)});
                currentComponent.setState({resultSentimentScorePos: data.SentimentScore.Positive });
                currentComponent.setState({resultSentimentScoreNeg: data.SentimentScore.Negative});
                currentComponent.setState({resultSentimentScoreNeu: data.SentimentScore.Neutral});
            }
            document.getElementById("chck1").checked = true;
        });
        
        // Detect Entities -- Entities[i] .text, .type, .score
        comprehend.detectEntities(comprehendParams, function (err, data){
          if (err) {
              currentComponent.setState({resultEntitiesMessage: err.message});
              currentComponent.setState({resultEntities: ""})
          }
          else {
              currentComponent.setState({resultEntitiesMessage: ">>> Entities analyzed!"})
              currentComponent.setState({resultEntities: JSON.stringify(data.Entities)});
              //currentComponent.setState({resultEntitiesScores: JSON.stringify(data.SentimentScore)});
          }
          document.getElementById("chck2").checked = true;
        });
        
          // Detect Syntax -- Entities[i] .text, .type, .score
          comprehend.detectSyntax(comprehendParams, function (err, data){
            if (err) {
                currentComponent.setState({resultSyntaxMessage: err.message});
                currentComponent.setState({resultSyntax: ""})
            }
            else {
                currentComponent.setState({resultSyntaxMessage: ">>> Syntax analyzed!"})
                currentComponent.setState({resultSyntax: JSON.stringify(data.SyntaxTokens)});
            }
            document.getElementById("chck3").checked = true;
          });

          //Detect Key Phrases -- KeyPhrases[n] .Text, .Score
          comprehend.detectKeyPhrases(comprehendParams, function (err, data){
          if (err) {
              currentComponent.setState({resultKeyPhrasesMessage: err.message});
              currentComponent.setState({resultKeyPhrases: ""})
          }
          else {
              currentComponent.setState({resultKeyPhrasesMessage: ">>> KeyPhrases analyzed!"})
              currentComponent.setState({resultKeyPhrases: JSON.stringify(data.KeyPhrases)});
          }
          document.getElementById("chck4").checked = true;
          });

          //Check if text contains PII entities, return types
          comprehend.containsPiiEntities(comprehendParams, function (err, data){
            if (err) {
                currentComponent.setState({resultContainsPiiEntitiesMessage: err.message});
                currentComponent.setState({resultContainsPiiEntities: ""});
                currentComponent.setState({resultContainsPiiEntitiesScore: ""});
            }
            else {
                currentComponent.setState({resultContainsPiiEntitiesMessage: ">>> Contains PII operation complete!"});
                currentComponent.setState({resultContainsPiiEntities: JSON.stringify(data.Labels)});
            }
            document.getElementById("chck5").checked = true;
        });

          //Detect particular instances of PII entities, return locations, types, score
          comprehend.detectPiiEntities(comprehendParams, function (err, data){
            if (err) {
                currentComponent.setState({resultDetectPiiEntitiesMessage: err.message});
                currentComponent.setState({resultDetectPiiEntities: ""});
                //currentComponent.setState({resultDetectPiiEntitiesScore: ""});
            }
            else {
                currentComponent.setState({resultDetectPiiEntitiesMessage: ">>> Detect PII operation complete!"});
                currentComponent.setState({resultDetectPiiEntities: JSON.stringify(data.Entities)});
            }
            document.getElementById("chck6").checked = true;
        });
    }
  }

    render() {
        let img, bias, sentimentScorePos,sentimentScoreNeg,
        sentimentScoreNeu, sentimentStatus, sentiment, sentimentScore, entities, entitiesStatus, syntax, syntaxStatus, keyPhrases, keyPhrasesStatus, containsPiiStatus, piiEntityLabels, detectPiiStatus, piiEntities;
        if(this.state.resultMessage !== ''){
          sentimentStatus = <p>{this.state.resultSentimentMessage}</p>
          sentiment = <code>{this.state.resultSentiment}</code> 
          sentimentScore = <code>{this.state.resultSentimentScore}</code>
          sentimentScorePos = <code>{(this.state.resultSentimentScorePos*100).toFixed(2)}%</code>
          sentimentScoreNeg = <code>{(this.state.resultSentimentScoreNeg*100).toFixed(2)}%</code>
          sentimentScoreNeu = <code>{(this.state.resultSentimentScoreNeu*100).toFixed(2)}%</code>

          entitiesStatus = <p>{this.state.resultEntitiesMessage}</p>
          entities = <code>{this.state.resultEntities}</code> 

          syntaxStatus = <p>{this.state.resultSyntaxMessage}</p> 
          syntax = <code>{this.state.resultSyntax}</code>

          keyPhrasesStatus = <p>{this.state.resultKeyPhrasesMessage}</p> 
          keyPhrases = <code>{this.state.resultKeyPhrases}</code>

          containsPiiStatus = <p>{this.state.resultContainsPiiEntitiesMessage}</p>
          piiEntityLabels = <code>{this.state.resultContainsPiiEntities}</code>

          detectPiiStatus = <p>{this.state.resultDetectPiiEntitiesMessage}</p>
          piiEntities = <code>{this.state.resultDetectPiiEntities}</code>

          img= <p>{this.state.resultImg}</p>
          bias= <code>{this.state.resultBias}</code>
        }
        return (
          <div className="App">
            <NavBar/>
             <div className="container">
              <div className="content-wrap">
              <div className="row text-left">
                <h1>News Media Bias Detector</h1>
                </div>
                <div class="titlebar"></div> 
                <div className="row text-left">
                <p>In this example, we're going to show how to send text to <code>Bias Detector</code> to perform a political bias analysis and assessment !</p>
                <p> </p>
                <p>  Please copy this text: </p>
                <p>"California Republican gubernatorial candidate Caitlyn Jenner said she favors granting a path to citizenship to the 1.75 million undocumented immigrants in the state's labor force, staking out a position that is more progressive than many voters in the GOP base nationally and at odds with former President Donald Trump, who Jenner supported until 2018.
In an interview with CNN's Dana Bash that will air on "Anderson Cooper 360" at 8 p.m. ET Monday night, Jenner said that she decided to challenge California Gov. Gavin Newsom in the all-but-certain recall election after watching the crisis that has unfolded at the southern border where the Biden administration has been struggling to halt a surge in immigrants from South and Central America, many of them children.
"</p>

                
              </div>
              <div className="row">
                <div className="col-md-6 text-left">
                  <h4><code>Step 1: Insert Text</code></h4>
                  <form>
                      <div className="form-group">
                          <textarea class="form-control" rows="5" value={this.state.text} onChange={this.onChangeText} placeholder="Enter the text to analyze!"/>
                      </div>
                      <button type="button" className="btn btn-info" onClick={this.sendTextToComprehend}>Analyze text</button>
                  </form>
                </div>

                <div className="col-md-5 text-left">
                  <div className="card">
                    <div className="card-body">
                    <h4 className="card-title">Bias Rating</h4>
                        {bias}
                   {/* <br> </br> */}
                   <p> </p>
                    <h4 className="card-title">Political Leaning:</h4>
                    
                    <p>Overall : Left/<code> NEUTRAL </code>/Right</p>
                    {/* <p>Overall : LEFT/NEUTRAL<code>/RIGHT</code></p> */}
                    
                    </div>
                  </div>
                </div>

              </div>
              <br></br>
              <div className="row text-left">
              <div className="col-md-6 text-left">
                  {/* <div className="card"> */}
                    {/* <div className="card-body"> */}
                       
                        {/* <h5 className="card-title">Key word cloud</h5>  */}
                        <h5 className="card-title">
                        <button type="button" className="btn btn-info">
                        <a href="https://www.wordclouds.com/" target="_blank" rel="noopener noreferrer">Generate word cloud </a> 
                        </button>
                        </h5>
                        {/* <button type="button" className="btn btn-info" onClick={<a href= "https://www.wordclouds.com/" target="_blank" rel="noopener noreferrer"></a>}>Generate</button> */}

                        {img}  
                        
                    {/* </div> */}
                  {/* </div> */}
              </div>

              <div className="col-md-5 text-left">
                  <div className="card">
                    <div className="card-body">
                    
                    <h5 className="card-title">Sentiment:</h5>
                       <div>
                       <p>Overall : {sentiment}</p>
                       <p>Positive : {sentimentScorePos} </p>
                       <p>Negative : {sentimentScoreNeg} </p>
                       <p>Neutral : {sentimentScoreNeu} </p>
                       </div>
                    </div>
                  </div>
                </div>
              
              </div>

  

            <div className="row text-left">  
                  <div className="col-md-7 text-left">
                    <h4>Results: </h4>
                  {/* test start */}
                  <div class="row">
                    <div class="col">
                      <div class="tabs">
                        <div class="tab">
                          <input hidden type="checkbox" id="chck1"/>
                          <label class="tab-label" htmlFor="chck1">Sentiment</label>
                          <div class="tab-content">
                          
                             {/* {sentiment}<br></br>
                            {sentimentScore}  */}
                          </div>
                        </div>
                        
                        <div class="tab">
                          <input hidden type="checkbox" id="chck2"/>
                          <label class="tab-label" htmlFor="chck2">Entities</label>
                          <div class="tab-content">
                            {entities}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck3"/>
                          <label class="tab-label" htmlFor="chck3">Key Phrases</label>
                          <div class="tab-content">
                            {keyPhrases}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck4"/>
                          <label class="tab-label" htmlFor="chck4">Syntax Tokens</label>
                          <div class="tab-content">
                            {/* {syntax} */}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck5"/>
                          <label class="tab-label" htmlFor="chck5">PII Types in Passage</label>
                          <div class="tab-content">
                            {piiEntityLabels}
                          </div>
                        </div>
                        <div class="tab">
                          <input hidden type="checkbox" id="chck6"/>
                          <label class="tab-label" htmlFor="chck6">Detect PII Entities</label>
                          <div class="tab-content">
                            {piiEntities}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div> 
              <Footer/>
              </div> 
          </div> // app end
        );
      }
}
export default BiasDetector;