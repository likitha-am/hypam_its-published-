import React, { useEffect, useState } from 'react';
export default function Dashboard() {
const [students, setStudents] = useState([]);
const [attempts, setAttempts] = useState([]);


useEffect(() => {
API.get('/students').then(r => setStudents(r.data)).catch(()=>{});
API.get('/attempts').then(r => setAttempts(r.data)).catch(()=>{});
}, []);


const attemptsPerStudent = students.map(s => attempts.filter(a => a.studentId === s._id).length);


const barData = {
labels: students.map(s => s.name || 'Guest'),
datasets: [{ label: 'Attempts', data: attemptsPerStudent }]
};


const pieData = {
labels: ['Correct','Wrong'],
datasets: [{ data: [attempts.filter(a=>a.isCorrect).length, attempts.filter(a=>!a.isCorrect).length] }]
};


return (
<Layout>
<h1 className="text-3xl font-bold mb-4">Dashboard</h1>


<div className="grid grid-cols-3 gap-6 mb-6">
<StatCard title="Students" value={students.length} icon="🎓" />
<StatCard title="Attempts" value={attempts.length} icon="📝" />
<StatCard title="Accuracy" value={attempts.length===0?"0%":`${Math.round((attempts.filter(a=>a.isCorrect).length/attempts.length)*100)}%`} icon="📈" />
</div>


<div className="grid grid-cols-2 gap-6">
<div className="bg-white p-4 rounded-xl shadow">
<h3 className="font-semibold mb-3">Attempts per student</h3>
<Bar data={barData} />
</div>


<div className="bg-white p-4 rounded-xl shadow">
<h3 className="font-semibold mb-3">Correct vs Wrong</h3>
<Pie data={pieData} />
</div>
</div>
</Layout>
);
}