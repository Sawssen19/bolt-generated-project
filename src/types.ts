export interface CableEntry {
  date: string;
  apartmentCable: number;  // 30m kits
  houseCable: number;      // 500m reels
  ptoCable: {
    white: number,
    black: number
  };
  technicianId: string;
  notes?: string;
}

export interface Technician {
  id: string;
  name: string;
}
