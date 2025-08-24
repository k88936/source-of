import{_ as C,j as I,k as S,b as M,a as A,c as u,d as e,e as s,w as t,r as a,o as m,f,t as l,i as E,F as R,g as L}from"./index-DWkvJ8NR.js";import{M as z}from"./MarkdownRenderer-DHnY8NXx.js";import{J as T}from"./jszip.min-BMV9IaDn.js";const N={name:"VersionPage",components:{ArrowLeft:A,Box:M,Download:S,Document:I,MarkdownRenderer:z},data(){return{packageInfo:{name:"testapp",displayName:"testapp",description:""},versionInfo:{version:"v2",date:"2025-08-08T15:57:56.760Z",files:[{name:"LICENSE",key:"testapp/v2/LICENSE",size:1067,lastModified:"2025-08-08T15:57:56.760Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v2/LICENSE"},{name:"README.md",key:"testapp/v2/README.md",size:3382,lastModified:"2025-08-08T15:57:55.292Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v2/README.md"}]},readme:`![Box2D Logo](https://box2d.org/images/logo.svg)

# Build Status
[![Build Status](https://github.com/erincatto/box2d/actions/workflows/build.yml/badge.svg)](https://github.com/erincatto/box2d/actions)

# Box2D 
Box2D is a 2D physics engine for games.

[![Box2D Version 3.0 Release Demo](https://img.youtube.com/vi/dAoM-xjOWtA/0.jpg)](https://www.youtube.com/watch?v=dAoM-xjOWtA)

## Features

### Collision
- Continuous collision detection
- Contact events
- Convex polygons, capsules, circles, rounded polygons, segments, and chains
- Multiple shapes per body
- Collision filtering
- Ray casts, shape casts, and overlap queries
- Sensor system

### Physics
- Robust _Soft Step_ rigid body solver
- Continuous physics for fast translations and rotations
- Island based sleep
- Revolute, prismatic, distance, mouse joint, weld, and wheel joints
- Joint limits, motors, springs, and friction
- Joint and contact forces
- Body movement events and sleep notification

### System
- Data-oriented design
- Written in portable C17
- Extensive multithreading and SIMD
- Optimized for large piles of bodies

### Samples
- OpenGL with GLFW and enkiTS
- Graphical user interface with imgui
- Many samples to demonstrate features and performance

## Building for Visual Studio
- Install [CMake](https://cmake.org/)
- Ensure CMake is in the user \`PATH\`
- Run \`create_sln.bat\`
- Open and build \`build/box2d.sln\`

## Building for Linux
- Run \`build.sh\` from a bash shell
- Results are in the build sub-folder

## Building for Xcode
- Install [CMake](https://cmake.org)
- Add Cmake to the path in .zprofile (the default Terminal shell is zsh)
    - export PATH="/Applications/CMake.app/Contents/bin:$PATH"
- mkdir build
- cd build
- cmake -G Xcode ..
- Open \`box2d.xcodeproj\`
- Select the samples scheme
- Build and run the samples

## Building and installing
- mkdir build
- cd build
- cmake ..
- cmake --build . --config Release
- cmake --install . (might need sudo)

## Compatibility
The Box2D library and samples build and run on Windows, Linux, and Mac.

You will need a compiler that supports C17 to build the Box2D library.

You will need a compiler that supports C++20 to build the samples.

Box2D uses SSE2 and Neon SIMD math to improve performance. This can be disabled by defining \`BOX2D_DISABLE_SIMD\`.

## Documentation
- [Manual](https://box2d.org/documentation/)
- [Migration Guide](https://github.com/erincatto/box2d/blob/main/docs/migration.md)

## Community
- [Discord](https://discord.gg/NKYgCBP)

## Contributing
Please do not submit pull requests. Instead, please file an issue for bugs or feature requests. For support, please visit the Discord server.

# Giving Feedback
Please file an issue or start a chat on discord. You can also use [GitHub Discussions](https://github.com/erincatto/box2d/discussions).

## License
Box2D is developed by Erin Catto and uses the [MIT license](https://en.wikipedia.org/wiki/MIT_License).

## Sponsorship
Support development of Box2D through [Github Sponsors](https://github.com/sponsors/erincatto).

Please consider starring this repository and subscribing to my [YouTube channel](https://www.youtube.com/@erin_catto).

## External ports, wrappers, and bindings (unsupported)
- Beef bindings - https://github.com/EnokViking/Box2DBeef
- C++ bindings - https://github.com/HolyBlackCat/box2cpp
- WASM - https://github.com/Birch-san/box2d3-wasm
`}},computed:{totalSize(){return this.versionInfo.files?.reduce((o,n)=>o+n.size,0)||0}},async created(){},methods:{goBack(){this.$router.push(`/${this.packageInfo.name}`)},async downloadAllAsZip(){if(!this.versionInfo.files||this.versionInfo.files.length===0)return;const o=new T;await Promise.all(this.versionInfo.files.map(async c=>{try{const d=await(await fetch(c.downloadUrl)).blob();o.file(c.name,d)}catch{}}));const n=await o.generateAsync({type:"blob"}),r=document.createElement("a");r.href=URL.createObjectURL(n),r.download=`${this.packageInfo.displayName||"assets"}-${this.versionInfo.version||""}.zip`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(r.href)},formatDate(o){return new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})},formatSize(o){if(o===0)return"0 B";const n=1024,r=["B","KB","MB","GB"],c=Math.floor(Math.log(o)/Math.log(n));return parseFloat((o/Math.pow(n,c)).toFixed(2))+" "+r[c]}}},P={class:"version-page"},j={class:"version-header"},F={class:"header-nav"},G={class:"header-content"},O={class:"version-info"},U={class:"version-details"},V={class:"release-info"},Z={class:"version-actions"},W={class:"content-section"},H={class:"assets-list"},Y={class:"asset-info"},J={class:"asset-details"},q={class:"asset-name"},X={class:"asset-meta"},K={class:"asset-actions"},Q=["href"],$={key:0,class:"readme-section"},ee={class:"sidebar"},ne={class:"info-list"},se={class:"info-item"},oe={class:"info-item"},te={class:"info-value"},ie={class:"info-item"},ae={class:"info-value"},le={class:"info-item"},re={class:"info-value"};function de(o,n,r,c,i,d){const v=a("ArrowLeft"),h=a("el-icon"),_=a("el-button"),w=a("Box"),b=a("el-main"),k=a("el-container"),y=a("Document"),D=a("MarkdownRenderer"),g=a("el-col"),x=a("el-tag"),B=a("el-row");return m(),u("div",P,[e("div",j,[s(k,null,{default:t(()=>[s(b,null,{default:t(()=>[e("div",F,[s(_,{onClick:d.goBack,text:"",type:"primary"},{default:t(()=>[s(h,null,{default:t(()=>[s(v)]),_:1}),f(" "+l(i.packageInfo.displayName),1)]),_:1},8,["onClick"])]),e("div",G,[e("div",O,[s(h,{size:"32",class:"version-icon"},{default:t(()=>[s(w)]),_:1}),e("div",U,[e("h1",null,l(i.packageInfo.displayName)+" "+l(i.versionInfo.version),1),e("p",V,"Released on "+l(d.formatDate(i.versionInfo.date)),1)])]),e("div",Z,[s(_,{type:"primary",onClick:d.downloadAllAsZip,icon:o.Download},{default:t(()=>n[0]||(n[0]=[f(" Download All as ZIP ",-1)])),_:1,__:[0]},8,["onClick","icon"])])])]),_:1})]),_:1})]),s(b,{class:"main-content"},{default:t(()=>[s(B,{gutter:20},{default:t(()=>[s(g,{span:16},{default:t(()=>[e("div",W,[n[3]||(n[3]=e("h3",null,"Artifact",-1)),e("div",H,[(m(!0),u(R,null,L(i.versionInfo.files,p=>(m(),u("div",{key:p.name,class:"asset-item"},[e("div",Y,[s(h,{size:"16",class:"asset-icon"},{default:t(()=>[s(y)]),_:1}),e("div",J,[e("div",q,l(p.name),1),e("div",X,l(d.formatSize(p.size)),1)])]),e("div",K,[e("a",{href:p.downloadUrl,target:"_blank",rel:"noopener"},[s(_,{size:"small",icon:o.Download},{default:t(()=>n[1]||(n[1]=[f(" Download ",-1)])),_:1,__:[1]},8,["icon"])],8,Q)])]))),128))]),i.readme?(m(),u("div",$,[n[2]||(n[2]=e("h3",null,"Documentation",-1)),s(D,{content:i.readme,"empty-message":"No documentation available"},null,8,["content"])])):E("",!0)])]),_:1}),s(g,{span:8},{default:t(()=>[e("div",ee,[n[8]||(n[8]=e("h4",null,"Release Information",-1)),e("div",ne,[e("div",se,[n[4]||(n[4]=e("span",{class:"info-label"},"Version",-1)),s(x,{type:"primary"},{default:t(()=>[f(l(i.versionInfo.version),1)]),_:1})]),e("div",oe,[n[5]||(n[5]=e("span",{class:"info-label"},"Release Date",-1)),e("span",te,l(d.formatDate(i.versionInfo.date)),1)]),e("div",ie,[n[6]||(n[6]=e("span",{class:"info-label"},"Total Files",-1)),e("span",ae,l(i.versionInfo.files?.length||0),1)]),e("div",le,[n[7]||(n[7]=e("span",{class:"info-label"},"Total Size",-1)),e("span",re,l(d.formatSize(d.totalSize)),1)])])])]),_:1})]),_:1})]),_:1})])}const me=C(N,[["render",de],["__scopeId","data-v-63f5ab0b"]]);export{me as default};
