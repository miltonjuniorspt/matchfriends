import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/common/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
       <div className="absolute top-8">
         <Logo />
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center font-headline">Admin Login</h2>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
