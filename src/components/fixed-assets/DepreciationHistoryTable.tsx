import React from 'react';
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from '@/components/ui/table';

    interface DepreciationHistoryTableProps {
      history: { date: Date; amount: number }[];
    }

    const DepreciationHistoryTable: React.FC<DepreciationHistoryTableProps> = ({ history }) => {
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

      return (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Depreciation Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length > 0 ? (
                history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(entry.amount)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No depreciation history available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      );
    };

    export default DepreciationHistoryTable;
