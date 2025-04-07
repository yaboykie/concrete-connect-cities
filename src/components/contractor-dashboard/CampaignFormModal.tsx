
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useContractorCampaignForm } from '@/hooks/useContractorCampaignForm';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface CampaignFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userId: string;
}

const CampaignFormModal: React.FC<CampaignFormModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  userId
}) => {
  const {
    formData,
    formErrors,
    isSubmitting,
    handleInputChange,
    handleJobTypeChange,
    handleRadiusChange,
    handleSubmit,
  } = useContractorCampaignForm({ userId, onSuccess });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Campaign</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., My Service Area"
                className={formErrors.name ? "border-red-500" : ""}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500 mt-1">{formErrors.name}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., 37.7749"
                  className={formErrors.latitude ? "border-red-500" : ""}
                />
                {formErrors.latitude && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.latitude}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude || ''}
                  onChange={handleInputChange}
                  placeholder="e.g., -122.4194"
                  className={formErrors.longitude ? "border-red-500" : ""}
                />
                {formErrors.longitude && (
                  <p className="text-sm text-red-500 mt-1">{formErrors.longitude}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="e.g., 94110"
                className={formErrors.zipCode ? "border-red-500" : ""}
              />
              {formErrors.zipCode && (
                <p className="text-sm text-red-500 mt-1">{formErrors.zipCode}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Enter either coordinates or ZIP code
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Service Radius: {formData.radiusKm} km</Label>
              </div>
              <Slider
                value={[formData.radiusKm]}
                min={5}
                max={100}
                step={5}
                onValueChange={(values) => handleRadiusChange(values[0])}
              />
            </div>
            
            <div>
              <Label className="block mb-2">Job Types</Label>
              <div className="grid grid-cols-2 gap-4">
                {['driveway', 'patio', 'sidewalk', 'foundation', 'garage', 'pool_deck'].map((jobType) => (
                  <div key={jobType} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`job-type-${jobType}`}
                      checked={formData.jobTypes.includes(jobType)}
                      onCheckedChange={(checked) => {
                        handleJobTypeChange(jobType, !!checked);
                      }}
                    />
                    <Label htmlFor={`job-type-${jobType}`} className="capitalize">
                      {jobType.replace('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
              {formErrors.jobTypes && (
                <p className="text-sm text-red-500 mt-1">{formErrors.jobTypes}</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Campaign'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignFormModal;
