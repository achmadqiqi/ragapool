import React from 'react';
import PageTransition from '@/components/layout/PageTransition';
import { motion } from 'framer-motion';
import GlassPanel from '@/components/ui/forms/GlassPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, User, Building, DollarSign, Shield, Bell } from 'lucide-react';

const SettingsPage = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Manage your account settings and preferences
            </p>
          </motion.div>
        </div>
        
        <Tabs defaultValue="profile" className="mb-8">
          <TabsList className="bg-white/50 dark:bg-background/50 w-full justify-start mb-6 overflow-x-auto flex-nowrap">
            <TabsTrigger value="profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="tax" className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Tax Settings
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <GlassPanel className="p-6">
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="+62 812 3456 7890" />
                    </div>
                    <Button>Save Changes</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Ensure your account is secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="company">
            <GlassPanel className="p-6">
              <h2 className="text-xl font-semibold mb-6">Company Information</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                    <CardDescription>Update your company information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" defaultValue="PT Example Indonesia" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tax-id">Tax ID Number (NPWP)</Label>
                      <Input id="tax-id" defaultValue="01.234.567.8-123.000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address">Address</Label>
                      <Input id="company-address" defaultValue="Jl. Example No. 123" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company-city">City</Label>
                        <Input id="company-city" defaultValue="Jakarta" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company-postal">Postal Code</Label>
                        <Input id="company-postal" defaultValue="12345" />
                      </div>
                    </div>
                    <Button>Save Company Details</Button>
                  </CardContent>
                </Card>
              </div>
            </GlassPanel>
          </TabsContent>
          
          <TabsContent value="preferences">
            <div className="grid place-items-center h-[50vh]">
              <div className="text-center p-8">
                <h2 className="text-2xl font-semibold mb-4">This section is under construction</h2>
                <p className="text-muted-foreground">
                  The Preferences settings will be available soon.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tax">
            <div className="grid place-items-center h-[50vh]">
              <div className="text-center p-8">
                <h2 className="text-2xl font-semibold mb-4">This section is under construction</h2>
                <p className="text-muted-foreground">
                  Tax Settings will be available soon.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <div className="grid place-items-center h-[50vh]">
              <div className="text-center p-8">
                <h2 className="text-2xl font-semibold mb-4">This section is under construction</h2>
                <p className="text-muted-foreground">
                  Security settings will be available soon.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="grid place-items-center h-[50vh]">
              <div className="text-center p-8">
                <h2 className="text-2xl font-semibold mb-4">This section is under construction</h2>
                <p className="text-muted-foreground">
                  Notification settings will be available soon.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
};

export default SettingsPage;
