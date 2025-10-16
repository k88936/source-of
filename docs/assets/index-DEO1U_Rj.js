import{_ as S,v as f,b as k,c as C,r as t,e as p,f as e,g as n,w as r,h as m,t as l,o as d,F as b,j as A,p as w,i as T}from"./app-DcCmhxe8.js";import{M as I}from"./MarkdownRenderer-D9yUTXYg.js";const N={name:"PackagePage",computed:{View(){return f}},components:{ArrowLeft:C,Box:k,View:f,MarkdownRenderer:I},data(){return{packageInfo:{name:"gold",displayName:"gold",description:"",latestVersion:"v1.0.0",versions:[{version:"v1.0.0",date:"2025-08-13T04:48:52.285Z",files:[{name:"README.md",key:"gold/v1.0.0/README.md",size:3997,lastModified:"2025-08-13T04:48:52.285Z",downloadUrl:"https://rustfs.k88936.top/software-release/gold/v1.0.0/README.md"},{name:"gold.exe",key:"gold/v1.0.0/gold.exe",size:3734016,lastModified:"2025-08-13T04:48:52.250Z",downloadUrl:"https://rustfs.k88936.top/software-release/gold/v1.0.0/gold.exe"}]}]},readme:`# Gold - Release Management Tool\r
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
`}},async created(){},methods:{goHome(){this.$router.push("/")},navigateToVersion(i){this.$router.push(`/${this.packageInfo.name}/${i}`)},viewLatest(){this.navigateToVersion(this.packageInfo.latestVersion)},formatDate(i){return new Date(i).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}}},M={class:"package-page"},R={class:"package-header"},D={class:"header-nav"},U={class:"header-content"},K={class:"package-info"},O={class:"package-details"},z={class:"package-actions"},B={class:"version-list"},G=["onClick"],V={class:"version-info"},Y={class:"version-header"},L={class:"version-meta"},F={class:"version-date"},P={class:"file-count"};function W(i,o,j,H,c,a){const v=t("ArrowLeft"),u=t("el-icon"),_=t("el-button"),E=t("Box"),g=t("el-main"),h=t("el-container"),y=t("el-tag"),x=t("el-col");return d(),p("div",M,[e("div",R,[n(h,null,{default:r(()=>[n(g,{style:{"max-width":"1200px",margin:"0 auto"}},{default:r(()=>[e("div",D,[n(_,{onClick:a.goHome,text:"",type:"primary"},{default:r(()=>[n(u,null,{default:r(()=>[n(v)]),_:1}),o[0]||(o[0]=m(" Back to releases ",-1))]),_:1},8,["onClick"])]),e("div",U,[e("div",K,[n(u,{size:"32",class:"package-icon"},{default:r(()=>[n(E)]),_:1}),e("div",O,[e("h1",null,l(c.packageInfo.displayName),1)])]),e("div",z,[n(_,{type:"primary",onClick:a.viewLatest,icon:a.View},{default:r(()=>[...o[1]||(o[1]=[m(" Latest ",-1)])]),_:1},8,["onClick","icon"])])])]),_:1})]),_:1})]),n(g,{class:"main-content"},{default:r(()=>[n(x,null,{default:r(()=>[o[3]||(o[3]=e("h4",null,"Releases",-1)),e("div",B,[(d(!0),p(b,null,A(c.packageInfo.versions,s=>(d(),p("div",{key:s.version,class:"version-item",onClick:$=>a.navigateToVersion(s.version)},[e("div",V,[e("div",Y,[e("strong",null,l(s.version),1),s.version===c.packageInfo.latestVersion?(d(),w(y,{key:0,size:"small",type:"success"},{default:r(()=>[...o[2]||(o[2]=[m("Latest ",-1)])]),_:1})):T("",!0)]),e("div",L,[e("span",F,l(a.formatDate(s.date)),1),e("span",P,l(s.files?.length||0)+" files",1)])])],8,G))),128))])]),_:1})]),_:1})])}const J=S(N,[["render",W],["__scopeId","data-v-a9e87105"]]);export{J as default};
