import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';


export default function Attempts(){
const [attempts,setAttempts]=useState([]);
useEffect(()=>{ API.get('/attempts').then(r=>setAttempts(r.data)).catch(()=>{}) },[]);
return (
<Layout>
<h1 className="text-2xl font-bold mb-4">Attempts</h1>
<div className="bg-white p-4 rounded shadow">
{attempts.map(a=> (<div key={a._id} className="border-b p-3"><div className="font-semibold">{a.userQuestion}</div><div className="text-sm text-slate-600">{a.tutorAnswer}</div></div>))}
</div>
</Layout>
)
}