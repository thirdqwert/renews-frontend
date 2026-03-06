"use client";

interface IProps {
    content: string;
}

export default function DetailContent({ content }: IProps) {
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} className="tiptap" />
    );
}
