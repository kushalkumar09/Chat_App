import { useContext, useState } from 'react';
import assets from '../assets/assets'; // Adjust path if needed
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [currState, setCurrState] = useState('Login');
  const [fullName,setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const { login } = useContext(AuthContext);
  const onSubmitHandler = (e) =>{
    e.preventDefault();
    if(currState === 'Sign Up'){
      login('signup', {fullName, email, password});
    }
    else{
      login('login', {email, password});
    }
  }
  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      
      {/* Left: Logo */}
      <img src={assets.logo_big} alt="App Logo" className="w-[min(30vw,250px)]" />

      {/* Right: Form */}
      <form className="border-2 border-gray-500 bg-white/10 text-white p-6 flex flex-col gap-6 rounded-lg shadow-lg w-[min(90vw,400px)]">
        <h2 className="font-medium text-2xl flex justify-between items-center cursor-pointer" onClick={() => setCurrState(currState === 'Login' ? 'Sign Up' : 'Login')}>
          {currState}
          <img src={assets.arrow_icon} alt="" className='w-5 cursor-pointer'/>
        </h2>

        {/* Example input fields */}
         {currState === 'Sign Up' && (<input
          type="text"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          placeholder="Full Name"
          className="p-3 rounded-md bg-white/10 text-white border border-gray-400 placeholder-gray-300 outline-none"
        />)}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md bg-white/10 text-white border border-gray-400 placeholder-gray-300 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-md bg-white/10 text-white border border-gray-400 placeholder-gray-300 outline-none"
        />

        <button
          type="submit"
          onClick={onSubmitHandler}
          className="bg-violet-600 hover:bg-violet-700 transition p-3 rounded-md text-white font-semibold"
        >
          {currState==="Sign Up" ? "Create Account" : "Login Now"}
        </button>

        <div>
          {currState === 'Sign Up' ?(
            <p  className='text-gray-400 text-sm'>Already Have an account <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>setCurrState("Login")}>Login Here</span></p>
          ):(<p  className='text-gray-400 text-sm'>Create an account <span className='font-medium text-violet-500 cursor-pointer' onClick={()=>setCurrState("Sign Up")}>Click Here to Sign Up</span></p>)}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
