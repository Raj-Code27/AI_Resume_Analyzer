import { OptimizationResult } from '../types';

export function downloadClientAtsPdf(optimization: OptimizationResult, filename?: string) {
  const content = optimization.optimizedContent || optimization.originalContent;
  const docTitle = filename ? filename.replace(/\.[^/.]+$/, '') + '_Optimized_ATS' : 'ResumeIQ_Optimized_Resume';

  // Build clean ATS-compliant single-column HTML document
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${docTitle}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #222;
      margin: 0;
      padding: 20px;
    }
    h1 {
      font-size: 18pt;
      margin: 0 0 4px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #111;
    }
    .contact-info {
      font-size: 9pt;
      color: #555;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ddd;
    }
    h2 {
      font-size: 11pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 14px;
      margin-bottom: 6px;
      color: #333;
      border-bottom: 1px solid #ccc;
      padding-bottom: 2px;
    }
    p, ul {
      margin: 4px 0;
    }
    ul {
      padding-left: 18px;
    }
    li {
      margin-bottom: 3px;
    }
    .ats-badge {
      font-size: 8pt;
      color: #888;
      text-align: right;
      margin-bottom: 10px;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="ats-badge">Formatted for ATS Optimization • ResumeIQ Verified</div>
  <pre style="font-family: inherit; white-space: pre-wrap; word-break: break-word;">${escapeHtml(content)}</pre>
</body>
</html>
  `;

  // Create an iframe / blob download or print window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  } else {
    // Fallback: download as clean text file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${docTitle}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
