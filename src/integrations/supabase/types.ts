export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          campaign_id: string
          contractor_id: string | null
          created_at: string | null
          is_active: boolean | null
          job_types: string[]
          latitude: number
          lead_cap_limit: number
          lead_cap_type: string
          lead_type_preference: string
          longitude: number
          name: string
          radius_km: number
        }
        Insert: {
          campaign_id?: string
          contractor_id?: string | null
          created_at?: string | null
          is_active?: boolean | null
          job_types?: string[]
          latitude: number
          lead_cap_limit?: number
          lead_cap_type?: string
          lead_type_preference?: string
          longitude: number
          name: string
          radius_km?: number
        }
        Update: {
          campaign_id?: string
          contractor_id?: string | null
          created_at?: string | null
          is_active?: boolean | null
          job_types?: string[]
          latitude?: number
          lead_cap_limit?: number
          lead_cap_type?: string
          lead_type_preference?: string
          longitude?: number
          name?: string
          radius_km?: number
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      concrete_driveway_estimate: {
        Row: {
          "Avg Size": string | null
          "Finish Type": string | null
          ID: number
          Notes: string | null
          "Price/Sqft": string | null
          State: string | null
          "Total Range": string | null
          "UI Finish Label": string | null
        }
        Insert: {
          "Avg Size"?: string | null
          "Finish Type"?: string | null
          ID: number
          Notes?: string | null
          "Price/Sqft"?: string | null
          State?: string | null
          "Total Range"?: string | null
          "UI Finish Label"?: string | null
        }
        Update: {
          "Avg Size"?: string | null
          "Finish Type"?: string | null
          ID?: number
          Notes?: string | null
          "Price/Sqft"?: string | null
          State?: string | null
          "Total Range"?: string | null
          "UI Finish Label"?: string | null
        }
        Relationships: []
      }
      concrete_estimates: {
        Row: {
          avg_sqft_high: number | null
          avg_sqft_low: number | null
          concrete_style: string | null
          id: string
          job_type: string | null
          max_price_sqft: number | null
          min_price_sqft: number | null
          region_notes: string | null
          state_code: string | null
        }
        Insert: {
          avg_sqft_high?: number | null
          avg_sqft_low?: number | null
          concrete_style?: string | null
          id: string
          job_type?: string | null
          max_price_sqft?: number | null
          min_price_sqft?: number | null
          region_notes?: string | null
          state_code?: string | null
        }
        Update: {
          avg_sqft_high?: number | null
          avg_sqft_low?: number | null
          concrete_style?: string | null
          id?: string
          job_type?: string | null
          max_price_sqft?: number | null
          min_price_sqft?: number | null
          region_notes?: string | null
          state_code?: string | null
        }
        Relationships: []
      }
      contractor_signups: {
        Row: {
          business_name: string | null
          created_at: string | null
          email: string | null
          id: string
          job_types: string[] | null
          name: string | null
          phone: string | null
          primary_town: string | null
          service_radius_km: string | null
          state: string | null
        }
        Insert: {
          business_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          job_types?: string[] | null
          name?: string | null
          phone?: string | null
          primary_town?: string | null
          service_radius_km?: string | null
          state?: string | null
        }
        Update: {
          business_name?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          job_types?: string[] | null
          name?: string | null
          phone?: string | null
          primary_town?: string | null
          service_radius_km?: string | null
          state?: string | null
        }
        Relationships: []
      }
      lead_disputes: {
        Row: {
          campaign_id: string
          contractor_id: string
          created_at: string
          id: string
          lead_id: string
          reason: string | null
        }
        Insert: {
          campaign_id: string
          contractor_id: string
          created_at?: string
          id?: string
          lead_id: string
          reason?: string | null
        }
        Update: {
          campaign_id?: string
          contractor_id?: string
          created_at?: string
          id?: string
          lead_id?: string
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lead_disputes_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "lead_disputes_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractor_signups"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          campaign_id: string | null
          created_at: string | null
          email: string
          formatted_job_type: string | null
          job_type: string
          lead_id: string
          matched_contractor_ids: string[] | null
          name: string
          phone: string
          status: string | null
          updated_at: string | null
          zip_code: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string | null
          email: string
          formatted_job_type?: string | null
          job_type: string
          lead_id: string
          matched_contractor_ids?: string[] | null
          name: string
          phone: string
          status?: string | null
          updated_at?: string | null
          zip_code: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string | null
          email?: string
          formatted_job_type?: string | null
          job_type?: string
          lead_id?: string
          matched_contractor_ids?: string[] | null
          name?: string
          phone?: string
          status?: string | null
          updated_at?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["campaign_id"]
          },
        ]
      }
      "Location Data + URL Structure": {
        Row: {
          City: string | null
          "Concrete Contractors URL": string | null
          "Driveway Concreters URL": string | null
          GoogleMapEmbed: string | null
          ID: number
          Latitude: number | null
          Longitude: number | null
          State: string | null
        }
        Insert: {
          City?: string | null
          "Concrete Contractors URL"?: string | null
          "Driveway Concreters URL"?: string | null
          GoogleMapEmbed?: string | null
          ID: number
          Latitude?: number | null
          Longitude?: number | null
          State?: string | null
        }
        Update: {
          City?: string | null
          "Concrete Contractors URL"?: string | null
          "Driveway Concreters URL"?: string | null
          GoogleMapEmbed?: string | null
          ID?: number
          Latitude?: number | null
          Longitude?: number | null
          State?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
