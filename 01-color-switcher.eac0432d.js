!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=function(){document.body.style.background="#".concat(Math.floor(16777215*Math.random()).toString(16))},a=null;function c(t,e){t.disabled=e}c(e,!0);t.addEventListener("click",(function(t){c(t.target,!0),c(e,!1),a=setInterval(n,1e3)})),e.addEventListener("click",(function(e){c(t,!1),clearInterval(a),c(e.target,!0)}))}();
//# sourceMappingURL=01-color-switcher.eac0432d.js.map