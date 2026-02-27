import { Suspense } from "react";
import ReelsClient from "./components/ReelsClient";



export default async function Reels() {

    return <Suspense>
        <ReelsClient />
    </Suspense>
}
