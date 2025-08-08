/**
 * Template Generator - Creates Vue pages from template components
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class TemplateService {
    constructor() {
        this.templatesDir = path.resolve(__dirname, '../../src/template');
        this.packageTemplate = this.loadTemplate('PackagePageTemplate.vue');
        this.versionTemplate = this.loadTemplate('VersionPageTemplate.vue');
    }

    loadTemplate(templateName) {
        const templatePath = path.join(this.templatesDir, templateName);
        return fs.readFileSync(templatePath, 'utf-8');
    }

    generatePackagePage(pkg, readme) {
        let content = this.packageTemplate;

        // Inject package data
        content = content.replace(
            'packageInfo: {}',
            `packageInfo: ${JSON.stringify(pkg, null, 6)}`
        );

        // Inject README loading logic
        const readmeContent = JSON.stringify(readme);
        content = content.replace(
            'readme: null',
            `readme: ${readmeContent}`
        );

        return content;
    }

    generateVersionPage(pkg, version, readme) {
        let content = this.versionTemplate;

        // Inject package info
        const packageInfo = {
            name: pkg.name,
            displayName: pkg.displayName || pkg.name,
            description: pkg.description || ''
        };

        content = content.replace(
            'packageInfo: {}',
            `packageInfo: ${JSON.stringify(packageInfo, null, 6)}`
        );

        // Inject version info
        content = content.replace(
            'versionInfo: {}',
            `versionInfo: ${JSON.stringify(version, null, 6)}`
        );

        // Inject README loading logic
        const readmeContent = JSON.stringify(readme);
        content = content.replace(
            'readme: null',
            `readme: ${readmeContent}`
        );

        return content;
    }
}
