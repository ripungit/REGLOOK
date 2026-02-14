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

export const xcloudPlans: PricingPlan[] = [
    {
        name: "xCloud Nano",
        price: "$1.65",
        period: "/month",
        desc: "Best for personal projects & learning",
        color: "text-zinc-500"
    },
    {
        name: "xCloud Launch",
        price: "$4.42",
        period: "/month",
        desc: "Best for small production apps",
        color: "text-zinc-400"
    },
    {
        name: "xCloud Scale",
        price: "$7.75",
        period: "/month",
        desc: "Best for startups & SaaS products",
        isPopular: true,
        color: "text-orange-500"
    },
    {
        name: "xCloud Scale+",
        price: "$16.61",
        period: "/month",
        desc: "Best for agencies, startups & high-traffic apps",
        color: "text-blue-500"
    }
];

export const xcloudFeatures: PricingFeatureCategory[] = [
    {
        category: "Core Features",
        items: [
            { name: "Compute", values: ["0.25 vCPU", "1 vCPU", "2 vCPU", "4 vCPU"] },
            { name: "Memory", values: ["256 MB", "1 GB", "2 GB", "4–6 GB"] },
            { name: "Apps", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
            { name: "Global CDN", values: ["Included", "Always on", "High priority", "Highest priority"] },
            { name: "SSL", values: ["Auto SSL", "Auto SSL", "Unlimited SSL", "Unlimited SSL"] },
            { name: "App Sleep", values: ["Auto sleep", "Auto sleep", "Always on", "Always on"] },
            { name: "Isolation", values: ["Secure isolation", "Isolated containers", "Strong isolation", "Dedicated isolation"] },
            { name: "Traffic Handling", values: ["Standard", "Smart routing", "Optimized routing", "High-traffic optimized"] },
            { name: "Reliability", values: ["Auto restarts", "Auto recovery", "Zero-downtime deploys", "Zero-downtime at scale"] },
            { name: "Usage", values: ["Personal use", "Commercial use", "Client & SaaS use", "Agency & multi-client"] },
        ]
    },
    {
        category: "Advanced Tools",
        items: [
            { name: "Logs", values: ["Deploy logs", "Live build logs", "Live logs & errors", "Extended log retention"] },
            { name: "Env Variables", values: [true, true, true, true] },
            { name: "Rollbacks", values: ["Last deploy", "Previous deploy", "Instant rollback", "Multi-version rollback"] },
            { name: "Monitoring", values: ["Health checks", "Basic metrics", "Performance graphs", "Advanced analytics"] },
            { name: "Support", values: ["Docs only", "Email support", "Priority email", "Priority support"] },
        ]
    }
];

export const xcloudCTA = "Start small. Scale when you grow. No servers to manage.";
