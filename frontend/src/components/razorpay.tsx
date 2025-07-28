import axios from 'axios';
import { useState, useEffect } from 'react';
import { BackendURL } from '../util/url';

interface RazorpayProps {
  order_id: string;
  amount: number;
  onSuccess: () => void;
  onFailure: () => void;
}

// lazy loading
const loadRazorpay = () => {
  return new Promise<boolean>((resolve, reject) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject("Razorpay SDK failed to load");
    document.body.appendChild(script);
  });
};

const RazorpayPayment = ({ order_id, amount, onSuccess, onFailure }: RazorpayProps) => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [paymentInitiated, setPaymentInitiated] = useState<boolean>(false);


  useEffect(() => {
    const initalizeRazorpay = async () => {
      try {
        await loadRazorpay();
        setScriptLoaded(true);
      } catch (err) {
        console.log(err);
      }
    }
    initalizeRazorpay();
  }, [])


  useEffect(() => {
    if (scriptLoaded && !paymentInitiated) {
      setPaymentInitiated(true);
      const options = {
        key: "rzp_test_NNXdIDyPQ5Iy2B",
        amount: amount,
        currency: "INR",
        name: "Verdant",
        description: "Test Transaction",
        order_id: order_id,
        handler: async (response: any) => {
          try {
            await axios.post(`${BackendURL}/api/v1/pay/varify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }, { withCredentials: true });
            onSuccess();
          } catch (error) {
            console.error("payment failed");
            onFailure();
          }
        },
        theme: {
          color: "#1D2021",
        },
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();

      rzp1.on('payment.failed', () => {
        onFailure();
      })
    }
  }, [scriptLoaded, paymentInitiated, order_id, amount, onSuccess, onFailure]);

  return null;
};

export default RazorpayPayment;
