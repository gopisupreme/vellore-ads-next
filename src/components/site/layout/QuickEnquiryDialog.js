'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@/components/site/ui';
import { enquiryDialogToggled, selectEnquiry } from '@/store/reducers/enquirySlice';
import QuickEnquiryForm from './QuickEnquiryForm';

/** The "Quick Enquiry" pop-up, opened from the header menu and the footer. */
export default function QuickEnquiryDialog() {
  const dispatch = useDispatch();
  const { dialogOpen } = useSelector(selectEnquiry);
  const close = useCallback(() => dispatch(enquiryDialogToggled(false)), [dispatch]);
  return (
    <Dialog open={dialogOpen} title="Quick Enquiry" onClose={close}>
      <QuickEnquiryForm />
    </Dialog>
  );
}
