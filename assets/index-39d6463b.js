(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const i=document.getElementById("hydra-canvas");function l(){i.width=window.innerWidth,i.height=window.innerHeight}l();window.addEventListener("resize",l);const u=new Tone.PolySynth(Tone.Synth,{polyphony:8,volume:-10,envelope:{attack:6,decay:.1,sustain:.1,release:1}}).toDestination(),p=new Tone.Reverb({decay:8,preDelay:.01}).toDestination();u.connect(p);const d=["C3","D3","E3","G3","A4","C4","D4","E4","G5","A5","C5","D5"];function y(){return d[Math.floor(Math.random()*d.length)]}const h=120;function g(){return Math.random()*.25+.25}let n=4;function f(){n+=1,n>32&&(n=32),osc(n,.1,.8).color(()=>colorMap).rotate(.8).kaleid(5).modulate(osc(2,.25,.2).rotate(.1,.9),()=>velocityMap).out(),n<32&&setTimeout(f,1e3)}function m(){const r=y(),o=.5,a=Math.random()*6+2;u.triggerAttackRelease(r,a,Tone.now(),o),setTimeout(m,g()*(60/h)*1e3)}document.addEventListener("mousedown",()=>{Tone.context.state!=="running"&&Tone.start(),m(),f()});document.addEventListener("DOMContentLoaded",r=>{v()});function v(){new Hydra;const r=gradient(360).rotate(.25).repeat(2,1).brightness(()=>Math.random()*.5+.5).out(),o=shape(4).repeat(2,1).rotate(.1).scale(()=>Math.random()*2+1).modulate(osc(.2)).out();osc(n,.1,.8).color(()=>r).rotate(.8).kaleid(5).modulate(osc(2,.25,.2).rotate(.1,.9),()=>o).out()}