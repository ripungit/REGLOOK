'use client';

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 p-8">
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg text-slate-600 mb-8">Welcome back! You are successfully logged in.</p>

            <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-200">
                <h2 className="text-xl font-semibold mb-2">User Status</h2>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Authenticated via GitHub
                </div>

                <p className="mt-4 text-slate-500 text-sm">
                    Checks cookies: `reglook_session` and `access_token` should be present.
                </p>
            </div>
        </div>
    );
}
