import { PiAirplaneTiltFill } from "react-icons/pi";
import { IoDiamondOutline } from "react-icons/io5";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { RiCustomerService2Line } from "react-icons/ri";

// Data ko bahar rakhna behtar practice hai
const appFeatures = [
  {
    id: 1,
    icon: <PiAirplaneTiltFill size={32} className="text-green-600 flex-shrink-0" />,
    title: "Free Shipping",
    description: "On all orders over $50",
  },
  {
    id: 2,
    icon: <IoDiamondOutline size={32} className="text-green-600 flex-shrink-0" />,
    title: "Join Risk Free",
    description: "30 days refund",
  },
  {
    id: 3,
    icon: <RiCustomerService2Line size={32} className="text-green-600 flex-shrink-0" />,
    title: "Support 24/7",
    description: "Online 24 hours",
  },
  {
    id: 4,
    icon: <AiOutlineSafetyCertificate size={32} className="text-green-600 flex-shrink-0" />,
    title: "100% Safe",
    description: "Secure shopping",
  },
];

const Feature = () => {
  return (
    // Mobile par 1 column, Tablet par 2, aur Laptop par 4 columns
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-10">
      {appFeatures.map((item) => (
        // 1. key={item.id} lagaya
        <div key={item.id} className="flex gap-4 items-center p-4 rounded-lg bg-gray-50 border border-gray-100">
          {item.icon}

          <div>
            <h1 className="text-lg font-semibold text-gray-800">{item.title}</h1>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;