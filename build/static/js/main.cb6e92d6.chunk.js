(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(14),c=t.n(o),l=t(4),u=t(2),i=function(e){var n=e.text,t=e.handleChange;return r.a.createElement("div",null,n," ",r.a.createElement("input",{onChange:t}))},m=function(e){var n=e.handleFilterChange;return r.a.createElement("form",null,r.a.createElement(i,{text:"filter shown with",handleChange:n}))},d=function(e){var n=e.id,t=e.text,a=e.type,o=e.handleClick;return r.a.createElement("button",{id:n,type:a,onClick:o},t)},s=function(e){var n=e.handleNameChange,t=e.handleNumberChange,a=e.handleFormSend;return r.a.createElement("form",null,r.a.createElement(i,{text:"name:",handleChange:n}),r.a.createElement(i,{text:"number:",handleChange:t}),r.a.createElement(d,{text:"add",type:"submit",handleClick:a}))},f=function(e){var n=e.name,t=e.number,a=e.deletePerson;return r.a.createElement("li",null,n," ",t,r.a.createElement(d,{id:n,text:"delete",type:"submit",handleClick:a}))},h=function(e){var n=e.showPersons,t=e.deletePerson;return r.a.createElement("ul",null,n.map((function(e,n){return r.a.createElement(f,{key:n,name:e.name,number:e.number,deletePerson:t})})))},b=t(3),g=t.n(b),p="/api/persons",E=function(){return g.a.get(p).then((function(e){return e.data}))},v=function(e){console.log(e);var n=g.a.post(p,e);return console.log(n),n.then((function(e){return console.log(e.data),e.data}))},C=function(e,n){return g.a.put("".concat(p,"/").concat(e),n).then((function(e){return e.data}))},w=function(e){return g.a.delete("".concat(p,"/").concat(e)).then((function(e){return e.data}))},y=function(e){var n=e.message,t={color:e.color,background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return null===n?null:r.a.createElement("div",{style:t},n)},j=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1];Object(a.useEffect)((function(){console.log("effect"),E().then((function(e){return o(e)}))}),[]);var c=Object(a.useState)({name:"",number:""}),i=Object(u.a)(c,2),d=i[0],f=i[1],b=Object(a.useState)(""),g=Object(u.a)(b,2),p=g[0],j=g[1],x=Object(a.useState)(null),O=Object(u.a)(x,2),S=O[0],k=O[1],P=Object(a.useState)("green"),N=Object(u.a)(P,2),F=N[0],L=N[1],I=t.filter((function(e){return e.name.toLowerCase().includes(p.toLowerCase())||e.number.toLowerCase().includes(p.toLowerCase())})),B=function(e,n){k(e),L(n),setTimeout((function(){k(null)}),3e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(y,{message:S,color:F}),r.a.createElement(m,{handleFilterChange:function(e){j(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(s,{handleNameChange:function(e){f(Object(l.a)({},d,{name:e.target.value}))},handleNumberChange:function(e){f(Object(l.a)({},d,{number:e.target.value}))},handleFormSend:function(e){e.preventDefault();var n=t.findIndex((function(e){return e.name===d.name}));-1!==n?window.confirm("".concat(d.name," is already added to phonebook, replace the old number with a new one?"))&&(C(t[n].id,d).then((function(e){return o(t.map((function(n){return n.name!==e.name?n:e})))})).catch((function(e){console.log(e),B("Information of ".concat(d.name," has already been removed from srver"),"red")})),B("Successfully updated ".concat(d.name,"!"),"green")):(v(d).then((function(e){return o(t.concat(e))})),B("Successfully created ".concat(d.name,"!"),"green"))}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(h,{showPersons:I,deletePerson:function(e){var n=e.target.id;if(window.confirm("Delete ".concat(n,"?"))){var a=t.find((function(e){return e.name===n})).id;w(a),o(t.filter((function(e){return e.name!==n}))),B("Successfully deleted ".concat(n,"!"),"green")}}}))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.cb6e92d6.chunk.js.map