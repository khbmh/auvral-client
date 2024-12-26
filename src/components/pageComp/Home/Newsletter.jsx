import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Newsletter() {
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubscribe = (e) => {
    e.preventDefault();



    // Simulate a successful subscription
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail(''); // Clear the input field
  };

  return (
    <div className="bg-base-200 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-8">
          Stay updated with the latest discoveries, artifacts, and historical insights.
        </p>
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full sm:w-auto flex-grow"
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