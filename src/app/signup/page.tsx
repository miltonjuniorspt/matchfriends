import { UserSignupForm } from "@/components/auth/user-signup-form";
import { Logo } from "@/components/common/logo";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="absolute top-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold font-headline">Crie sua conta</CardTitle>
          <CardDescription>É rápido e fácil. Vamos começar.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserSignupForm />
        </CardContent>
        <CardFooter className="flex-col gap-4">
           <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
