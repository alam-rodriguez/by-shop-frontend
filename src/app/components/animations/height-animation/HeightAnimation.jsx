import React, { forwardRef, useImperativeHandle, useState } from "react";

const HeightAnimation = forwardRef(function HeightAnimation(props, ref) {
    const { children, duration = ".3s", timingFunction = "ease-out", fillMode = "both", height = "0px", maxHeight = "" } = props;

    const [show, setShow] = useState(null);

    const changeShow = () => setShow((prev) => !prev);

    useImperativeHandle(ref, () => ({
        changeHeight: changeShow,
    }));

    return (
        <>
            <style>{`
                @keyframes height-animation {
                    from { height: ${height}; }
                    to { height: ${maxHeight}; }
                }
                @keyframes height-animation-reverse {
                    from { height: ${maxHeight}; }
                    to { height: ${height}; }
                }
            `}</style>

            <div
                style={{
                    animationName: show != null ? (show ? "height-animation" : "height-animation-reverse") : "",
                    animationDuration: duration,
                    animationTimingFunction: timingFunction,
                    animationFillMode: fillMode,
                    overflow: "hidden",
                    height: height,
                }}
            >
                {children}
            </div>
        </>
    );
});

export default HeightAnimation;

// animation-duration: .3s;
//   animation-iteration-count: 1;
//   animation-timing-function: ease-out;
//   animation-fill-mode: both;
//   overflow: hidden;
//   height: 0px;
