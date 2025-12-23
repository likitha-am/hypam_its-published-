import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';


export default function Layout({ children }) {
return (
<div className="flex bg-slate-50 min-h-screen">
<Sidebar />
<div className="flex-1 ml-64">
<Topbar />
<main className="p-6">{children}</main>
</div>
</div>
);
}