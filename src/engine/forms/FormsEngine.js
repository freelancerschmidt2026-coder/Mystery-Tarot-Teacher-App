// FormsEngine.js
// Handles form creation, submission, validation, and storage

export const FormsEngine = {
  forms: [],
  submissions: [],

  createForm({ title, fields }) {
    const form = {
      formId: `form_${Date.now()}`,
      title,
      fields, // [{ name, type, required }]
      createdAt: new Date().toISOString()
    };

    this.forms.push(form);
    return form;
  },

  submitForm(formId, data) {
    const form = this.forms.find(f => f.formId === formId);
    if (!form) return { success: false, reason: "FORM_NOT_FOUND" };

    const missing = form.fields
      .filter(f => f.required)
      .filter(f => !data[f.name]);

    if (missing.length > 0) {
      return {
        success: false,
        reason: "MISSING_REQUIRED_FIELDS",
        missing: missing.map(m => m.name)
      };
    }

    const submission = {
      submissionId: `sub_${Date.now()}`,
      formId,
      data,
      submittedAt: new Date().toISOString()
    };

    this.submissions.push(submission);
    return { success: true, submission };
  },

  getSubmissions(formId) {
    return this.submissions.filter(s => s.formId === formId);
  }
};
