import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrder } from '../../context/OrderContext';
import { FiUser, FiLock, FiEdit2, FiSave, FiX, FiShoppingBag, FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
    const { user, updateProfile, changePassword, logout } = useAuth();
    const { orders, cancelOrder, fetchUserOrders } = useOrder();
    const [activeTab, setActiveTab] = useState('info');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Edit states
    const [editMode, setEditMode] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await updateProfile(profileData);
        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setEditMode(false);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
        setLoading(false);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        setLoading(true);
        const result = await changePassword({
            oldPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword
        });
        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } else {
            setMessage({ type: 'error', text: result.message });
        }
        setLoading(false);
    };

    const handleCancelOrder = async (id) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            const res = await cancelOrder(id);
            if (res.success) {
                setMessage({ type: 'success', text: 'Order cancelled successfully' });
                fetchUserOrders();
            } else {
                setMessage({ type: 'error', text: 'Failed to cancel order' });
            }
        }
    }

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case 'pending': return <span className="status pending"><FiClock /> Pending</span>;
            case 'processing': return <span className="status processing"><FiTruck /> Processing</span>;
            case 'completed': return <span className="status completed"><FiCheckCircle /> Delivered</span>;
            case 'cancelled': return <span className="status cancelled"><FiXCircle /> Cancelled</span>;
            default: return <span className="status">{status}</span>;
        }
    }

    return (
        <div className="profile-container">
            <div className="profile-sidebar">
                <div className="profile-user-info">
                    <div className="profile-avatar">
                        <FiUser size={40} />
                    </div>
                    <h3>{user?.name}</h3>
                    <p>{user?.email}</p>
                </div>
                <div className="profile-nav">
                    <button
                        className={activeTab === 'info' ? 'active' : ''}
                        onClick={() => setActiveTab('info')}
                    >
                        <FiUser /> Personal Info
                    </button>
                    <button
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => setActiveTab('orders')}
                    >
                        <FiShoppingBag /> My Orders
                    </button>
                    <button
                        className={activeTab === 'password' ? 'active' : ''}
                        onClick={() => setActiveTab('password')}
                    >
                        <FiLock /> Change Password
                    </button>
                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>

            <div className="profile-content">
                {message.text && (
                    <div className={`profile-message ${message.type}`}>
                        {message.text}
                        <FiX onClick={() => setMessage({ type: '', text: '' })} />
                    </div>
                )}

                {activeTab === 'info' && (
                    <div className="profile-section">
                        <div className="section-header">
                            <h2>Personal Information</h2>
                            {!editMode && (
                                <button className="edit-btn" onClick={() => setEditMode(true)}>
                                    <FiEdit2 /> Edit
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleUpdateProfile}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    disabled={!editMode}
                                    onChange={handleProfileChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    disabled={true} // Email usually not editable
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profileData.phone}
                                    disabled={!editMode}
                                    onChange={handleProfileChange}
                                    placeholder="Add phone number"
                                />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <textarea
                                    name="address"
                                    value={profileData.address}
                                    disabled={!editMode}
                                    onChange={handleProfileChange}
                                    placeholder="Add your address"
                                />
                            </div>

                            {editMode && (
                                <div className="form-actions">
                                    <button type="submit" className="save-btn" disabled={loading}>
                                        <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" className="cancel-btn" onClick={() => setEditMode(false)}>
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="profile-section">
                        <h2>Order History</h2>
                        <div className="orders-list">
                            {orders.length === 0 ? (
                                <div className="empty-orders">
                                    <FiShoppingBag size={48} opacity={0.3} />
                                    <p>You haven't placed any orders yet.</p>
                                </div>
                            ) : (
                                orders.map(order => (
                                    <div key={order.id} className="order-item">
                                        <div className="order-item-header">
                                            <div className="order-meta">
                                                <span className="order-id">Order ID: #{order.id}</span>
                                                <span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            {getStatusBadge(order.status)}
                                        </div>
                                        <div className="order-items-minimal">
                                            {order.items?.map((item, idx) => (
                                                <p key={idx}>{item.name} x {item.quantity}</p>
                                            ))}
                                        </div>
                                        <div className="order-footer">
                                            <div className="order-total">
                                                <span>Total:</span>
                                                <strong>₹{parseFloat(order.totalAmount).toLocaleString()}</strong>
                                            </div>
                                            {(order.status === 'pending' || order.status === 'Processing') && (
                                                <button
                                                    className="cancel-order-btn"
                                                    onClick={() => handleCancelOrder(order.id)}
                                                >
                                                    Cancel Order
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'password' && (
                    <div className="profile-section">
                        <h2>Change Password</h2>
                        <form onSubmit={handleChangePassword}>
                            <div className="form-group">
                                <label>Current Password</label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="save-btn" disabled={loading}>
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
