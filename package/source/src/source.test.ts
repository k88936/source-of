import { PackageData, PackageInfo, Source } from "./source";

describe('Source', () => {
    test('should generate package data', async () => {
        const source = new Source();
        const data: PackageData = await source.get();
        Object.values(data.packages).forEach((pkg: PackageInfo) => {
            console.log(pkg);
            Object.values(pkg.versions).forEach((version) => {
                console.log(version);
            });
        });
    }, 60_000
    );
});
