import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ProfileComponent from '../components/Profile/Profile';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Profile = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="profile-page">
            <Navbar />
            <ProfileComponent />
            <Footer />
        </div>
    );
};

export default Profile;
