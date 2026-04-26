import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskList from '@/components/TaskList'
import TaskListPagination from '@/components/TaskListPagination'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import api from '@/lib/axios'
import { visibleTaskLimit } from '@/lib/data'

function HomePage() {
  const [taskBuffer, setTaskBuffer] = useState([])
  const [activeTaskCount, setActiveTaskCount] = useState(0)
  const [completeTaskCount, setCompleteTaskCount] = useState(0)
  const [filter, setFilter] = useState('all')
  const [dateQuery, setDateQuery] = useState('month')

  const [page, setPage] = useState(1)

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`)
      // console.log("res: ", res)
      setTaskBuffer(res.data.tasks)
      setActiveTaskCount(res.data.activeCount)
      setCompleteTaskCount(res.data.completeCount)
    } catch (error) {
      console.error("Lỗi khi truy xuất tasks", error)
      toast.error("Lỗi khi truy xuất tasks") 
    }
  }

  const filteredTasks = taskBuffer.filter((task) => {
    switch(filter) {
      case 'active':
        return task.status === "active"
      case 'completed': 
        return task.status === 'completed'
      default:
        return true
    }
  })

  const handleTaskChanged = () => {
    fetchTasks()
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks()
  }, [dateQuery])

  const visibleTasks = filteredTasks.slice(
  (page - 1) * visibleTaskLimit,
  page * visibleTaskLimit
  )

  const totalPage = Math.ceil(filteredTasks.length / visibleTaskLimit)

  const handleNext = () => {
    if (page < totalPage) {
    setPage((prev) => prev +1)
    }
  }
  

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1  )
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className="min-h-screen w-full bg-white relative">
  {/* Dual Gradient Overlay Swapped Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
      `,
      backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
    }}
  />
     {/* Your Content/Components */}
     <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl p-6 mx-auto space-y-6'>
          {/* Đầu trang */}
          <Header/>

          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged}/>

          {/* Thống kê và bộ lọc */}
          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTaskCount={activeTaskCount}
            completedTaskCount={completeTaskCount}
          />

          {/* Danh sách nhiệm vụ */}
          <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged}/>

          {/* Phân trang và lọc theo ngày */}
          <div className='flex flex-col justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPage={totalPage}
            />
            <DateTimeFilter setDateQuery={setDateQuery}/>
          </div>

          {/* Chân trang */}
          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completeTaskCount}
          />
        </div>
    </div>
</div>
  )
}

export default HomePage