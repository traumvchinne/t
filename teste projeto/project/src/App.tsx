import React, { useState, useEffect } from 'react';
import { Calendar } from './components/Calendar';
import { Login } from './components/Login';
import { BookingModal } from './components/BookingModal';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Booking, Room } from './types';
import { LogOut, Calendar as CalendarIcon } from 'lucide-react';

const rooms: Room[] = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: `Sala ${i + 1}`,
}));

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedRoom, setSelectedRoom] = useState<Room>(rooms[0]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleBookingConfirm = () => {
    if (selectedDate && user) {
      const newBooking: Booking = {
        id: Math.random().toString(36).substr(2, 9),
        roomId: selectedRoom.id,
        date: selectedDate.toISOString(),
        status: user.role === 'admin' ? 'approved' : 'pending',
        userId: user.username,
        userName: user.username,
      };
      setBookings([...bookings, newBooking]);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Reservas</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">
              {user?.role === 'admin' ? 'Administrador' : 'Convidado'}
            </span>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione uma sala
          </label>
          <select
            value={selectedRoom.id}
            onChange={(e) => setSelectedRoom(rooms[Number(e.target.value) - 1])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>
        </div>

        <Calendar
          selectedRoom={selectedRoom}
          bookings={bookings}
          onDateSelect={handleDateSelect}
        />

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedDate={selectedDate!}
          onConfirm={handleBookingConfirm}
          isAdmin={user?.role === 'admin'}
        />
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Login />;
}

export default App;