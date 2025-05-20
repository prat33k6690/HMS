import React, { useCallback, useRef } from 'react';
import panImg from "./img/pan_card.jpeg";
import { Button } from 'react-bootstrap';
import { BsDownload } from 'react-icons/bs';
import { toJpeg } from 'html-to-image';
import { downloadFiles } from '../../../utils/helper';

const PanCardFormat = ({ data }: any) => {

    const aadhaarImgRef = useRef<HTMLDivElement>(null);

    // Helper for Download Aadhaar Card Image
    const handleDownloadPanImg = useCallback(async () => {
        if (aadhaarImgRef.current) {
            const url = await toJpeg(aadhaarImgRef.current, { cacheBust: false });
            // Help to File Download  
            downloadFiles(url, "Pan-card.png")
        }
    }, [aadhaarImgRef?.current]);

    return (
        <div className='d-flex align-items-center justify-content-center flex-column'>
            <div className="border rounded-3 p-2 bg-white position-relative" ref={aadhaarImgRef} style={{ maxWidth: '400px' }}>
                <img
                    src={panImg}
                    alt="Header"
                    className="img-fluid w-100"
                />

                <div className='pan-card-no text-sm fw-bold'>{data.idNumber}</div>

                <div className='pan-first-name text-sm fw-semibold'>{data.fullName}</div>
                <div className='pan-last-name text-sm fw-semibold'>{data.idLastUpdated}</div>
                <div className='pan-aadhar-seeding text-sm fw-semibold'>{data.aadhaarSeedingStatus === "Y" ? <span className='text-success'>Active</span> : <span className='text-danger'>In-Active</span>}</div>
            </div>
            <div className='mt-2'>
                <Button variant='transparent' className="btn-sm text-primary" onClick={handleDownloadPanImg}><BsDownload className="me-2" />Download Pan Card Image</Button>
            </div>
        </div>
    )
}

export default PanCardFormat