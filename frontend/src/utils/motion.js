// Core Motion Rules for "Responsive Precision"

// 1. Physics: Instant acceleration, sharp stop (The "Snap")
export const PRECISION_TRANSITION = {
    type: "tween",
    ease: [0.25, 1, 0.5, 1],
    duration: 0.6
};

// 2. Variants: Respond to System State (Mount) or User Intent (Hover)

// "Reveal" - Used for initial load of content (System State)
export const reveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: PRECISION_TRANSITION
    }
};

// "Stagger" - Used for lists/grids strings
export const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

// "Active" - Used for hover states (User Intent)
// Minimal scale, sharp color change. No wobbles.
export const active = {
    rest: { scale: 1, color: "currentColor" },
    hover: {
        scale: 1.02,
        color: "#00f0ff", // neon-blue
        transition: { duration: 0.2, ease: "circOut" }
    }
};
