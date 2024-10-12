"'use client'"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import CameraOff from '~/resources/camera-off.png'
import NextImage from 'next/image';
import { CardDescription } from "./Card";

import Image1 from '~/resources/image.png'
import Image2 from '~/resources/Image2.jpg'
import { Button } from "./ui/button";
import { Edit2Icon, InfoIcon, RefreshCwIcon } from "lucide-react";

const Scene = () => {
  return (
    <div className='flex flex-wrap gap-4 p-4'>
      <Card>
        <CardHeader>
          <NextImage
            src={Image2}
            alt='Image'
            className='h-full w-full rounded-xl object-cover'
          />
        </CardHeader>
        <div className='flex flex-1 flex-col p-5'>
          <div className='mb-5 border-b border-gray-200 pb-5'>
            <CardTitle>Scene 1</CardTitle>
            <CardDescription>Description</CardDescription>
          </div>
        </div>
        <div className='ml-auto flex w-full items-center justify-between'>
          <div>
            <Button variant='ghost' size='icon'>
              <InfoIcon />
            </Button>
            <Button variant='ghost' size='icon'>
              <RefreshCwIcon />
            </Button>
          </div>

          <div className='flex items-center gap-x-1'>
            <Button variant='ghost' size='icon'>
              <Edit2Icon />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

const scenes = [
  { id: 1, title: "Scene 1", image: CameraOff },
  { id: 2, title: "Scene 2", image: CameraOff },
  { id: 3, title: "Scene 3", image: CameraOff },
  { id: 4, title: "Scene 4", image: CameraOff },
  { id: 5, title: "Scene 5", image: CameraOff },
  { id: 6, title: "Scene 6", image: CameraOff },
]

export function ScenePreview() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4">
        {scenes.map((scene) => (
          <Card key={scene.id} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] xl:w-[calc(25%-0.75rem)]">
            <CardHeader className="p-0">
              <NextImage
                src={scene.image}
                alt={'image'}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle>{scene.title}</CardTitle>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}