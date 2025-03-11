import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  ArrowRightCircle,
  Warehouse,
  Truck,
  PlusCircle,
  Minus
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

const InventoryTransfer = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Office Chair', available: 25, quantity: 2 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), name: '', available: 0, quantity: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Items</CardTitle>
        <CardDescription>
          Move inventory between warehouses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="transfer-number">Transfer Number</Label>
              <Input id="transfer-number" defaultValue="TR-2023-001" readOnly className="bg-muted" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transfer-date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="transfer-date" type="date" className="pl-8" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shipping-date">Expected Shipping Date</Label>
              <div className="relative">
                <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input id="shipping-date" type="date" className="pl-8" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Warehouse className="h-4 w-4" /> From Warehouse
              </Label>
              <Select defaultValue="main">
                <SelectTrigger>
                  <SelectValue placeholder="Select source warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                  <SelectItem value="distribution">Distribution Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <ArrowRightCircle className="h-4 w-4" /> To Warehouse
              </Label>
              <Select defaultValue="secondary">
                <SelectTrigger>
                  <SelectValue placeholder="Select destination warehouse" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Warehouse</SelectItem>
                  <SelectItem value="secondary">Secondary Warehouse</SelectItem>
                  <SelectItem value="distribution">Distribution Center</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-1">
                <Truck className="h-4 w-4" /> Shipping Method
              </Label>
              <Select defaultValue="company">
                <SelectTrigger>
                  <SelectValue placeholder="Select shipping method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="company">Company Vehicle</SelectItem>
                  <SelectItem value="courier">Courier Service</SelectItem>
                  <SelectItem value="thirdparty">3rd Party Logistics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 md:col-span-3">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" placeholder="Additional information about this transfer" />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Items to Transfer</h3>
              <Button variant="outline" size="sm" onClick={addItem}>
                <PlusCircle className="h-4 w-4 mr-1" /> 
                Add Item
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Item</TableHead>
                    <TableHead>Available Qty</TableHead>
                    <TableHead>Transfer Qty</TableHead>
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
                          defaultValue={item.available.toString()} 
                          className="bg-muted" 
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          defaultValue={item.quantity.toString()}
                          min="0"
                          max={item.available}
                        />
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
              <ArrowRightCircle className="mr-1 h-4 w-4" /> 
              Process Transfer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryTransfer;
