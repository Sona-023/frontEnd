import React, { useState } from 'react';
import { MapPin, Search, Check } from 'lucide-react';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  onBack: () => void;
  isLoading: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ 
  onLocationSelect, 
  onBack, 
  isLoading 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const popularLocations = [
    { name: 'Tiruppur District (East)', state: 'Tamil Nadu' },
    { name: 'Nilgiris District', state: 'Tamil Nadu' },
    { name: 'Erode District', state: 'Tamil Nadu' },
    { name: 'Palakkad District', state: 'Kerala' },
    { name: 'Idukki District', state: 'Kerala' },
    { name: 'Thrissur District', state: 'Kerala' },
    { name: 'Chennai District', state: 'Tamil Nadu' },
    { name: 'Coimbatore District', state: 'Tamil Nadu' },
    { name: 'Madurai District', state: 'Tamil Nadu' },
    { name: 'Salem District', state: 'Tamil Nadu' },
    { name: 'Tirunelveli District', state: 'Tamil Nadu' },
    { name: 'Thanjavur District', state: 'Tamil Nadu' },
    { name: 'Kochi District', state: 'Kerala' },
    { name: 'Thiruvananthapuram District', state: 'Kerala' },
    { name: 'Kozhikode District', state: 'Kerala' },
    { name: 'Kannur District', state: 'Kerala' },
    { name: 'Kollam District', state: 'Kerala' },
    { name: 'Alappuzha District', state: 'Kerala' },
    { name: 'Kottayam District', state: 'Kerala' },
    { name: 'Pathanamthitta District', state: 'Kerala' },
    { name: 'Malappuram District', state: 'Kerala' },
    { name: 'Wayanad District', state: 'Kerala' },
    { name: 'Kasaragod District', state: 'Kerala' },
    { name: 'Bangalore Urban District', state: 'Karnataka' },
    { name: 'Mysore District', state: 'Karnataka' },
    { name: 'Mangalore District', state: 'Karnataka' },
    { name: 'Hubli-Dharwad District', state: 'Karnataka' },
    { name: 'Belgaum District', state: 'Karnataka' },
    { name: 'Gulbarga District', state: 'Karnataka' },
    { name: 'Bellary District', state: 'Karnataka' },
  ];

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocation) {
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Your Location
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for your district or state"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-whatsapp-green focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2">
        {filteredLocations.map((location, index) => (
          <div
            key={index}
            onClick={() => handleLocationClick(location.name)}
            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
              selectedLocation === location.name
                ? 'border-whatsapp-green bg-whatsapp-green/5'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{location.name}</p>
                  <p className="text-sm text-gray-500">{location.state}</p>
                </div>
              </div>
              {selectedLocation === location.name && (
                <Check className="w-5 h-5 text-whatsapp-green" />
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredLocations.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No districts found for "{searchTerm}"</p>
          <p className="text-sm text-gray-400 mt-1">Try searching for a different district or state</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          disabled={isLoading || !selectedLocation}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Setting up...' : 'Continue'}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full text-whatsapp-green hover:text-whatsapp-green-dark font-medium"
        >
          Back to Name
        </button>
      </form>
    </div>
  );
};

export default LocationSelector;
