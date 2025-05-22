// root/src/pages/PaymentPage.tsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/layout/PageTransition";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID as string;

// Interface for service data
interface ServiceData {
  id: string;
  title: string;
  price: number;
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<ServiceData[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    agreeTerms: false,
  });

  // Payment flow states
  const [paymentStep, setPaymentStep] = useState<"form" | "qr" | "success">(
    "form"
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

  // Load selected services from session storage
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("selectedServices");
      if (saved) {
        setSelectedServices(JSON.parse(saved));
      } else {
        navigate("/services");
      }
    } catch (err) {
      console.error(err);
      navigate("/services");
    }
  }, [navigate]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Calculate total (GST removed)
  const calculateTotal = () =>
    selectedServices.reduce((sum, svc) => sum + svc.price, 0);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((p) => ({ ...p, agreeTerms: checked }));
  };

  const initializePayment = async () => {
    if (!formData.agreeTerms)
      return toast({ title: "Accept terms to proceed", variant: "destructive" });
    setLoading(true);
    try {
      const amount = calculateTotal() * 100;
      const orderRes = await fetch(
        "https://swargvatika-trust.onrender.com/api/payment/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            notes: {
              services: selectedServices.map((s) => s.title).join(", "),
            },
          }),
        }
      );
      const order = await orderRes.json();

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Swargvatika",
        description: "Payment for services",
        order_id: order.id,
        handler: async (resp: any) => {
          const verifyRes = await fetch(
            "https://swargvatika-trust.onrender.com/api/payment/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(resp),
            }
          );
          const verification = await verifyRes.json();
          if (verification.verified) {
            toast({ title: "Payment Successful" });
            sessionStorage.setItem(
              "bookingDetails",
              JSON.stringify({ formData, selectedServices })
            );
            navigate("/success");
          } else {
            toast({ title: "Verification failed", variant: "destructive" });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#51BC2B" },
      };
      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast({ title: "Payment initiation failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageHeader
        title="Complete Your Booking"
        description="Review your selected services and proceed with payment."
      />

      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {paymentStep === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Form Section */}
                <div className="lg:col-span-2">
                  <ScrollReveal>
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-md">
                      <h2 className="font-serif text-2xl font-bold mb-6">
                        Contact Information
                      </h2>

                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              name="name"
                              placeholder="Enter your full name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Enter your email address"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              name="phone"
                              placeholder="Enter your phone number"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              name="address"
                              placeholder="Enter your address"
                              value={formData.address}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">Additional Notes</Label>
                          <Textarea
                            id="notes"
                            name="notes"
                            placeholder="Any special requirements or information we should know"
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                          />
                        </div>

                        {/* Payment Method Selection */}
                        <div className="space-y-2">
                          <Label>Payment Method *</Label>
                          <Select
                            value={paymentMethod}
                            onValueChange={(val: "card" | "upi") =>
                              setPaymentMethod(val)
                            }
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select payment method">
                                {paymentMethod === "card"
                                  ? "Credit/Debit Card"
                                  : "UPI"}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">
                                Credit/Debit Card
                              </SelectItem>
                              <SelectItem value="upi">UPI</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-start space-x-2 pt-4">
                          <Checkbox
                            id="terms"
                            checked={formData.agreeTerms}
                            onCheckedChange={handleCheckboxChange}
                          />
                          <div className="grid gap-1.5 leading-none">
                            <label
                              htmlFor="terms"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              I agree to the terms and conditions
                            </label>
                            <p className="text-sm text-muted-foreground">
                              By proceeding, you confirm that you have read and
                              agree to our{" "}
                              <a
                                href="#"
                                className="text-primary hover:underline"
                              >
                                Terms & Conditions
                              </a>{" "}
                              and{" "}
                              <a
                                href="#"
                                className="text-primary hover:underline"
                              >
                                Privacy Policy
                              </a>
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <ScrollReveal direction="left">
                    <div
                      className={cn(
                        "bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md sticky top-24"
                      )}
                    >
                      <h2 className="font-serif text-2xl font-bold mb-6">
                        Order Summary
                      </h2>

                      {selectedServices.length > 0 ? (
                        <div className="space-y-4">
                          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            {selectedServices.map((service, i) => (
                              <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex justify-between items-center py-2"
                              >
                                <span>{service.title}</span>
                                <span>
                                  ₹{service.price.toLocaleString()}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                            <div className="flex justify-between items-center py-2">
                              <span className="text-muted-foreground">
                                Subtotal
                              </span>
                              <span>₹{calculateTotal().toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center py-2 font-bold">
                            <span>Total</span>
                            <span className="text-xl">
                              ₹{calculateTotal().toLocaleString()}
                            </span>
                          </div>

                          <Button
                            onClick={initializePayment}
                            className="w-full bg-primary hover:bg-primary/90 text-white mt-4 shimmer-button"
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="flex items-center justify-center">
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                Processing...
                              </div>
                            ) : (
                              "Proceed to Payment"
                            )}
                          </Button>

                          <div className="text-center mt-3">
                            <p className="text-xs text-muted-foreground">
                              Secure payment powered by Razorpay
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">
                            No services selected
                          </p>
                          <Button
                            onClick={() => navigate("/services")}
                            variant="outline"
                            className="mt-4"
                          >
                            Return to Services
                          </Button>
                        </div>
                      )}
                    </div>
                  </ScrollReveal>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </PageTransition>
  );
}
