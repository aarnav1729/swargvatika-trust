import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '@/components/layout/PageTransition';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ServiceData {
  id: string;
  title: string;
  price: number;
}

interface BookingDetails {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    agreeTerms: boolean;
  };
  serviceDate: string;   // ISO string
  serviceTime: string;
  selectedServices: ServiceData[];
}

export default function SuccessPage() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('bookingDetails');
    if (!raw) {
      // nothing to show → back to services
      navigate('/services');
      return;
    }
    setBooking(JSON.parse(raw));
  }, [navigate]);

  if (!booking) return null;

  const { formData, serviceDate, serviceTime, selectedServices } = booking;
  const date = serviceDate ? format(new Date(serviceDate), 'PPP') : '';
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <PageTransition>
      <PageHeader title="Booking Confirmation" description="Thank you for your payment. Below is your invoice." />

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-serif font-bold mb-6">Invoice / Receipt</h2>

          <div className="mb-6">
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Address:</strong> {formData.address || '—'}</p>
            <p><strong>Notes:</strong> {formData.notes || '—'}</p>
          </div>

          <div className="mb-6">
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {serviceTime}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Services</h3>
            <ul className="list-disc list-inside">
              {selectedServices.map(s => (
                <li key={s.id}>
                  {s.title} — ₹{s.price.toLocaleString()}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 text-right font-bold">
            Total: ₹{total.toLocaleString()}
          </div>

          <div className="flex justify-between">
            <Button onClick={() => window.print()} className="bg-primary text-white">
              Download / Print Receipt
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Return Home
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}