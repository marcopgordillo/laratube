import{z as b,o as s,a as o,b as t,t as r,F as g,l as x,w as k,A as w,u,f as V,Y as q,s as $,q as S,j as C,C as B,g as j}from"./vendor.80495a89.js";import{d as A}from"./app.3420cf6e.js";const M={class:"mb-4"},N={class:"text-base font-medium text-gray-900"},T={class:"text-gray-500 text-sm"},U={class:"mt-3"},F={key:0},I=["value"],L=t("option",{value:""},"Please Select",-1),R=["value"],D={key:1},H=["id","name","value"],O=["for"],z={key:2},E=["id","onUpdate:modelValue"],P=["for"],Y={key:3},G=["value"],J={key:4},K=["value"],Q=t("hr",{class:"mb-4"},null,-1),W={props:{question:Object,index:Number,modelValue:[String,Array]},emits:["update:modelValue"],setup(n,{emit:l}){const{question:c,index:d,modelValue:h}=n;let a;c.type==="checkbox"&&(a=b({}));const f=y=>{const i=[];for(let e in a.value)a.value[e]&&i.push(e);l("update:modelValue",i)};return(y,i)=>(s(),o(g,null,[t("fieldset",M,[t("div",null,[t("legend",N,r(n.index+1)+" "+r(n.question.question),1),t("p",T,r(n.question.description),1)]),t("div",U,[n.question.type==="select"?(s(),o("div",F,[t("select",{value:n.modelValue,onChange:i[0]||(i[0]=e=>l("update:modelValue",e.target.value)),class:"mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"},[L,(s(!0),o(g,null,x(n.question.data.options,e=>(s(),o("option",{key:e.uuid,value:e.text},r(e.text),9,R))),128))],40,I)])):n.question.type==="radio"?(s(),o("div",D,[(s(!0),o(g,null,x(n.question.data.options,e=>(s(),o("div",{key:e.uuid,class:"flex items-center"},[t("input",{id:e.uuid,name:`question ${n.question.id}`,value:e.text,onChange:i[1]||(i[1]=m=>l("update:modelValue",m.target.value)),type:"radio",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"},null,40,H),t("label",{for:e.uuid,class:"ml-3 block text-sm font-medium text-gray-700"},r(e.text),9,O)]))),128))])):n.question.type==="checkbox"?(s(),o("div",z,[(s(!0),o(g,null,x(n.question.data.options,e=>(s(),o("div",{key:e.uuid,class:"flex items-center"},[k(t("input",{id:e.uuid,"onUpdate:modelValue":m=>u(a)[e.text]=m,onChange:f,type:"checkbox",class:"focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"},null,40,E),[[w,u(a)[e.text]]]),t("label",{for:e.uuid,class:"ml-3 block text-sm font-medium text-gray-700"},r(e.text),9,P)]))),128))])):n.question.type==="text"?(s(),o("div",Y,[t("input",{type:"text",value:n.modelValue,onInput:i[2]||(i[2]=e=>l("update:modelValue",e.target.value)),class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,40,G)])):n.question.type==="textarea"?(s(),o("div",J,[t("textarea",{rows:"4",value:n.modelValue,onInput:i[3]||(i[3]=e=>l("update:modelValue",e.target.value)),class:"mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"},null,40,K)])):V("",!0)])]),Q],64))}},X={class:"py-5 px-8"},Z=["onSubmit"],ee={class:"grid grid-cols-6 items-center"},te={class:"mr-4"},se=["src","alt"],oe={class:"col-span-5"},ne={class:"text-3xl mb-3"},ie=["innerHTML"],ae={key:0,class:"py-8 px-6 bg-emerald-400 text-white w-[37rem] mx-auto"},de=t("div",{class:"text-xl mb-3 font-semibold"}," Thanks for your participating in this survey. ",-1),ue={key:1},le=t("hr",{class:"my-3"},null,-1),re=t("button",{type:"submit",class:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}," Submit ",-1),ge={setup(n){const l=q(),c=A(),{currentSurvey:d}=$(c),h=b(!1),a=b({});c.getSurveyBySlug(l.params.slug);const f=async()=>{try{await c.saveSurveyAnswers({surveyId:d.value.data.id,answers:a.value}),h.value=!0}catch(i){console.error(i)}},y=()=>{a.value={},h.value=!1};return(i,e)=>{const m=S("loading-component");return s(),o("div",X,[u(d).loading?(s(),C(m,{key:0})):(s(),o("form",{key:1,onSubmit:B(f,["prevent"]),class:"container mx-auto",novalidate:""},[t("div",ee,[t("div",te,[t("img",{src:u(d).data.image_url,alt:u(d).data.title},null,8,se)]),t("div",oe,[t("h1",ne,r(u(d).data.title),1),t("p",{class:"text-gray-500 text-sm",innerHTML:u(d).data.description},null,8,ie)])]),h.value?(s(),o("div",ae,[de,t("button",{onClick:y,type:"button",class:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"}," Submit another response ")])):(s(),o("div",ue,[le,(s(!0),o(g,null,x(u(d).data.questions,(v,_)=>(s(),o("div",{key:v.id},[j(W,{modelValue:a.value[v.id],"onUpdate:modelValue":p=>a.value[v.id]=p,question:v,index:_},null,8,["modelValue","onUpdate:modelValue","question","index"])]))),128)),re]))],40,Z))])}}};export{ge as default};
