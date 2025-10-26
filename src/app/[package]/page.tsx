import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { findPackageByName, getPackageData } from "@/lib/source-data";

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
    return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(date);
}

export async function generateStaticParams() {
    const data = await getPackageData();
    return Object.keys(data.packages).map((packageName) => ({ package: packageName }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ package: string }>;
}): Promise<Metadata> {
    const { package: packageParam } = await params;
    const packageName = decodeParam(packageParam);
    const pkg = await findPackageByName(packageName);
    if (!pkg) {
        return { title: "Package not found" };
    }

    return {
        title: `${pkg.name} · Releases`,
        description: `Release history and README for ${pkg.name}.`,
    };
}

export default async function PackagePage({
    params,
}: {
    params: Promise<{ package: string }>;
}) {
    const { package: packageParam } = await params;
    const packageName = decodeParam(packageParam);
    const pkg = await findPackageByName(packageName);

    if (!pkg) {
        notFound();
    }

    const versionEntries = Object.entries(pkg.versions);
    const latest = versionEntries[0]?.[1];
    const releaseCount = versionEntries.length;

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 text-sm text-blue-600 dark:text-blue-400">
                <Link href="/" className="hover:underline">
                    ← All packages
                </Link>
            </div>

            <header className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {pkg.name}
                </h1>
                {latest ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Latest release {latest.version}
                        {latest.date && ` · ${formatDate(latest.date)}`}
                    </p>
                ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        No releases published yet.
                    </p>
                )}
            </header>

            <section className="space-y-3">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    Releases
                </h2>
                <div className="space-y-3">
                    {releaseCount === 0 ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-500">
                            No releases have been published for this package yet.
                        </p>
                    ) : (
                        versionEntries.map(([versionName, version]) => {
                            const fileCount = Object.keys(version.files).length;
                            return (
                                <Link
                                    key={version.version}
                                    href={`/${encodeURIComponent(pkg.name)}/${encodeURIComponent(versionName)}`}
                                    className="group block rounded-lg border border-zinc-200 bg-white/70 p-4 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-600"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-zinc-900 dark:text-zinc-50">
                                                {version.version}
                                            </p>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {fileCount} file{fileCount === 1 ? "" : "s"}
                                                {version.date && ` · ${formatDate(version.date)}`}
                                            </p>
                                        </div>
                                        <span className="text-sm text-blue-600 group-hover:underline dark:text-blue-400">
                                            View release
                                        </span>
                                    </div>
                                </Link>
                            );
                        })
                    )}
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
                    README
                </h2>
                {pkg.readme ? (
                    <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950/70 dark:text-zinc-200">
                        {pkg.readme}
                    </pre>
                ) : (
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        No README detected in the latest release.
                    </p>
                )}
            </section>
        </div>
    );
}
