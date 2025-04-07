
import React from 'react';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// Lead type definition
export interface Lead {
  lead_id: string;
  name: string;
  email: string;
  phone: string;
  job_type: string;
  zip_code: string;
  created_at: string;
  status?: string;
  lead_type?: 'standard' | 'priority' | null;
}

interface LeadTableProps {
  leads: Lead[];
  disputedLeads: string[];
  onDispute: (lead: Lead) => void;
  onViewDispute: (lead: Lead) => void;
}

const LeadTable: React.FC<LeadTableProps> = ({ 
  leads, 
  disputedLeads, 
  onDispute, 
  onViewDispute 
}) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Received</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead) => (
            <TableRow key={lead.lead_id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.job_type}</TableCell>
              <TableCell>{lead.zip_code}</TableCell>
              <TableCell>
                {lead.email ? <a href={`mailto:${lead.email}`} className="hover:text-blue-500">{lead.email}</a> : 'N/A'}
                <br />
                {lead.phone ? <a href={`tel:${lead.phone}`} className="hover:text-blue-500">{lead.phone}</a> : 'N/A'}
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell>
                {disputedLeads.includes(lead.lead_id) ? (
                  <Badge variant="destructive">Disputed</Badge>
                ) : (
                  <Badge variant="secondary">New</Badge>
                )}
              </TableCell>
              <TableCell>
                {disputedLeads.includes(lead.lead_id) ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onViewDispute(lead)}
                    className="flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" /> View Dispute
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDispute(lead)}
                  >
                    Dispute
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadTable;
