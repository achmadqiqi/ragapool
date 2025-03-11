import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Package, 
  ClipboardCheck,
  Plus,
  Minus,
  PlusCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const InventoryAdjustment = () => {
  const [adjustmentType, setAdjustmentType] = useState('increase');
  const [items, setItems] = useState([
    { id: 1, name: 'Office Chair', currentQty: 25, adjustQty: 2, reason: 'Stock count' }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', currentQty: 0, adjustQty: 0, reason: '' }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Adjustment</CardTitle>
        <CardDescription>
          Adjust inventory quantities when physical count differs from system records
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="adjustment-number">Adjustment Number</Label>
              <Input id="adjustment-number" defaultValue="ADJ-2023-001" readOnly className="bg-muted" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adjustment-date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="adjustment-date" type="date" className="pl-8" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="warehouse">Warehouse</Label>
              <Select defaultValue="main">
                <SelectTrigger>
                  <SelectValue placeholder="Select warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                  <SelectItem value="distribution">Distribution Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="adjustment-type">Adjustment Type</Label>
              <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increase Quantity</SelectItem>
                  <SelectItem value="decrease">Decrease Quantity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="reference">Reference/Document</Label>
              <Input id="reference" placeholder="Reference number or document" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium flex items-center gap-1">
                <Package className="h-4 w-4" /> 
                Items to Adjust
              </h3>
              <Button variant="outline" size="sm" onClick={addItem}>
                <PlusCircle className="h-4 w-4 mr-1" /> 
                Add Item
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Item</TableHead>
                    <TableHead>Current Qty</TableHead>
                    <TableHead>Adjust By</TableHead>
                    <TableHead>New Qty</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select item" defaultValue={item.name || undefined}/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="office-chair">Office Chair</SelectItem>
                            <SelectItem value="office-desk">Office Desk</SelectItem>
                            <SelectItem value="laptop">Laptop</SelectItem>
                            <SelectItem value="printer-paper">Printer Paper</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          defaultValue={item.currentQty.toString()} 
                          className="bg-muted" 
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {adjustmentType === 'increase' ? 
                            <Plus className="h-4 w-4 text-green-500 mr-1" /> : 
                            <Minus className="h-4 w-4 text-red-500 mr-1" />
                          }
                          <Input 
                            type="number" 
                            defaultValue={item.adjustQty.toString()}
                            min="0"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          value={adjustmentType === 'increase' ? 
                            item.currentQty + item.adjustQty : 
                            item.currentQty - item.adjustQty
                          } 
                          className="bg-muted" 
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={item.reason || undefined}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="stock-count">Stock Count</SelectItem>
                            <SelectItem value="damaged">Damaged/Defective</SelectItem>
                            <SelectItem value="stolen">Stolen/Lost</SelectItem>
                            <SelectItem value="return">Return to Vendor</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={items.length === 1}
                        >
                          <Minus className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>
              <ClipboardCheck className="mr-1 h-4 w-4" /> 
              Submit Adjustment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAdjustment;
