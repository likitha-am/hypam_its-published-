import React, { useState } from 'react';


export default function FeedbackCard({ onSubmit }) {
const [rating, setRating] = useState(5);
const [comment, setComment] = useState('');


function submit() {
if (!onSubmit) return;
onSubmit({ rating, comment });
}


return (
<div className="mt-4 bg-white p-4 rounded-xl shadow">
<div className="font-medium mb-2">Give Feedback</div>
<div className="flex items-center gap-3 mb-3">
<label className="text-sm">Rating</label>
<input
type="range"
min="1"
max="5"
value={rating}
onChange={(e) => setRating(Number(e.target.value))}
className="w-48"
/>
<div className="ml-2 font-semibold">{rating}</div>
</div>


<textarea
value={comment}
onChange={(e) => setComment(e.target.value)}
placeholder="Short note (what can be improved)"
className="w-full p-3 rounded-lg border"
/>


<div className="mt-3 text-right">
<button
onClick={submit}
className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
>
Save Feedback
</button>
</div>
</div>
);
}