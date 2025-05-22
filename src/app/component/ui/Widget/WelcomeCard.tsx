import React from "react";
import Image2 from "../../../assests/images/widget-bg-2.png";
const WelcomeWidget = () => {
    return (
        <div
            className="p-3 rounded"
            style={{
                backgroundImage: `url(${Image2})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div>
                <h4 className="text-xl font-medium text-white mb-2">
                    <span className="d-block fw-normal">Good evening,</span>
                    <span className="d-block">Mr. Dianne Russell</span>
                </h4>
                <p className="text-sm text-white fw-normal">Welcome to Dashcode</p>
            </div>
        </div>
    );
};


export default WelcomeWidget;
