/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ChevronDown } from "lucide-react";
import { countries } from "../data/countries";
import type { Country } from "../types";

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

export function CountrySelector({
  selectedCountry,
  onSelect,
}: CountrySelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dialCode.includes(searchQuery)
  );

  return (
    <div className="relative dark:text-black ">
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-6 h-4 overflow-hidden">
          <img
            src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
            alt={selectedCountry.name}
            className="h-full w-full object-cover"
          />
        </span>
        <span className="text-gray-600">+{selectedCountry.dialCode}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-72 bg-white rounded-lg shadow-lg border">
          <div className="p-2">
            <input
              type="text"
              placeholder="Buscar pais..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
                onClick={() => {
                  onSelect(country);
                  setIsOpen(false);
                }}
              >
                <span className="w-6 h-4 overflow-hidden">
                  <img
                    src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                    alt={country.name}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="text-gray-600">+{country.dialCode}</span>
                <span className="text-gray-800">{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
