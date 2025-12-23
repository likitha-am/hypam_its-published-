import React, { useState, useEffect } from 'react';
import API from '../api/api';
import Questioncard from '../components/QuestionCard';
import FeedbackCard from '../components/FeedbackCard';


export default function Tutor() {
const [student, setStudent] = useState(null);
const [name, setName] = useState('');
const [question, setQuestion] = useState('');
const [answer, setAnswer] = useState('');
const [attemptId, setAttemptId] = useState(null);
const [loading, setLoading] = useState(false);


useEffect(()=>{
async function createDefault(){
if(!student){
try{
const res = await API.post('/student',{name:'Guest',email:''});
setStudent(res.data);
}catch(e){}
}
}
createDefault();
},[]);


async function handleAsk(){
if(!question) return;
setLoading(true);
try{
const payload = { studentId: student?._id, question, subject: 'general' };
const res = await API.post('/ask', payload);
setAnswer(res.data.answer);
if(res.data.attemptId) setAttemptId(res.data.attemptId);
}catch(err){
console.error(err);
setAnswer('Error retrieving answer');
}finally{setLoading(false)}
}


async function handleFeedback(fb){
if(!attemptId) return alert('No attempt recorded yet.');
try{ await API.post('/feedback',{ attemptId, ...fb }); alert('Saved') }catch(e){alert('Failed')}
}


return (
<Layout>
<div className="max-w-3xl mx-auto">
<div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
<h2 className="text-2xl font-bold">Ask the AI Tutor</h2>
<p className="mt-1 text-sm opacity-90">Simple explanations, step-by-step examples and a short practice question.</p>


<div className="mt-4 grid grid-cols-3 gap-3">
<input className="col-span-3 p-3 rounded-lg text-black" placeholder="Optional name" value={name} onChange={e=>setName(e.target.value)} />
<textarea className="col-span-3 mt-3 p-3 rounded-lg text-black" rows={4} placeholder="Ask a question..." value={question} onChange={e=>setQuestion(e.target.value)} />
<div className="col-span-3 text-right">
<button onClick={handleAsk} disabled={loading} className="px-5 py-2 rounded-lg bg-white text-indigo-600 font-semibold shadow hover:scale-105 transition">
{loading? 'Thinking...' : 'Ask Tutor'}
</button>
</div>
</div>
</div>


{answer && (
<div className="mt-6">
<Questioncard question={question} answer={answer} />
<FeedbackCard onSubmit={handleFeedback} />
</div>
)}
</div>
</Layout>
);
}