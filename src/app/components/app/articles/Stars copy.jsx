"use client";

import React, { useEffect, useState } from "react";

// Icons
import { Icon } from "@iconify/react";

const Stars = ({ totalPunctuation, reviews = 1, showCountStart = true, showCountReviews = true, size = "12" }) => {
    const [stars, setStars] = useState(0);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        setIcons([]);
        if (totalPunctuation == null) return;
        const puntuacion = totalPunctuation / reviews;
        setStars(Math.round(puntuacion));
        for (let i = 1; i <= 5; i++) {
            const isFill = puntuacion >= i ? true : false;
            // setIcons((icons) => [...icons, <Icon key={i} icon={`${isFill ? "material-symbols:star" : "material-symbols-light:star-outline"}`} className={`text-orange-400 ${isFill ? "" : ""}`} style={{ height: size, width: size }} />]);
            setIcons((icons) => [...icons, <Icon key={i} icon={`${isFill ? "mdi:star" : "mdi-light:star"}`} className={`text-orange-400 ${isFill ? "" : ""}`} style={{ height: size, width: size }} />]);
        }
    }, [totalPunctuation]);

    return (
        <div className="flex items-center gap-2">
            {showCountStart && <p>{stars}</p>}
            <div className="flex">{icons}</div>
            {showCountReviews && <p>({reviews})</p>}
        </div>
    );
};

export default Stars;

{
    /* <Icon icon="material-symbols:star" className="text-orange-400" />
  <Icon icon="material-symbols:star" className="text-orange-400" />
  <Icon icon="material-symbols:star" className="text-orange-400" />
  <Icon icon="material-symbols:star" className="text-orange-400" />
  <Icon icon="material-symbols:star" className="text-orange-400" /> */
}
// return (
//     <div className="flex">
//         <Icon icon="material-symbols:star" className="text-orange-400" />
//         <Icon icon="material-symbols:star" className="text-orange-400" />
//         <Icon icon="material-symbols:star" className="text-orange-400" />
//         <Icon icon="material-symbols:star" className="text-orange-400" />
//         <Icon icon="material-symbols-light:star-outline" className="text-orange-400" />
//     </div>
// );
