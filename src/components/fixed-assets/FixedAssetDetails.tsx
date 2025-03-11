import React, { useState } from 'react';
    import { FixedAsset, DepreciationMethod } from '@/modules/FixedAssets';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import DepreciationHistoryTable from './DepreciationHistoryTable';
    import { ArrowLeft, Edit } from 'lucide-react';
    import FixedAssetForm from './FixedAssetForm';

    interface FixedAssetDetailsProps {
      asset: FixedAsset;
      onBackToList: () => void;
      onUpdateAsset: (asset: FixedAsset) => void;
      onDeleteAsset: (id: string) => void;
      existingIds: string[];
    }

    const FixedAssetDetails: React.FC<FixedAssetDetailsProps> = ({ asset, onBackToList, onUpdateAsset, onDeleteAsset, existingIds }) => {
      const [isEditing, setIsEditing] = useState(false);

      const formatDate = (date: Date) => {
        return date.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      };

      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(amount);
      };

      const handleSave = (updatedAsset: FixedAsset) => {
        onUpdateAsset(updatedAsset);
        setIsEditing(false); // Switch back to view mode after saving
      };

      if (isEditing) {
        return (
          <FixedAssetForm
            asset={asset}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            existingIds={existingIds}
          />
        );
      }

      return (
        <Card>
          <CardHeader>
            <CardTitle>Asset Details: {asset.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Button variant="outline" onClick={onBackToList} className="mr-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to List
              </Button>
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4"/>
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Asset ID:</p>
                <p>{asset.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Asset Name:</p>
                <p>{asset.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Acquisition Date:</p>
                <p>{formatDate(asset.acquisitionDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Start Use Date:</p>
                <p>{formatDate(asset.startUseDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Acquisition Value:</p>
                <p>{formatCurrency(asset.acquisitionValue)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Useful Life (Years):</p>
                <p>{asset.usefulLife}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Depreciation Method:</p>
                <p>
                  {asset.depreciationMethod === DepreciationMethod.StraightLine
                    ? 'Straight Line'
                    : 'Declining Balance'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Depreciation:</p>
                <p>{asset.depreciationValue !== undefined ? formatCurrency(asset.depreciationValue) : '-'}</p>
              </div>
            </div>
            <div className='mt-6'>
              <DepreciationHistoryTable history={asset.depreciationHistory || []} />
            </div>
          </CardContent>
        </Card>
      );
    };

    export default FixedAssetDetails;
