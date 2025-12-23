import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tutor from './pages/Tutor';
import Quiz from './pages/Quiz';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import Students from './pages/Students';
import Attempts from './pages/Attempts';


export default function App(){
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Tutor />} />
<Route path="/quiz" element={<Quiz />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/feedback" element={<Feedback />} />
<Route path="/students" element={<Students />} />
<Route path="/attempts" element={<Attempts />} />
</Routes>
</BrowserRouter>
)
}