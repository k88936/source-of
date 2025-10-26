import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findVersion, getPackageData } from "@/lib/source-data";

export const revalidate = 3600;

function decodeParam(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}

function formatDate(value: string | undefined): string {
    if (!value) {
        return "Unknown";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }
    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

function formatFileSize(bytes: number | undefined): string {
    if (typeof bytes !== "number" || Number.isNaN(bytes)) {
        return "–";
    }
    if (bytes === 0) {
        return "0 B";
    }
    const threshold = 1024;
    const units = ["B", "KB", "MB", "GB", "TB"];
    const exponent = Math.min(
        Math.floor(Math.log(bytes) / Math.log(threshold)),
        units.length - 1,
    );
    const value = bytes / threshold ** exponent;
    return `${value.toFixed(value >= 10 || exponent === 0 ? 0 : 1)} ${units[exponent]}`;
}

export async function generateStaticParams() {
    const data = await getPackageData();
    const params: Array<{ package: string; version: string }> = [];
    for (const [packageName, pkg] of Object.entries(data.packages)) {
        for (const versionName of Object.keys(pkg.versions)) {
            params.push({ package: packageName, version: versionName });
        }
    }
    return params;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ package: string; version: string }>;
}): Promise<Metadata> {
    const { package: packageParam, version: versionParam } = await params;
    const packageName = decodeParam(packageParam);
    const versionName = decodeParam(versionParam);
    const match = await findVersion(packageName, versionName);

    if (!match) {
        return { title: "Release not found" };
    }

    return {
        title: `${match.packageInfo.name} ${match.version.version} · Release`,
        description: `Download artifacts for ${match.packageInfo.name} ${match.version.version}.`,
    };
}

export default async function VersionPage({
    params,
}: {
    params: Promise<{ package: string; version: string }>;
}) {
    const { package: packageParam, version: versionParam } = await params;
    const packageName = decodeParam(packageParam);
    const versionName = decodeParam(versionParam);
    const match = await findVersion(packageName, versionName);

    if (!match) {
        notFound();
    }

    const { packageInfo, version } = match;
    const fileEntries = Object.values(version.files);

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400">
                <Link href="/" className="hover:underline">
                    ← All packages
                </Link>
                <Link
                    href={`/${encodeURIComponent(packageInfo.name)}`}
                    className="hover:underline"
                >
                    Back to {packageInfo.name}
                </Link>
            </div>

            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {packageInfo.name}
                    <span className="ml-3 text-base font-normal text-zinc-500 dark:text-zinc-400">
                        {version.version}
                    </span>
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Published {formatDate(version.date)}
                </p>
            </header>

            <section className="space-y-3">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    Downloads
                </h2>
                {fileEntries.length === 0 ? (
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        No files were attached to this release.
                    </p>
                ) : (
                    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-900/70">
                        <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
                            <thead className="bg-zinc-50/80 text-left uppercase tracking-wide text-xs text-zinc-500 dark:bg-zinc-900/70 dark:text-zinc-400">
                                <tr>
                                    <th className="px-4 py-3 font-medium">File</th>
                                    <th className="px-4 py-3 font-medium text-right">Size</th>
                                    <th className="px-4 py-3 font-medium text-right">Last modified</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                {fileEntries.map((file) => (
                                    <tr key={file.key} className="bg-white/70 dark:bg-zinc-900/70">
                                        <td className="px-4 py-3">
                                            <a
                                                href={file.downloadUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline dark:text-blue-400"
                                            >
                                                {file.name}
                                            </a>
                                        </td>
                                        <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">
                                            {formatFileSize(file.size)}
                                        </td>
                                        <td className="px-4 py-3 text-right text-zinc-600 dark:text-zinc-400">
                                            {file.lastModified ? formatDate(file.lastModified) : "–"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
