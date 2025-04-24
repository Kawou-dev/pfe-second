'use client';
import { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export default function TextToPDF() {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
    const { height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 14;

    let y = height - 50; // Commencer en haut

    const lines = text.split('\n');

    for (let line of lines) {
      page.drawText(line, {
        x: 50,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      y -= fontSize + 6; // Saut de ligne
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setLoading(false);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'document.pdf';
    link.click();
  };

  return (
       <div className=' '> 
           <div className=' mx-auto p-4'  >
      <textarea
        className='bg-white rounded-xl  w-full p-2 h-32  '
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setPdfUrl(null); // Réinitialiser si modifié
          }}
         placeholder='Entrer votre texte '
      />
      <br />
      <button className='bg-blue-600 p-1 px-3 text-white cursor-pointer rounded-sm' 
        onClick={pdfUrl ? downloadPDF : generatePDF}
        disabled={loading}
       
      >
        {loading
          ? 'Génération...'
          : pdfUrl
          ? 'Télécharger PDF'
          : 'Générer PDF'}
      </button>
    </div>
       </div>
  );
}
