import {PackageInfo, Source} from "./source";

describe('Source', () => {
    test('should generate package data', async () => {
            const source = new Source();
            const data = await source.get();
            data.packages.forEach((pkg: PackageInfo) => {
                console.log(pkg)
                pkg.versions.forEach((version) => {
                    console.log(version)
                })
            })
        }, 60_000
    );
});
