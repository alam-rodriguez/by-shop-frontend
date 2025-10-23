// React
import React from "react";

// Iconify
import { Icon } from "@iconify/react";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingMenuButtons({ show, buttons }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="flex flex-col gap-2 rounded-xl border shadow-lg absolute top-8 right-0 w-44 bg-white p-4"
                >
                    {buttons.map((button, index) => (
                        <React.Fragment key={index}>
                            <div key={index} className="flex gap-1 items-center" onClick={button.onClick}>
                                <Icon className="text-black text-sm w-1/5" icon={button.icon} />
                                <p className="text-xs w-4/5">{button.text}</p>
                            </div>
                            {index < buttons.length - 1 && <hr />}
                        </React.Fragment>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
