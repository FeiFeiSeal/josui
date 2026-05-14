/*
 * @Author:FeiFeiSeal
 * @Date:2025-04-15 09:39:57
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-27 17:47:45
 * @Description:
 */

import { cn } from '@/lib/utils'

import { ReactNode } from 'react';

import { Button } from '@/components/ui/button'
import starts from '@/assets/stars.svg'
interface AdBlockProps {
  className?: string;
  children?: ReactNode;
}

export const AdBlock = ({ className, children }: AdBlockProps) => {
  // const randomImageUrl = `https://picsum.photos/400?random=${Math.floor(Math.random() * 1000)}`;

  return (
    <div 
      className={
        cn('overflow-hidden p-4 gap-4 bg-primary sui-shadow flex flex-col justify-start items-start rounded-md',
        className)
      }
    >
      <div className="flex flex-col justify-start items-start gap-4">
        { children ||
          <>
            <div className="px-4 py-1 bg-secondary rounded-sm text-xs text-secondary-foreground">AD</div>
            <p className='text-lg text-primary-foreground font-semibold'>Use JOSUI magic to conjure up beautiful UI interfaces!</p>
            <Button variant="secondary" aria-label="try josui">Check it now</Button>
          </>
        }
      </div>
      <div className="grow relative w-full min-h-20">
        <div className="absolute -right-4 -top-4 -bottom-4">
          <img src={starts} alt="josui-logo-stars" className='min-h-40 min-w-40 size-full object-contain'/>
        </div>
      </div>
      {/* { children || <img src={randomImageUrl} alt="Ad-block" className='size-full relative z-10'/>} */}
    </div>
  )
} 