// src/notepad/templates/TemplatePreviewModal.tsx

import React from "react";

type TemplateItem = {
  id: string;
  name: string;
  price: number;
  previewUrl: string;
};

type Props = {
  template: TemplateItem;
  onClose: () => void;
  onPurchase: (templateId: string) => Promise<void>;
};

export const TemplatePreviewModal: React.FC<Props> = ({
  template,
  onClose,
  onPurchase
}) => {
  return (
    <div className="template-modal-overlay">
      <div className="template-modal">
        <img
          src={template.previewUrl}
          alt={template.name}
          className="template-modal-preview"
        />

        <h2>{template.name}</h2>
        <p className="template-price">${template.price.toFixed(2)}</p>

        <div className="template-modal-actions">
          <button onClick={onClose}>Cancel</button>

          <button
            className="purchase-button"
            onClick={() => onPurchase(template.id)}
          >
            Purchase & Apply
          </button>
        </div>
      </div>
    </div>
  );
};
