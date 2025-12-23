import React from 'react';
import { NavLink } from 'react-router-dom';


const NavItem = ({ to, children }) => (
<NavLink
to={to}
className={({ isActive }) =>
`block px-4 py-3 rounded-lg mb-1 transition-colors text-white/90 hover:bg-white/10 ${
isActive ? 'bg-white/10 font-semibold' : ''
}`
}
>
{children}
</NavLink>
);
export default function Sidebar() {
return (
<aside className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-purple-700 via-indigo-600 to-blue-600 shadow-xl p-6">
<div className="mb-8">
<h2 className="text-white text-2xl font-bold">AI Tutor</h2>
<p className="text-white/80 text-sm mt-1">Smart learning dashboard</p>
</div>


<nav className="mt-6">
<NavItem to="/">Tutor</NavItem>
<NavItem to="/quiz">Quiz Maker</NavItem>
<NavItem to="/dashboard">Dashboard</NavItem>
<NavItem to="/students">Students</NavItem>
<NavItem to="/attempts">Attempts</NavItem>
<NavItem to="/feedback">Feedback</NavItem>
</nav>


<div className="absolute bottom-6 left-6 right-6 text-white/80 text-sm">
<div className="mt-4">v1.0</div>
</div>
</aside>
);
}
