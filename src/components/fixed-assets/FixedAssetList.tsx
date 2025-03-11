import React, { useState, useMemo } from 'react';
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from '@/components/ui/table';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import {
      Plus,
      Search,
      Edit,
      Trash2,
      ArrowUpDown,
      Loader2,
      ArrowUp,
      ArrowDown
    } from 'lucide-react';
    import { FixedAsset, DepreciationMethod } from '@/modules/FixedAssets';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog";
    import { Skeleton } from "@/components/ui/skeleton";
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

    interface FixedAssetListProps {
      assets: FixedAsset[];
      onAdd: () => void;
      onEdit: (id: string) => void;
      onDelete: (id: string) => void;
      loading: boolean;
    }

    const FixedAssetList: React.FC<FixedAssetListProps> = ({ assets, onAdd, onEdit, onDelete, loading }) => {
      const [searchTerm, setSearchTerm] = useState('');
      const [assetToDelete, setAssetToDelete] = useState<string | null>(null);
      const [sortConfig, setSortConfig] = useState<{ key: keyof FixedAsset | null; direction: 'ascending' | 'descending' }>({ key: null, direction: 'ascending' });

      const filteredAssets = useMemo(() => {
        return assets.filter((asset) =>
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }, [assets, searchTerm]);



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

      const requestSort = (key: keyof FixedAsset) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      };

      const sortedAssets = useMemo(() => {
        let sortableItems = [...filteredAssets];
        if (sortConfig.key !== null) {
          sortableItems.sort((a, b) => {
            const keyA = a[sortConfig.key!];
            const keyB = b[sortConfig.key!];
            let comparison = 0;

            if (typeof keyA === 'string' && typeof keyB === 'string') {
              comparison = keyA.localeCompare(keyB);
            } else if (typeof keyA === 'number' && typeof keyB === 'number') {
              comparison = keyA - keyB;
            } else if (keyA instanceof Date && keyB instanceof Date) {
              comparison = keyA.getTime() - keyB.getTime();
            }

            return sortConfig.direction === 'ascending' ? comparison : -comparison;
          });
        }
        return sortableItems;
      }, [filteredAssets, sortConfig]);

      const getSortIcon = (key: keyof FixedAsset) => {
        if (sortConfig.key !== key) {
          return <ArrowUpDown size={16} />;
        }
        return sortConfig.direction === 'ascending' ? (
          <ArrowUp size={16} />
        ) : (
          <ArrowDown size={16} />
        );
      };

      return (
        <Card>
          <CardHeader>
            <CardTitle>Fixed Assets List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-full sm:w-72 md:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assets..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={onAdd} className="gap-2">
                <Plus size={16} />
                Add Asset
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => requestSort('id')}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        ID
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{getSortIcon('id')}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Sort by ID</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead onClick={() => requestSort('name')}>
                      <div className="flex items-center gap-1 cursor-pointer">
                        Name
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>{getSortIcon('name')}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Sort by Name</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableHead>
                    <TableHead onClick={() => requestSort('acquisitionDate')}>Acquisition Date</TableHead>
                    <TableHead onClick={() => requestSort('startUseDate')}>Start Use Date</TableHead>
                    <TableHead className="text-right" onClick={() => requestSort('acquisitionValue')}>Acquisition Value</TableHead>
                    <TableHead className="text-right" onClick={() => requestSort('usefulLife')}>Useful Life (Years)</TableHead>
                    <TableHead onClick={() => requestSort('depreciationMethod')}>Depreciation Method</TableHead>
                    <TableHead className="text-right" onClick={() => requestSort('depreciationValue')}>Depreciation Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <>
                      {/* Show skeleton rows while loading */}
                      {[...Array(5)].map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-4 w-[100px]" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-4 w-[40px]" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-4 w-[100px]" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-4 w-[60px]" /></TableCell>
                        </TableRow>
                      ))}
                    </>
                  ) : sortedAssets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="h-24 text-center">
                        No assets found matching your search.
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedAssets.map((asset) => (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.id}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{formatDate(asset.acquisitionDate)}</TableCell>
                        <TableCell>{formatDate(asset.startUseDate)}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(asset.acquisitionValue)}
                        </TableCell>
                        <TableCell className="text-right">{asset.usefulLife}</TableCell>
                        <TableCell>
                          {asset.depreciationMethod === DepreciationMethod.StraightLine
                            ? 'Straight Line'
                            : 'Declining Balance'}
                        </TableCell>
                        <TableCell className="text-right">
                          {asset.depreciationValue !== undefined ? formatCurrency(asset.depreciationValue) : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => onEdit(asset.id)}>
                              <Edit size={16} />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 size={16} />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the asset.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => { onDelete(asset.id); setAssetToDelete(null); }}>
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      );
    };

    export default FixedAssetList;
