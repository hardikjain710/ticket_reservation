import React, { useState, useEffect } from 'react';
import { AlertCircle, Train, Calendar, MapPin, User, LogOut, History, Search, Ticket } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';

// Register Page Component
const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! Please login.');
        onNavigate('login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Train className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join our train booking system</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-blue-600 font-semibold hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        onLogin(data.user || data);
        onNavigate('dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Train className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Login to your account</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('register')} className="text-blue-600 font-semibold hover:underline">
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ user, onNavigate, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Train className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Train Booking</h1>
          </div>
          <div className="flex items-center space-x-4">
            <User className="w-5 h-5" />
            <span>{user?.name || 'User'}</span>
            <button onClick={onLogout} className="flex items-center space-x-1 bg-red-500 px-4 py-2 rounded hover:bg-red-600">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">What would you like to do?</h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <button
            onClick={() => onNavigate('search')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <Search className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Search Trains</h3>
            <p className="text-gray-600">Find available trains for your journey</p>
          </button>

          <button
            onClick={() => onNavigate('book')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <Ticket className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Book Ticket</h3>
            <p className="text-gray-600">Reserve your seat on a train</p>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <History className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Booking History</h3>
            <p className="text-gray-600">View your past bookings</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// Search Trains Component
const SearchTrains = ({ onNavigate, onSelectTrain }) => {
  const [formData, setFormData] = useState({ source: '', destination: '' });
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/trains/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setTrains(data.trains || data);
      } else {
        setError(data.message || 'Search failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookTrain = (train) => {
    onSelectTrain(train);
    onNavigate('book');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 hover:underline">
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Trains</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Source</label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Delhi"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Destination</label>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mumbai"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Searching...' : 'Search Trains'}
            </button>
          </div>
        </div>

        {trains.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Available Trains</h3>
            <div className="space-y-4">
              {trains.map((train) => (
                <div key={train.id || train._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{train.name || `Train ${train.id || train._id}`}</h4>
                      <p className="text-gray-600">
                        <MapPin className="inline w-4 h-4 mr-1" />
                        {train.source} → {train.destination}
                      </p>
                      <p className="text-gray-600 text-sm">Available Seats: {train.availableSeats || train.seats}</p>
                    </div>
                    <button
                      onClick={() => handleBookTrain(train)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Book Ticket Component
const BookTicket = ({ user, selectedTrain, onNavigate }) => {
  const [formData, setFormData] = useState({
    trainId: selectedTrain?.id || selectedTrain?._id || '',
    seats: 1,
    date: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBook = async () => {
    setError('');
    setLoading(true);

    // VALIDATION
    if (!formData.trainId || !formData.seats || !formData.date) {
      setError("All fields required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/bookings/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,             // backend expects "user_id"
          train_id: formData.trainId,    // backend expects "train_id"
          seat_number: formData.seats,   // backend expects "seat_number"
          booking_date: formData.date    // backend expects "booking_date"
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => onNavigate("history"), 2000);
      } else {
        setError(data.message || "Booking failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-2xl">
        <button onClick={() => onNavigate("dashboard")} className="mb-4 text-blue-600 hover:underline">
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Ticket</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Booking successful! Redirecting to history...
            </div>
          )}

          {selectedTrain && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800">Selected Train</h3>
              <p className="text-gray-700">{selectedTrain.name || `Train ${selectedTrain.id}`}</p>
              <p className="text-gray-600 text-sm">
                {selectedTrain.source} → {selectedTrain.destination}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Train ID</label>
              <input
                type="text"
                value={formData.trainId}
                onChange={(e) => setFormData({ ...formData, trainId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter Train ID"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Number of Seats</label>
              <input
                type="number"
                min="1"
                value={formData.seats}
                onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Travel Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              onClick={handleBook}
              disabled={loading || success}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking History Component
const BookingHistory = ({ user, onNavigate }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings/history/${user?.id || user?._id}`);
      const data = await response.json();
      
      if (response.ok) {
        setBookings(data.bookings || data);
      } else {
        setError(data.message || 'Failed to fetch bookings');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-6xl">
        <button onClick={() => onNavigate('dashboard')} className="mb-4 text-blue-600 hover:underline">
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking History</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-center text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-600">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id || booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id || booking._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.trainId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status || 'Confirmed'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.date || booking.bookingDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [selectedTrain, setSelectedTrain] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedTrain(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleSelectTrain = (train) => {
    setSelectedTrain(train);
  };

  return (
    <>
      {currentPage === 'register' && <RegisterPage onNavigate={handleNavigate} />}
      {currentPage === 'login' && <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />}
      {currentPage === 'dashboard' && <Dashboard user={user} onNavigate={handleNavigate} onLogout={handleLogout} />}
      {currentPage === 'search' && <SearchTrains onNavigate={handleNavigate} onSelectTrain={handleSelectTrain} />}
      {currentPage === 'book' && <BookTicket user={user} selectedTrain={selectedTrain} onNavigate={handleNavigate} />}
      {currentPage === 'history' && <BookingHistory user={user} onNavigate={handleNavigate} />}
    </>
  );
}