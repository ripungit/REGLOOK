
const API_BASE_URL = 'http://localhost:9000'; // Adjust mock server port if needed

export const xCloudApi = {
    async getProjects() {
        const res = await fetch('/api/proxy/xcloud/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
    },

    async createProject(name: string) {
        const res = await fetch('/api/proxy/xcloud/projects', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to create project');
        }
        return res.json();
    },

    async getInstances() {
        const res = await fetch('/api/proxy/xcloud/instances');
        if (!res.ok) throw new Error('Failed to fetch instances');
        return res.json();
    },

    async createInstance(payload: {
        projectId: string;
        name: string;
        region?: string;
        provider?: string;
        vcpu?: number;
        ramMb?: number;
        diskGb?: number;
        image?: string;
        sshKeyId?: string;
    }) {
        const res = await fetch('/api/proxy/xcloud/instances', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
            // Handle 429 specifically if needed
            if (res.status === 429) throw new Error('Rate limit exceeded. Please try again later.');

            const error = await res.json();
            throw new Error(error.message || 'Failed to create instance');
        }
        return res.json();
    },

    async getInstance(id: string) {
        // FindAll returns array, we filter locally if backend doesn't have getOne, 
        // or assumes we have the array already. Backend has no getOne endpoint explicitly listed in my summary?
        // Checking summary: "Implemented the InstancesController with endpoints for creating, listing, starting, stopping, and deleting".
        // It seems getOne is missing. I will use findAll and filter.
        const instances = await this.getInstances();
        return instances.find((i: any) => i.id === id);
    },

    async startInstance(id: string) {
        const res = await fetch(`/api/proxy/xcloud/instances/${id}/start`, { method: 'POST' });
        if (!res.ok) throw new Error('Failed to start instance');
        return res.json();
    },

    async stopInstance(id: string) {
        const res = await fetch(`/api/proxy/xcloud/instances/${id}/stop`, { method: 'POST' });
        if (!res.ok) throw new Error('Failed to stop instance');
        return res.json();
    },

    async restartInstance(id: string) {
        const res = await fetch(`/api/proxy/xcloud/instances/${id}/restart`, { method: 'POST' });
        if (!res.ok) throw new Error('Failed to restart instance');
        return res.json();
    },

    async rebuildInstance(id: string) {
        const res = await fetch(`/api/proxy/xcloud/instances/${id}/rebuild`, { method: 'POST' });
        if (!res.ok) throw new Error('Failed to rebuild instance');
        return res.json();
    }
};
