# Source of - Static File Distribution Site

A modern, static file distribution platform for software packages built with Vue.js and S3-compatible storage.

## Overview

Source of is a file download station designed to distribute software packages efficiently. The project generates completely static pages during build time, eliminating the need for a backend server while providing a rich user experience for browsing and downloading software packages.

## Key Features

- **Static Site Generation**: All pages are pre-built during the Vite build process
- **S3-Compatible Storage**: Uses S3 API for file storage and distribution
- **Multi-Version Support**: Handles various versioning schemes (v1.2.3, v8, build-149, etc.)
- **Embedded Documentation**: Automatically renders README files from package repositories
- **Vue.js Frontend**: Modern reactive UI with Element Plus components
- **Zero Runtime Dependencies**: No backend server required for operation

## Architecture

### Storage Structure

The project uses a flexible S3 directory structure:
```
bucket/
├── package-a/
│   ├── v1.0.0/
│   │   ├── file1.zip
│   │   ├── file2.exe
│   │   └── README.md
│   └── v2.0.0/
│       ├── file1.zip
│       └── README.md
└── package-b/
    └── latest/
        └── app.dmg
```

### Build Process

1. **Generation Phase**: During `vite build`, the generator script:
   - Connects to S3 storage
   - Discovers all packages and versions
   - Generates static Vue pages for each package/version
   - Creates routing data and metadata

2. **Static Output**: Produces a fully static site with:
   - Pre-generated Vue components in `src/generated/`
   - Package metadata in `src/data.js`
   - Dynamic routing configuration

## Site Structure

- `/` - Homepage with package listing and search
- `/package-name` - Package overview with latest version and documentation
- `/package-name/latest` - Redirects to the latest version
- `/package-name/v1.2.3` - Specific version page with downloads and documentation

## Installation & Setup

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- S3-compatible storage (AWS S3, MinIO, etc.)

### Environment Configuration

Create a `.env` file in the project root:

```env
ACCESS_KEY=your_s3_access_key
SECRET_KEY=your_s3_secret_key
BUCKET_NAME=your_bucket_name
AWS_REGION=us-east-1
S3_ENDPOINT=https://your-s3-endpoint.com  # Optional for custom endpoints
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

The build process automatically:
1. Scans your S3 bucket for packages
2. Generates static Vue pages
3. Creates optimized production assets

## Project Structure

```
├── scripts/
│   ├── generator.js              # Main page generator
│   ├── storage/
│   │   ├── s3-provider.js        # S3 storage implementation
│   │   └── storage-interface.js  # Abstract storage interface
│   └── services/
│       ├── package-service.js    # Package discovery logic
│       └── template-service.js   # Vue template generation
├── src/
│   ├── components/
│   │   └── MarkdownRenderer.vue  # README rendering component
│   ├── template/
│   │   ├── PackagePageTemplate.vue
│   │   └── VersionPageTemplate.vue
│   ├── generated/               # Auto-generated pages (git-ignored)
│   ├── data.js                 # Generated package metadata
│   ├── route.js                # Dynamic routing configuration
│   ├── App.vue
│   └── Home.vue
└── vite.config.js              # Build configuration with generator plugin
```

## Key Technologies

- **Vue 3**: Progressive JavaScript framework
- **Element Plus**: Vue 3 UI component library
- **Vue Router**: Client-side routing
- **Vite**: Build tool and development server
- **AWS SDK**: S3 client for storage operations
- **Marked**: Markdown parsing for README files

## Version Handling

The system intelligently sorts versions using a custom comparison algorithm that supports:

- Semantic versions: `v1.2.3`, `v2.0.0-alpha`
- Simple versions: `v8`, `v9`
- Build numbers: `build-149`, `build-150`
- Plain numbers: `1`, `2`, `10`

Versions are automatically sorted in descending order (newest first).

## Customization

### Adding Storage Providers

Implement the `StorageProvider` interface in `scripts/storage/` to support additional storage backends (WebDAV, FTP, etc.).

### Styling

The project uses Element Plus themes. Customize styling in component files or add global styles to `src/App.vue`.

### Package Discovery

Modify `scripts/services/package-service.js` to adjust how packages and versions are discovered from your storage structure.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build`
5. Submit a pull request

## License

This project follows standard open-source practices. Please ensure compliance with all dependencies' licenses.

## Deployment

Since this generates a static site, you can deploy to:

- GitHub Pages
- Netlify
- Vercel
- Any static hosting service
- CDN with S3 bucket

Simply run `npm run build` and deploy the `dist/` folder.

---

**Note**: This is a build-time static generator. All package discovery and page generation happens during the build process, not at runtime.
