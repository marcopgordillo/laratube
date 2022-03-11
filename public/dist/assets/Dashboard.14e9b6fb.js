import{s as h,q as c,o as a,j as _,k as u,u as e,a as n,b as t,t as o,g as d,R as x,S as v,F as b,l as g,h as l}from"./vendor.80495a89.js";import{_ as y}from"./PageComponent.0dfdb2b5.js";import{c as w}from"./app.3420cf6e.js";const p={key:1,class:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"},S={class:"bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down",style:{"animation-delay":"0.1s"}},j=t("h3",{class:"text-2xl font-semibold"},"Total Surveys",-1),k={class:"text-8xl font-semibold flex-1 flex items-center justify-center"},A={class:"bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down",style:{"animation-delay":"0.2s"}},V=t("h3",{class:"text-2xl font-semibold"},"Total Answers",-1),D={class:"text-8xl font-semibold flex-1 flex items-center justify-center"},B={class:"row-span-2 bg-white shadow-md p-3 order-3 lg:order-1 animate-fade-in-down"},T=t("h3",{class:"text-2xl font-semibold"},"Latest Survey",-1),C=["src","alt"],E={class:"text-xl font-bold mb-3"},L={class:"flex justify-between text-sm mb-1"},N=t("div",null,"Create date:",-1),q={class:"flex justify-between text-sm mb-1"},F=t("div",null,"Expire date:",-1),M={class:"flex justify-between text-sm mb-1"},R=t("div",null,"Status:",-1),$={class:"flex justify-between text-sm mb-1"},Q=t("div",null,"Questions:",-1),z={class:"flex justify-between text-sm mb-3"},G=t("div",null,"Answers:",-1),H={class:"flex justify-between"},I=l(" Edit Survey "),J={type:"button",class:"flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},K=l(" View Answers "),O={class:"row-span-2 bg-white shadow-md p-3 order-4 lg:order-3 animate-fade-in-down",style:{"animation-delay":"0.3s"}},P=t("div",{class:"flex justify-between items-center mb-3 px-2"},[t("h3",{class:"text-2xl font-semibold"},"Latest Answers"),t("a",{href:"javascript:void(0)",class:"text-sm text-blue-500 hover:decoration-blue-500"}," View all ")],-1),U={class:"font-semibold"},W=l(" Answer Made at: "),X={class:"font-semibold"},at={setup(Y){const r=w(),{dashboard:s}=h(r);return r.getDashboardData(),(Z,tt)=>{const m=c("loading-component"),f=c("router-link");return a(),_(e(y),{title:"Dashboard"},{default:u(()=>[e(s).loading?(a(),_(m,{key:0})):(a(),n("div",p,[t("div",S,[j,t("div",k,o(e(s).data.totalSurveys),1)]),t("div",A,[V,t("div",D,o(e(s).data.totalAnswers),1)]),t("div",B,[T,t("img",{src:e(s).data.latestSurvey.image_url,alt:e(s).data.latestSurvey.title,class:"w-[15rem] mx-auto p-4"},null,8,C),t("h2",E,o(e(s).data.latestSurvey.title),1),t("div",L,[N,t("div",null,o(e(s).data.latestSurvey.created_at),1)]),t("div",q,[F,t("div",null,o(e(s).data.latestSurvey.expire_date),1)]),t("div",M,[R,t("div",null,o(e(s).data.latestSurvey.status?"Active":"Draft"),1)]),t("div",$,[Q,t("div",null,o(e(s).data.latestSurvey.questions_count),1)]),t("div",z,[G,t("div",null,o(e(s).data.latestSurvey.answers_count),1)]),t("div",H,[d(f,{to:{name:"SurveyView",params:{id:e(s).data.latestSurvey.id}},class:"flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"},{default:u(()=>[d(e(x),{class:"h-5 w-5 mr-2"}),I]),_:1},8,["to"]),t("button",J,[d(e(v),{class:"h-5 w-5 mr-2"}),K])])]),t("div",O,[P,(a(!0),n(b,null,g(e(s).data.latestAnswers,i=>(a(),n("a",{key:i.id,href:"#",class:"block p-2 hover:bg-gray-100/90"},[t("div",U,o(i.survey.title),1),t("small",null,[W,t("i",X,o(i.end_date),1)])]))),128))])]))]),_:1})}}};export{at as default};
