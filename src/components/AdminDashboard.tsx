import React from 'react';
import { BarChart3, Cable, Home, Network } from 'lucide-react';

export default function AdminDashboard() {
  // Mock data - replace with real data from backend
  const stats = {
    apartmentCables: 150,
    houseCables: 25,
    ptoCablesWhite: 75,
    ptoCablesBlack: 50
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard ECOTRIO</h1>
        <p className="text-gray-600">Suivi de l'utilisation des câbles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Câbles Appartement</h3>
            <Cable className="text-blue-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.apartmentCables}</p>
          <p className="text-sm text-gray-500">Kits de 30m utilisés</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">Câbles Maison</h3>
            <Home className="text-green-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.houseCables}</p>
          <p className="text-sm text-gray-500">Tourets de 500m utilisés</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">PTO Blanc</h3>
            <Network className="text-gray-500" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.ptoCablesWhite}</p>
          <p className="text-sm text-gray-500">Prises installées</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700">PTO Noir</h3>
            <Network className="text-gray-900" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.ptoCablesBlack}</p>
          <p className="text-sm text-gray-500">Prises installées</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Utilisation Hebdomadaire</h2>
          <BarChart3 className="text-blue-500" size={24} />
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Graphique à venir
        </div>
      </div>
    </div>
  );
}
