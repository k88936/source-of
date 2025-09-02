import{_ as k,d as A,a as I,b as D,c as R,r as a,e as m,o as f,f as e,g as o,w as s,h as _,t as i,i as M,F as N,j as z}from"./index-DP7wqvKt.js";import{M as T}from"./MarkdownRenderer-_ojAhGA1.js";import{J as U}from"./jszip.min-CPHBuX7a.js";const B={name:"VersionPage",components:{ArrowLeft:R,Box:D,Download:I,Document:A,MarkdownRenderer:T},data(){return{packageInfo:{name:"gold",displayName:"gold",description:""},versionInfo:{version:"v1.0.0",date:"2025-08-13T04:48:52.285Z",files:[{name:"README.md",key:"gold/v1.0.0/README.md",size:3997,lastModified:"2025-08-13T04:48:52.285Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/gold/v1.0.0/README.md"},{name:"gold.exe",key:"gold/v1.0.0/gold.exe",size:3734016,lastModified:"2025-08-13T04:48:52.250Z",downloadUrl:"http://10te47kl27611.vicp.fun:19000/software-release/gold/v1.0.0/gold.exe"}]},readme:`# Gold - Release Management Tool\r
\r
Gold is a command-line tool for uploading software release assets to cloud storage backends like S3.\r
\r
## Features\r
\r
- [x] Upload files to S3-compatible storage (AWS S3, MinIO, etc.)\r
- [x] Glob pattern support for file selection (\`*.zip\`, \`dist/*\`, \`**/*.exe\`)\r
- [x] Content type detection for various file formats\r
- [x] Duplicate file detection and skipping\r
- [x] Custom display names for files\r
- [x] Configuration via environment variables or command-line overrides\r
- [x] Comprehensive error handling and validation\r
\r
## Installation\r
\r
\`\`\`bash\r
cargo install --path .\r
\`\`\`\r
\r
## Configuration\r
\r
Gold requires the following environment variables:\r
\r
- \`ACCESS_KEY\` - S3 access key ID\r
- \`SECRET_KEY\` - S3 secret access key\r
- \`BUCKET_NAME\` - S3 bucket name\r
- \`AWS_REGION\` - AWS region (default: us-east-1)\r
- \`S3_ENDPOINT\` - Custom S3 endpoint (optional, for MinIO or other S3-compatible services)\r
\r
### Example .env file\r
\r
\`\`\`env\r
ACCESS_KEY=your_access_key_here\r
SECRET_KEY=your_secret_key_here\r
BUCKET_NAME=my-releases-bucket\r
AWS_REGION=us-west-2\r
S3_ENDPOINT=http://localhost:9000\r
\`\`\`\r
\r
## Usage\r
\r
### Basic Usage\r
\r
Upload a single file:\r
\`\`\`bash\r
gold upload myapp v1.0.0 target/release/myapp.exe\r
\`\`\`\r
\r
Upload multiple files:\r
\`\`\`bash\r
gold upload myapp v1.0.0 target/release/myapp.exe README.md\r
\`\`\`\r
\r
### Glob Patterns\r
\r
Upload all ZIP files in a directory:\r
\`\`\`bash\r
gold upload myapp v1.0.0 "dist/*.zip"\r
\`\`\`\r
\r
Upload all files recursively:\r
\`\`\`bash\r
gold upload myapp v1.0.0 "dist/**/*"\r
\`\`\`\r
\r
Upload files with specific extensions:\r
\`\`\`bash\r
gold upload myapp v1.0.0 "*.{exe,zip,tar.gz}"\r
\`\`\`\r
\r
### Custom Display Names\r
\r
You can specify custom display names for files using the \`#\` separator:\r
\`\`\`bash\r
gold upload myapp v1.0.0 "target/release/myapp.exe#Main Application"\r
\`\`\`\r
\r
### Configuration Overrides\r
\r
Override configuration values from the command line:\r
\`\`\`bash\r
gold upload myapp v1.0.0 file.zip --config BUCKET_NAME=different-bucket --config AWS_REGION=eu-west-1\r
\`\`\`\r
\r
## File Organization\r
\r
Files are uploaded to S3 with the following key structure:\r
\`\`\`\r
{package_name}/{tag}/{filename}\r
\`\`\`\r
\r
For example:\r
- Package: \`myapp\`\r
- Tag: \`v1.0.0\` \r
- File: \`myapp.exe\`\r
- S3 Key: \`myapp/v1.0.0/myapp.exe\`\r
\r
## Supported File Types\r
\r
Gold automatically detects content types for common file formats:\r
\r
- Archives: \`.zip\`, \`.tar\`, \`.gz\`\r
- Executables: \`.exe\`, \`.msi\`, \`.dmg\`, \`.deb\`, \`.rpm\`\r
- Documents: \`.json\`, \`.txt\`, \`.md\`\r
- Default: \`application/octet-stream\`\r
\r
## Error Handling\r
\r
Gold provides detailed error messages for common issues:\r
\r
- Missing or invalid configuration\r
- Network connectivity problems\r
- File not found errors\r
- Invalid glob patterns\r
- S3 permission issues\r
\r
## Examples\r
\r
### Uploading a Release\r
\r
\`\`\`bash\r
# Set up environment\r
export ACCESS_KEY=your_key\r
export SECRET_KEY=your_secret\r
export BUCKET_NAME=releases\r
export AWS_REGION=us-east-1\r
\r
# Upload release assets\r
gold upload myproject v2.1.0 \\\r
  "dist/myproject-*.zip" \\\r
  "docs/README.md#Documentation" \\\r
  "CHANGELOG.md"\r
\`\`\`\r
\r
### Using with MinIO\r
\r
\`\`\`bash\r
# Configure for MinIO\r
export ACCESS_KEY=minioaccess\r
export SECRET_KEY=miniosecret\r
export BUCKET_NAME=releases\r
export AWS_REGION=us-east-1\r
export S3_ENDPOINT=http://localhost:9000\r
\r
gold upload myapp v1.0.0 "*.zip"\r
\`\`\`\r
\r
### CI/CD Integration\r
\r
\`\`\`yaml\r
# GitHub Actions example\r
- name: Upload Release Assets\r
  env:\r
    ACCESS_KEY: \${{ secrets.S3_ACCESS_KEY }}\r
    SECRET_KEY: \${{ secrets.S3_SECRET_KEY }}\r
    BUCKET_NAME: my-releases\r
    AWS_REGION: us-west-2\r
  run: |\r
    gold upload \${{ github.event.repository.name }} \${{ github.ref_name }} \\\r
      "dist/*.zip" \\\r
      "dist/*.tar.gz" \\\r
      "README.md#Documentation"\r
\`\`\`\r
\r
## Development\r
\r
### Running Tests\r
\r
\`\`\`bash\r
cargo test\r
\`\`\`\r
\r
### Building\r
\r
\`\`\`bash\r
cargo build --release\r
\`\`\`\r
\r
## License\r
\r
This project is licensed under the MIT License.\r
`}},computed:{totalSize(){return this.versionInfo.files?.reduce((r,n)=>r+n.size,0)||0}},async created(){},methods:{goBack(){this.$router.push(`/${this.packageInfo.name}`)},async downloadAllAsZip(){if(!this.versionInfo.files||this.versionInfo.files.length===0)return;const r=new U;await Promise.all(this.versionInfo.files.map(async c=>{try{const d=await(await fetch(c.downloadUrl)).blob();r.file(c.name,d)}catch{}}));const n=await r.generateAsync({type:"blob"}),l=document.createElement("a");l.href=URL.createObjectURL(n),l.download=`${this.packageInfo.displayName||"assets"}-${this.versionInfo.version||""}.zip`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(l.href)},formatDate(r){return new Date(r).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})},formatSize(r){if(r===0)return"0 B";const n=1024,l=["B","KB","MB","GB"],c=Math.floor(Math.log(r)/Math.log(n));return parseFloat((r/Math.pow(n,c)).toFixed(2))+" "+l[c]}}},K={class:"version-page"},O={class:"version-header"},G={class:"header-nav"},Y={class:"header-content"},F={class:"version-info"},L={class:"version-details"},P={class:"release-info"},W={class:"version-actions"},Z={class:"content-section"},j={class:"assets-list"},V={class:"asset-info"},H={class:"asset-details"},J={class:"asset-name"},q={class:"asset-meta"},Q={class:"asset-actions"},X=["href"],$={key:0,class:"readme-section"},ee={class:"sidebar"},ne={class:"info-list"},oe={class:"info-item"},re={class:"info-item"},se={class:"info-value"},te={class:"info-item"},ae={class:"info-value"},ie={class:"info-item"},le={class:"info-value"};function de(r,n,l,c,t,d){const E=a("ArrowLeft"),u=a("el-icon"),v=a("el-button"),y=a("Box"),g=a("el-main"),S=a("el-container"),b=a("Document"),x=a("MarkdownRenderer"),h=a("el-col"),C=a("el-tag"),w=a("el-row");return f(),m("div",K,[e("div",O,[o(S,null,{default:s(()=>[o(g,{style:{"max-width":"1200px",margin:"0 auto"}},{default:s(()=>[e("div",G,[o(v,{onClick:d.goBack,text:"",type:"primary"},{default:s(()=>[o(u,null,{default:s(()=>[o(E)]),_:1}),_(" "+i(t.packageInfo.displayName),1)]),_:1},8,["onClick"])]),e("div",Y,[e("div",F,[o(u,{size:"32",class:"version-icon"},{default:s(()=>[o(y)]),_:1}),e("div",L,[e("h1",null,i(t.packageInfo.displayName)+" "+i(t.versionInfo.version),1),e("p",P,"Released on "+i(d.formatDate(t.versionInfo.date)),1)])]),e("div",W,[o(v,{type:"primary",onClick:d.downloadAllAsZip,icon:r.Download},{default:s(()=>n[0]||(n[0]=[_(" Download All as ZIP ",-1)])),_:1,__:[0]},8,["onClick","icon"])])])]),_:1})]),_:1})]),o(g,{class:"main-content"},{default:s(()=>[o(w,{gutter:20},{default:s(()=>[o(h,{span:16},{default:s(()=>[e("div",Z,[n[3]||(n[3]=e("h3",null,"Artifact",-1)),e("div",j,[(f(!0),m(N,null,z(t.versionInfo.files,p=>(f(),m("div",{key:p.name,class:"asset-item"},[e("div",V,[o(u,{size:"16",class:"asset-icon"},{default:s(()=>[o(b)]),_:1}),e("div",H,[e("div",J,i(p.name),1),e("div",q,i(d.formatSize(p.size)),1)])]),e("div",Q,[e("a",{href:p.downloadUrl,target:"_blank",rel:"noopener"},[o(v,{size:"small",icon:r.Download},{default:s(()=>n[1]||(n[1]=[_(" Download ",-1)])),_:1,__:[1]},8,["icon"])],8,X)])]))),128))]),t.readme?(f(),m("div",$,[n[2]||(n[2]=e("h3",null,"Documentation",-1)),o(x,{content:t.readme,"empty-message":"No documentation available"},null,8,["content"])])):M("",!0)])]),_:1}),o(h,{span:8},{default:s(()=>[e("div",ee,[n[8]||(n[8]=e("h4",null,"Release Information",-1)),e("div",ne,[e("div",oe,[n[4]||(n[4]=e("span",{class:"info-label"},"Version",-1)),o(C,{type:"primary"},{default:s(()=>[_(i(t.versionInfo.version),1)]),_:1})]),e("div",re,[n[5]||(n[5]=e("span",{class:"info-label"},"Release Date",-1)),e("span",se,i(d.formatDate(t.versionInfo.date)),1)]),e("div",te,[n[6]||(n[6]=e("span",{class:"info-label"},"Total Files",-1)),e("span",ae,i(t.versionInfo.files?.length||0),1)]),e("div",ie,[n[7]||(n[7]=e("span",{class:"info-label"},"Total Size",-1)),e("span",le,i(d.formatSize(d.totalSize)),1)])])])]),_:1})]),_:1})]),_:1})])}const fe=k(B,[["render",de],["__scopeId","data-v-8ee1d33d"]]);export{fe as default};
