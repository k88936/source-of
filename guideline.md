# File Download Site Requirements

## Overview

- The site is a file download station to distribute software packages.
- Backend uses S3; frontend directly calls S3 API.
- To save S3 bandwidth, all pages should be **pre-built** (query backend to get a list of info, then generate src vue in src/generated; support incremental builds it should gen a data.js in src).
- Pages must be static and built **only** during the Vite build step.
- No extra steps or cognitive burden except vite build.
- The build process should be a standalone script for easy debugging (invoked by vite).
- a software package directory (for one version) can contain multiple files, github release alike

## Storage Design

- You should design the convention for software package directories in the S3 bucket.
- The convention must be flexible (providing a common interface, for s3 , webdav for easy switch).
- Parsing of specific strings should use variables for easy config.
- Must support multiple versioning schemes (e.g., `v1.2.3`, `v8`, etc.).

## Frontend
- Use Vue framework for pages.
- use element-plus for UI components.
- Must support:
    - Historical versions
    - Embedded documentation is rendered from the software repository's README **if it has** one in the version directory.
- site structure:
    - / - homepage , with a list of software packages
        - /package-a - package A page, displaying the latest version and the embedded documentation, with a list of all versions
            - /package-a/latest - version page, with download links and embedded documentation
            - /package-a/v8 - 
- Pages only need to provide S3 permanent links for downloads, no backend needed.