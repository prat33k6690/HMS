import React, { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { menuItems } from "../../layout/sidebar/menu";
import { Icon } from "@iconify/react";

interface MenuItem {
    title: string;
    link?: string;
    isHide?: boolean;
    child?: {
        title: string;
        childlink: string;
        isHide?: boolean;
    }[];
}

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const locationName = location.pathname.replace("/", "");

    const [isHide, setIsHide] = useState<boolean | null>(null);
    const [groupTitle, setGroupTitle] = useState<string>("");

    useEffect(() => {
        const currentMenuItem = (menuItems as MenuItem[]).find(
            (item) => item.link === locationName
        );

        const currentChild = (menuItems as MenuItem[]).find((item) =>
            item.child?.find((child) => child.childlink === locationName)
        );

        if (currentMenuItem) {
            setIsHide(currentMenuItem.isHide ?? false);
            setGroupTitle("");
        } else if (currentChild) {
            setIsHide(currentChild.isHide ?? false);
            setGroupTitle(currentChild.title);
        }
    }, [location, locationName]);

    return (
        <>
            {!isHide ? (
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-end align-items-center">
                        <li className="breadcrumb-item">
                            <NavLink to="/dashboard" className="text-decoration-none mb-1">
                                <Icon icon="heroicons-outline:home" style={{ marginBottom: "4px" }} />
                            </NavLink>
                        </li>

                        {groupTitle && (
                            <li className="breadcrumb-item text-capitalize text-muted" style={{ fontSize: "12px" }}>
                                <button type="button" className="btn btn-link m-0 p-0 text-decoration-none text-muted" style={{ fontSize: "12px" }}>
                                    {groupTitle}
                                </button>
                            </li>
                        )}

                        <li className="breadcrumb-item active text-capitalize text-muted" aria-current="page" style={{ fontSize: "12px" }}>
                            {locationName}
                        </li>
                    </ol>
                </nav>
            ) : null}
        </>
    );
};

export default Breadcrumbs;
