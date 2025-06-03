// src/components/dashboard/settings-section.tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Cog } from "lucide-react";

export default function SettingsSection() {
  return (
    <section id="settings" className="scroll-mt-20">
      <h2 className="text-3xl font-bold text-foreground mb-6 tracking-tight">Settings</h2>
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cog className="h-6 w-6 mr-2 text-primary" />
            Account Settings
          </CardTitle>
          <CardDescription>Manage your profile and application preferences here.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            <p>User profile settings (e.g., name, email, password change options) will be available here.</p>
            <p className="mt-2">Application preferences (e.g., theme, notification settings) can also be managed from this section in the future.</p>
            <p className="mt-4">This section is currently under construction.</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
