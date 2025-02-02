import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
const Main = () => {
  
  const{onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context);
  const [isListening, setIsListening] = useState(false);
  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
  }
  const stopListening = () => {
    setIsListening(false);
    setInput(transcript);
    SpeechRecognition.stopListening();
  }
  const {
    transcript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser doesn't support Speech Recognition.");
  }

  return (
    <div className="main">
      <div className="nav">
        <p>Sofiya</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, I am Sofiya.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activites for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ):<div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading
              ? 
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
              </div>
               :<p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={isListening?transcript:input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              {!isListening?<img src={assets.mic_icon} alt="" onClick={() => startListening()}/>
              : <img src={assets.mic_icon} alt="" onClick={() => stopListening()}/>}
              {input?<img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Sofiya may display inaccurate info, inluding about people, so
            double-check responses.Powered by Gemini open ai.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main