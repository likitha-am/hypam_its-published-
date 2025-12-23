import React from 'react';
export default function StatCard({ title, value, icon }) {
return (
<div className="bg-white rounded-2xl p-5 shadow">
<div className="flex items-center justify-between">
<div>
<div className="text-sm text-slate-500">{title}</div>
<div className="text-2xl font-semibold mt-1">{value}</div>
</div>
<div className="text-3xl text-indigo-500">{icon}</div>
</div>
</div>
);
}