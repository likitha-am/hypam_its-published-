import React, { useState } from 'react';
import Layout from '../components/Layout';
import API from '../api/api';


export default function Quiz() {
const [topic, setTopic] = useState('Arrays');
const [difficulty, setDifficulty] = useState('easy');
const [quiz, setQuiz] = useState(null);
const [loading, setLoading] = useState(false);


async function generate(){
setLoading(true);
try{
const res = await API.post('/quiz/generate',{ studentId: 'guest', topic, difficulty });
setQuiz(res.data);
}catch(e){alert('Failed');}
setLoading(false);
}


return (
<Layout>
<div className="max-w-3xl mx-auto">
<h1 className="text-2xl font-bold mb-4">Quiz Maker</h1>
<div className="bg-white p-5 rounded-lg shadow mb-4">
<div className="grid grid-cols-3 gap-3">
<input value={topic} onChange={e=>setTopic(e.target.value)} className="col-span-2 p-3 border rounded" />
<select value={difficulty} onChange={e=>setDifficulty(e.target.value)} className="p-3 border rounded">
<option>easy</option>
<option>medium</option>
<option>hard</option>
</select>
</div>
<div className="mt-4 text-right">
<button onClick={generate} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading? 'Generating...':'Generate Quiz'}</button>
</div>
</div>


{quiz && (
<div className="bg-white p-4 rounded shadow">
<h2 className="font-semibold mb-2">Quiz: {quiz.topic}</h2>
{quiz.questions.map((q,i)=> (
<div key={i} className="mb-3 p-3 border rounded">
<div className="font-medium">Q{i+1}: {q.question}</div>
<ul className="mt-2 list-disc ml-5">
{q.options.map((o,j)=>(<li key={j}>{o}</li>))}
</ul>
<div className="mt-2 text-sm text-green-600">Correct: {q.correctAnswer}</div>
</div>
))}
</div>
)}
</div>
</Layout>
);
}