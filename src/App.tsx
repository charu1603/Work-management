
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';

import Kanban from './components/KanbanBoard'; 
import Invoice from './components/ManageInvoice';

import './App.css';

const App = () => (
  <Router>
    <div className="flex  w-full">
      <div className='w-[20%] h-screen fixed'>
         <Sidebar />
      </div>
     
      <div className="flex-1  ml-[20%] w-[80%]">
        <Routes>
          <Route path="/" element={<Kanban />} />
         
         
          <Route path="/invoice" element={<Invoice />} />
        
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;

