"use client";

import {motion} from "framer-motion";

export default function About() {
    return (
        <>
        <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 0.5}}
        >
        <h1>Benim Hakkımda</h1>
        </motion.div>
        </>
    )
}