import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import './MailingDialog.css';
import { ToastContainer, toast } from 'react-toastify';
import { addMailingListSubscriber } from '../services/firestore';
import React from 'react';

export default function MailingDialog({isOpen, onClose}) {
    if (!isOpen) {
        return null;
    }

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const addEmailToMailingList = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const formData = new FormData(e.target);
        const email = formData.get('email');
        try {
            const result = await addMailingListSubscriber(email);
            if (result.message === 'exists') {
                toast.info("Email is already subscribed.");
            } else {
                toast.success("Successfully subscribed to the mailing list!");
                e.target.reset();
            }
        } catch (error) {
            console.error('Subscription failed:', error);
            toast.error("Failed to subscribe. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Dialog open={isOpen} onClose={onClose} className="dialog-root">
            <div className="dialog-backdrop" aria-hidden="true" />
            <div className="dialog-container">
                <DialogPanel>
                <DialogTitle>Subscribe to our Mailing List</DialogTitle>
                <form className='mailing-form' onSubmit={addEmailToMailingList}>
                    <div className='mailing-input'>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" required className="email-input" />
                    </div>
                    <button type="submit" className='mailing-button'>Subscribe</button>
                </form>
                </DialogPanel>
            </div>
            <ToastContainer />
        </Dialog>
    );
}
