(this["webpackJsonpbunzz-demo"]=this["webpackJsonpbunzz-demo"]||[]).push([[1],{42:function(e,t,c){"use strict";c.d(t,"a",(function(){return n})),c.d(t,"b",(function(){return s})),c.d(t,"c",(function(){return r})),c.d(t,"e",(function(){return a})),c.d(t,"d",(function(){return o}));var n=function(e){return e.slice(0,5)+"..."+e.slice(-4)},s=function(e){for(var t="".concat(e),c=t.slice(-18),n="",s=0;s<t.length-1;s++){var r=t.slice(s);r===c&&(n=r.slice(0,s))}var a="".concat(n||"0",".").concat(c);return Number(a)},r=function(e){var t,c,n=e.split(".");return 1===n.length&&(t="0",c=n[0]),2===n.length&&(t="".concat(n[0]),c=n[1]),"".concat(t).concat(c).concat("000000000000000000".slice(c.length))},a=function(e){return e.replace(/\s/g,"+")},o=function(e){return e.replace(/\+/g," ")}},43:function(e,t,c){"use strict";var n=c(1),s=c(23),r=c(45),a=c.n(r),o=c(24),i=c(46),l=c.n(i),d=c(7),j={"--primary-700":"#1DA1F2","--primary-400":"#68bdf2","--secondary-700":"#F4B400","--secondary-400":"#f0cd6d","--light-400":"#bfcadd","--light-700":"#d0def5","--light-900":"#ffffff","--dark-400":"#36393e","--dark-700":"#282b30","--dark-900":"#1e2124"},h={"--primary-700":"#1DA1F2","--primary-400":"#68bdf2","--secondary-700":"#F4B400","--secondary-400":"#f0cd6d","--dark-400":"#bfcadd","--dark-700":"#d0def5","--dark-900":"#ffffff","--light-400":"#36393e","--light-700":"#282b30","--light-900":"#1e2124"},m=function(){var e,t,c=Object(n.useContext)(o.b),s="".concat(l.a["theme-button"]);return"light"===c.theme&&(e=j,s+=" ".concat(l.a.light)),"dark"===c.theme&&(e=h,s+=" ".concat(l.a.dark)),t=e,Object(n.useLayoutEffect)((function(){if("undefined"!==typeof window)for(var e in t)document.querySelector(":root").style.setProperty("".concat(e),t[e])}),[t]),Object(d.jsx)("div",{className:s,onClick:function(){c.onToggleTheme()},children:Object(d.jsx)("div",{className:"{}"})})},x=c(47),b=c.n(x),u=c(48),_=c.n(u),O=function(e){var t=e.text,c=e.path;return Object(d.jsx)("li",{className:_.a["nav-item"],children:Object(d.jsx)(s.c,{className:function(e){return"".concat(e.isActive?_.a["active-nav"]:"")},to:c,children:t})})},f=[{id:"navitem1",text:"What's Hu",path:"/whats-hu"},{id:"navitem2",text:"Wallet",path:"/wallet"},{id:"navitem3",text:"Activity",path:"/transactions"}],p=function(){return Object(d.jsxs)("nav",{className:b.a.nav,children:[Object(d.jsx)("ul",{children:f.map((function(e){return Object(d.jsx)(O,{text:e.text,path:e.path},e.id)}))}),Object(d.jsx)(m,{})]})};t.a=function(){return Object(d.jsxs)("header",{className:a.a.header,children:[Object(d.jsx)("div",{className:a.a.logo,children:Object(d.jsxs)(s.b,{to:"/",children:[Object(d.jsx)("img",{src:"/hu.png",alt:"Hupay"}),Object(d.jsx)("p",{children:"HUPAY"})]})}),Object(d.jsx)(p,{})]})}},44:function(e,t,c){"use strict";c(1);var n=c(51),s=c(49),r=c.n(s),a=c(7),o=function(e){var t=e.className;return Object(a.jsxs)("div",{className:"".concat(r.a.socials," ").concat(t||""),children:[Object(a.jsx)("div",{children:Object(a.jsx)("a",{href:"https://goerli.etherscan.io/address/0xb27d522c0251ca702058178625747b2481a9de3e",rel:"noreferrer",target:"_blank",children:Object(a.jsx)(n.b,{})})}),Object(a.jsx)("div",{children:Object(a.jsx)("a",{href:"https://github.com/preciousnwaoha/hupay",rel:"noreferrer",target:"_blank",children:Object(a.jsx)(n.c,{})})}),Object(a.jsx)("div",{children:Object(a.jsx)("a",{href:"https://discord.gg/CCqC4VAfK5",rel:"noreferrer",target:"_blank",children:Object(a.jsx)(n.a,{})})}),Object(a.jsx)("div",{children:Object(a.jsx)("a",{href:"https://twitter.com/_preciousnwaoha",rel:"noreferrer",target:"_blank",children:Object(a.jsx)(n.d,{})})})]})},i=c(50),l=c.n(i);t.a=function(){return Object(a.jsxs)("footer",{className:l.a.footer,children:[Object(a.jsxs)("div",{className:l.a.copyright,children:["\xa9 hupay 2022 | powered by ",Object(a.jsx)("a",{href:"https://www.bunzz.dev/",rel:"noreferrer",target:"_blank",children:"bunzz"})]}),Object(a.jsx)(o,{className:l.a.contact})]})}},45:function(e,t,c){e.exports={header:"Header_header__3q4r5",logo:"Header_logo__1cmLI"}},46:function(e,t,c){e.exports={"theme-button":"ThemeButton_theme-button__2uEMW",light:"ThemeButton_light__3hB27",turnOn:"ThemeButton_turnOn__ZX4zN",dark:"ThemeButton_dark__2pxzQ",turnOf:"ThemeButton_turnOf__3-5pO"}},47:function(e,t,c){e.exports={nav:"Nav_nav__3erO7"}},48:function(e,t,c){e.exports={"nav-item":"NavItem_nav-item__1JDuI","active-nav":"NavItem_active-nav__239TN"}},49:function(e,t,c){e.exports={socials:"Socials_socials__2Frys"}},50:function(e,t,c){e.exports={footer:"Footer_footer__OLR_5",copyright:"Footer_copyright__6GB_5",contact:"Footer_contact__3_pzC"}},54:function(e,t,c){"use strict";c(1);var n=c(27),s=c.n(n),r=c(58),a=c.n(r),o=c(7),i=function(){return Object(o.jsx)("div",{className:a.a.backdrop})},l=function(e){var t=e.children;return Object(o.jsx)("div",{className:a.a.modal,children:Object(o.jsx)("div",{className:a.a.content,children:t})})},d=document.getElementById("overlays");t.a=function(e){var t=e.children;return Object(o.jsxs)(o.Fragment,{children:[s.a.createPortal(Object(o.jsx)(i,{}),d),s.a.createPortal(Object(o.jsx)(l,{children:t}),d)]})}},58:function(e,t,c){e.exports={backdrop:"Modal_backdrop__1iEwR",modal:"Modal_modal__3UQIN"}},60:function(e,t,c){"use strict";c(1);var n=c(26),s=c(75),r=c.n(s),a=c(7);t.a=function(){return Object(a.jsxs)("div",{className:r.a["not-connected"],children:[Object(a.jsx)("h1",{children:"Connecting to Wallet"}),Object(a.jsx)("div",{className:r.a.metamask,children:Object(a.jsx)("img",{src:"MetaMask.png",alt:"MetaMask"})}),Object(a.jsx)(n.a,{}),Object(a.jsxs)("div",{className:r.a.steps,children:[Object(a.jsx)("h2",{children:"If nothing happens follow these steps:"}),Object(a.jsx)("p",{children:"1. Get MetaMask Browser Extension"}),Object(a.jsxs)("p",{children:["2. Open MetaMask and Switch/Connect to ",Object(a.jsx)("span",{children:"Goerli Testnet Network"})]}),Object(a.jsxs)("p",{children:["3. in MetaMask Import Token, with Contract Address ",Object(a.jsx)("span",{children:"0xB27D522C0251CA702058178625747B2481A9De3E"})]}),Object(a.jsx)("p",{children:"4. Wait a while and then Reload this Page"})]}),Object(a.jsxs)("p",{className:r.a.note,children:[Object(a.jsx)("b",{children:"Note: "}),"Hupay Wallet is not yet available for Mobile users"]})]})}},61:function(e,t,c){"use strict";var n=c(12),s=c(1),r=c(23),a=c(25),o=c(65),i=c.n(o),l=c(11),d=c(68),j=c(18),h=c(42),m=c(54),x=c(66),b=c.n(x),u=c(22),_=c(67),O=c.n(_),f=c(7),p=function(e){var t=e.blockNumber,c=e.blockHash,n=e.transactionHash,s=e.success,r=e.from,a=e.mid,o=e.to,i=e.message,l=e.amount,d=e.timeStamp,j=e.senderName;return Object(f.jsxs)("div",{className:"".concat(O.a["trx-more"]),children:[Object(f.jsxs)("div",{className:O.a["trx-more-main"],children:[Object(f.jsxs)("div",{className:O.a.status,children:[Object(f.jsx)("h4",{children:"Status"}),Object(f.jsx)("p",{children:s?"Confirmed":"Pending"})]}),Object(f.jsxs)("div",{className:O.a["trx-id"],children:[Object(f.jsx)("h4",{children:"Transaction Hash"}),Object(f.jsx)("p",{children:Object(h.a)(n)})]}),Object(f.jsxs)("div",{className:O.a["to-from"],children:[Object(f.jsxs)("div",{className:O.a.to,children:[Object(f.jsx)("h4",{children:"To"}),Object(f.jsx)("p",{className:O.a.name,children:j||"Anonymous"}),Object(f.jsx)("p",{className:O.a.addr,children:Object(h.a)(o)})]}),Object(f.jsxs)("div",{className:O.a.from,children:[Object(f.jsx)("h4",{children:"From"}),Object(f.jsx)("p",{className:O.a.name,children:"Anonymous"}),Object(f.jsx)("p",{className:O.a.addr,children:Object(h.a)(r)})]})]}),Object(f.jsxs)("div",{className:O.a.transaction,children:[Object(f.jsx)("h4",{children:"Transaction"}),Object(f.jsxs)("div",{className:O.a["trx-item"],children:[Object(f.jsx)("h5",{children:"Message: "}),Object(f.jsx)("p",{children:i||"Nothing"})]}),Object(f.jsxs)("div",{className:O.a["trx-item"],children:[Object(f.jsx)("h5",{children:"Time: "}),Object(f.jsx)("p",{children:Object(u.c)(d)||"Unknown"})]}),Object(f.jsxs)("div",{className:O.a["trx-item"],children:[Object(f.jsx)("h5",{children:"Block Hash: "}),Object(f.jsx)("p",{children:Object(h.a)(c)})]}),Object(f.jsxs)("div",{className:O.a["trx-item"],children:[Object(f.jsx)("h5",{children:"Block Number: "}),Object(f.jsx)("p",{children:t})]}),Object(f.jsxs)("div",{className:O.a["trx-item"],children:[Object(f.jsx)("h5",{children:"Amount: "}),Object(f.jsx)("p",{children:l?Object(h.b)(l):"XXXX"})]}),Object(f.jsxs)("div",{className:O.a["trx-item"],children:[Object(f.jsx)("h5",{children:"Through: "}),Object(f.jsx)("p",{children:Object(h.a)(a)||"XXXX"})]})]})]}),Object(f.jsx)("div",{className:O.a["hide-scroller"]}),Object(f.jsx)("div",{className:O.a["hide-scroller"]})]})},v=function(e){var t=e.blockNumber,c=e.blockHash,n=e.transactionHash,r=e.success,a=e.from,o=e.mid,i=e.to,x=e.message,u=e.amount,_=e.senderName,O=e.timeStamp,v=Object(s.useContext)(j.b),N=Object(s.useState)(!1),g=Object(l.a)(N,2),y=g[0],k=g[1],T=a.toLowerCase()===v.userAddress.toLowerCase(),H=function(){k((function(e){return!e}))},M=x;return i&&i!==v.userAddress||(M="Minting"),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsxs)("li",{className:b.a["trx-history-item"],onClick:H,children:[Object(f.jsxs)("div",{className:b.a["hu-info"],children:[Object(f.jsx)("div",{className:b.a.icon,children:T?Object(f.jsx)(d.b,{}):Object(f.jsx)(d.a,{})}),Object(f.jsxs)("div",{className:b.a["hu-info-text"],children:[Object(f.jsx)("p",{className:b.a.name,children:_||"Anonymous"}),Object(f.jsx)("p",{className:b.a.desc,children:M})]})]}),Object(f.jsxs)("div",{className:b.a["chain-info"],children:[Object(f.jsxs)("p",{className:b.a.amount,children:[Object(h.b)(u)?Object(h.b)(u):"XX.XX"," ","HUC"]}),Object(f.jsx)("p",{className:b.a["to-from"],children:T?"To: ".concat(Object(h.a)(i)):"From: ".concat(Object(h.a)(a))})]})]}),y&&Object(f.jsxs)(m.a,{children:[Object(f.jsx)("div",{className:b.a["exit-modal"],onClick:H,children:"\xd7"}),Object(f.jsx)(p,{blockNumber:t,blockHash:c,transactionHash:n,success:r,from:a,mid:o,to:i,message:M,amount:u,senderName:_,timeStamp:O})]})]})};t.a=function(e){var t,c=e.isTransactionsPage,o=void 0!==c&&c,l=Object(s.useContext)(a.b);return 0===l.transactions.length?Object(f.jsx)("div",{className:i.a["no-trx-history"],children:"No transactions"}):(t=o?Object(n.a)(l.transactions).sort((function(e,t){return Number(t.timeStamp)-Number(e.timeStamp)})):l.transactions.sort((function(e,t){return Number(t.timeStamp)-Number(e.timeStamp)})).slice(0,3),Object(f.jsxs)("div",{className:i.a["trx-history"],children:[Object(f.jsx)("ul",{children:t.map((function(e){return Object(f.jsx)(v,{blockNumber:e.blockNumber,blockHash:e.blockHash,transactionHash:e.transactionHash,success:e.success,from:e.from,mid:e.mid,to:e.to,message:e.message,amount:e.amount,senderName:e.senderName,timeStamp:e.timeStamp||"Unknown"},e.transactionHash)}))}),!o&&Object(f.jsx)("button",{type:"button",className:i.a["view-all"],children:Object(f.jsx)(r.b,{to:"/transactions",children:"View All"})})]}))}},65:function(e,t,c){e.exports={"no-trx-history":"TrxHistory_no-trx-history__1hyBm","trx-history":"TrxHistory_trx-history__1UlU7","view-all":"TrxHistory_view-all__2Fzqv"}},66:function(e,t,c){e.exports={"trx-history-item":"TrxHistoryItem_trx-history-item__2tgBg",name:"TrxHistoryItem_name__2poFQ","hu-info":"TrxHistoryItem_hu-info__pw0DG",icon:"TrxHistoryItem_icon__23pt_","hu-info-text":"TrxHistoryItem_hu-info-text__-WrZY",desc:"TrxHistoryItem_desc__2xs45","chain-info":"TrxHistoryItem_chain-info__3rTx0",amount:"TrxHistoryItem_amount__2Kr5G","to-from":"TrxHistoryItem_to-from__3Gz1a","exit-modal":"TrxHistoryItem_exit-modal__11LCc"}},67:function(e,t,c){e.exports={"trx-more":"TrxMoreInfo_trx-more__3i0M_","trx-more-main":"TrxMoreInfo_trx-more-main__2zEi1","hide-scroller":"TrxMoreInfo_hide-scroller__1HySl",status:"TrxMoreInfo_status__15afC","trx-id":"TrxMoreInfo_trx-id__3NRn3","to-from":"TrxMoreInfo_to-from__3PdVm",to:"TrxMoreInfo_to__yHQCD",from:"TrxMoreInfo_from__1ZDfp",name:"TrxMoreInfo_name__f1qt2",addr:"TrxMoreInfo_addr__muCRh",transaction:"TrxMoreInfo_transaction__1Mxqw","trx-item":"TrxMoreInfo_trx-item__3rFHo"}},75:function(e,t,c){e.exports={"not-connected":"NotConnected_not-connected__3WuTx",metamask:"NotConnected_metamask__s7LyM",steps:"NotConnected_steps__1Ml-T",note:"NotConnected_note__Q8pNv"}}}]);
//# sourceMappingURL=1.150a7b9d.chunk.js.map