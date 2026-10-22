import PDFDocument from 'pdfkit';
import { logger } from '../utils/logger.js';

export function generateAtsResumePdf(content, res, filename = 'ResumeIQ_Optimized_Resume.pdf') {
  logger.info(`Generating ATS compliant PDF: ${filename}`);

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 40, bottom: 40, left: 45, right: 45 },
    info: {
      Title: 'ATS-Optimized Resume',
      Author: 'ResumeIQ Engine',
      Subject: 'ATS Compliant Resume',
    },
  });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  doc.pipe(res);

  // Styling: Clean, single-column, standard Helvetica font for max ATS compatibility
  doc.fontSize(8).fillColor('#666666').text('RESUMEIQ ATS-OPTIMIZED DOCUMENT', { align: 'right' });
  doc.moveDown(0.5);

  const lines = content.split('\n');

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed) {
      doc.moveDown(0.4);
      return;
    }

    // Check if line looks like candidate name (first line or short uppercase)
    if (trimmed === lines[0]?.trim()) {
      doc.fontSize(16).fillColor('#26253A').font('Helvetica-Bold').text(trimmed, { align: 'left' });
      doc.moveDown(0.3);
      return;
    }

    // Check if line looks like section header (all caps or contains standard keywords)
    const isHeader =
      /^(PROFESSIONAL SUMMARY|SUMMARY|EXPERIENCE|WORK EXPERIENCE|TECHNICAL SKILLS|SKILLS|EDUCATION|PROJECTS|CERTIFICATIONS)$/i.test(
        trimmed
      );

    if (isHeader) {
      doc.moveDown(0.5);
      doc.fontSize(11).fillColor('#5d5a74').font('Helvetica-Bold').text(trimmed.toUpperCase());
      // Horizontal separator line under header
      doc.strokeColor('#e2e2e5').lineWidth(0.8).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown(0.4);
    } else if (trimmed.startsWith('•') || trimmed.startsWith('-') || trimmed.startsWith('*')) {
      // Bullet point
      doc.fontSize(9.5).fillColor('#26253A').font('Helvetica').text(`  ${trimmed}`, {
        indent: 10,
        lineGap: 2,
      });
    } else {
      // Normal body text
      doc.fontSize(9.5).fillColor('#26253A').font('Helvetica').text(trimmed, {
        lineGap: 2,
      });
    }
  });

  doc.end();
}
