import type { Metadata } from "next";
import RegisterForm from "../../components/RegisterForm";

export const metadata: Metadata = {
  title: "Create account — mega-header-mega-header-qyou",
  description: "Register for a mega-header-mega-header-qyou account.",
};

export default function RegisterPage() {
  return (
    <main
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      <RegisterForm />
    </main>
  );
}
