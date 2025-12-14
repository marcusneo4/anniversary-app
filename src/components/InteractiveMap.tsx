import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper function to convert lat/lng to SVG coordinates
// Using equirectangular projection for simplicity
const latLngToSVG = (lng: number, lat: number, width: number, height: number): [number, number] => {
  // Equirectangular projection
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return [x, y];
};

// Country data organized by regions
type CountryData = { name: string; coordinates: [number, number]; region: string };

const countriesByRegion: Record<string, CountryData[]> = {
  "Europe": [
    { name: "United Kingdom", coordinates: [-3.4360, 55.3781], region: "Europe" },
    { name: "France", coordinates: [2.2137, 46.2276], region: "Europe" },
    { name: "Germany", coordinates: [10.4515, 51.1657], region: "Europe" },
    { name: "Italy", coordinates: [12.5674, 41.8719], region: "Europe" },
    { name: "Spain", coordinates: [-3.7492, 40.4637], region: "Europe" },
    { name: "Portugal", coordinates: [-8.2245, 39.3999], region: "Europe" },
    { name: "Netherlands", coordinates: [5.2913, 52.1326], region: "Europe" },
    { name: "Belgium", coordinates: [4.4699, 50.5039], region: "Europe" },
    { name: "Switzerland", coordinates: [8.2275, 46.8182], region: "Europe" },
    { name: "Austria", coordinates: [14.5501, 47.5162], region: "Europe" },
    { name: "Greece", coordinates: [21.8243, 39.0742], region: "Europe" },
    { name: "Poland", coordinates: [19.1451, 51.9194], region: "Europe" },
    { name: "Czech Republic", coordinates: [15.4730, 49.8175], region: "Europe" },
    { name: "Hungary", coordinates: [19.5033, 47.1625], region: "Europe" },
    { name: "Romania", coordinates: [24.9668, 45.9432], region: "Europe" },
    { name: "Bulgaria", coordinates: [25.4858, 42.7339], region: "Europe" },
    { name: "Croatia", coordinates: [15.2000, 45.1000], region: "Europe" },
    { name: "Slovenia", coordinates: [14.9955, 46.1512], region: "Europe" },
    { name: "Slovakia", coordinates: [19.6990, 48.6690], region: "Europe" },
    { name: "Serbia", coordinates: [21.0059, 44.0165], region: "Europe" },
    { name: "Bosnia and Herzegovina", coordinates: [17.6791, 43.9159], region: "Europe" },
    { name: "Montenegro", coordinates: [19.3744, 42.7087], region: "Europe" },
    { name: "Albania", coordinates: [20.1683, 41.1533], region: "Europe" },
    { name: "North Macedonia", coordinates: [21.7453, 41.6086], region: "Europe" },
    { name: "Kosovo", coordinates: [20.9029, 42.6026], region: "Europe" },
    { name: "Iceland", coordinates: [-19.0208, 64.9631], region: "Europe" },
    { name: "Norway", coordinates: [8.4689, 60.4720], region: "Europe" },
    { name: "Sweden", coordinates: [18.6435, 60.1282], region: "Europe" },
    { name: "Denmark", coordinates: [9.5018, 56.2639], region: "Europe" },
    { name: "Finland", coordinates: [25.7481, 61.9241], region: "Europe" },
    { name: "Ireland", coordinates: [-8.2439, 53.4129], region: "Europe" },
    { name: "Luxembourg", coordinates: [6.1296, 49.8153], region: "Europe" },
    { name: "Malta", coordinates: [14.3754, 35.9375], region: "Europe" },
    { name: "Cyprus", coordinates: [33.4299, 35.1264], region: "Europe" },
    { name: "Estonia", coordinates: [25.0136, 58.5953], region: "Europe" },
    { name: "Latvia", coordinates: [24.6032, 56.8796], region: "Europe" },
    { name: "Lithuania", coordinates: [23.8813, 55.1694], region: "Europe" },
    { name: "Belarus", coordinates: [27.9534, 53.7098], region: "Europe" },
    { name: "Ukraine", coordinates: [31.1656, 48.3794], region: "Europe" },
    { name: "Moldova", coordinates: [28.3699, 47.4116], region: "Europe" },
    { name: "Russia", coordinates: [105.3188, 61.5240], region: "Europe" },
  ],
  "Middle East": [
    { name: "Turkey", coordinates: [35.2433, 38.9637], region: "Middle East" },
    { name: "Saudi Arabia", coordinates: [45.0792, 23.8859], region: "Middle East" },
    { name: "United Arab Emirates", coordinates: [53.8478, 23.4241], region: "Middle East" },
    { name: "Qatar", coordinates: [51.1839, 25.3548], region: "Middle East" },
    { name: "Kuwait", coordinates: [47.4818, 29.3117], region: "Middle East" },
    { name: "Bahrain", coordinates: [50.5577, 26.0667], region: "Middle East" },
    { name: "Oman", coordinates: [55.9233, 21.4735], region: "Middle East" },
    { name: "Yemen", coordinates: [48.5164, 15.5527], region: "Middle East" },
    { name: "Jordan", coordinates: [36.2384, 30.5852], region: "Middle East" },
    { name: "Lebanon", coordinates: [35.8623, 33.8547], region: "Middle East" },
    { name: "Syria", coordinates: [38.9968, 34.8021], region: "Middle East" },
    { name: "Israel", coordinates: [34.8516, 31.0461], region: "Middle East" },
    { name: "Palestine", coordinates: [35.2332, 31.9522], region: "Middle East" },
    { name: "Iraq", coordinates: [43.6793, 33.2232], region: "Middle East" },
    { name: "Iran", coordinates: [53.6880, 32.4279], region: "Middle East" },
    { name: "Georgia", coordinates: [43.3569, 42.3154], region: "Middle East" },
    { name: "Armenia", coordinates: [45.0382, 40.0691], region: "Middle East" },
    { name: "Azerbaijan", coordinates: [47.5769, 40.1431], region: "Middle East" },
  ],
  "Asia": [
    { name: "China", coordinates: [104.1954, 35.8617], region: "Asia" },
    { name: "Japan", coordinates: [138.2529, 36.2048], region: "Asia" },
    { name: "South Korea", coordinates: [127.7669, 35.9078], region: "Asia" },
    { name: "North Korea", coordinates: [127.5101, 40.3399], region: "Asia" },
    { name: "India", coordinates: [78.9629, 20.5937], region: "Asia" },
    { name: "Pakistan", coordinates: [69.3451, 30.3753], region: "Asia" },
    { name: "Bangladesh", coordinates: [90.3563, 23.6850], region: "Asia" },
    { name: "Nepal", coordinates: [84.1240, 28.3949], region: "Asia" },
    { name: "Bhutan", coordinates: [90.4336, 27.5142], region: "Asia" },
    { name: "Sri Lanka", coordinates: [80.7718, 7.8731], region: "Asia" },
    { name: "Maldives", coordinates: [73.2207, 3.2028], region: "Asia" },
    { name: "Afghanistan", coordinates: [67.7101, 33.9391], region: "Asia" },
    { name: "Myanmar", coordinates: [95.9562, 21.9162], region: "Asia" },
    { name: "Thailand", coordinates: [100.9925, 15.8700], region: "Asia" },
    { name: "Vietnam", coordinates: [108.2772, 14.0583], region: "Asia" },
    { name: "Cambodia", coordinates: [104.9909, 12.5657], region: "Asia" },
    { name: "Laos", coordinates: [102.4955, 19.8563], region: "Asia" },
    { name: "Malaysia", coordinates: [101.9758, 4.2105], region: "Asia" },
    { name: "Singapore", coordinates: [103.8198, 1.3521], region: "Asia" },
    { name: "Indonesia", coordinates: [113.9213, -0.7893], region: "Asia" },
    { name: "Philippines", coordinates: [121.7740, 12.8797], region: "Asia" },
    { name: "Brunei", coordinates: [114.7277, 4.5353], region: "Asia" },
    { name: "East Timor", coordinates: [125.7275, -8.8742], region: "Asia" },
    { name: "Taiwan", coordinates: [120.9605, 23.6978], region: "Asia" },
    { name: "Hong Kong", coordinates: [114.1694, 22.3193], region: "Asia" },
    { name: "Macau", coordinates: [113.5439, 22.1987], region: "Asia" },
    { name: "Mongolia", coordinates: [103.8467, 46.8625], region: "Asia" },
    { name: "Kazakhstan", coordinates: [66.9237, 48.0196], region: "Asia" },
    { name: "Uzbekistan", coordinates: [64.5853, 41.3775], region: "Asia" },
    { name: "Kyrgyzstan", coordinates: [74.7661, 41.2044], region: "Asia" },
    { name: "Tajikistan", coordinates: [71.2761, 38.8610], region: "Asia" },
    { name: "Turkmenistan", coordinates: [59.5563, 38.9697], region: "Asia" },
  ],
  "North America": [
    { name: "United States", coordinates: [-95.7129, 37.0902], region: "North America" },
    { name: "Canada", coordinates: [-106.3468, 56.1304], region: "North America" },
    { name: "Mexico", coordinates: [-102.5528, 23.6345], region: "North America" },
    { name: "Guatemala", coordinates: [-90.2308, 15.7835], region: "North America" },
    { name: "Belize", coordinates: [-88.4979, 17.1899], region: "North America" },
    { name: "El Salvador", coordinates: [-88.8965, 13.7942], region: "North America" },
    { name: "Honduras", coordinates: [-86.2419, 15.2000], region: "North America" },
    { name: "Nicaragua", coordinates: [-85.2072, 12.2650], region: "North America" },
    { name: "Costa Rica", coordinates: [-83.7534, 9.7489], region: "North America" },
    { name: "Panama", coordinates: [-80.7821, 8.5380], region: "North America" },
    { name: "Cuba", coordinates: [-77.7812, 21.5218], region: "North America" },
    { name: "Jamaica", coordinates: [-77.2975, 18.1096], region: "North America" },
    { name: "Haiti", coordinates: [-72.2852, 18.9712], region: "North America" },
    { name: "Dominican Republic", coordinates: [-70.1627, 18.7357], region: "North America" },
    { name: "Puerto Rico", coordinates: [-66.5901, 18.2208], region: "North America" },
    { name: "Trinidad and Tobago", coordinates: [-61.2225, 10.6918], region: "North America" },
    { name: "Barbados", coordinates: [-59.5432, 13.1939], region: "North America" },
  ],
  "South America": [
    { name: "Brazil", coordinates: [-47.8825, -15.7942], region: "South America" },
    { name: "Argentina", coordinates: [-63.6167, -38.4161], region: "South America" },
    { name: "Chile", coordinates: [-71.5430, -35.6751], region: "South America" },
    { name: "Peru", coordinates: [-75.0152, -9.1900], region: "South America" },
    { name: "Colombia", coordinates: [-74.2973, 4.5709], region: "South America" },
    { name: "Venezuela", coordinates: [-66.5897, 6.4238], region: "South America" },
    { name: "Ecuador", coordinates: [-78.1834, -1.8312], region: "South America" },
    { name: "Bolivia", coordinates: [-63.5887, -16.2902], region: "South America" },
    { name: "Paraguay", coordinates: [-58.4438, -23.4425], region: "South America" },
    { name: "Uruguay", coordinates: [-55.7658, -32.5228], region: "South America" },
    { name: "Guyana", coordinates: [-58.9302, 4.8604], region: "South America" },
    { name: "Suriname", coordinates: [-56.0278, 3.9193], region: "South America" },
    { name: "French Guiana", coordinates: [-53.1258, 3.9339], region: "South America" },
  ],
  "Africa": [
    { name: "Egypt", coordinates: [30.8025, 26.0975], region: "Africa" },
    { name: "Libya", coordinates: [17.2283, 26.3351], region: "Africa" },
    { name: "Tunisia", coordinates: [9.5375, 33.8869], region: "Africa" },
    { name: "Algeria", coordinates: [1.6596, 28.0339], region: "Africa" },
    { name: "Morocco", coordinates: [-7.0926, 31.7917], region: "Africa" },
    { name: "Sudan", coordinates: [30.2176, 12.8628], region: "Africa" },
    { name: "South Sudan", coordinates: [31.3070, 6.8770], region: "Africa" },
    { name: "Ethiopia", coordinates: [38.4314, 9.1450], region: "Africa" },
    { name: "Eritrea", coordinates: [39.7823, 15.1794], region: "Africa" },
    { name: "Djibouti", coordinates: [42.5903, 11.8251], region: "Africa" },
    { name: "Somalia", coordinates: [46.1996, 5.1521], region: "Africa" },
    { name: "Kenya", coordinates: [37.9062, -0.0236], region: "Africa" },
    { name: "Uganda", coordinates: [32.2903, 1.3733], region: "Africa" },
    { name: "Rwanda", coordinates: [29.8739, -1.9403], region: "Africa" },
    { name: "Burundi", coordinates: [29.9189, -3.3731], region: "Africa" },
    { name: "Tanzania", coordinates: [34.8888, -6.3690], region: "Africa" },
    { name: "Malawi", coordinates: [34.3015, -13.2543], region: "Africa" },
    { name: "Zambia", coordinates: [27.8493, -13.1339], region: "Africa" },
    { name: "Zimbabwe", coordinates: [29.1549, -19.0154], region: "Africa" },
    { name: "Botswana", coordinates: [24.6849, -22.3285], region: "Africa" },
    { name: "Namibia", coordinates: [17.2090, -22.9576], region: "Africa" },
    { name: "South Africa", coordinates: [22.9375, -30.5595], region: "Africa" },
    { name: "Lesotho", coordinates: [28.2336, -29.6100], region: "Africa" },
    { name: "Eswatini", coordinates: [31.4659, -26.5225], region: "Africa" },
    { name: "Mozambique", coordinates: [35.5296, -18.6657], region: "Africa" },
    { name: "Madagascar", coordinates: [46.8691, -18.7669], region: "Africa" },
    { name: "Mauritius", coordinates: [57.5522, -20.3484], region: "Africa" },
    { name: "Seychelles", coordinates: [55.4915, -4.6796], region: "Africa" },
    { name: "Comoros", coordinates: [43.3333, -11.6455], region: "Africa" },
    { name: "Mauritania", coordinates: [-10.9408, 21.0079], region: "Africa" },
    { name: "Mali", coordinates: [-3.9962, 17.5707], region: "Africa" },
    { name: "Burkina Faso", coordinates: [-1.5616, 12.2383], region: "Africa" },
    { name: "Niger", coordinates: [8.0817, 17.6078], region: "Africa" },
    { name: "Chad", coordinates: [18.7322, 15.4542], region: "Africa" },
    { name: "Central African Republic", coordinates: [20.9394, 6.6111], region: "Africa" },
    { name: "Cameroon", coordinates: [11.5021, 7.3697], region: "Africa" },
    { name: "Equatorial Guinea", coordinates: [10.2679, 1.6508], region: "Africa" },
    { name: "Gabon", coordinates: [11.6094, -0.8037], region: "Africa" },
    { name: "Republic of the Congo", coordinates: [15.8277, -0.2280], region: "Africa" },
    { name: "Democratic Republic of the Congo", coordinates: [21.7587, -4.0383], region: "Africa" },
    { name: "Angola", coordinates: [17.8739, -11.2027], region: "Africa" },
    { name: "Guinea", coordinates: [-9.6966, 9.9456], region: "Africa" },
    { name: "Guinea-Bissau", coordinates: [-15.1804, 11.8037], region: "Africa" },
    { name: "Sierra Leone", coordinates: [-11.7799, 8.4606], region: "Africa" },
    { name: "Liberia", coordinates: [-9.4295, 6.4281], region: "Africa" },
    { name: "Côte d'Ivoire", coordinates: [-5.5471, 7.5400], region: "Africa" },
    { name: "Ghana", coordinates: [-1.0232, 7.9465], region: "Africa" },
    { name: "Togo", coordinates: [0.8248, 8.6195], region: "Africa" },
    { name: "Benin", coordinates: [2.3158, 9.3077], region: "Africa" },
    { name: "Nigeria", coordinates: [8.6753, 9.0820], region: "Africa" },
    { name: "Senegal", coordinates: [-14.4524, 14.4974], region: "Africa" },
    { name: "Gambia", coordinates: [-15.3101, 13.4432], region: "Africa" },
    { name: "Cape Verde", coordinates: [-24.0132, 16.5388], region: "Africa" },
  ],
  "Oceania": [
    { name: "Australia", coordinates: [133.7751, -25.2744], region: "Oceania" },
    { name: "New Zealand", coordinates: [174.8860, -40.9006], region: "Oceania" },
    { name: "Papua New Guinea", coordinates: [143.9555, -6.3150], region: "Oceania" },
    { name: "Fiji", coordinates: [178.0650, -16.5783], region: "Oceania" },
    { name: "New Caledonia", coordinates: [165.6180, -20.9043], region: "Oceania" },
    { name: "Vanuatu", coordinates: [166.9592, -15.3767], region: "Oceania" },
    { name: "Solomon Islands", coordinates: [160.1562, -9.6457], region: "Oceania" },
    { name: "Palau", coordinates: [134.5825, 7.5150], region: "Oceania" },
    { name: "Micronesia", coordinates: [158.2060, 6.8874], region: "Oceania" },
    { name: "Marshall Islands", coordinates: [168.7349, 7.1315], region: "Oceania" },
    { name: "Kiribati", coordinates: [-157.3633, 1.4518], region: "Oceania" },
    { name: "Tuvalu", coordinates: [177.6493, -7.1095], region: "Oceania" },
    { name: "Samoa", coordinates: [-172.1046, -13.7590], region: "Oceania" },
    { name: "Tonga", coordinates: [-175.1982, -21.1789], region: "Oceania" },
    { name: "Cook Islands", coordinates: [-159.7777, -21.2367], region: "Oceania" },
    { name: "French Polynesia", coordinates: [-149.4068, -17.6797], region: "Oceania" },
  ],
};

// Flatten all countries for lookup
const allCountries: CountryData[] = Object.values(countriesByRegion).flat();
const regions = Object.keys(countriesByRegion);

type VisitedCountry = {
  id: number;
  name: string;
  date?: string;
  note?: string;
};


export function InteractiveMap() {
  const [visitedCountries, setVisitedCountries] = useState<VisitedCountry[]>([]);
  const [selectedCountryName, setSelectedCountryName] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newNote, setNewNote] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<VisitedCountry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("Europe");

  const svgWidth = 360;
  const svgHeight = 180;

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("visitedCountries");
    if (saved) {
      try {
        setVisitedCountries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load visited countries", e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (visitedCountries.length > 0) {
      localStorage.setItem("visitedCountries", JSON.stringify(visitedCountries));
    } else {
      localStorage.removeItem("visitedCountries");
    }
  }, [visitedCountries]);

  const handleAddCountry = () => {
    if (selectedCountryName.trim()) {
      // Check if country is already added
      if (visitedCountries.some(c => c.name === selectedCountryName.trim())) {
        alert("This country is already in your list!");
        return;
      }

      const country: VisitedCountry = {
        id: Date.now(),
        name: selectedCountryName.trim(),
        date: newDate.trim() || undefined,
        note: newNote.trim() || undefined
      };
      setVisitedCountries([...visitedCountries, country]);
      setSelectedCountryName("");
      setNewDate("");
      setNewNote("");
      setShowAddForm(false);
      setSearchQuery("");
    }
  };

  const handleDeleteCountry = (id: number) => {
    setVisitedCountries(visitedCountries.filter(c => c.id !== id));
  };

  const getCountryCoordinates = (countryName: string): [number, number] | null => {
    const country = allCountries.find(c => c.name === countryName);
    return country ? country.coordinates : null;
  };

  // Filter countries by region and search query
  const getFilteredCountries = (region: string) => {
    const regionCountries = countriesByRegion[region] || [];
    return regionCountries
      .filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !visitedCountries.some(vc => vc.name === country.name)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const filteredCountries = getFilteredCountries(selectedRegion);

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/50 p-8 shadow-2xl ring-1 ring-rose-100">
      <div className="mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-rose-500">Our Journey</p>
        <h2 className="mt-3 font-display text-4xl text-rose-900">Countries We've Visited Together</h2>
        <p className="mt-2 text-rose-700">
          Every country holds a piece of our story
        </p>
      </div>

      {/* World Map Visualization */}
      <div className="mb-8 relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-8 border-2 border-rose-200/50 overflow-hidden">
        <div className="relative w-full" style={{ height: '500px', minHeight: '400px' }}>
          {/* World Map Background Image */}
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Equirectangular_projection_SW.jpg/1024px-Equirectangular_projection_SW.jpg"
              alt="World Map"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                opacity: 0.7,
              }}
            />
          </div>
          
          {/* Overlay SVG for markers */}
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            preserveAspectRatio="xMidYMid meet"
          >
            <style>{`
              .marker-group:hover .country-label {
                opacity: 1 !important;
              }
              .marker-group:hover .marker-pin {
                transform: scale(1.4);
              }
            `}</style>
            <g style={{ pointerEvents: 'all' }}>
              {visitedCountries.map((country) => {
                const coords = getCountryCoordinates(country.name);
                if (!coords) return null;
                const [x, y] = latLngToSVG(coords[0], coords[1], svgWidth, svgHeight);
                return (
                  <g
                    key={country.id}
                    className="marker-group cursor-pointer"
                    onClick={() => setSelectedCountry(country)}
                    style={{ cursor: 'pointer' }}
                    transform={`translate(${x}, ${y})`}
                  >
                    {/* Pin marker - thin and small */}
                    <g className="marker-pin" style={{ transition: 'transform 0.2s' }}>
                      <path
                        d="M 0,0 L -2,-8 L 2,-8 Z"
                        fill="#ec4899"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                      />
                      <circle
                        cx={0}
                        cy={0}
                        r={1.5}
                        fill="#ec4899"
                        stroke="#ffffff"
                        strokeWidth="0.5"
                      />
                    </g>
                    {/* Country name label - only show on hover */}
                    <text
                      x={0}
                      y={-12}
                      textAnchor="middle"
                      className="country-label"
                      style={{
                        fontFamily: "system-ui, sans-serif",
                        fill: "#be185d",
                        fontSize: "9px",
                        fontWeight: "bold",
                        pointerEvents: "none",
                        textShadow: "0 1px 2px rgba(255,255,255,0.9)",
                        opacity: 0,
                        transition: "opacity 0.2s"
                      }}
                    >
                      {country.name.length > 15 
                        ? country.name.substring(0, 12) + "..." 
                        : country.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>

      {/* Add Country Form */}
      <motion.div className="mb-6">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all shadow-lg"
        >
          {showAddForm ? "Cancel" : "+ Add Country We Visited Together"}
        </button>
        
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 rounded-xl bg-white p-6 shadow-lg border border-rose-200"
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-rose-700 mb-2">
                    Select Region
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                    {regions.map((region) => (
                      <button
                        key={region}
                        onClick={() => {
                          setSelectedRegion(region);
                          setSearchQuery("");
                        }}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedRegion === region
                            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md"
                            : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                        }`}
                      >
                        {region}
                      </button>
                    ))}
                  </div>
                  
                  <label className="block text-sm font-semibold text-rose-700 mb-2">
                    Search Countries in {selectedRegion} *
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Type to search ${selectedRegion}...`}
                    className="w-full rounded-lg border-2 border-rose-200 px-4 py-2 focus:border-rose-400 focus:outline-none mb-2"
                  />
                  
                  <div className="max-h-60 overflow-y-auto border-2 border-rose-200 rounded-lg mt-2">
                    {filteredCountries.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                        {filteredCountries.map((country) => (
                          <button
                            key={country.name}
                            onClick={() => {
                              setSelectedCountryName(country.name);
                              setSearchQuery("");
                            }}
                            className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                              selectedCountryName === country.name
                                ? "bg-rose-500 text-white font-semibold"
                                : "hover:bg-rose-50 text-rose-700"
                            }`}
                          >
                            {country.name}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-2 text-rose-600">
                        {searchQuery && visitedCountries.some(vc => 
                          vc.name.toLowerCase().includes(searchQuery.toLowerCase())
                        ) 
                          ? "Country already added" 
                          : searchQuery
                          ? "No countries found"
                          : `Select a country from ${selectedRegion} or search above`}
                      </div>
                    )}
                  </div>
                  
                  {selectedCountryName && (
                    <div className="mt-2 p-2 bg-rose-50 rounded-lg flex items-center justify-between">
                      <span className="text-rose-700 font-semibold">Selected: {selectedCountryName}</span>
                      <button
                        onClick={() => setSelectedCountryName("")}
                        className="text-rose-500 hover:text-rose-700"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-rose-700 mb-2">
                    Date (Optional)
                  </label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g., September 2024"
                    className="w-full rounded-lg border-2 border-rose-200 px-4 py-2 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-rose-700 mb-2">
                    Note (Optional)
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="A special memory from this country..."
                    rows={3}
                    className="w-full rounded-lg border-2 border-rose-200 px-4 py-2 focus:border-rose-400 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleAddCountry}
                  disabled={!selectedCountryName.trim()}
                  className="w-full rounded-lg bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-3 text-white font-semibold hover:from-rose-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Country
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Countries List */}
      <div className="grid gap-4 md:grid-cols-2">
        {visitedCountries.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-rose-100 transition-all hover:scale-[1.02] hover:shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 opacity-0 transition-opacity group-hover:opacity-50" />
            <div className="relative flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-full bg-gradient-to-r from-rose-500 to-pink-500 p-2">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-rose-900">
                    {country.name}
                  </h3>
                </div>
                {country.date && (
                  <p className="text-sm font-semibold text-rose-600 mb-1">
                    📅 {country.date}
                  </p>
                )}
                {country.note && (
                  <p className="text-sm text-rose-700">{country.note}</p>
                )}
              </div>
              <button
                onClick={() => handleDeleteCountry(country.id)}
                className="ml-4 rounded-full p-2 text-rose-400 hover:bg-rose-100 hover:text-rose-600 transition-all"
                title="Remove country"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {visitedCountries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 p-6 text-center"
        >
          <p className="text-rose-800">
            🌍 Start adding countries you've visited together!
          </p>
        </motion.div>
      )}

      {visitedCountries.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 rounded-2xl bg-gradient-to-r from-rose-100 to-pink-100 p-6 text-center"
        >
          <p className="text-rose-800">
            🌍 <span className="font-semibold">{visitedCountries.length}</span> {visitedCountries.length === 1 ? 'country' : 'countries'} visited together, countless memories
          </p>
        </motion.div>
      )}

      {/* Country Detail Modal */}
      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl bg-white p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-rose-900 mb-4">{selectedCountry.name}</h3>
              {selectedCountry.date && (
                <p className="text-rose-600 mb-2">📅 {selectedCountry.date}</p>
              )}
              {selectedCountry.note && (
                <p className="text-rose-700 mb-4">{selectedCountry.note}</p>
              )}
              <button
                onClick={() => setSelectedCountry(null)}
                className="w-full rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 text-white font-semibold hover:from-rose-600 hover:to-pink-600 transition-all"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
