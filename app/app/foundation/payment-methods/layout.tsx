
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Methods | Reglook",
    description: "Manage your saved payment methods and billing preferences.",
};

export default function PaymentMethodsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
