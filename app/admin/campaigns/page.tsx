'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminCampaignsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-1">Campaigns</h1>
        <p className="text-muted-foreground">Manage active campaigns and task assignments</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>Track and update artist campaigns</CardDescription>
        </CardHeader>
        <CardContent className="py-12 text-center text-muted-foreground">
          Campaign management tools are being set up. Check back soon.
        </CardContent>
      </Card>
    </div>
  )
}
