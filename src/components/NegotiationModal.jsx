import React, { useState, useEffect, useRef } from 'react';

const NegotiationModal = ({ ride, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentOffer, setCurrentOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Simulated initial offer from system
  useEffect(() => {
    const initialOffer = {
      amount: 1200,
      currency: 'HTG',
      estimatedTime: '15 mins',
      distance: '5.2 km',
    };
    setCurrentOffer(initialOffer);
    
    // Add system message
    setMessages([
      {
        id: 1,
        type: 'system',
        content: `Prix suggéré: ${initialOffer.amount} ${initialOffer.currency}`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmitOffer = (amount) => {
    if (!amount) return;

    setIsLoading(true);
    const numericAmount = parseInt(amount);

    // Add user's offer to messages
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      content: `Je propose ${numericAmount} HTG`,
      timestamp: new Date(),
    }]);

    // Simulate driver response after a delay
    setTimeout(() => {
      const driverResponse = {
        id: Date.now() + 1,
        type: 'driver',
        content: numericAmount < 1000 
          ? `Je ne peux pas accepter moins de 1000 HTG`
          : `D'accord pour ${numericAmount} HTG. Je suis en route!`,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, driverResponse]);
      setCurrentOffer({ ...currentOffer, amount: numericAmount });
      setIsLoading(false);

      if (numericAmount >= 1000) {
        // If offer is accepted, close modal after a delay
        setTimeout(onClose, 2000);
      }
    }, 1500);

    setInputValue('');
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleSubmitOffer(inputValue);
  };

  const predefinedOffers = [
    { amount: 1000, label: '1000 HTG' },
    { amount: 1200, label: '1200 HTG' },
    { amount: 1500, label: '1500 HTG' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Négocier le prix</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          {/* Ride Details */}
          <div className="mt-4 bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Distance</span>
              <span className="font-medium">{ride.estimatedDistance}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Durée estimée</span>
              <span className="font-medium">{ride.estimatedDuration}</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-96 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.type === 'system'
                      ? 'bg-gray-100 text-gray-600'
                      : message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick Offer Buttons */}
        <div className="p-4 border-t border-b">
          <div className="flex space-x-2">
            {predefinedOffers.map((offer) => (
              <button
                key={offer.amount}
                onClick={() => handleSubmitOffer(offer.amount)}
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {offer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleInputSubmit} className="p-4">
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Proposer un montant..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">HTG</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={!inputValue || isLoading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NegotiationModal;
