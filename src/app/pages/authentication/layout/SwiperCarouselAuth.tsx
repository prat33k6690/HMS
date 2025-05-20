import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import kycSwiper1 from "../../../assests/images/login/kyc-swiper-1.png";
import kycSwiper2 from "../../../assests/images/login/kyc-swiper-2.png";

const SwiperCarouselAuth = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 6000,
                    disableOnInteraction: false,
                }}
                pagination={false}
                navigation={false}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div style={{ textAlign: "center" }}>
                        <img
                            src={kycSwiper1}
                            alt="login 1"
                            style={{
                                width: "auto",
                                height: "262px",
                                margin: "0 auto",
                            }}
                        />
                    </div>
                    <div className="mt-3">
                        <h5 className="text-center" style={{ fontSize: "12px" }}>
                            Our software automates the entire KYC process, from document collection to verification, reducing manual effort and processing time significantly.
                        </h5>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{ textAlign: "center" }} >
                        <img
                            src={kycSwiper2}
                            alt="login 2"
                            style={{
                                width: "auto",
                                height: "262px",
                                margin: "0 auto",
                            }}
                        />
                    </div>
                    <div className="mt-3">
                        <h5 className="text-center" style={{ fontSize: "12px" }}>
                            Check Truncation System (CTS) is a way to expedite checks Clearing
                            process – sending checks to branches, verification Physically
                            signing and finally approving the payment.
                        </h5>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default SwiperCarouselAuth;
