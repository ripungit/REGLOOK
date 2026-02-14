const API_URL = "http://localhost:9000";

export const api = {
    auth: {
        signupStart: async (data: { firstName: string; lastName: string; email: string; username: string; marketingOptIn: boolean }) => {
            const res = await fetch(`${API_URL}/auth/signup/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(await res.text() || "Signup failed");
            return res.json();
        },
        signupPassword: async (data: { userId: string; password: string }) => {
            const res = await fetch(`${API_URL}/auth/signup/password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) throw new Error(await res.text() || "Signup failed");
            return res.json();
        },
        signupPasskeyStart: async (data: { userId: string }) => {
            const res = await fetch(`${API_URL}/auth/signup/passkey/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(await res.text() || "Passkey registration failed");
            return res.json();
        },
        signupPasskeyFinish: async (data: { userId: string; data: any }) => {
            const res = await fetch(`${API_URL}/auth/signup/passkey/finish`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) throw new Error(await res.text() || "Passkey verification failed");
            return res.json();
        },
        loginPassword: async (data: { username: string; password: string }) => {
            const res = await fetch(`${API_URL}/auth/login/password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) throw new Error(await res.text() || "Login failed");
            return res.json();
        },
        loginPasskeyStart: async (data: { username: string }) => {
            const res = await fetch(`${API_URL}/auth/login/passkey/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) throw new Error(await res.text() || "Passkey login failed");
            return res.json();
        },
        loginPasskeyFinish: async (data: { username: string; data: any }) => {
            const res = await fetch(`${API_URL}/auth/login/passkey/finish`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) throw new Error(await res.text() || "Passkey verification failed");
            return res.json();
        },
        me: async () => {
            const res = await fetch(`${API_URL}/auth/me`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        },
        logout: async () => {
            const res = await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Logout failed");
            return res.json();
        },
        listGithubRepos: async () => {
            const res = await fetch(`${API_URL}/auth/github/repos`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch GitHub repos");
            return res.json();
        }
    },
    billing: {
        getSubscriptions: async () => {
            const res = await fetch(`${API_URL}/billing/subscriptions`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch subscriptions");
            return res.json();
        },
        cancelSubscription: async (id: string) => {
            const res = await fetch(`${API_URL}/billing/subscriptions/${id}/cancel`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to cancel subscription");
            return res.json();
        },
        pauseSubscription: async (id: string) => {
            const res = await fetch(`${API_URL}/billing/subscriptions/${id}/pause`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to pause subscription");
            return res.json();
        },
        resumeSubscription: async (id: string) => {
            const res = await fetch(`${API_URL}/billing/subscriptions/${id}/resume`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to resume subscription");
            return res.json();
        },
        undoScheduledChange: async (id: string) => {
            const res = await fetch(`${API_URL}/billing/subscriptions/${id}/undo`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to undo scheduled change");
            return res.json();
        },
        getPaymentMethods: async () => {
            const res = await fetch(`${API_URL}/billing/payment-methods`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch payment methods");
            return res.json();
        },
        getCustomerAuthToken: async () => {
            const res = await fetch(`${API_URL}/billing/customer-auth-token`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to get customer auth token");
            return res.json();
        },
        createPaymentMethodSetupCheckout: async () => {
            const res = await fetch(`${API_URL}/billing/payment-methods/checkout`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to create setup checkout");
            return res.json();
        },
        requestPaymentMethodRemoval: async (id: string, reason: string) => {
            const res = await fetch(`${API_URL}/billing/payment-methods/${id}/request-removal`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason }),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to submit removal request");
            // Handle potentially empty response if server sends 201 Created with no body (though we fixed server to send body now)
            try {
                return await res.json();
            } catch (e) {
                return {};
            }
        },
        getOrdersAndTransactions: async () => {
            const res = await fetch(`${API_URL}/billing/orders-transactions`, {
                method: "GET",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch orders and transactions");
            return res.json();
        }
    },
    airnode: {
        listApps: async () => {
            const res = await fetch("http://localhost:9000/apps", { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch apps");
            return res.json();
        },
        createApp: async (data: { name: string; slug: string }) => {
            const res = await fetch("http://localhost:9000/apps", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to create app");
            return res.json();
        },
        getApp: async (id: string) => {
            const res = await fetch(`http://localhost:9000/apps/${id}`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch app details");
            return res.json();
        },
        connectGit: async (id: string, data: { provider: string; repository: string; branch: string }) => {
            const res = await fetch(`http://localhost:9000/apps/${id}/git/connect`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to connect git");
            return res.json();
        },
        triggerBuild: async (appId: string) => {
            const res = await fetch(`http://localhost:9000/apps/${appId}/builds`, {
                method: "POST",
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to trigger build");
            return res.json();
        },
        getBuildStatus: async (buildId: string) => {
            const res = await fetch(`http://localhost:9000/builds/${buildId}`, { credentials: "include" });
            if (!res.ok) throw new Error("Failed to fetch build status");
            return res.json();
        },
        deployBuild: async (appId: string, buildId: string) => {
            const res = await fetch(`http://localhost:9000/apps/${appId}/deploy`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ buildId }),
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to deploy");
            return res.json();
        }
    }
};
