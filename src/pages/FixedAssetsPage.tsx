import React, { useState, useEffect } from 'react';
    import PageTransition from '@/components/layout/PageTransition';
    import { motion } from 'framer-motion';
    import FixedAssetList from '@/components/fixed-assets/FixedAssetList';
    import FixedAssetForm from '@/components/fixed-assets/FixedAssetForm';
    import FixedAssetDetails from '@/components/fixed-assets/FixedAssetDetails';
    import { FixedAsset, FixedAssetsManager } from '@/modules/FixedAssets';
    import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
    import DepreciationScheduleReport from '@/components/fixed-assets/DepreciationScheduleReport';
    import { FileText } from 'lucide-react';

    const FixedAssetsPage = () => {
      const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
      const [assets, setAssets] = useState<FixedAsset[]>([]);
      const [loading, setLoading] = useState(false);
      const [activeTab, setActiveTab] = useState('list'); // Add activeTab state
      const fixedAssetsManager = new FixedAssetsManager();

      useEffect(() => {
        setLoading(true);
        const timeoutId = setTimeout(() => {
          const storedAssets = getStoredAssets();
          if (storedAssets.length > 0) {
            setAssets(storedAssets);
          }
          setLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
      }, []);

      const handleAddAsset = () => {
        setSelectedAssetId(null);
      };

      const handleEditAsset = (id: string) => {
        setSelectedAssetId(id);
      };

      const handleDeleteAsset = (id: string) => {
        fixedAssetsManager.deleteAsset(id);
        setAssets(fixedAssetsManager.listAssets());
        setSelectedAssetId(null);
      };

      const handleUpdateAsset = (updatedAsset: FixedAsset) => {
        fixedAssetsManager.updateAsset(updatedAsset);
        // Recalculate depreciation for all assets after an update
        const updatedAssets = fixedAssetsManager.listAssets().map(asset => ({
          ...asset,
          depreciationValue: fixedAssetsManager.calculateDepreciation(asset.id, new Date())
        }));
        setAssets(updatedAssets);
        setSelectedAssetId(null);
      }


      const handleViewDetails = (id: string) => {
        setSelectedAssetId(id);
      };

      const handleBackToList = () => {
        setSelectedAssetId(null);
      };

      const getStoredAssets = (): FixedAsset[] => {
        return fixedAssetsManager.listAssets();
      };

      const selectedAsset = selectedAssetId ? assets.find((asset) => asset.id === selectedAssetId) : undefined;

      return (
        <PageTransition>
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold tracking-tight">Fixed Assets Module</h1>
                <p className="text-muted-foreground mt-1">
                  Manage your company assets, depreciation, and maintenance
                </p>
              </motion.div>
            </div>
            <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-2 h-auto p-1 w-full max-w-md bg-muted/60">
                <TabsTrigger value="list" className="flex gap-2 py-2">
                  Assets List
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex gap-2 py-2">
                  <FileText className="mr-2 h-4 w-4" />
                  Reports
                </TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                {selectedAssetId ? (
                  <FixedAssetDetails
                    asset={selectedAsset!}
                    onBackToList={handleBackToList}
                    onUpdateAsset={handleUpdateAsset}
                    onDeleteAsset={handleDeleteAsset}
                    existingIds={assets.map((a) => a.id)}
                  />
                ) : (
                  <FixedAssetList
                    assets={assets}
                    onAdd={handleAddAsset}
                    onEdit={handleViewDetails}
                    onDelete={handleDeleteAsset}
                    loading={loading}
                  />
                )}
              </TabsContent>
              <TabsContent value="reports">
                <DepreciationScheduleReport assets={assets} />
              </TabsContent>
            </Tabs>
          </div>
        </PageTransition>
      );
    };

    export default FixedAssetsPage;
