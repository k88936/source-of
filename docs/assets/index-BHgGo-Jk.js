import{_ as C,j as I,k as M,b as U,a as z,c as p,d as e,e as s,w as o,r as a,o as f,f as _,t as i,i as B,F as A,g as T}from"./index-DWkvJ8NR.js";import{M as R}from"./MarkdownRenderer-DHnY8NXx.js";import{J as x}from"./jszip.min-BMV9IaDn.js";const L={name:"VersionPage",components:{ArrowLeft:z,Box:U,Download:M,Document:I,MarkdownRenderer:R},data(){return{packageInfo:{name:"testapp",displayName:"testapp",description:""},versionInfo:{version:"v1",date:"2025-08-07T20:42:39.266Z",files:[{name:"README.md",key:"testapp/v1/README.md",size:3492,lastModified:"2025-08-07T20:42:39.266Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v1/README.md"},{name:"settings.ini",key:"testapp/v1/settings.ini",size:69,lastModified:"2025-08-07T20:42:39.259Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v1/settings.ini"}]},readme:`# lucknight\r
\r
这是一个类似混乱大枪战的游戏，使用了元气骑士的素材。\r
\r
* 名字来源: 元气骑士 \`soul knight\` , 加上开宝箱的抽奖元素\`luck\`\r
\r
## 我学到/用到了什么\r
\r
* Unity拆包(元气骑士素材)\r
* ECS架构\r
* 宏和模板\r
* CMake多项目\r
* 使用的库: ECS框架:\`entt\`, 预处理:\`boost_preprossor\`, 多线程:\`enkiTS\`, 物理引擎:\`box2d\`\r
* 复用了之前大作业造过的QtOpenGL轮子: QRenderer2D\r
\r
## 模块之间逻辑关系\r
\r
\`\`\`mermaid\r
graph TD\r
    World -->|管理| Scene\r
    Scene -->|管理| Components\r
    Scene -->|管理| Systems\r
    Scene -->|管理| Managers\r
    Scene -->|管理| Prefab\r
    Scene -->|管理| Scripts\r
    Components -->|提供数据| Systems\r
    Components -->|被挂载| Entities\r
    Systems -->|操作| Entities\r
    Systems -->|调用| Managers\r
    Prefab -->|生成| Entities\r
    Scripts -->|扩展| Entities\r
    Managers -->|管理| 资源与事件\r
    Type & Utils -->|被各模块调用| World\r
    Type & Utils -->|被各模块调用| Scene\r
    Type & Utils -->|被各模块调用| Components\r
    Type & Utils -->|被各模块调用| Systems\r
    Type & Utils -->|被各模块调用| Managers\r
    Type & Utils -->|被各模块调用| Prefab\r
    Type & Utils -->|被各模块调用| Scripts\r
\`\`\`\r
* 详细的结构在每个目录下有相应的README.md(是由ai生成的同时我也用来喂给ai以辅助编程)\r
## 程序运行流程\r
\r
\`\`\`mermaid\r
flowchart TD\r
    A[启动程序] --> B[初始化 World]\r
    B --> C[加载 Scene]\r
    C --> D[注册 Components/Systems/Managers]\r
    D --> E[加载 Prefab/Entities]\r
    E --> F[主循环]\r
    F --> G[处理输入]\r
    G --> H[更新 Systems]\r
    H --> I[更新 Components]\r
    I --> J[渲染 Scene]\r
    J --> F\r
    F --> K[退出条件]\r
    K --> L[释放资源并退出]\r
\`\`\`\r
\r
## 一些实现得还好的点吧\r
\r
* 利用宏和模板为脚本类和Buff类实现了自动注册.\r
* 和Qt解耦, 可以无头运行或者使用box2d的debug draw\r
\r
## 演示demo (视频里按照要求的顺序录制了各个功能的实现情况)\r
\r
<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=114914534361840&bvid=BV1UfbXz9EpA&cid=31280464831&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>\r
\r
* iframe不可用请右转 [demo](https://www.bilibili.com/video/BV1UfbXz9EpA)\r
\r
## 作业反思\r
\r
* 更多是探索性的尝试之前没接触过的/先前的大作业的遗憾吧,qt整个花里呼哨的主页之前的大作业做过, 再重复一遍自己找素材意义也不是很大.\r
  一切从简.\r
* 上次大作业oop写的类似红警的游戏, 整个一个大对象继承到天上了,整个依托. 这次(ECS)\r
  整体上采用的组合,局部里用的继承,复杂的逻辑丢脚本组件里,有复用的趋势再单独提出来一个System,心智负担少了许多.\r
* 还是和上次相比, 上次debug最多的是npe还有循环include编译不过,细节有点忘了, 这次用的单例模式(参考的Effective C++),\r
  每个system尽量做到无状态, 改善了很多...(但是模板乱套不过编译时常抓狂).\r
* 不吐不快: 作业的要求太细了, 可以自由发挥的地方不多. 就比如要求人物有下蹲的动作, 这个单从素材上就很难找, 元气骑士那小细腿你让我画也很难.\r
  说句不好听的, 就像是一个傲慢的boss给你提各种要求, 做个作业班味儿还出来了.\r
`}},computed:{totalSize(){return this.versionInfo.files?.reduce((t,n)=>t+n.size,0)||0}},async created(){},methods:{goBack(){this.$router.push(`/${this.packageInfo.name}`)},async downloadAllAsZip(){if(!this.versionInfo.files||this.versionInfo.files.length===0)return;const t=new x;await Promise.all(this.versionInfo.files.map(async c=>{try{const d=await(await fetch(c.downloadUrl)).blob();t.file(c.name,d)}catch{}}));const n=await t.generateAsync({type:"blob"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download=`${this.packageInfo.displayName||"assets"}-${this.versionInfo.version||""}.zip`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(l.href)},formatDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})},formatSize(t){if(t===0)return"0 B";const n=1024,l=["B","KB","MB","GB"],c=Math.floor(Math.log(t)/Math.log(n));return parseFloat((t/Math.pow(n,c)).toFixed(2))+" "+l[c]}}},F={class:"version-page"},N={class:"version-header"},V={class:"header-nav"},P={class:"header-content"},Z={class:"version-info"},G={class:"version-details"},J={class:"release-info"},O={class:"version-actions"},j={class:"content-section"},K={class:"assets-list"},Q={class:"asset-info"},W={class:"asset-details"},H={class:"asset-name"},X={class:"asset-meta"},q={class:"asset-actions"},Y=["href"],$={key:0,class:"readme-section"},ee={class:"sidebar"},ne={class:"info-list"},se={class:"info-item"},te={class:"info-item"},oe={class:"info-value"},re={class:"info-item"},ae={class:"info-value"},ie={class:"info-item"},le={class:"info-value"};function de(t,n,l,c,r,d){const g=a("ArrowLeft"),u=a("el-icon"),v=a("el-button"),w=a("Box"),h=a("el-main"),b=a("el-container"),S=a("Document"),k=a("MarkdownRenderer"),y=a("el-col"),D=a("el-tag"),E=a("el-row");return f(),p("div",F,[e("div",N,[s(b,null,{default:o(()=>[s(h,null,{default:o(()=>[e("div",V,[s(v,{onClick:d.goBack,text:"",type:"primary"},{default:o(()=>[s(u,null,{default:o(()=>[s(g)]),_:1}),_(" "+i(r.packageInfo.displayName),1)]),_:1},8,["onClick"])]),e("div",P,[e("div",Z,[s(u,{size:"32",class:"version-icon"},{default:o(()=>[s(w)]),_:1}),e("div",G,[e("h1",null,i(r.packageInfo.displayName)+" "+i(r.versionInfo.version),1),e("p",J,"Released on "+i(d.formatDate(r.versionInfo.date)),1)])]),e("div",O,[s(v,{type:"primary",onClick:d.downloadAllAsZip,icon:t.Download},{default:o(()=>n[0]||(n[0]=[_(" Download All as ZIP ",-1)])),_:1,__:[0]},8,["onClick","icon"])])])]),_:1})]),_:1})]),s(h,{class:"main-content"},{default:o(()=>[s(E,{gutter:20},{default:o(()=>[s(y,{span:16},{default:o(()=>[e("div",j,[n[3]||(n[3]=e("h3",null,"Artifact",-1)),e("div",K,[(f(!0),p(A,null,T(r.versionInfo.files,m=>(f(),p("div",{key:m.name,class:"asset-item"},[e("div",Q,[s(u,{size:"16",class:"asset-icon"},{default:o(()=>[s(S)]),_:1}),e("div",W,[e("div",H,i(m.name),1),e("div",X,i(d.formatSize(m.size)),1)])]),e("div",q,[e("a",{href:m.downloadUrl,target:"_blank",rel:"noopener"},[s(v,{size:"small",icon:t.Download},{default:o(()=>n[1]||(n[1]=[_(" Download ",-1)])),_:1,__:[1]},8,["icon"])],8,Y)])]))),128))]),r.readme?(f(),p("div",$,[n[2]||(n[2]=e("h3",null,"Documentation",-1)),s(k,{content:r.readme,"empty-message":"No documentation available"},null,8,["content"])])):B("",!0)])]),_:1}),s(y,{span:8},{default:o(()=>[e("div",ee,[n[8]||(n[8]=e("h4",null,"Release Information",-1)),e("div",ne,[e("div",se,[n[4]||(n[4]=e("span",{class:"info-label"},"Version",-1)),s(D,{type:"primary"},{default:o(()=>[_(i(r.versionInfo.version),1)]),_:1})]),e("div",te,[n[5]||(n[5]=e("span",{class:"info-label"},"Release Date",-1)),e("span",oe,i(d.formatDate(r.versionInfo.date)),1)]),e("div",re,[n[6]||(n[6]=e("span",{class:"info-label"},"Total Files",-1)),e("span",ae,i(r.versionInfo.files?.length||0),1)]),e("div",ie,[n[7]||(n[7]=e("span",{class:"info-label"},"Total Size",-1)),e("span",le,i(d.formatSize(d.totalSize)),1)])])])]),_:1})]),_:1})]),_:1})])}const fe=C(L,[["render",de],["__scopeId","data-v-4af8336d"]]);export{fe as default};
