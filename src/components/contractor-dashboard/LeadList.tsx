
'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import LeadTable, { Lead } from './leads/LeadTable'
import DisputeModal from './leads/DisputeModal'
import ViewDisputeModal, { DisputeDetails } from './leads/ViewDisputeModal'

interface LeadListProps {
  userId: string
}

// Define interfaces for the RPC responses
interface DisputedLeadResponse {
  lead_id: string;
}

interface DisputeDetailsResponse {
  reason: string;
  created_at: string;
}

export default function LeadList({ userId }: LeadListProps) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [disputedLeads, setDisputedLeads] = useState<string[]>([])
  const [disputeView, setDisputeView] = useState<DisputeDetails | null>(null)
  const [showDisputeModal, setShowDisputeModal] = useState(false)

  // 🧠 Load Disputed Leads
  useEffect(() => {
    const fetchDisputedLeads = async () => {
      const { data, error } = await supabase
        .rpc('get_user_disputes', { user_id: userId })

      if (error) {
        console.error('Error fetching disputed leads:', error)
        return
      }

      // Properly cast the data to the expected type
      const typedData = data as DisputedLeadResponse[];
      setDisputedLeads(typedData.map(d => d.lead_id))
    }

    fetchDisputedLeads()
  }, [userId])

  // 🧠 Handle Dispute View
  const handleViewDispute = async (lead: Lead) => {
    const { data, error } = await supabase
      .rpc('get_dispute_details', {
        p_lead_id: lead.lead_id,
        p_contractor_id: userId,
      })

    if (error) {
      console.error('Error fetching dispute details:', error)
      return
    }

    // Properly cast the data to the expected type
    const typedData = data as DisputeDetailsResponse[];
    if (typedData && typedData.length > 0) {
      setDisputeView(typedData[0])
      setSelectedLead(lead)
    }
  }

  return (
    <div className="space-y-4">
      <LeadTable
        leads={leads}
        disputedLeads={disputedLeads}
        onDispute={(lead) => {
          setSelectedLead(lead)
          setShowDisputeModal(true)
        }}
        onViewDispute={handleViewDispute}
      />

      {showDisputeModal && selectedLead && (
        <DisputeModal
          open={showDisputeModal}
          onOpenChange={setShowDisputeModal}
          selectedReason=""
          setSelectedReason={() => {}}
          disputeReason=""
          setDisputeReason={() => {}}
          onSubmit={() => {}}
          submitting={false}
        />
      )}

      {disputeView && selectedLead && (
        <ViewDisputeModal
          open={!!disputeView}
          onOpenChange={() => setDisputeView(null)}
          disputeDetails={disputeView}
        />
      )}
    </div>
  )
}
