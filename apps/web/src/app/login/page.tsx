import type { Metadata } from "next";
import LoginForm from "../../../src/components/LoginForm";
import AuthSessionShell from "../../../src/components/AuthSessionShell";

export const metadata: Metadata = {
  title: "Login — mega-header-mega-header-qyou",
  description: "Sign in to mega-header-mega-header-qyou.",
};

export default function LoginPage() {
  return (
    <AuthSessionShell title="Sign in" subtitle="Use your email and password to restore your authenticated session.">
      <LoginForm />
    </AuthSessionShell>
  );
}
