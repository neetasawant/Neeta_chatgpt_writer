import { useState } from 'react';
import './App.css';
import '@/assets/styles.css'
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='bg-red-500'>
      <h1 className='text-black'>AI Prompt</h1>
    </div>
  );
}

export default App;
