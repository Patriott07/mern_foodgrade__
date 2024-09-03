import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';

const QRCodeWithImage = (props: any) => {
    const { value, imageUrl, size = 250 } = props;
    const qrRef = useRef(null);

    const downloadQR = () => {

        const canvasElements = document.getElementsByTagName('canvas');

        if (canvasElements.length > 0) {
            const canvas = canvasElements[0]; // Ambil elemen canvas pertama dari koleksi
            const dataURL = canvas.toDataURL('image/png'); // Dapatkan data URL dari canvas

            // Buat link untuk mengunduh gambar
            const link = document.createElement('a');
            link.download = 'qrcode.png';
            link.href = dataURL;
            link.click(); // Simulasikan klik pada link untuk mengunduh gambar
        }
        // if (qrRef.current) {
        //     console.log(qrRef);
        //     htmlToImage.toPng(qrRef.current)
        //         .then((dataUrl) => {
        //             console.log({dataUrl})
        //             const link = document.createElement('a');
        //             link.download = 'qrcode.png';
        //             link.href = dataUrl;
        //             link.click();
        //         })
        //         .catch((error) => {
        //             console.error('Error generating image:', error);
        //         });
        // }
    };

    return (
        <div>
            <div ref={qrRef} style={{ position: 'relative', width: size, height: size }}>
                {/* QR Code */}
                <QRCodeCanvas value={value} size={size} />

                {/* Image di tengah */}
                <img
                    src={imageUrl}
                    alt="center"
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: size * 0.2,
                        height: size * 0.2,
                        borderRadius: '50%',
                    }}
                />
            </div>
            <button onClick={downloadQR} className='underline mt-3 text-blue-600'>Unduh QR Code</button>
        </div>
    );
};

export default QRCodeWithImage;
