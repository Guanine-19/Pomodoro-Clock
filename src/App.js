import React from 'react';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

class ClockButton extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div class="col-6 align-items-center">
        <h3 id={this.props.type+"-label"}>{this.props.title}</h3>
        <div class="d-flex align-items-center justify-content-center">
          <div class="button col-2" id={this.props.type+"-increment"} onClick={()=>{!this.props.running && this.props.length<60 && this.props.method(this.props.length+1)}}>
            <i class="button fas fa-arrow-circle-up"></i>
          </div>
          <div class="length label col-4">
            <h4 id={this.props.type+"-length"} onChange={this.props.set()}>{this.props.length}</h4>
          </div>
          <div class="button col-2" id={this.props.type+"-decrement"} onClick={()=>{!this.props.running && this.props.length>1 && this.props.method(this.props.length-1)}}>
            <i class="button fas fa-arrow-circle-down"></i>
          </div>
        </div>
      </div>
    )
  }
}

function App() {
  //STATES
  const [running, setrunning] = useState(false);
  const [pause, setpause] = useState(true);
  const [breakLength, setbreakLength] = useState(5);
  const [sessionLength, setsessionLength] = useState(1);
  const [timer, settimer] = useState(sessionLength);
  const [seconds, setseconds] = useState(0);
  const [label, setlabel] = useState("Session");
  const [usetimer, setusetimer] = useState(1);

  //METHODS

  const settimerdisplay = () => {
    !running && usetimer=== 2 && settimer(breakLength);
    !running && usetimer=== 1 && settimer(sessionLength);
  }

  const playBeep = () =>{
    const sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.play();
  }

  const switchtimer = () => {
    if(timer===0 && usetimer === 1){
      settimer(breakLength) ; setusetimer(2) ; setlabel("Break");
    } else if (timer===0 && usetimer === 2){
      settimer(sessionLength) ; setusetimer(1) ; setlabel("Session");
    }
    playBeep()
  }

  const reset = () => {
    setrunning(false);
    setpause(true);
    setbreakLength(5);
    setsessionLength(25);
    setusetimer(1);
    settimer(sessionLength);
    setlabel("Session");
    setseconds(0);
  }

  useEffect(() => {
    !running && setseconds(0);
    running && !pause && seconds > 0 && setTimeout(()=> setseconds(seconds - 1) ,1000);
    running && !pause && seconds <= 0 && setTimeout(()=> {settimer(timer - 1); setseconds(5)} ,1000);
    timer === 0 && seconds === 0 && switchtimer();
  }, [running, pause, seconds, usetimer]);
  
  return(
    <div class="row container-fluid p-4" id="PClock">
      <div class="col-12">
        POMODORO CLOCK
        <p>Designed and Coded by: Guanine-19</p>
      </div>
      <audio id="beep" src='src\beep.mp3'></audio>
      <ClockButton title="Break Length" length={breakLength} method={setbreakLength} running={running} set={settimerdisplay} type="break" />
      <ClockButton title="Session Length" length={sessionLength} method={setsessionLength} running={running} set={settimerdisplay} type="session" />    
      <div class="col-12 justify-content-center">
        {label==="Session" && <h3 id="timer-label" class="animated flipInX">{label}</h3>}
        {label==="Break" && <h3 id="timer-label" class="animated flipInX">{label}</h3>}
        <h1>{("0" + timer).slice(-2)}:{("0" + seconds).slice(-2)}</h1>
      </div>
      <div class="col-12 d-flex p-0 justify-content-center">
        <div id="start_stop" class="clickable col-2 align-items-center" onClick={()=>setpause(!pause)}>
          {!pause && <i class="animated flipInX fas fa-pause"></i>}
          {pause && <i class="animated flipInX fas fa-play"></i>}
        </div>
        <div class="clickable col-3 align-items-center" onClick={()=>{setpause(!pause);setrunning(!running)}}>
          {!running && <h4 class="animated flipInX">START</h4>}
          {running && <h4 class="animated flipInX">STOP</h4>}
        </div>
        <div id="reset" class="clickable col-2 align-items-center" onClick={reset}>
          <i class="fa fa-refresh"></i>
        </div>
      </div>
      
    </div>
  )
}

export default App;
