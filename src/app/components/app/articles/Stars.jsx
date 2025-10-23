"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

const Stars = ({ average, totalPunctuation, reviews = 1, showCountStart = true, showCountReviews = true, size = "12", showAverage = true }) => {
    const [stars, setStars] = useState(0);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        setIcons([]);
        // if (totalPunctuation == null) return;
        // const puntuacion = totalPunctuation / reviews;
        setStars(Math.round(average));
        for (let i = 1; i <= 5; i++) {
            const isFill = average >= i ? true : false;
            setIcons((icons) => [
                ...icons,
                <Icon
                    key={i}
                    icon={`${isFill ? "mdi:star" : "mdi-light:star"}`}
                    className={`text-orange-400 ${isFill ? "" : ""}`}
                    style={{ height: size, width: size }}
                />,
            ]);
        }
    }, []);

    return (
        <div className="flex items-center gap-2">
            {showAverage && <p>{stars}</p>}
            <div className="flex">{icons}</div>
            {showCountReviews && <p>({reviews})</p>}
        </div>
    );
};

export default Stars;
