import type { Metadata } from "next";
import "./main.css";
import Script from "next/script";

export const metadata: Metadata = {
    metadataBase: new URL("https://renews.uz"),
    title: {
        template: "%s | Renews",
        default: "Renews — Новости Узбекистана и мира",
    },
    description:
        "Renews — актуальные новости Узбекистана: политика, спорт, экономика, технологии и культура.",

    alternates: {
        canonical: "https://renews.uz",
    },

    verification: {
        google: "ВАШ_КОД_ОТ_GOOGLE_SEARCH_CONSOLE",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body className="leading-tight">
                {children}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            name: "Renews",
                            url: "https://renews.uz",
                            inLanguage: "ru",
                        }),
                    }}
                />
                <Script id="audio-player" strategy="afterInteractive">
                    {`
    const PLAY_SVG = \`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="4,2 18,10 4,18" fill="#1e293b"/>
    </svg>\`;

    const PAUSE_SVG = \`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="2" width="5" height="16" rx="1.5" fill="#1e293b"/>
        <rect x="12" y="2" width="5" height="16" rx="1.5" fill="#1e293b"/>
    </svg>\`;

    function initButtons() {
        document.querySelectorAll(".play-btn").forEach(btn => {
            if (!btn.innerHTML.trim()) {
                btn.innerHTML = PLAY_SVG;
            }
        });

        document.querySelectorAll(".wave").forEach(wave => {
            if (wave.innerHTML.trim()) return;

            let bars = "";
            for (let i = 0; i < 140; i++) {
                const height = Math.floor(Math.random() * 28) + 4;
                bars += \`<span style="display:inline-block;width:2px;min-width:2px;height:\${height}px;background:#1e293b;border-radius:2px;opacity:0.4;flex-shrink:0;"></span>\`;
            }
            wave.innerHTML = bars;
        });
    }

    initButtons();

    const observer = new MutationObserver(initButtons);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".play-btn");
        if (!btn) return;

        const wrapper = btn.closest(".custom-audio");
        const src = wrapper.getAttribute("data-src");

        let audio = wrapper._audio;

        if (!audio) {
            audio = new Audio(src);
            wrapper._audio = audio;

            audio.addEventListener("ended", function () {
                btn.innerHTML = PLAY_SVG;
            });
        }

        const timeBox = wrapper.querySelector(".audio-time");

        audio.ontimeupdate = function () {
            const minutes = Math.floor(audio.currentTime / 60).toString().padStart(2, "0");
            const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0");
            timeBox.textContent = minutes + ":" + seconds;
        };

        if (audio.paused) {
            audio.play();
            btn.innerHTML = PAUSE_SVG;
        } else {
            audio.pause();
            btn.innerHTML = PLAY_SVG;
        }
    });
`}
                </Script>
            </body>
        </html>
    );
}
