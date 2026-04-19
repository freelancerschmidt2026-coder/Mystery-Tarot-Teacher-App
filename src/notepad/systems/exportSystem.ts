import { NotebookPage } from "../pages/PageSystem";

export const ExportSystem = {
  toJSON(pages: NotebookPage[]): string {
    return JSON.stringify(pages, null, 2);
  },

  toPlainText(pages: NotebookPage[]): string {
    return pages
      .map(
        (p, index) =>
          `Page ${index + 1}: ${p.title}\n\n${p.content}\n\n---\n`
      )
      .join("\n");
  },

  downloadAsFile(filename: string, content: string, mime = "text/plain") {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  },
};
