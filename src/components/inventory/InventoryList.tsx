import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

// Mock data for inventory items
const inventoryItems = [
  {
    id: 1,
    code: 'ITM001',
    name: 'Office Chair',
    category: 'Furniture',
    type: 'Inventory',
    unit: 'Pcs',
    inStock: 25,
    costPrice: 750000,
    sellPrice: 1250000,
  },
  {
    id: 2,
    code: 'ITM002',
    name: 'Office Desk',
    category: 'Furniture',
    type: 'Inventory',
    unit: 'Pcs',
    inStock: 15,
    costPrice: 1200000,
    sellPrice: 2000000,
  },
  {
    id: 3,
    code: 'ITM003',
    name: 'Laptop',
    category: 'Electronics',
    type: 'Inventory',
    unit: 'Pcs',
    inStock: 8,
    costPrice: 8500000,
    sellPrice: 12000000,
  },
  {
    id: 4,
    code: 'ITM004',
    name: 'IT Support',
    category: 'Services',
    type: 'Service',
    unit: 'Hour',
    inStock: null,
    costPrice: 75000,
    sellPrice: 150000,
  },
  {
    id: 5,
    code: 'ITM005',
    name: 'Printer Paper',
    category: 'Office Supplies',
    type: 'Inventory',
    unit: 'Box',
    inStock: 50,
    costPrice: 35000,
    sellPrice: 50000,
  },
];

interface InventoryListProps {
  searchTerm: string;
}

const InventoryList: React.FC<InventoryListProps> = ({ searchTerm }) => {
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Items & Services</CardTitle>
        <CardDescription>
          Manage your items and services with current stock levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <Badge variant={item.type === 'Inventory' ? 'default' : 'secondary'}>
                        {item.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>
                      {item.inStock !== null ? item.inStock : 'N/A'}
                    </TableCell>
                    <TableCell>{formatPrice(item.costPrice)}</TableCell>
                    <TableCell>{formatPrice(item.sellPrice)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    No items found matching your search.
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

export default InventoryList;
