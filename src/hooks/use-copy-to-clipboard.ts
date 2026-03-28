import { copyTextToClipboard } from "@/lib/general-utils";
import { useEffect, useState } from "react";

type UseCopyToClipboardOptions = {
    resetKey?: string | number | null;
    timeoutMs?: number;
};

export function useCopyToClipboard({ resetKey, timeoutMs = 1800 }: UseCopyToClipboardOptions = {}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timeout = window.setTimeout(() => setCopied(false), timeoutMs);
        return () => window.clearTimeout(timeout);
    }, [copied, timeoutMs]);

    useEffect(() => {
        setCopied(false);
    }, [resetKey]);

    const copy = async (text: string) => {
        const didCopy = await copyTextToClipboard(text);
        setCopied(didCopy);
        return didCopy;
    };

    return { copied, copy };
}
