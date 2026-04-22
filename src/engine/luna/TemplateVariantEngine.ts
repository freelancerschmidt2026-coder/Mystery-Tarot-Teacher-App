// src/engine/luna/TemplateVariantEngine.ts

export interface TemplateVariantData {
  variantId: string;
  templateId: string;
  name: string;
  border: string;
  font: string;
  color: string;
  version: number;
}

const STORAGE_KEY_VARIANTS = "mystery_template_variants";

function loadVariants(): TemplateVariantData[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY_VARIANTS);
  return raw ? JSON.parse(raw) : [];
}

function saveVariants(list: TemplateVariantData[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY_VARIANTS, JSON.stringify(list));
}

export const TemplateVariantEngine = {
  addVariant(params: {
    templateId: string;
    name: string;
    border: string;
    font: string;
    color: string;
  }): TemplateVariantData {
    const list = loadVariants();

    const variant: TemplateVariantData = {
      variantId: `variant-${Date.now()}`,
      templateId: params.templateId,
      name: params.name,
      border: params.border,
      font: params.font,
      color: params.color,
      version: 1
    };

    list.push(variant);
    saveVariants(list);

    return variant;
  },

  getVariants(templateId: string): TemplateVariantData[] {
    return loadVariants().filter((v) => v.templateId === templateId);
  },

  incrementVersion(variantId: string): TemplateVariantData | null {
    const list = loadVariants();
    const entry = list.find((v) => v.variantId === variantId);
    if (!entry) return null;

    entry.version += 1;
    saveVariants(list);
    return entry;
  }
};

export default TemplateVariantEngine;
