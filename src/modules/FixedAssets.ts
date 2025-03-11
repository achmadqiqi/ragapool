export enum DepreciationMethod {
        StraightLine = 'STRAIGHT_LINE',
        DecliningBalance = 'DECLINING_BALANCE'
    }

    export interface FixedAsset {
        id: string;
        name: string;
        acquisitionDate: Date;
        startUseDate: Date;
        acquisitionValue: number;
        usefulLife: number; // dalam tahun
        depreciationMethod: DepreciationMethod;
        depreciationValue?: number; // nilai penyusutan hingga saat ini
        depreciationHistory?: { date: Date; amount: number }[]; // Add depreciation history
    }

    export class FixedAssetsManager {
        private assets: FixedAsset[] = []; // Simulate persistence with a class property

        addAsset(asset: FixedAsset): void {
            this.assets.push(asset);
        }

        updateAsset(updatedAsset: FixedAsset): void {
          const index = this.assets.findIndex(a => a.id === updatedAsset.id);
          if (index !== -1) {
            this.assets[index] = updatedAsset;
          }
        }

        deleteAsset(assetId: string): void {
          this.assets = this.assets.filter(a => a.id !== assetId);
        }

        listAssets(): FixedAsset[] {
            return this.assets;
        }

        getAsset(id: string): FixedAsset | undefined {
          return this.assets.find(a => a.id === id);
        }

        calculateDepreciation(assetId: string, asOfDate: Date): number | null {
            const asset = this.assets.find(a => a.id === assetId);
            if (!asset) return null;

            const yearsUsed = (asOfDate.getTime() - asset.startUseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

            let depreciation = 0;
            switch (asset.depreciationMethod) {
                case DepreciationMethod.StraightLine:
                    depreciation = (asset.acquisitionValue * Math.min(yearsUsed, asset.usefulLife)) / asset.usefulLife;
                    break;
                case DepreciationMethod.DecliningBalance:
                    let bookValue = asset.acquisitionValue;
                    let totalDepreciation = 0;
                    // Use the history to calculate the correct book value.
                    if (asset.depreciationHistory && asset.depreciationHistory.length > 0) {
                      for (const entry of asset.depreciationHistory) {
                        totalDepreciation += entry.amount;
                      }
                      bookValue = asset.acquisitionValue - totalDepreciation;
                    }

                    const rate = 2 / asset.usefulLife;
                    const currentYearDepreciation = bookValue * rate;

                    // Only calculate for the current year
                    if(yearsUsed > asset.depreciationHistory?.length!) {
                      depreciation = currentYearDepreciation;
                    }

                    break;
                default:
                    return null; // Or throw an error, depending on your needs.
            }

            // Update the depreciation history
            if (!asset.depreciationHistory) {
              asset.depreciationHistory = [];
            }

            // Only add to the history if it's a new calculation
            if(yearsUsed > asset.depreciationHistory.length) {
              asset.depreciationHistory.push({ date: asOfDate, amount: depreciation });
            }

            asset.depreciationValue = depreciation; // Update current depreciation value
            return depreciation;
        }

        // New methods for dashboard summary
        getTotalAcquisitionCost(): number {
          return this.assets.reduce((sum, asset) => sum + asset.acquisitionValue, 0);
        }

        getTotalAccumulatedDepreciation(): number {
          return this.assets.reduce((sum, asset) => sum + (asset.depreciationValue || 0), 0);
        }

        getNetBookValue(): number {
          return this.getTotalAcquisitionCost() - this.getTotalAccumulatedDepreciation();
        }
    }
