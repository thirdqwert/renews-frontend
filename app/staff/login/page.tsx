"use client"

import { IToken } from "@/app/utils/types"
import { setCookie } from "cookies-next"
import { useRouter } from "next/navigation"
import { SubmitEvent, useState } from "react"

export default function Login() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/login/`,
                {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: login, password: password })
                }
            )
            const data: IToken = await res.json()
            if (!data.access) return
            setCookie("access_token", data.access)
            router.push("/staff/main/")
        } catch (error) {
            throw error
        }
    }

    return (
        <div className="w-full h-screen flex flex-row items-center justify-center">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-[20px] max-w-[500px] w-full border border-gray-400 py-[50px] px-[10px] rounded-[10px]">
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Login"
                    className="px-[20px] py-[5px] border border-gray-400 outline-none rounded-[2px]"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="px-[20px] py-[5px] border border-gray-400 outline-none rounded-[2px]"
                />
                <button type="submit" className="w-max mx-auto px-[20px] py-[5px] border border-gray-400">Sign in</button>
            </form>
        </div>
    )
}