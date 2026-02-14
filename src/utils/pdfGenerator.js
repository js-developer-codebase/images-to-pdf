import jsPDF from 'jspdf';

export const generatePDF = async (files, pageSize = 'auto') => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4', // Default, will change per page if auto
    });

    // Remove the default first page added by jsPDF
    doc.deletePage(1);

    for (const file of files) {
        await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = file.preview;
            img.onload = () => {
                const imgWidth = img.width;
                const imgHeight = img.height;
                const ratio = imgWidth / imgHeight;

                let pageOrientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
                let pdfWidth, pdfHeight;

                if (pageSize === 'auto') {
                    // Use pixel dimensions converted to mm (roughly) or just use points
                    // 1 px = 0.264583 mm
                    const mmWidth = imgWidth * 0.264583;
                    const mmHeight = imgHeight * 0.264583;
                    doc.addPage([mmWidth, mmHeight], pageOrientation);
                    doc.addImage(img, 'JPEG', 0, 0, mmWidth, mmHeight);
                } else {
                    // A4 or A3
                    let formatRaw = pageSize.toLowerCase(); // a4 or a3

                    // Define dimensions in mm
                    const formats = {
                        a4: { width: 210, height: 297 },
                        a3: { width: 297, height: 420 },
                    };

                    let format = formats[formatRaw] || formats.a4;

                    // If landscape, swap width/height for page creation
                    let pageWidth = formats[formatRaw].width;
                    let pageHeight = formats[formatRaw].height;

                    if (pageOrientation === 'landscape') {
                        pageWidth = formats[formatRaw].height;
                        pageHeight = formats[formatRaw].width;
                    }

                    doc.addPage([pageWidth, pageHeight], pageOrientation);

                    // Fit image into page keeping aspect ratio
                    let renderWidth = pageWidth;
                    let renderHeight = renderWidth / ratio;

                    if (renderHeight > pageHeight) {
                        renderHeight = pageHeight;
                        renderWidth = renderHeight * ratio;
                    }

                    // Center image
                    const x = (pageWidth - renderWidth) / 2;
                    const y = (pageHeight - renderHeight) / 2;

                    doc.addImage(img, 'JPEG', x, y, renderWidth, renderHeight);
                }
                resolve();
            };
            img.onerror = reject;
        });
    }

    doc.save('converted-images.pdf');
};
