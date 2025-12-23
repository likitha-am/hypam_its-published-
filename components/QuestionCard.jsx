import React from 'react';
export default function Questioncard({ question, answer }) {
return (
<div className="rounded-xl p-4 bg-white shadow">
<div className="text-slate-700 font-medium">Question</div>
<div className="mt-2 text-slate-900">{question}</div>


<div className="mt-4 text-slate-700 font-medium">Answer</div>
<div className="mt-2 text-slate-800 whitespace-pre-line">{answer}</div>
</div>
);
}