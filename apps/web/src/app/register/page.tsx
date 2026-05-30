import type { Metadata } from "next";
import RegisterForm from "../../components/RegisterForm";
import AuthSessionShell from "../../components/AuthSessionShell";

export const metadata: Metadata = {
  title: "Create account — mega-header-mega-header-qyou",
  description: "Register for a mega-header-mega-header-qyou account.",
};

export default function RegisterPage() {
  return (
    <AuthSessionShell title="Create account" subtitle="Start with a secure account before joining sessions.">
      <RegisterForm />
    </AuthSessionShell>
  );
}
