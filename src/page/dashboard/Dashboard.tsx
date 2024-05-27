import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/Store';
import { fetchUsers } from '../../slice/userSlice';
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.users.users);
    const loading = useSelector((state: RootState) => state.users.status === 'loading');
    const error = useSelector((state: RootState) => state.users.error);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleLogout = () => {
        navigate("/")
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">Logout</button>
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">User Details</h2>
            
                {users && users.map((user: User) => (
                    <div key={user.id} className="mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Name</label>
                            <p className="px-4 py-2 mt-2 border rounded-lg">{user.first_name} {user.last_name}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Email</label>
                            <p className="px-4 py-2 mt-2 border rounded-lg">{user.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Avatar</label>
                            <img src={user.avatar} alt="Avatar" className="w-20 h-20 mx-auto mt-2 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
