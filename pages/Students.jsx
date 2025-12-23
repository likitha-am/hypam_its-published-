import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';


export default function Students(){
const [students,setStudents] = useState([]);
useEffect(()=>{ API.get('/students').then(r=>setStudents(r.data)).catch(()=>{}) },[]);
return (
<Layout>
<h1 className="text-2xl font-bold mb-4">Students</h1>
<div className="bg-white p-4 rounded shadow">
<table className="w-full text-left">
<thead><tr><th>Name</th><th>Email</th><th>Created</th></tr></thead>
<tbody>
{students.map(s=> (<tr key={s._id} className="border-t"><td className="p-2">{s.name}</td><td className="p-2">{s.email}</td><td className="p-2">{new Date(s.createdAt).toLocaleString()}</td></tr>))}
</tbody>
</table>
</div>
</Layout>
)
}