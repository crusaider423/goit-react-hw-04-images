import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ImCross } from 'react-icons/im';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export const Modal = ({ close, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);
    document.body.classList.add(css.scroll);
    return () => {
      window.removeEventListener('keydown', closeModal);
      document.body.classList.remove(css.scroll);
    };
  });

  function closeModal({ target, currentTarget, code }) {
    return (target === currentTarget || code === 'Escape') && close();
  }

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <span className={css.close} onClick={close}>
          <ImCross />
        </span>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
