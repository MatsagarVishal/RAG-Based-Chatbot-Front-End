import { useEffect, useState } from "react";

export default function TypingText({ text }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i === text.length) clearInterval(interval);
        }, 15);

        return () => clearInterval(interval);
    }, [text]);

    return <span>{displayed}</span>;
}
