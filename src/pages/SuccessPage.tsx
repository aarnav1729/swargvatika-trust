// root/src/pages/SuccessPage.tsx
import { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import PageTransition from '@/components/layout/PageTransition';  
import PageHeader from '@/components/ui/PageHeader';  
import { Button } from '@/components/ui/button';  

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
  selectedServices: ServiceData[];  
}  

export default function SuccessPage() {  
  const navigate = useNavigate();  
  const [booking, setBooking] = useState<BookingDetails | null>(null);  

  useEffect(() => {  
    const raw = sessionStorage.getItem('bookingDetails');  
    if (!raw) {  
      navigate('/services');  
      return;  
    }  
    const data: BookingDetails = JSON.parse(raw);  
    setBooking(data);  

    // trigger email  
    fetch('https://swargvatika-trust.onrender.com/api/email/receipt', {  
      method: 'POST',  
      headers: { 'Content-Type': 'application/json' },  
      body: JSON.stringify(data),  
    }).catch(err => console.error('Email error:', err));  
  }, [navigate]);  

  if (!booking) return null;  

  const { formData, selectedServices } = booking;  
  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);  

  return (  
    <PageTransition>  
      <PageHeader  
        title="Booking Confirmation"  
        description="Thank you for your payment. Below is your invoice."  
      />  

      <section className="py-16 bg-gray-50 dark:bg-gray-800">  
        <div className="container mx-auto px-4 max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md">  
          <h2 className="text-2xl font-serif font-bold mb-6">  
            Invoice / Receipt  
          </h2>  

          <div className="mb-6">  
            <p><strong>Name:</strong> {formData.name}</p>  
            <p><strong>Email:</strong> {formData.email}</p>  
            <p><strong>Phone:</strong> {formData.phone}</p>  
            <p><strong>Address:</strong> {formData.address || '—'}</p>  
            <p><strong>Notes:</strong> {formData.notes || '—'}</p>  
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

          <p className="text-lg text-muted-foreground mb-4">  
            Please download or print this receipt and <strong>call +91-8008694888, +91-9701171222, or +91-6301341475</strong> to confirm your date and time slot immediately.  
          </p>  

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