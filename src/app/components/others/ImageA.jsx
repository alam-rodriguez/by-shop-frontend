// "use client";

// // React
// import React, { useState, useEffect } from "react";

// // Next
// import Image from "next/image";

// const ImageA = ({ src, alt = "", width, height, className }) => {
//     const [size, setSize] = useState({ width: null, height: null });z

//     useEffect(() => {
//         if (width || height) return;
//         const img = new window.Image();
//         img.src = src;
//         img.onload = () => {
//             setSize({
//                 width: img.naturalWidth,
//                 height: img.naturalHeight,
//             });
//         };
//     }, [src]);

//     return (
//         <Image
//             src={src}
//             alt={alt}
//             width={width ? width : size.width ? size.width : 0}
//             height={height ? height : size.height ? size.height : 0}
//             className={className}
//             priority
//         />
//     );
// };

// export default ImageA;

"use client";

// React
import React, { useState, useEffect } from "react";

// Next
import Image from "next/image";

const ImageA = ({ src, alt = "", width, height, className }) => {
    const [size, setSize] = useState({ width: null, height: null });

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (width || height) return;
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
            setSize({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
    }, [src]);

    return (
        <Image
            src={src}
            alt={alt}
            width={width ? width : size.width ? size.width : 0}
            height={height ? height : size.height ? size.height : 0}
            // className={className}
            className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoadingComplete={() => setLoaded(true)}
            priority
        />
    );
};

export default ImageA;
