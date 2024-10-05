'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Card, CardContent } from '~/components/ui/card'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Edit2, Check, X } from 'lucide-react'

// Simulated OBS scene data
const initialScenes = [
  {
    id: '1',
    name: 'Main Camera',
    thumbnail: '/placeholder.svg?height=100&width=150',
    isActive: true,
  },
  {
    id: '2',
    name: 'Game Capture',
    thumbnail: '/placeholder.svg?height=100&width=150',
    isActive: false,
  }
]




export function ObsScenesDashboard() {
  const [scenes, setScenes] = useState(initialScenes)
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')

  const handleSceneActivation = (id) => {
    setScenes(
      scenes.map((scene) => ({
        ...scene,
        isActive: scene.id === id,
      })),
    )
  }

  const handleEditStart = (id, name) => {
    setEditingId(id)
    setEditingName(name)
  }

  const handleEditSave = () => {
    setScenes(
      scenes.map((scene) =>
        scene.id === editingId ? { ...scene, name: editingName } : scene,
      ),
    )
    setEditingId(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
    setEditingName('')
  }

  const onDragEnd = (result) => {
    if (!result.destination) return

    const newScenes = Array.from(scenes)
    const [reorderedItem] = newScenes.splice(result.source.index, 1)
    newScenes.splice(result.destination.index, 0, reorderedItem)

    setScenes(newScenes)
  }

  return (
    <div className='space-y-4 p-4'>
      <h1 className='text-2xl font-bold text-white'>OBS Scenes Dashboard</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='scenes'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='space-y-4'
            >
              {scenes.map((scene, index) => (
                <Draggable key={scene.id} draggableId={scene.id} index={index}>
                  {(provided) => (
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${scene.isActive ? "'border-primary'" : "''"}`}
                    >
                      <CardContent className='flex items-center space-x-4 p-4'>
                        <div className='flex-grow'>
                          {editingId === scene.id ? (
                            <div className='flex items-center space-x-2'>
                              <Input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                className='flex-grow'
                              />
                              <Button
                                intent='dark'
                                size='icon'
                                onClick={handleEditSave}
                              >
                                <Check className='h-4 w-4' />
                              </Button>
                              <Button
                                size='icon'
                                intent='outline'
                                onClick={handleEditCancel}
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            </div>
                          ) : (
                            <div className='flex items-center justify-between'>
                              <span className='font-medium'>{scene.name}</span>
                              <Button
                                size='icon'
                                intent='ghost'
                                onClick={() =>
                                  handleEditStart(scene.id, scene.name)
                                }
                              >
                                <Edit2 className='h-4 w-4' />
                              </Button>
                            </div>
                          )}
                        </div>
                        <Button
                          intent={scene.isActive ? 'dark' : 'outline'}
                          onClick={() => handleSceneActivation(scene.id)}
                        >
                          {scene.isActive ? 'Active' : 'Activate'}
                        </Button>
                      </CardContent>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
