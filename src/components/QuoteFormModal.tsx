
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import ContactForm from './ContactForm';

interface QuoteFormModalProps {
  buttonText?: string;
  buttonClassName?: string;
  triggerClassName?: string;
}

const QuoteFormModal = ({
  buttonText = "Get My Free Quote",
  buttonClassName = "cta-button",
  triggerClassName = "",
}: QuoteFormModalProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={triggerClassName}>
        <Button className={buttonClassName}>
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Get Your Free Concrete Quote</DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below to receive free quotes from trusted concrete professionals in your area.
          </DialogDescription>
        </DialogHeader>
        <ContactForm closeModal={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default QuoteFormModal;
