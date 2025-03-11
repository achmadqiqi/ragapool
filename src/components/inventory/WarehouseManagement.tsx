import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, MapPin, Warehouse } from 'lucide-react';
import GlassPanel from '@/components/ui/forms/GlassPanel';

// Mock data for warehouses
const warehouseData = [
  {
    id: 1,
    name: 'Main Warehouse',
    location: 'Jakarta Pusat, DKI Jakarta',
    address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta',
    manager: 'Budi Santoso',
    itemCount: 124,
  },
  {
    id: 2,
    name: 'Secondary Warehouse',
    location: 'Bandung, Jawa Barat',
    address: 'Jl. Asia Afrika No. 56, Bandung, Jawa Barat',
    manager: 'Siti Rahayu',
    itemCount: 87,
  },
  {
    id: 3,
    name: 'Distribution Center',
    location: 'Surabaya, Jawa Timur',
    address: 'Jl. Pemuda No. 45, Surabaya, Jawa Timur',
    manager: 'Ahmad Wijaya',
    itemCount: 156,
  }
];

const WarehouseManagement = () => {
  const [showNewForm, setShowNewForm] = useState(false);

  return (
    <div className="space-y-6">
      {showNewForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Add New Warehouse</CardTitle>
            <CardDescription>
              Create a new warehouse location to manage your inventory
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="warehouse-name">Warehouse Name</Label>
                <Input id="warehouse-name" placeholder="Enter warehouse name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse-location">Location</Label>
                <Input id="warehouse-location" placeholder="City, Province" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="warehouse-address">Address</Label>
                <Input id="warehouse-address" placeholder="Enter full address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse-manager">Manager</Label>
                <Input id="warehouse-manager" placeholder="Enter manager name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse-phone">Phone</Label>
                <Input id="warehouse-phone" placeholder="Enter contact number" />
              </div>
              <div className="flex items-center gap-2 md:col-span-2 pt-2">
                <Button onClick={() => setShowNewForm(false)} variant="outline">Cancel</Button>
                <Button onClick={() => setShowNewForm(false)}>
                  <Plus className="mr-1 h-4 w-4" /> Create Warehouse
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button onClick={() => setShowNewForm(true)}>
          <Plus className="mr-1 h-4 w-4" /> Add New Warehouse
        </Button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {warehouseData.map((warehouse) => (
          <GlassPanel 
            key={warehouse.id} 
            className="p-5 hover:shadow-lg transition-all"
            hover={true}
          >
            <div className="flex justify-between mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Warehouse className="h-5 w-5 text-primary" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="text-lg font-medium mb-1">{warehouse.name}</h3>
            <div className="flex items-start gap-1 text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{warehouse.location}</span>
            </div>
            <div className="text-sm mb-4">
              {warehouse.address}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Manager: {warehouse.manager}
              </span>
              <Badge items={warehouse.itemCount} />
            </div>
          </GlassPanel>
        ))}
      </div>
    </div>
  );
};

// Small badge component to show item count
const Badge = ({ items }: { items: number }) => (
  <div className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
    {items} items
  </div>
);

export default WarehouseManagement;
