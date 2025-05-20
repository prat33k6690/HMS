import React, { useCallback, useRef } from 'react';
import AadharHeaderImg from "./img/HeaderAAadharCard.jpeg";
import FooterAadharImg from "./img/FooterAadharCard.jpeg";
import { Button } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import { toJpeg } from 'html-to-image';
import { downloadFiles } from '../../../utils/helper';

// Define props type
interface AadharCardProps {
    name: string;
    gender: string;
    dob: string;
    aadharNumber: string;
    profileAadharCard: any;
}

const AadharCardImg: React.FC<AadharCardProps> = ({ name, gender, dob, aadharNumber, profileAadharCard }) => {

    const aadhaarImgRef = useRef<HTMLDivElement>(null);

    // Helper for Download Aadhaar Card Image
    const handleDownloadAadhaarImg = useCallback(async () => {
        if (aadhaarImgRef.current) {
            const url = await toJpeg(aadhaarImgRef.current, { cacheBust: false });
            // Help to File Download  
            downloadFiles(url, "Aadhaar-card.png")
        }
    }, [aadhaarImgRef?.current]);

    return (
        <div className='d-flex align-items-center justify-content-center flex-column'>
            <div className="border rounded-3 p-2 bg-white" ref={aadhaarImgRef} style={{ maxWidth: '400px' }}>
                {/* Header Image */}
                <div>
                    <img
                        src={AadharHeaderImg}
                        alt="Header"
                        className="img-fluid w-100"
                    />
                </div>

                {/* Profile and Details */}
                <div className="d-flex align-items-start py-3">
                    <img
                        src={"data:image/jpeg;base64," + profileAadharCard}
                        alt="Profile"
                        className="rounded me-3"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <div className="fs-6 lh-base">
                        <div>{name}</div>
                        <div>{gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : gender === 'O' ? 'Other' : gender}</div>
                        <div>{dob}</div>
                    </div>
                </div>

                {/* Aadhaar Number */}
                <div className="text-center fs-5 fw-semibold">
                    {"XXXX-XXXX-" + aadharNumber.slice(-4)}
                </div>

                <hr className="my-2" />

                {/* Footer Image */}
                <div>
                    <img
                        src={FooterAadharImg}
                        alt="Footer"
                        className="img-fluid w-100"
                    />
                </div>
            </div>
            <div className='mt-2'>
                <Button variant='transparent' className="btn-sm text-primary" onClick={handleDownloadAadhaarImg}><BsDownload className="me-2" />Download Aadhaar Card Image</Button>
            </div>
        </div>
    );
};

export default AadharCardImg;
