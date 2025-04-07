export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      technicians: {
        Row: {
          id: string
          user_id: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          created_at?: string
        }
      }
      cable_entries: {
        Row: {
          id: string
          date: string
          apartment_cable: number
          house_cable: number
          pto_cable_white: number
          pto_cable_black: number
          technician_id: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          apartment_cable: number
          house_cable: number
          pto_cable_white: number
          pto_cable_black: number
          technician_id: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          apartment_cable?: number
          house_cable?: number
          pto_cable_white?: number
          pto_cable_black?: number
          technician_id?: string
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}
