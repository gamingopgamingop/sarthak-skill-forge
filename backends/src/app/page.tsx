import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Lock, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-auth');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="ml-2 text-xl font-bold tracking-tight text-primary">NextAuth</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors" href="/register">
            Get Started
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground font-headline">
                    Secure Access for Modern Teams
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed">
                    The ultimate authentication portal with role-based access, protected routes, and a seamless developer experience. Built for reliability and speed.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <Link href="/register">
                      Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/login">Explore Features</Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                  <Image
                    alt={heroImage.description}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                    height="400"
                    src={heroImage.imageUrl}
                    width="600"
                    data-ai-hint={heroImage.imageHint}
                  />
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl hover:bg-background transition-colors duration-300">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Encrypted Storage</h3>
                <p className="text-muted-foreground">
                  Industry-standard encryption for all your sensitive user data and credentials.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl hover:bg-background transition-colors duration-300">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Users className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold">Role-Based Access</h3>
                <p className="text-muted-foreground">
                  Granular control over what users can see and do within your application.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl hover:bg-background transition-colors duration-300">
                <div className="p-3 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Verified Sessions</h3>
                <p className="text-muted-foreground">
                  Secure, time-limited sessions that keep your users logged in across devices.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
        <p className="text-xs text-muted-foreground">© 2024 NextAuth Portal Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
