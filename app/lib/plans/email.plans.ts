/* ================================
   Shared Interfaces
================================ */

export interface PricingPlan {
    name: string;
    subtitle?: string;
    price: string;
    period: string;
    desc: string;
    isPopular?: boolean;
    color: string;
}

export interface PricingFeatureCategory {
    category: string;
    items: {
        name: string;
        values: (string | boolean)[];
    }[];
}


/* ================================
   Professional Email Plans
================================ */

export const emailPlans: PricingPlan[] = [
    {
        name: "Starter",
        subtitle: "10 GB Mailbox",
        price: "$1.29",
        period: "/mailbox/month",
        desc: "Professional email for individuals",
        color: "text-zinc-500"
    },
    {
        name: "Business",
        subtitle: "30 GB Mailbox",
        price: "$2.99",
        period: "/mailbox/month",
        desc: "Business email for teams",
        isPopular: true,
        color: "text-orange-500"
    },
    {
        name: "Pro",
        subtitle: "75 GB Mailbox",
        price: "$4.99",
        period: "/mailbox/month",
        desc: "Advanced email with more storage & security",
        color: "text-blue-500"
    }
];


/* ================================
   Professional Email Features
================================ */

export const emailFeatures: PricingFeatureCategory[] = [
    {
        category: "Mailbox Features",
        items: [
            { name: "Mailbox Storage", values: ["10 GB", "30 GB", "75 GB"] },
            { name: "Mailboxes", values: ["Per mailbox", "Per mailbox", "Per mailbox"] },
            { name: "Custom Domain Email", values: [true, true, true] },
            { name: "Webmail Access", values: [true, true, true] },
            { name: "IMAP / POP / SMTP", values: [true, true, true] },
            { name: "Mobile & Desktop Sync", values: [true, true, true] },
            { name: "Email Aliases", values: ["5 aliases", "25 aliases", "Unlimited"] },
            { name: "Email Forwarding", values: [true, true, true] },
            { name: "Catch-All Mailbox", values: [false, true, true] }
        ]
    },
    {
        category: "Security & Reliability",
        items: [
            { name: "Spam Protection", values: ["Standard", "Advanced", "Advanced"] },
            { name: "Virus & Malware Scan", values: [true, true, true] },
            { name: "Anti-Phishing", values: ["Basic", "Advanced", "Advanced"] },
            { name: "TLS Encryption", values: [true, true, true] },
            { name: "Two-Factor Authentication", values: [true, true, true] },
            { name: "Daily Backups", values: ["7 days", "14 days", "30 days"] },
            { name: "Uptime SLA", values: ["99.9%", "99.9%", "99.99%"] }
        ]
    },
    {
        category: "Admin & Productivity",
        items: [
            { name: "Admin Control Panel", values: [true, true, true] },
            { name: "Mailbox Management", values: [true, true, true] },
            { name: "Alias & Forwarding Rules", values: [true, true, true] },
            { name: "Autoresponders", values: [true, true, true] },
            { name: "Mail Logs", values: ["Basic", "Detailed", "Detailed"] },
            { name: "Priority Support", values: [false, true, true] }
        ]
    }
];


export const emailAddons = [
    {
        name: "Additional Mailbox",
        price: "$1.29",
        period: "/mailbox/month",
        desc: "Add extra mailboxes to any email plan"
    }
];


/* ================================
   Email CTA
================================ */

export const emailCTA =
    "Build trust with a professional email on your domain. Secure, reliable, and easy to manage.";
