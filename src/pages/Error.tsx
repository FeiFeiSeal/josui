/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-28 12:00:25
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-27 11:35:50
 * @Description:
 */
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import WavyCanvas from '@/components/Wava-canvas'

export default function ErrorPage() {
  return (
    <div className="px-2 lg:w-3/5 sm:mx-auto border-x border-foreground/15 border-dashed pb-8 leading-7">
        <div className="relative pt-28 sm:pt-20 h-screen flex flex-col items-center justify-center">
          <h2 className="text-5xl">404</h2>
          <p>Oops! You've entered uncharted territory.</p>
          <p>Don't worry, let's head back to the homepage together!</p>
          <Button className="my-8">
            <Link to="/">{'BACK HOME'}</Link>
          </Button>
        </div>
        <WavyCanvas />
    </div>
  )
}