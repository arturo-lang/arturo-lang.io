window.Prism=window.Prism||{},window.Prism.manual=!0,window.Prism.languages=window.Prism.languages||{};var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(e){var t=/\blang(?:uage)?-([\w-]+)\b/i,a=0,n={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof r?new r(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++a}),e.__id},clone:function e(t,a){var r,s;switch(a=a||{},n.util.type(t)){case"Object":if(s=n.util.objId(t),a[s])return a[s];for(var i in a[s]=r={},t)t.hasOwnProperty(i)&&(r[i]=e(t[i],a));return r;case"Array":return s=n.util.objId(t),a[s]||(a[s]=r=[],t.forEach(function(t,n){r[n]=e(t,a)}),r);default:return t}},getLanguage:function(e){for(;e&&!t.test(e.className);)e=e.parentElement;return e?(e.className.match(t)||[,"none"])[1].toLowerCase():"none"},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(n){var e=(/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(n.stack)||[])[1];if(e){var a,t=document.getElementsByTagName("script");for(a in t)if(t[a].src==e)return t[a]}return null}},isActive:function(e,t,a){for(var n="no-"+t;e;){var r=e.classList;if(r.contains(t))return!0;if(r.contains(n))return!1;e=e.parentElement}return!!a}},languages:{extend:function(e,t){var r,a=n.util.clone(n.languages[e]);for(r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){var l,s=(r=r||n.languages)[e],i={};for(l in s)if(s.hasOwnProperty(l)){if(l==t)for(var o in a)a.hasOwnProperty(o)&&(i[o]=a[o]);a.hasOwnProperty(l)||(i[l]=s[l])}var u=r[e];return r[e]=i,n.languages.DFS(n.languages,function(t,a){a===u&&t!=e&&(this[t]=i)}),i},DFS:function e(t,a,r,s){s=s||{};var l,o,u,i=n.util.objId;for(l in t)t.hasOwnProperty(l)&&(a.call(t,l,t[l],r||l),o=t[l],"Object"!==(u=n.util.type(o))||s[i(o)]?"Array"!==u||s[i(o)]||(s[i(o)]=!0,e(o,a,l,s)):(s[i(o)]=!0,e(o,a,null,s)))}},plugins:{},highlightAll:function(e,t){n.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,a){var r={callback:a,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),n.hooks.run("before-all-elements-highlight",r);for(var s,i=0;s=r.elements[i++];)n.highlightElement(s,!0===t,r.callback)},highlightElement:function(a,c,s){var i=n.util.getLanguage(a),l=n.languages[i];a.className=a.className.replace(t,"").replace(/\s+/g," ")+" language-"+i;var o=a.parentElement;o&&"pre"===o.nodeName.toLowerCase()&&(o.className=o.className.replace(t,"").replace(/\s+/g," ")+" language-"+i);var u={element:a,language:i,grammar:l,code:a.textContent};function g(e){u.highlightedCode=e,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,n.hooks.run("after-highlight",u),n.hooks.run("complete",u),s&&s.call(u.element)}if(n.hooks.run("before-sanity-check",u),!u.code)return n.hooks.run("complete",u),void(s&&s.call(u.element));n.hooks.run("before-highlight",u),u.grammar?c&&e.Worker?((c=new Worker(n.filename)).onmessage=function(e){g(e.data)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))):g(n.highlight(u.code,u.grammar,u.language)):g(n.util.encode(u.code))},highlight:function(e,t,s){s={code:e,grammar:t,language:s};return n.hooks.run("before-tokenize",s),s.tokens=n.tokenize(s.code,s.grammar),n.hooks.run("after-tokenize",s),r.stringify(n.util.encode(s.tokens),s.language)},tokenize:function(e,t){var a=t.rest;if(a){for(var n in a)t[n]=a[n];delete t.rest}var r=new l;return o(r,r.head,e),i(e,r,t,r.head,0),function(e){for(var t=[],a=e.head.next;a!==e.tail;)t.push(a.value),a=a.next;return t}(r)},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,s=0;r=a[s++];)r(t)}},Token:r};function r(e,t,a,n){this.type=e,this.content=t,this.alias=a,this.length=0|(n||"").length}function s(e,t,r,s){e.lastIndex=t;r=e.exec(r);return r&&s&&r[1]&&(s=r[1].length,r.index+=s,r[0]=r[0].slice(s)),r}function i(e,t,a,l,g,c){for(var d in a)if(a.hasOwnProperty(d)&&a[d])for(var p=a[d],p=Array.isArray(p)?p:[p],m=0;m<p.length;++m){if(c&&c.cause==d+","+m)return;var F,f=p[m],h=f.inside,v=!!f.lookbehind,y=!!f.greedy,b=f.alias;y&&!f.pattern.global&&(F=f.pattern.toString().match(/[imsuy]*$/)[0],f.pattern=RegExp(f.pattern.source,F+"g"));for(var k=f.pattern||f,x=l.next,w=g;x!==t.tail&&!(c&&w>=c.reach);w+=x.value.length,x=x.next){var N=x.value;if(t.length>e.length)return;if(!(N instanceof r)){var P,$=1;if(y){if(!(P=s(k,w,e,v)))break;var S=P.index,E=P.index+P[0].length,_=w;for(_+=x.value.length;_<=S;)_+=(x=x.next).value.length;if(w=_-=x.value.length,x.value instanceof r)continue;for(var j=x;j!==t.tail&&(_<E||"string"==typeof j.value);j=j.next)$++,_+=j.value.length;$--,N=e.slice(w,_),P.index-=w}else if(!(P=s(k,0,N,v)))continue;var S=P.index,C=P[0],O=N.slice(0,S),z=N.slice(S+C.length),T=w+N.length;c&&T>c.reach&&(c.reach=T);N=x.prev;O&&(N=o(t,N,O),w+=O.length),function(e,t,a){for(var n=t.next,r=0;r<a&&n!==e.tail;r++)n=n.next;(t.next=n).prev=t,e.length-=r}(t,N,$),x=o(t,N,new r(d,h?n.tokenize(C,h):C,b,C)),z&&o(t,x,z),1<$&&i(e,t,a,x.prev,w,{cause:d+","+m,reach:T})}}}}function l(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function o(e,t,r){var n=t.next,r={value:r,prev:t,next:n};return t.next=r,n.prev=r,e.length++,r}if(e.Prism=n,r.stringify=function e(i,a){if("string"==typeof i)return i;if(Array.isArray(i)){var r="";return i.forEach(function(t){r+=e(t,a)}),r}var s={type:i.type,content:e(i.content,a),tag:"span",classes:["token",i.type],attributes:{},language:a},i=i.alias;i&&(Array.isArray(i)?Array.prototype.push.apply(s.classes,i):s.classes.push(i)),n.hooks.run("wrap",s);var o,l="";for(o in s.attributes)l+=" "+o+'="'+(s.attributes[o]||"").replace(/"/g,"&quot;")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'"'+l+">"+s.content+"</"+s.tag+">"},!e.document)return e.addEventListener&&(n.disableWorkerMessageHandler||e.addEventListener("message",function(s){var i=JSON.parse(s.data),r=i.language,s=i.code,i=i.immediateClose;e.postMessage(n.highlight(s,n.languages[r],r)),i&&e.close()},!1)),n;var d,g=n.util.currentScript();function c(){n.manual||n.highlightAll()}return g&&(n.filename=g.src,g.hasAttribute("data-manual")&&(n.manual=!0)),n.manual||("loading"===(d=document.readyState)||"interactive"===d&&g&&g.defer?document.addEventListener("DOMContentLoaded",c):window.requestAnimationFrame?window.requestAnimationFrame(c):window.setTimeout(c,16)),n}(_self);function ajaxGet(url,action){var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){xmlhttp.readyState==XMLHttpRequest.DONE&&(200==xmlhttp.status?action(xmlhttp.responseText):xmlhttp.status)},xmlhttp.open("GET",url,!0),xmlhttp.send()}function ajaxPost(url,action,data){var xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){xmlhttp.readyState==XMLHttpRequest.DONE&&(200==xmlhttp.status?action(xmlhttp.responseText):xmlhttp.status)},xmlhttp.open("POST",url,!0),xmlhttp.setRequestHeader("Content-Type","application/json"),xmlhttp.send(JSON.stringify(data))}"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/,name:/[^\s<>'"]+/}},cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,r){var n={};n["language-"+r]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[r]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;n={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};n["language-"+r]={pattern:/[\s\S]+/,inside:Prism.languages[r]};r={};r[e]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:n},Prism.languages.insertBefore("markup","cdata",r)}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml,function(e){var a=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+a.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+a.source+"$"),alias:"url"}}},selector:RegExp("[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+a.source+")*(?=\\s*\\{)"),string:{pattern:a,greedy:!0},property:/(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,important:/!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;a=e.languages.markup;a&&(a.tag.addInlined("style","css"),e.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,lookbehind:!0,inside:{"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{style:{pattern:/(["'])[\s\S]+(?=["']$)/,lookbehind:!0,alias:"language-css",inside:e.languages.css},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},"attr-name":/^style/i}}},a.tag))}(Prism),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,lookbehind:!0}],keyword:[{pattern:/((?:^|})\s*)(?:catch|finally)\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:/\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-flags":/[a-z]+$/,"regex-delimiter":/^\/|\/$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.js=Prism.languages.javascript,function(){var e,t,a,s,i,l;function o(e,t){var a=(a=e.className).replace(i," ")+" language-"+t;e.className=a.replace(/\s+/g," ").trim()}"undefined"!=typeof self&&self.Prism&&self.document&&(Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),e=window.Prism,t={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"},a="data-src-status",s='pre[data-src]:not([data-src-status="loaded"]):not([data-src-status="loading"])',i=/\blang(?:uage)?-([\w-]+)\b/i,e.hooks.add("before-highlightall",function(e){e.selector+=", "+s}),e.hooks.add("before-sanity-check",function(c){var u,g,p,m,l=c.element;l.matches(s)&&(c.code="",l.setAttribute(a,"loading"),(u=l.appendChild(document.createElement("CODE"))).textContent="Loading…",g=l.getAttribute("data-src"),"none"===(c=c.language)&&(p=(/\.(\w+)$/.exec(g)||[,"none"])[1],c=t[p]||p),o(u,c),o(l,c),(p=e.plugins.autoloader)&&p.loadLanguages(c),(m=new XMLHttpRequest).open("GET",g,!0),m.onreadystatechange=function(){4==m.readyState&&(m.status<400&&m.responseText?(l.setAttribute(a,"loaded"),u.textContent=m.responseText,e.highlightElement(u)):(l.setAttribute(a,"failed"),400<=m.status?u.textContent="✖ Error "+m.status+" while fetching file: "+m.statusText:u.textContent="✖ Error: File does not exist or is empty"))},m.send(null))}),l=!(e.plugins.fileHighlight={highlight:function(t){for(var a,n=(t||document).querySelectorAll(s),r=0;a=n[r++];)e.highlightElement(a)}}),e.fileHighlight=function(){l||(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),l=!0),e.plugins.fileHighlight.highlight.apply(this,arguments)})}(),Prism.languages.arturo={comment:/;.*/,character:{pattern:/`.`/,alias:"function"},string:{pattern:/"(?:[^"\\]|\\.)*"/,greedy:!0,alias:"function"},builtin:{pattern:/[\w]+\b\??:/i},literal:{pattern:/'(?:[\w]+\b\??:?)/,alias:"boolean"},type:{pattern:/:(?:[\w]+\b\??:?)/,alias:"boolean"},keyword1:{pattern:/\b(?:all|and|any|ascii|attr|attribute|attributeLabel|binary|block|boolean|char|contains|database|date|dictionary|empty|equal|even|every|exists|false|floating|function|greater|greaterOrEqual|if|in|inline|integer|is|key|label|leap|less|lessOrEqual|literal|lower|nand|negative|nor|not|notEqual|null|numeric|odd|or|path|pathLabel|positive|prefix|prime|set|some|standalone|string|subset|suffix|superset|symbol|true|try|type|unless|upper|when|whitespace|word|xnor|xor|zero)\?/,alias:"keyword"},keyword2:{pattern:/\b(?:abs|acos|acosh|add|after|and|append|arg|args|arity|array|as|asin|asinh|atan|atanh|attr|attrs|average|before|benchmark|break|builtins1|builtins2|call|capitalize|case|ceil|chop|clear|close|color|combine|continue|copy|cos|cosh|csec|csech|ctan|ctanh|cursor|dec|decode|define|delete|dictionary|difference|digest|div|do|download|drop|dup|else|empty|encode|ensure|env|epsilon|escape|execute|exit|exp|extend|extract|factors|false|fdiv|filter|first|flatten|floor|fold|from|function|gamma|gcd|get|goto|hash|help|hypot|if|inc|indent|index|info|input|insert|inspect|intersection|join|keys|last|let|levenshtein|list|ln|log|loop|lower|mail|map|match|max|median|min|mod|module|mul|nand|neg|new|nor|normalize|not|now|null|open|or|outdent|pad|panic|path|pause|permissions|permutate|pi|pop|pow|powmod|prefix|print|prints|product|query|random|range|read|relative|remove|rename|render|repeat|replace|return|reverse|round|sample|sec|sech|select|serve|set|shl|shr|shuffle|sin|sinh|size|slice|sort|split|sqrt|squeeze|stack|strip|sub|suffix|sum|switch|symbols|symlink|sys|take|tan|tanh|terminal|to|true|truncate|try|type|union|unique|unless|until|unzip|upper|values|var|webview|while|with|write|xnor|xor|zip)\b/,alias:"keyword"},sugar:{pattern:/\->|=>|\||\:\:/,alias:"important"},symbol:{pattern:/<\:|\-\:|ø|@|#|\+|\||\*|\$|\-|\%|\/|\.\.|\^|~|=|<|>|\\|\-\-\-/}},Prism.languages.art=Prism.languages.arturo,document.addEventListener("DOMContentLoaded",()=>{Prism.highlightAll(),window.scroll=new SmoothScroll('a[href*="#"]',{speed:200,offset:90})}),function(Prism){var envVars="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",commandAfterHeredoc={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},insideString={bash:commandAfterHeredoc,environment:{pattern:RegExp("\\$"+envVars),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+envVars),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/};Prism.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+envVars),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:insideString},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:commandAfterHeredoc}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:insideString},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:insideString.entity}}],environment:{pattern:RegExp("\\$?"+envVars),alias:"constant"},variable:insideString.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},commandAfterHeredoc.inside=Prism.languages.bash;for(var toBeCopied=["comment","function-name","for-or-select","assign-left","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],inside=insideString.variable[1].inside,i=0;i<toBeCopied.length;i++)inside[toBeCopied[i]]=Prism.languages.bash[toBeCopied[i]];Prism.languages.shell=Prism.languages.bash}(Prism),document.addEventListener("DOMContentLoaded",()=>{const clipboard=new Clipboard(".copy",{target:trigger=>trigger.nextElementSibling});clipboard.on("success",event=>{event.trigger.textContent="copied!",setTimeout(()=>{event.clearSelection(),event.trigger.textContent="copy"},2e3)});const $navbarBurgers=Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"),0);0<$navbarBurgers.length&&$navbarBurgers.forEach(el=>{el.addEventListener("click",()=>{var target=el.dataset.target;const $target=document.getElementById(target);el.classList.toggle("is-active"),$target.classList.toggle("is-active")})});var element=document.getElementById("stargazers");function setDiv(div,content){document.getElementById(div).innerHTML=content}function setClass(cl,content){for(var elems=document.getElementsByClassName(cl),i=0;i<elems.length;i++)elems[i].innerHTML=content}void 0!==element&&null!=element&&(ajaxGet("https://api.github.com/search/repositories?q=arturo-lang/arturo",function(data){setDiv("stargazers",JSON.parse(data).items[0].stargazers_count)}),ajaxGet("https://api.github.com/repos/arturo-lang/arturo/releases",function(parsed){var parsed=JSON.parse(parsed),releaseVersion=parsed[0].tag_name;setClass("release-version",parsed[0].tag_name),setClass("release-version-mini",`${parsed[0].tag_name}<sup>*</sup>`),setDiv("release-date",parsed[0].published_at),ajaxGet(parsed[0].assets_url,function(downloadsTable){for(var parsed=JSON.parse(downloadsTable),downloadsTable='<tr><th></th><th></th><th class="is-hidden-touch has-text-centered">Version</th><th class="is-hidden-touch has-text-centered">Compressed file size</th><th></th></tr>',downloadItems=[],i=0;i<parsed.length;i++){var link=parsed[i],logo="",os="",order="",version=releaseVersion;link.name.includes("Linux")?(order=1,logo="linux",os="<b>Linux</b>"):link.name.includes("macOS")?(order=2,logo="apple",os="<b>macOS</b>"):link.name.includes("Windows")?(order=3,logo="windows",os="<b>Windows</b>"):link.name.includes("FreeBSD")?(order=4,logo="freebsd",os="<b>FreeBSD</b>"):link.name.includes("arm-")?(order=5,logo="raspberry-pi",os="<b>arm</b>"):link.name.includes("arm64-")&&(order=6,logo="raspberry-pi",os="<b>arm64</b>"),link.name.includes("mini")&&(version+="<sup>*</sup>",os+="<sup class='is-hidden-desktop'>*</sup>");var size=(link.size/1048576).toFixed(2)+" MB",link=link.browser_download_url;downloadItems.push(`<tr><td order="${order}" class="first-td"><i class="fab fa-2x fa-${logo}"></i></td><td>${os}</td><td class="is-hidden-touch has-text-centered">${version}</td><td class="is-hidden-touch has-text-centered">${size}</td><td><a href="${link}"><i class="far fa-arrow-alt-circle-down"></i>&nbsp;&nbsp;Download</a></td></tr>`)}downloadItems.sort(),downloadsTable+=downloadItems.join(""),setDiv("downloads",downloadsTable+=`<tr><td class="first-td"><i class="fab fa-2x fa-docker"></i></td><td><b>Docker</b></td><td class="release-version is-hidden-touch has-text-centered">${releaseVersion}</td><td class="is-hidden-touch has-text-centered">--</td><td><a rel="noopener" target="_blank" href="https://hub.docker.com/repository/docker/arturolang/arturo"><i class="far fa-arrow-alt-circle-right"></i>&nbsp;&nbsp;Docker Hub</a></td></tr>`)})}))});