import React, { useState, useMemo } from 'react';
    import { FixedAsset, DepreciationMethod } from '@/modules/FixedAssets';
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table"
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Calendar, Download, Filter, Printer, Search, XCircle } from 'lucide-react';
    import { Input } from '../ui/input';
    import {
      Select,
      SelectContent,
      SelectItem,
      SelectTrigger,
      SelectValue,
    } from "@/components/ui/select";
    import { DatePickerWithRange } from '../ui/date-picker-with-range';
    import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
    import { format } from 'date-fns';
    import { cn } from '@/lib/utils';

    interface DepreciationScheduleReportProps {
      assets: FixedAsset[];
    }

    const DepreciationScheduleReport: React.FC<DepreciationScheduleReportProps> = ({ assets }) => {
      const [assetNameFilter, setAssetNameFilter] = useState('');
      const [depreciationMethodFilter, setDepreciationMethodFilter] = useState('all');
      const [dateRangeFilter, setDateRangeFilter] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });

      const formatDate = (date: Date) => {
        return date.toLocaleDateString('id-ID');
      };

      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(amount);
      };

      const filteredAssets = useMemo(() => {
        return assets.filter(asset => {
          const nameMatch = asset.name.toLowerCase().includes(assetNameFilter.toLowerCase());
          const methodMatch = depreciationMethodFilter === 'all' || asset.depreciationMethod === depreciationMethodFilter;

          const dateMatch = (!dateRangeFilter.from || asset.acquisitionDate >= dateRangeFilter.from) &&
                            (!dateRangeFilter.to || asset.acquisitionDate <= dateRangeFilter.to);

          return nameMatch && methodMatch && dateMatch;
        });
      }, [assets, assetNameFilter, depreciationMethodFilter, dateRangeFilter]);

      const clearFilters = () => {
        setAssetNameFilter('');
        setDepreciationMethodFilter('all');
        setDateRangeFilter({ from: null, to: null });
      }

      return (
        <Card>
          <CardHeader>
            <CardTitle>Depreciation Schedule Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
              <div className="flex gap-2 flex-1">
                <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Filter by asset name..."
                    className="pl-8"
                    value={assetNameFilter}
                    onChange={(e) => setAssetNameFilter(e.target.value)}
                  />
                </div>
                <Select value={depreciationMethodFilter} onValueChange={setDepreciationMethodFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value={DepreciationMethod.StraightLine}>Straight Line</SelectItem>
                    <SelectItem value={DepreciationMethod.DecliningBalance}>Declining Balance</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[180px] gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {dateRangeFilter.from && dateRangeFilter.to
                          ? `${format(dateRangeFilter.from, "PPP")} - ${format(dateRangeFilter.to, "PPP")}`
                          : "Select Period"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <DatePickerWithRange
                      date={dateRangeFilter.from ? {from: dateRangeFilter.from, to: dateRangeFilter.to} : undefined}
                      setDate={(date) => {
                        if(date) {
                          setDateRangeFilter({from: date.from, to: date.to});
                        } else {
                          setDateRangeFilter({from: null, to: null});
                        }
                      }}
                      
                    />
                  </PopoverContent>
                </Popover>
                <Button variant="outline" onClick={clearFilters} className="gap-2">
                  <XCircle className='h-4 w-4'/>
                  Clear
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => alert('Export functionality not implemented.')}>
                  <Download size={16} />
                  Export
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => alert('Print functionality not implemented.')}>
                  <Printer size={16} />
                  Print
                </Button>
              </div>
            </div>
            <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Asset ID</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Acquisition Date</TableHead>
                  <TableHead>Start Use Date</TableHead>
                  <TableHead className="text-right">Acquisition Value</TableHead>
                  <TableHead>Useful Life</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Year</TableHead>
                  <TableHead className="text-right">Depreciation</TableHead>
                  <TableHead className="text-right">Book Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    // We need to flatten the depreciation history for the table.
                    asset.depreciationHistory && asset.depreciationHistory.length > 0 ? (
                      asset.depreciationHistory.map((entry, index) => (
                        <TableRow key={`${asset.id}-${index}`}>
                          {index === 0 && (
                            <>
                              <TableCell rowSpan={asset.depreciationHistory!.length} className="font-medium">{asset.id}</TableCell>
                              <TableCell rowSpan={asset.depreciationHistory!.length}>{asset.name}</TableCell>
                              <TableCell rowSpan={asset.depreciationHistory!.length}>{formatDate(asset.acquisitionDate)}</TableCell>
                              <TableCell rowSpan={asset.depreciationHistory!.length}>{formatDate(asset.startUseDate)}</TableCell>
                              <TableCell rowSpan={asset.depreciationHistory!.length} className="text-right">{formatCurrency(asset.acquisitionValue)}</TableCell>
                              <TableCell rowSpan={asset.depreciationHistory!.length} className='text-center'>{asset.usefulLife}</TableCell>
                              <TableCell rowSpan={asset.depreciationHistory!.length}>
                                {asset.depreciationMethod === DepreciationMethod.StraightLine
                                  ? 'Straight Line'
                                  : 'Declining Balance'}
                              </TableCell>
                            </>
                          )}
                          <TableCell className="text-right">{formatDate(entry.date)}</TableCell>
                          <TableCell className="text-right">{formatCurrency(entry.amount)}</TableCell>
                          <TableCell className="text-right">
                            {/* Calculate book value.  This is a bit tricky. */}
                            {formatCurrency(asset.acquisitionValue - asset.depreciationHistory!.slice(0, index + 1).reduce((sum, e) => sum + e.amount, 0))}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow key={asset.id}>
                        <TableCell className="font-medium">{asset.id}</TableCell>
                        <TableCell>{asset.name}</TableCell>
                        <TableCell>{formatDate(asset.acquisitionDate)}</TableCell>
                        <TableCell>{formatDate(asset.startUseDate)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(asset.acquisitionValue)}</TableCell>
                        <TableCell className='text-center'>{asset.usefulLife}</TableCell>
                        <TableCell>
                          {asset.depreciationMethod === DepreciationMethod.StraightLine
                            ? 'Straight Line'
                            : 'Declining Balance'}
                        </TableCell>
                        <TableCell colSpan={2} className="text-center">No depreciation calculated</TableCell>
                      </TableRow>
                    )
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      No assets found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      );
    };

    export default DepreciationScheduleReport;
