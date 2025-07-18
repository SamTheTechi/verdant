
import axios from 'axios';
import { BackendURL } from '../util/url';

interface RazorpayProps {
  order_id: string;
  amount: number;
  onSuccess: () => void;
  onFailure: () => void;
}

const RazorpayPayment = ({ order_id, amount, onSuccess, onFailure }: RazorpayProps) => {
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
        onFailure();
      }
    },
    theme: {
      color: "#1D2021",
    },
  };

  const rzp1 = new (window as any).Razorpay(options);
  rzp1.open();

  return null;
};

export default RazorpayPayment;
