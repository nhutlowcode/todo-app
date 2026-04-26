import api from '@/lib/axios'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Input } from './ui/input'

function AddTask({ handleNewTaskAdded }) {
  const [newTaskTitle, setNewTasktitle] = useState('')

  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post('/tasks', { title: newTaskTitle})
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm thành công!`)
        handleNewTaskAdded()
      } catch (error) {
        console.error('Lỗi xảy ra khi thêm task', error)
        toast.error('Lỗi xảy ra khi thêm task mới!')
      }
      finally {
        setNewTasktitle('')
      }
    } else {
      toast.error('Bạn cần nhập tiêu đề của nhiệm vụ!')
    }
  }

  const hanleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
          type="text"
          placeholder="Cần phải làm gì?"
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e)=> setNewTasktitle(e.target.value)}
          onKeyPress={hanleKeyPress}
        />

        <Button
          variant='gradient'
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus/>
          Thêm
        </Button>
      </div>
    </Card>
  )
}

export default AddTask