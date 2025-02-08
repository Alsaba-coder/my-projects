import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Filter, Share2, Search, MapPin, ChevronRight } from 'lucide-react';
import { columnMappings } from '../config/columnMappings';

interface CensusDataProps {
  data: any[];
  onBack: () => void;
}

interface State {
  name: string;
  id: string;
}

interface City {
  name: string;
  id: string;
}

const CensusDataPage: React.FC<CensusDataProps> = ({ data, onBack }) => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [stateSuggestions, setStateSuggestions] = useState<State[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [censusData, setCensusData] = useState<any[]>([]);
  const stateSearchRef = useRef<HTMLDivElement>(null);
  const citySearchRef = useRef<HTMLDivElement>(null);

  const topStateSearches: State[] = [
    { name: 'California', id: '06' },
    { name: 'Texas', id: '48' },
    { name: 'New York', id: '36' },
    { name: 'Florida', id: '12' },
    { name: 'Illinois', id: '17' }
  ];

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setIsLoadingStates(true);
        const response = await fetch('https://api.census.gov/data/2020/dec/dhc?get=NAME&for=state:*');
        if (!response.ok) throw new Error('Failed to fetch states');
        const data = await response.json();
        const statesList = data.slice(1).map((item: string[]) => ({
          name: item[0],
          id: item[1]
        })).sort((a: State, b: State) => a.name.localeCompare(b.name));
        setStates(statesList);
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
        setIsLoadingStates(false);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedState) return;
      
      try {
        setIsLoadingCities(true);
        const response = await fetch(
          `https://api.census.gov/data/2020/dec/dhc?get=NAME&for=place:*&in=state:${selectedState.id}`
        );
        if (!response.ok) throw new Error('Failed to fetch cities');
        const data = await response.json();
        const citiesList = data.slice(1).map((item: string[]) => ({
          name: item[0].split(',')[0].trim(),
          id: item[2]
        })).sort((a: City, b: City) => a.name.localeCompare(b.name));
        setCities(citiesList);
        setCitySuggestions(citiesList);
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setIsLoadingCities(false);
      }
    };

    if (selectedState) {
      fetchCities();
      setSelectedCity(null);
      setCitySearchTerm('');
    }
  }, [selectedState]);

  useEffect(() => {
    const fetchCensusData = async () => {
      if (!selectedState || !selectedCity) return;
      
      try {
        setIsLoadingData(true);
        const response = await fetch(
          `https://api.census.gov/data/2020/dec/dhc?get=group(H3)&for=place:${selectedCity.id}&in=state:${selectedState.id}`
        );
        if (!response.ok) throw new Error('Failed to fetch census data');
        const data = await response.json();
        setCensusData(data);
      } catch (error) {
        console.error('Error fetching census data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };

    if (selectedState && selectedCity) {
      fetchCensusData();
    }
  }, [selectedState, selectedCity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (stateSearchRef.current && !stateSearchRef.current.contains(event.target as Node)) {
        setShowStateSuggestions(false);
      }
      if (citySearchRef.current && !citySearchRef.current.contains(event.target as Node)) {
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStateSearch = (value: string) => {
    setStateSearchTerm(value);
    const filtered = states
      .filter(state => 
        state.name.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 10);
    setStateSuggestions(filtered);
    setShowStateSuggestions(true);
  };

  const handleCitySearch = (value: string) => {
    setCitySearchTerm(value);
    if (value.trim() === '') {
      setCitySuggestions(cities);
    } else {
      const filtered = cities
        .filter(city => 
          city.name.toLowerCase().includes(value.toLowerCase()));
      setCitySuggestions(filtered);
    }
    setShowCitySuggestions(true);
  };

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    setStateSearchTerm(state.name);
    setShowStateSuggestions(false);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setCitySearchTerm(city.name);
    setShowCitySuggestions(false);
  };

  const handleSearch = async () => {
    if (!selectedState || !selectedCity) return;
    
    try {
      setIsLoadingData(true);
      const response = await fetch(
        `https://api.census.gov/data/2020/dec/dhc?get=group(H3)&for=place:${selectedCity.id}&in=state:${selectedState.id}`
      );
      if (!response.ok) throw new Error('Failed to fetch census data');
      const data = await response.json();
      setCensusData(data);
    } catch (error) {
      console.error('Error fetching census data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const originalHeaders = censusData[0] || data[0] || [];
  const mappedHeaders = originalHeaders.filter(header => header in columnMappings);
  const columnIndexMap = new Map(
    mappedHeaders.map(header => [header, originalHeaders.indexOf(header)])
  );

  const rows = (censusData.length > 0 ? censusData : data).slice(1)
    .filter(row => row.some(cell => cell !== null && cell !== '' && cell !== undefined))
    .map(row => Array.from(columnIndexMap.values()).map(index => row[index]));

  const formatCell = (cell: any): string => {
    if (cell === null || cell === undefined || cell === '') {
      return '-';
    }
    return String(cell);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Census Analytics</h1>
              <p className="text-gray-500 mt-1">2020 Decennial Census Housing Insights</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-8 py-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 mb-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Housing Market Analysis</h2>
            <p className="text-gray-700 leading-relaxed font-['Georgia'] italic">
              Explore comprehensive housing statistics for {selectedState ? selectedState.name : 'any state'} 
              {selectedCity ? ` and ${selectedCity.name}` : ''}. This analysis provides detailed insights into 
              housing occupancy and vacancy patterns, helping you understand the local real estate market dynamics 
              and housing availability trends.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <h3 className="text-base font-medium text-gray-900">Select State</h3>
              </div>
              
              <div className="relative" ref={stateSearchRef}>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={stateSearchTerm}
                    onChange={(e) => handleStateSearch(e.target.value)}
                    onFocus={() => setShowStateSuggestions(true)}
                    placeholder="Type to search for a state..."
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {showStateSuggestions && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
                    {stateSearchTerm === '' && (
                      <div className="p-2 border-b border-gray-200">
                        <p className="text-xs text-gray-500 mb-2">Popular States</p>
                        {topStateSearches.map((state) => (
                          <button
                            key={state.id}
                            onClick={() => handleStateSelect(state)}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                          >
                            {state.name}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {isLoadingStates ? (
                      <div className="p-4 text-center text-gray-500">Loading states...</div>
                    ) : (
                      stateSuggestions.map((state) => (
                        <button
                          key={state.id}
                          onClick={() => handleStateSelect(state)}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                        >
                          {state.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {selectedState && (
                <div className="mt-4 flex items-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {selectedState.name}
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <h3 className="text-base font-medium text-gray-900">Select City</h3>
              </div>
              
              <div className="relative" ref={citySearchRef}>
                <div className="relative">
                  <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={citySearchTerm}
                    onChange={(e) => handleCitySearch(e.target.value)}
                    onFocus={() => setShowCitySuggestions(true)}
                    placeholder={`Search cities in ${selectedState?.name || '...'}...`}
                    className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!selectedState}
                  />
                </div>

                {showCitySuggestions && (
                  <div className="absolute z-20 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[400px] overflow-y-auto">
                    {isLoadingCities ? (
                      <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mr-2"></div>
                        Loading cities...
                      </div>
                    ) : (
                      <>
                        {citySuggestions.length > 0 ? (
                          <div className="py-1">
                            {citySuggestions.map((city) => (
                              <button
                                key={city.id}
                                onClick={() => handleCitySelect(city)}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                              >
                                {city.name}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No cities found matching "{citySearchTerm}"
                          </div>
                        )}
                        
                        {citySuggestions.length > 0 && (
                          <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-t">
                            Showing {citySuggestions.length} of {cities.length} cities
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {selectedCity && (
                <div className="mt-4 flex items-center">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {selectedCity.name}
                  </span>
                </div>
              )}
            </div>
          </div>

          {selectedState && selectedCity && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSearch}
                disabled={isLoadingData}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                         transition-colors flex items-center space-x-2 font-medium disabled:opacity-50 text-sm"
              >
                {isLoadingData ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>View Housing Data</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {censusData.length > 0 && (
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Housing Statistics</h3>
              <p className="font-['Georgia'] text-gray-600">
                Below are the current housing statistics for {selectedCity?.name}, {selectedState?.name}, 
                showing the distribution of occupied and vacant housing units. This data provides valuable 
                insights into the local housing market conditions and availability.
              </p>
            </div>
          )}

          {isLoadingData ? (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading data for {selectedCity?.name}, {selectedState?.name}...</p>
            </div>
          ) : rows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {mappedHeaders.map((header: string, index: number) => (
                      <th
                        key={index}
                        className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-200"
                        title={header}
                      >
                        {columnMappings[header]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {row.map((cell: any, cellIndex: number) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 text-sm text-gray-900 font-medium"
                        >
                          {formatCell(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {selectedState 
                ? selectedCity
                  ? `No data available for ${selectedCity.name}, ${selectedState.name}`
                  : 'Select a city to view housing data'
                : 'Select a state and city to view housing data'}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CensusDataPage;