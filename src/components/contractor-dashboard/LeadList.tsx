
'use client'

import React, { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import LeadTable, { Lead } from './leads/LeadTable'
import DisputeModal, { DISPUTE_REASONS } from './leads/DisputeModal'
import ViewDisputeModal, { DisputeDetails } from './leads/ViewDisputeModal'

interface LeadListProps {
  userId: string
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
        .rpc<{ lead_id: string }[], { user_id: string }>('get_user_disputes', { user_id: userId })

      if (error) {
        console.error('Error fetching disputed leads:', error)
        return
      }

      setDisputedLeads(data.map(d => d.lead_id))
    }

    fetchDisputedLeads()
  }, [userId])

  // 🧠 Handle Dispute View
  const handleViewDispute = async (lead: Lead) => {
    const { data, error } = await supabase
      .rpc<{ reason: string; created_at: string }[], { p_lead_id: string; p_contractor_id: string }>(
        'get_dispute_details',
        {
          p_lead_id: lead.lead_id,
          p_contractor_id: userId,
        }
      )

    if (error) {
      console.error('Error fetching dispute details:', error)
      return
    }

    if (data.length > 0) {
      setDisputeView(data[0])
      setSelectedLead(lead)
    }
  }

  return (
    <div className="space-y-4">
      <LeadTable
        leads={leads}
        disputedLeads={disputedLeads}
        onDisputeClick={(lead) => {
          setSelectedLead(lead)
          setShowDisputeModal(true)
        }}
        onViewDispute={handleViewDispute}
      />

      {showDisputeModal && selectedLead && (
        <DisputeModal
          lead={selectedLead}
          onClose={() => setShowDisputeModal(false)}
          userId={userId}
          reasons={DISPUTE_REASONS}
        />
      )}

      {disputeView && selectedLead && (
        <ViewDisputeModal
          lead={selectedLead}
          details={disputeView}
          onClose={() => setDisputeView(null)}
        />
      )}
    </div>
  )
}
