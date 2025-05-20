import React from 'react';
import { BiCheckDouble } from 'react-icons/bi';
import { useSelector } from 'react-redux';

interface stepProps {
    stepNumber: number;
    Type?: string
    steps?: any
}


const Step: React.FC<stepProps> = ({ stepNumber, Type, steps }) => {

    const screenWidth = useSelector((state: any) => state.layout.currentScreenWidth);
    return (
        <div>
            <div className={` align-itens-center d-flex z-2 position-relative justify-content-center ${Type === "H" ? "p-4 flex-column" : screenWidth > 990 ? "my-4" : ""}`}>
                {steps.map((item: any, i: number) => {
                    return (
                        <div
                            className={`wizard-container d-flex align-items-center ${Type === "H" && steps.length - 1 > i ? "pb-4" : ""}`}
                            key={i}
                        >
                            <div
                                className={`${stepNumber >= i
                                    ? "wizard-active"
                                    : "wizard-inactive"
                                    }  wizard `}
                            >
                                {stepNumber <= i ? (
                                    <span> {i + 1}</span>
                                ) : (
                                    <span className="text-2xl">
                                        <BiCheckDouble />
                                    </span>
                                )}
                            </div>
                            <div
                                className={`${stepNumber >= i
                                    ? "wizard-devided-active"
                                    : "wizard-devided-inactive"
                                    } ${Type === "H" ? "wizard-horizantal" : "wizard-devided"} `}
                            ></div>
                            {screenWidth > 990 &&
                                <span className={`text-sm text-slate-500 px-2 wizard-text ${stepNumber >= i ? "fw-semibold text-orange" : ""} `}>{item.apiNm}</span>
                            }
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Step