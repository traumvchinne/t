import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Booking, Room } from '../types';
import { useAuth } from '../context/AuthContext';

interface CalendarProps {
  selectedRoom: Room;
  bookings: Booking[];
  onDateSelect: (date: Date) => void;
}

export const Calendar = ({ selectedRoom, bookings, onDateSelect }: CalendarProps) => {
  const { user } = useAuth();
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBookingStatus = (date: Date) => {
    const booking = bookings.find(
      (b) => b.roomId === selectedRoom.id && isSameDay(new Date(b.date), date)
    );
    return booking?.status;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        {format(today, 'MMMM yyyy', { locale: ptBR })} - {selectedRoom.name}
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {days.map((date) => {
          const status = getBookingStatus(date);
          return (
            <button
              key={date.toString()}
              onClick={() => onDateSelect(date)}
              disabled={date < today || (status && user?.role !== 'admin')}
              className={`
                p-4 rounded-lg text-center transition-colors
                ${status === 'approved' ? 'bg-green-100' : ''}
                ${status === 'pending' ? 'bg-yellow-100' : ''}
                ${status === 'rejected' ? 'bg-red-100' : ''}
                ${!status ? 'hover:bg-gray-100' : ''}
                ${date < today ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};