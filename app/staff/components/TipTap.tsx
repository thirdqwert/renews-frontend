"use client"

import { useEditor, EditorContent, Node, mergeAttributes } from '@tiptap/react'

import Highlight from '@tiptap/extension-highlight'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import Image from '@tiptap/extension-image'
import Audio from '@tiptap/extension-audio'
import MenuBar from './MenuBar'

interface IProps {
    setContent: (content: string) => void
}
export default function TipTap({ setContent }: IProps) {
    const AudioNode = Node.create({
        name: 'audio',

        group: 'block',

        atom: true,

        addOptions() {
            return {
                HTMLAttributes: {},
            }
        },

        addAttributes() {
            return {
                src: {
                    default: null,
                },
                heading: {
                    default: null,
                },
            }
        },

        parseHTML() {
            return [
                {
                    tag: 'div[data-type="custom-audio"]',
                    getAttrs: (el) => ({
                        src: (el as HTMLElement).getAttribute('data-src'),
                    }),
                },
            ]
        },

        renderHTML({ HTMLAttributes }) {
            const src = HTMLAttributes.src ?? ''
            const heading = HTMLAttributes.heading ?? ''
            return [
                'div',
                mergeAttributes(this.options.HTMLAttributes, {
                    'data-type': 'custom-audio',
                    'data-src': src,
                    class: 'custom-audio',
                }),
                [
                    'div',
                    { class: 'audio-header' },
                    heading,
                ],
                [
                    'div',
                    { class: 'audio-body' },
                    ['button', { class: 'play-btn' }, ''],
                    ['div', { class: 'wave' }],
                    ['div', { class: 'audio-time' }, '00:00'],
                ],
            ]
        },
        // @ts-expect-error не стал менять корневые типы библеотеки
        addCommands() {
            return {

                insertAudio:
                    (options: { src: string, heading: string }) =>
                        // @ts-expect-error не стал менять корневые типы библеотеки
                        ({ commands }) => {
                            return commands.insertContent({
                                type: this.name,
                                attrs: { src: options.src, heading: options.heading },
                            })
                        },
            }
        },
    })

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [AudioNode,
            StarterKit.configure({
                heading: {
                    levels: [2],
                    HTMLAttributes: {
                        class: "text-[13px] md:text-[22px] lg:text-[32px] text-[#212529] font-bold"
                    }
                },
                paragraph: {
                    HTMLAttributes: {
                        class: "text-[12px] md:text-[20px] lg:text-[25px] text-[#495057] font-medium"
                    }
                },
                link: {
                    openOnClick: false,
                    HTMLAttributes: {
                        class: "text-blue-500 italic"
                    }
                },
                blockquote: {
                    HTMLAttributes: {
                        class: "w-full rounded-[10px] py-[15px] bg-[rgba(41,84,128,0.2)] ",
                    },

                }
            }),
            Highlight.configure({
                HTMLAttributes: {
                    class: "bg-[#a8dee3] px-[5px] py-[1px] rounded-[3px]",
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: "w-full max-h-[600px] h-full rounded-[20px] object-cover"
                }
            }),
            Youtube.configure({
                HTMLAttributes: {
                    class: "w-full h-[218px] sm:h-[350px] lg:h-[500px] xl:h-[600px]"
                },
                inline: false,

            })
        ],

        editorProps: {
            attributes: {
                class: "min-h-[700px] border border-gray-400 p-[20px] tiptap max-w-none [&_ol]:list-decimal [&_ul]:list-disc"
            }
        }
    })

    const saveHtml = () => {
        if (!editor) return

        const html = editor.getHTML()
        setContent(html)
    }

    return (
        editor && (
            <div className="tiptap py-[20px]">
                <p className="pb-[10px]">Контент</p>
                <MenuBar editor={editor} />
                <EditorContent editor={editor} />
                <button type='button' onClick={saveHtml} className="p-[10px] border border-gray-400 my-[20px] cursor-pointer">Сохранить</button>
            </div>
        )
    )
}






