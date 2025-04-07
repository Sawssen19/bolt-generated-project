import React, { useState } from 'react';
import { CableEntry } from '../types';
import { Save } from 'lucide-react';

export default function TechnicianForm() {
  const [formData, setFormData] = useState<Partial<CableEntry>>({
    date: new Date().toISOString().split('T')[0],
    apartmentCable: 0,
    houseCable: 0,
    ptoCable: {
      white: 0,
      black: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to backend
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Saisie Quotidienne des Câbles</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Câbles Appartement (Kits de 30m)
          </label>
          <input
            type="number"
            min="0"
            value={formData.apartmentCable}
            onChange={(e) => setFormData({...formData, apartmentCable: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Câbles Maison (Tourets de 500m)
          </label>
          <input
            type="number"
            min="0"
            value={formData.houseCable}
            onChange={(e) => setFormData({...formData, houseCable: parseInt(e.target.value)})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Câbles PTO</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blanc
              </label>
              <input
                type="number"
                min="0"
                value={formData.ptoCable?.white}
                onChange={(e) => setFormData({
                  ...formData,
                  ptoCable: {...formData.ptoCable, white: parseInt(e.target.value)}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Noir
              </label>
              <input
                type="number"
                min="0"
                value={formData.ptoCable?.black}
                onChange={(e) => setFormData({
                  ...formData,
                  ptoCable: {...formData.ptoCable, black: parseInt(e.target.value)}
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Save size={20} />
          Enregistrer
        </button>
      </div>
    </form>
  );
}
