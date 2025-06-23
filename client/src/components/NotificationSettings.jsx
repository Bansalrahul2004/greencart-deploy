import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const NotificationSettings = ({ onClose }) => {
    const [settings, setSettings] = useState({
        email: true,
        sms: false,
        push: true
    });
    const [loading, setLoading] = useState(false);
    const { axios, user } = useAppContext();

    const handleToggle = (type) => {
        setSettings(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // This would update user notification preferences
            // For now, we'll just show a success message
            alert('Notification settings saved successfully!');
            onClose();
        } catch (error) {
            console.log(error);
            alert('Failed to save notification settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Notification Settings</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-gray-600">Receive order updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.email}
                                onChange={() => handleToggle('email')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                            <h4 className="font-medium">SMS Notifications</h4>
                            <p className="text-sm text-gray-600">Receive order updates via SMS</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.sms}
                                onChange={() => handleToggle('sms')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div>
                            <h4 className="font-medium">Push Notifications</h4>
                            <p className="text-sm text-gray-600">Receive order updates in browser</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.push}
                                onChange={() => handleToggle('push')}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                    </div>
                </div>

                <div className="mt-6 flex space-x-3">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : 'Save Settings'}
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings; 