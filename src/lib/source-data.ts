import "server-only";

import { cache } from "react";
import {
    Source,
    type PackageData,
    type PackageInfo,
    type VersionInfo,
} from "../../package/source/src/source";

const MOCK_DATA: PackageData = {
    lastUpdated: "2024-12-31T23:59:59.000Z",
    packages: {
        "alpha-toolkit": {
            name: "alpha-toolkit",
            readme: "# Alpha Toolkit\n\nLocal mock README content for testing.",
            versions: {
                "2.1.0": {
                    version: "2.1.0",
                    date: "2024-11-05T10:15:00.000Z",
                    files: {
                        "alpha-toolkit-2.1.0.zip": {
                            name: "alpha-toolkit-2.1.0.zip",
                            key: "alpha-toolkit/2.1.0/alpha-toolkit-2.1.0.zip",
                            size: 1_572_864,
                            lastModified: "2024-11-05T10:10:00.000Z",
                            downloadUrl: "https://example.com/alpha-toolkit/2.1.0.zip",
                        },
                        "README.md": {
                            name: "README.md",
                            key: "alpha-toolkit/2.1.0/README.md",
                            size: 4_096,
                            lastModified: "2024-11-05T10:11:00.000Z",
                            downloadUrl: "https://example.com/alpha-toolkit/2.1.0/README.md",
                        },
                    },
                },
                "2.0.0": {
                    version: "2.0.0",
                    date: "2024-08-12T08:00:00.000Z",
                    files: {
                        "alpha-toolkit-2.0.0.zip": {
                            name: "alpha-toolkit-2.0.0.zip",
                            key: "alpha-toolkit/2.0.0/alpha-toolkit-2.0.0.zip",
                            size: 1_310_720,
                            lastModified: "2024-08-12T07:55:00.000Z",
                            downloadUrl: "https://example.com/alpha-toolkit/2.0.0.zip",
                        },
                    },
                },
            },
        },
        "beta-service": {
            name: "beta-service",
            readme: "",
            versions: {
                latest: {
                    version: "latest",
                    date: "2025-02-02T18:30:00.000Z",
                    files: {
                        "beta-service.tar.gz": {
                            name: "beta-service.tar.gz",
                            key: "beta-service/latest/beta-service.tar.gz",
                            size: 9_437_184,
                            lastModified: "2025-02-02T18:25:00.000Z",
                            downloadUrl: "https://example.com/beta-service/latest/beta-service.tar.gz",
                        },
                    },
                },
            },
        },
    },
};

const getData = cache(async (): Promise<PackageData> => {
    return MOCK_DATA
    
    // const source = new Source();
    // return source.get();
});

export const getPackageData = getData;

export async function findPackageByName(
    packageName: string,
): Promise<PackageInfo | null> {
    const data = await getData();
    return data.packages[packageName] ?? null;
}

export async function findVersion(
    packageName: string,
    versionName: string,
): Promise<{
    packageInfo: PackageInfo;
    version: VersionInfo;
} | null> {
    const pkg = await findPackageByName(packageName);
    if (!pkg) {
        return null;
    }

    const version = pkg.versions[versionName];
    if (!version) {
        return null;
    }

    return { packageInfo: pkg, version };
}
