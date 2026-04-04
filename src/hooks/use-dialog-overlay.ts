"use client";

import { useEffect, useState } from "react";

type UseDialogOverlayOptions<TContext> = {
    onOpen?: () => void;
    onClose?: () => void;
    onOpenWithContext?: (context: TContext) => void;
};

export const useDialogOverlay = <TContext = void>(options: UseDialogOverlayOptions<TContext> = {}) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        options.onOpen?.();
        setIsOpen(true);
    };

    const openWithContext = (context: TContext) => {
        options.onOpenWithContext?.(context);
        setIsOpen(true);
    };

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

    return { isOpen, open, openWithContext, close, setIsOpen };
};
