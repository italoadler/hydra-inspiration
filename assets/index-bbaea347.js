(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const i=document.getElementById("hydra-canvas");function u(){i.width=window.innerWidth,i.height=window.innerHeight}u();window.addEventListener("resize",u);const l=new Tone.PolySynth(Tone.Synth,{polyphony:8,volume:-10,envelope:{attack:6,decay:.1,sustain:.1,release:1}}).toDestination(),f=new Tone.Reverb({decay:8,preDelay:.01}).toDestination();l.connect(f);const d=["C3","D3","E3","G3","A4","C4","D4","E4","G5","A5","C5","D5"];function p(){return d[Math.floor(Math.random()*d.length)]}const y=120;function h(){return Math.random()*.25+.25}let s=4;function g(n){const r=window.innerWidth;s=Tone.Frequency(0+(r-0)*(n/r)).midicps().toFrequency(),osc(s,.1,.8).color(()=>colorMap).rotate(.8).kaleid(5).modulate(osc(2,.25,.2).rotate(.1,.9),()=>velocityMap).out()}function m(){const n=p(),o=.015,r=Math.random()*6+2;l.triggerAttackRelease(n,r,Tone.now(),o),setTimeout(m,h()*(60/y)*1e3)}document.addEventListener("mousemove",n=>{const o=n.clientX;g(o)});document.addEventListener("click",()=>{Tone.context.state!=="running"&&Tone.start(),m()});document.addEventListener("DOMContentLoaded",n=>{v()});function v(){new Hydra;const n=gradient(360).rotate(.25).repeat(2,1).brightness(()=>Math.random()*.5+.5).out(),o=shape(4).repeat(2,1).rotate(.1).scale(()=>Math.random()*2+1).modulate(osc(.2)).out();osc(s,.1,.8).color(()=>n).rotate(.8).kaleid(5).modulate(osc(2,.25,.2).rotate(.1,.9),()=>o).out()}