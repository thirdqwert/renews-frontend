import { Editor } from "@tiptap/react"

export default function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) {
        return null
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()

    }

    return (
        <div className="pb-[20px]">
            <div className="flex flex-row flex-wrap gap-[10px] border-gray-400">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`tiptap_button`}
                >
                    H2
                </button>

                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`tiptap_button`}
                >
                    Paragraph
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`tiptap_button`}
                >
                    Bold
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`tiptap_button`}
                >
                    Italic
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={`tiptap_button`}
                >
                    Strike
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    className={`tiptap_button`}
                >
                    Highlight
                </button>

                <button onClick={setLink} className="tiptap_button">
                    Set link
                </button>
                <button onClick={() => editor.chain().focus().unsetLink().run()} className="tiptap_button">
                    Unset link
                </button>
                <button
                    className="tiptap_button"
                    onClick={() => {
                        const url = prompt('Вставьте URL картинки:')
                        if (url) {
                            editor.chain().focus().setImage({ src: url }).run()
                        }
                    }}
                >
                    Вставить картинку
                </button>
                <button id="add"
                    onClick={() => {
                        const url = prompt('Вставить YouTube URL')
                        if (url) {
                            editor.commands.setYoutubeVideo({
                                src: url,
                            })
                        }
                    }}
                    className="tiptap_button"
                >
                    Вставить YouTube video
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()} className="tiptap_button">
                    Toggle blockquote
                </button>
                <button onClick={() => editor.chain().focus().setBlockquote().run()} className="tiptap_button">
                    Set blockquote
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetBlockquote().run()} className="tiptap_button">
                    Unset blockquote
                </button>
                <button
                    onClick={() => {
                        const url = prompt('Введите ссылку на аудио')
                        const heading = prompt('Введите загаловок ждя аудио')
                        if (!url && !heading) return
                        // @ts-expect-error не стал менять корневые типы библеотеки
                        editor.chain().focus().insertAudio({ src: url, heading: heading }).run()
                    }}
                >
                    Вставить Audio
                </button>
            </div>
        </div>
    )
}