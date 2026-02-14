export default function MailLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#0f0f10]">
            {children}
        </div>
    );
}
