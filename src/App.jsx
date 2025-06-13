import Home from "./components/Home.jsx";
// import './index.css';

function App() {

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 py-8 px-4 text-black">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-5">AI IMAGE ENHANCER</h1>
        <p className="text-lg text-gray-500">Upload your image and let AI enhance it for you !!</p>
      </div>
      <Home/>
      <div className="text-sm text-gray-500">
        Powered by AI
      </div>
    </div>
  );
}

export default App
