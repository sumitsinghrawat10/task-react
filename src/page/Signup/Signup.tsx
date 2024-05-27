import React, {  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 import { AppDispatch, RootState } from '../../store/Store';
 import { setEmail, setPassword, signUpUser,} from '../../slice/signUpSlice';
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { email, password, loading, error } = useSelector((state: RootState) => state.signUp);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(e.target.value));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signUpUser({ email, password }));
    };
    console.log(error?.message,"error")
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                {error && <p className="mt-4 text-red-600 text-center">{error.message}</p>}
                <div className="mt-6 text-center">
                    <p className="text-gray-700">Already have an account?</p>
                    <button className="mt-2 text-indigo-500 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-400" onClick={()=>navigate("/login")}>
                        Sign in Here
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
