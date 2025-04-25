import { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { DataContext } from '../../contexts/DataContext';

function Newsletter() {
  const { isDark } = useContext(DataContext);
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubscribe = (e) => {
    e.preventDefault();

    // Simulate a successful subscription
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail(''); // Clear the input field
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="opacity-60 mb-8">
          Stay updated with the latest discoveries, artifacts, and historical
          insights.
        </p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input input-bordered w-full sm:w-auto flex-grow ${
                isDark ? 'text-gray-100 border-green-300 bg-gray-950' : 'text-black border-green-600 bg-gray-100'
              } input-bordered w-1/2`}
              required
            />
            <button type="submit" className="btn btn-success">
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default Newsletter;
