import React, { forwardRef, useImperativeHandle, useState } from "react";

const RotateAnimation = forwardRef(function RotateAnimation(props, ref) {
    const { children, duration = ".3s", timingFunction = "ease-out", fillMode = "both", deg = 180 } = props;

    const [rotate, setRotate] = useState(null);

    const changeRotate = () => setRotate(!rotate);

    useImperativeHandle(ref, () => ({
        changeRotate: changeRotate,
    }));

    return (
        <>
            <style>{`
                @keyframes rotate-animation {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(${deg}deg);
                    }
                }
                @keyframes rotate-animation-reverse {
                    from {
                        transform: rotate(${deg}deg);
                    }
                    to {
                        transform: rotate(0deg);
                    }
                }
            `}</style>

            <div
                style={{
                    animationName: rotate != null ? (rotate ? "rotate-animation" : "rotate-animation-reverse") : "",
                    animationDuration: duration,
                    animationTimingFunction: timingFunction,
                    animationFillMode: fillMode,
                }}
            >
                {children}
            </div>
        </>
    );
});

export default RotateAnimation;
