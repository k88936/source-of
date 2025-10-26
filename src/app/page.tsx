import Link from "next/link";
import { getPackageData } from "@/lib/source-data";

export const revalidate = 3600;

function formatDateTime(value: string | undefined): string {
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

export default async function Home() {
    const data = await getPackageData();
    const packageEntries = Object.entries(data.packages).sort(([a], [b]) => a.localeCompare(b));

    return (
        <div className="space-y-10">
            <section className="space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Release Catalog
                </h1>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                    Browse statically generated release notes and download artifacts for every
                    package in your storage bucket.
                </p>
                <p className="text-sm text-zinc-500 dark:text-zinc-500">
                    Last updated: {formatDateTime(data.lastUpdated)}
                </p>
            </section>

            {packageEntries.length === 0 ? (
                <div className="rounded-lg border border-dashed border-zinc-300 bg-white/60 p-8 text-center text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
                    No packages found. Add artifacts to your storage provider and rebuild to see
                    them here.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {packageEntries.map(([, pkg]) => {
                        const versionList = Object.values(pkg.versions);
                        const latest = versionList[0];
                        const releaseCount = Object.keys(pkg.versions).length;
                        return (
                            <Link
                                key={pkg.name}
                                href={`/${encodeURIComponent(pkg.name)}`}
                                className="group block rounded-lg border border-zinc-200 bg-white/70 p-6 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:border-zinc-600"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-medium text-zinc-900 transition group-hover:text-zinc-950 dark:text-zinc-50 dark:group-hover:text-white">
                                        {pkg.name}
                                    </h2>
                                    <span className="text-sm text-blue-600 group-hover:underline dark:text-blue-400">
                                        View
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    {releaseCount} release{releaseCount === 1 ? "" : "s"}
                                </p>
                                {latest ? (
                                    <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">
                                        Latest: {latest.version}
                                        {latest.date && " • "}
                                        {latest.date && formatDateTime(latest.date)}
                                    </p>
                                ) : (
                                    <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                                        No releases published yet.
                                    </p>
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
