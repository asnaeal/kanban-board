import { AllHTMLAttributes } from 'react';
import ReactModal from 'react-modal';

interface Props<T> extends AllHTMLAttributes<T> {
  isOpen: boolean;
  onRequestClose: () => void;
}

export default function Modal<T>({ isOpen, onRequestClose, children }: Props<T>) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={(e) => {
        e.stopPropagation();
        onRequestClose();
      }}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgb(0,0,0,0.8)',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}
