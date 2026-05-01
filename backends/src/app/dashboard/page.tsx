import { getSession } from '@/app/lib/session';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, User, Activity, Clock } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-headline">Welcome back!</h1>
        <p className="text-muted-foreground">Here is what is happening with your account today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Role</CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{session?.role}</div>
            <p className="text-xs text-muted-foreground mt-1">Full access granted</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
            <User className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground mt-1">Verified User</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground mt-1">From 192.168.1.1</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity Score</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground mt-1">+2% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>You have logged into 3 separate devices this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Activity className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Successful Login</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(Date.now() - i * 86400000).toLocaleDateString()} at 10:45 AM
                    </p>
                  </div>
                  <div className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Secure</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Tips to keep your account safe.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium text-primary mb-1">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Add an extra layer of security to your account by enabling 2FA. Recommended for all accounts.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
              <p className="text-sm font-medium text-accent mb-1">Password Rotation</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We recommend changing your password every 90 days to ensure maximum security.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
