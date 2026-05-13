import InfoIcon from '../../../components/icons/InfoIcon';
import './info.css';

export default function InfoModal({ info, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-modal" onClick={e => e.stopPropagation()}>
        <button className="info-modal-close" onClick={onClose}>✕</button>
        <InfoIcon />
        <p>{info}</p>
      </div>
    </div>
  );
}