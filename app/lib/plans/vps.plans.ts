/* ================================
   VPS Hosting
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
   VPS Plans
================================ */

export const vpsPlans: PricingPlan[] = [
    {
        name: "Quantum Seed",
        price: "$5.99",
        period: "/month",
        desc: "Light servers & personal projects",
        color: "text-zinc-500"
    },
    {
        name: "Dark Matter",
        price: "$9.99",
        period: "/month",
        desc: "Production apps & APIs",
        isPopular: true,
        color: "text-orange-500"
    },
    {
        name: "Cosmic Core",
        price: "$18.99",
        period: "/month",
        desc: "Databases & growing workloads",
        color: "text-blue-500"
    },
    {
        name: "Matter Release",
        price: "$34.99",
        period: "/month",
        desc: "High-performance & heavy workloads",
        color: "text-purple-500"
    }
];

/* ================================
   VPS Features
================================ */

export const vpsFeatures: PricingFeatureCategory[] = [
    {
        category: "Core Server Resources",
        items: [
            { name: "vCPU", values: ["1 vCPU", "2 vCPU", "4 vCPU", "8 vCPU"] },
            { name: "RAM", values: ["1 GB", "2 GB", "4 GB", "8 GB"] },
            { name: "NVMe Storage", values: ["25 GB", "50 GB", "100 GB", "200 GB"] },
            { name: "Bandwidth", values: ["1 TB", "2 TB", "4 TB", "8 TB"] },
            { name: "IPv4 Address", values: ["1 IPv4", "1 IPv4", "1 IPv4", "1 IPv4"] },
            { name: "Virtualization", values: ["KVM", "KVM", "KVM", "KVM"] },
            { name: "Uptime SLA", values: ["99.9%", "99.9%", "99.9%", "99.9%"] }
        ]
    },
    {
        category: "Control & Management",
        items: [
            { name: "Root Access", values: [true, true, true, true] },
            { name: "OS Choices", values: [true, true, true, true] },
            { name: "Custom Software", values: [true, true, true, true] },
            { name: "Background Jobs", values: [true, true, true, true] },
            { name: "Databases", values: [true, true, true, true] },
            { name: "Docker Support", values: [true, true, true, true] },
            { name: "Snapshots", values: ["Manual", "Manual", "Scheduled", "Scheduled"] },
            { name: "Backups", values: ["Optional", "Optional", "Optional", "Optional"] },
            { name: "Support", values: ["Standard", "Standard", "Priority", "Priority"] }
        ]
    }
];

/* ================================
   VPS Call To Action
================================ */

export const vpsCTA =
    "Need full control, background workers, or databases? VPS gives you dedicated power and root access.";
