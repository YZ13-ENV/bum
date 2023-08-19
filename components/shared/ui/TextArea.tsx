import React, { ElementRef, useLayoutEffect, useRef } from 'react'

const defaultStyle: React.CSSProperties = {
    display: "block",
    overflow: "hidden",
    resize: "none",
    width: "100%",
    backgroundColor: 'transparent',
    outline: 'none'
};

type Props = {
    className?: string
    setText: (text: string) => void
    text: string
    placeholder?: string
}
const TextArea = ({ setText, text, className, placeholder }: Props) => {
    const ref = useRef<ElementRef<'textarea'>>(null);

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.style.height = "0px";
            const scrollHeight = ref.current.scrollHeight;
            ref.current.style.height = scrollHeight + "px";
        }
    }, [text, ref]);
    return (
        <textarea
            placeholder={placeholder}
            className={className}
            ref={ref}
            style={{...defaultStyle}}
            value={text}
            onChange={e => setText(e.target.value)}
        />
    )
}

export default TextArea