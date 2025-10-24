import{_ as y,v as f,b as x,c as C,r as o,e as p,o as r,f as e,g as n,w as t,h as u,t as d,F as B,j as D,p as M,i as E}from"./index-CoHSCJZ5.js";import{M as S}from"./MarkdownRenderer-CiPR-VtB.js";const A={name:"PackagePage",computed:{View(){return f}},components:{ArrowLeft:C,Box:x,View:f,MarkdownRenderer:S},data(){return{packageInfo:{name:"testapp",displayName:"testapp",description:"",latestVersion:"v2",versions:[{version:"v2",date:"2025-08-08T15:57:56.760Z",files:[{name:"LICENSE",key:"testapp/v2/LICENSE",size:1067,lastModified:"2025-08-08T15:57:56.760Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v2/LICENSE"},{name:"README.md",key:"testapp/v2/README.md",size:3382,lastModified:"2025-08-08T15:57:55.292Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v2/README.md"}]},{version:"v1",date:"2025-08-07T20:42:39.266Z",files:[{name:"README.md",key:"testapp/v1/README.md",size:3492,lastModified:"2025-08-07T20:42:39.266Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v1/README.md"},{name:"settings.ini",key:"testapp/v1/settings.ini",size:69,lastModified:"2025-08-07T20:42:39.259Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/testapp/v1/settings.ini"}]}]},readme:`![Box2D Logo](https://box2d.org/images/logo.svg)

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
`}},async created(){},methods:{goHome(){this.$router.push("/")},navigateToVersion(l){this.$router.push(`/${this.packageInfo.name}/${l}`)},viewLatest(){this.navigateToVersion(this.packageInfo.latestVersion)},formatDate(l){return new Date(l).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}}},I={class:"package-page"},L={class:"package-header"},T={class:"header-nav"},R={class:"header-content"},V={class:"package-info"},N={class:"package-details"},P={class:"package-actions"},z={class:"version-list"},G=["onClick"],j={class:"version-info"},H={class:"version-header"},O={class:"version-meta"},F={class:"version-date"},W={class:"file-count"};function Z(l,s,U,Y,c,a){const _=o("ArrowLeft"),m=o("el-icon"),h=o("el-button"),b=o("Box"),g=o("el-main"),v=o("el-container"),k=o("el-tag"),w=o("el-col");return r(),p("div",I,[e("div",L,[n(v,null,{default:t(()=>[n(g,null,{default:t(()=>[e("div",T,[n(h,{onClick:a.goHome,text:"",type:"primary"},{default:t(()=>[n(m,null,{default:t(()=>[n(_)]),_:1}),s[0]||(s[0]=u(" Back to releases ",-1))]),_:1,__:[0]},8,["onClick"])]),e("div",R,[e("div",V,[n(m,{size:"32",class:"package-icon"},{default:t(()=>[n(b)]),_:1}),e("div",N,[e("h1",null,d(c.packageInfo.displayName),1)])]),e("div",P,[n(h,{type:"primary",onClick:a.viewLatest,icon:a.View},{default:t(()=>s[1]||(s[1]=[u(" Latest ",-1)])),_:1,__:[1]},8,["onClick","icon"])])])]),_:1})]),_:1})]),n(g,{class:"main-content"},{default:t(()=>[n(w,null,{default:t(()=>[s[3]||(s[3]=e("h4",null,"Releases",-1)),e("div",z,[(r(!0),p(B,null,D(c.packageInfo.versions,i=>(r(),p("div",{key:i.version,class:"version-item",onClick:q=>a.navigateToVersion(i.version)},[e("div",j,[e("div",H,[e("strong",null,d(i.version),1),i.version===c.packageInfo.latestVersion?(r(),M(k,{key:0,size:"small",type:"success"},{default:t(()=>s[2]||(s[2]=[u("Latest ",-1)])),_:1,__:[2]})):E("",!0)]),e("div",O,[e("span",F,d(a.formatDate(i.date)),1),e("span",W,d(i.files?.length||0)+" files",1)])])],8,G))),128))])]),_:1,__:[3]})]),_:1})])}const $=y(A,[["render",Z],["__scopeId","data-v-3afcc325"]]);export{$ as default};
