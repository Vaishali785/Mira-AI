"use client";

import { useEffect, useState } from "react";

type UseDialogOverlayOptions = {
    onClose?: () => void;
};

export const useDialogOverlay = (options: UseDialogOverlayOptions = {}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => {
        setIsOpen(false);
        options.onClose?.();
    };

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                close();
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    return { isOpen, open, close, setIsOpen };
};
