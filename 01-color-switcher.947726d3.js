const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`};let n=null;function r(t,e){t.disabled=e}r(e,!0);t.addEventListener("click",(t=>{r(t.target,!0),r(e,!1),n=setInterval(a,1e3)})),e.addEventListener("click",(e=>{r(t,!1),clearInterval(n),r(e.target,!0)}));
//# sourceMappingURL=01-color-switcher.947726d3.js.map