'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, User, Mail, Lock, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-accent">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-accent/10 rounded-full">
              <UserPlus className="h-8 w-8 text-accent" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold font-headline">Create an account</CardTitle>
          <CardDescription>Enter your details to get started with NextAuth</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  name="username"
                  placeholder="John Doe"
                  className="pl-10"
                  required
                />
              </div>
              {state?.errors?.username && (
                <p className="text-sm text-destructive font-medium">{state.errors.username}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  required
                />
              </div>
              {state?.errors?.email && (
                <p className="text-sm text-destructive font-medium">{state.errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" name="password" type="password" className="pl-10" required />
              </div>
              {state?.errors?.password && (
                <div className="text-sm text-destructive font-medium space-y-1 mt-2">
                  <p>Password must:</p>
                  <ul className="list-disc pl-5">
                    {state.errors.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button disabled={pending} type="submit" className="w-full font-semibold bg-primary hover:bg-primary/90">
              {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in instead
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
