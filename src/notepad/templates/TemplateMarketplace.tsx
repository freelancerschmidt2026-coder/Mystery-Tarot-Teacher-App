// src/notepad/templates/TemplateMarketplace.tsx

import React from "react";

type TemplateItem = {
  id: string;
  name: string;
  price: number;
  previewUrl: string;
};

type Props = {
  templates: TemplateItem[];
  onPreview: (template: TemplateItem) => void;
};

export const TemplateMarketplace: React.FC<Props> = ({
  templates,
  onPreview
}) => {
  return (
    <div className="template-marketplace">
      <h2 className="marketplace-title">Premium NotePad Covers</h2>

      <div className="template-grid">
        {templates.map((t) => (
          <div key={t.id} className="template-card">
            <img
              src={t.previewUrl}
              alt={t.name}
              className="template-preview"
              onClick={() => onPreview(t)}
            />

            <div className="template-info">
              <div className="template-name">{t.name}</div>
              <div className="template-price">${t.price.toFixed(2)}</div>
            </div>

            <button
              className="template-preview-button"
              onClick={() => onPreview(t)}
            >
              Preview
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
