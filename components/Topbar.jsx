import React from 'react';


export default function Topbar() {
return (
<header className="h-16 flex items-center justify-between px-6 bg-white/30 backdrop-blur sticky top-0 z-10">
<div className="text-lg font-semibold">Welcome</div>
<div className="flex items-center gap-4">
<div className="text-sm text-slate-700">Prem Raga</div>
</div>
</header>
);
}