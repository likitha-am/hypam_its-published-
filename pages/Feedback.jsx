import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';


export default function Feedback(){
const [list,setList] = useState([]);
useEffect(()=>{ API.get('/feedback').then(r=>setList(r.data)).catch(()=>{}) },[]);
return (
<Layout>
<h1 className="text-2xl font-bold mb-4">Feedback</h1>
<div className="bg-white p-4 rounded shadow">
{list.map(f=> (<div key={f._id} className="border-b p-2">{f.comment || `Rating: ${f.rating}`}</div>))}
</div>
</Layout>
)
}