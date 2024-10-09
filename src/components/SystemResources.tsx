import { useQuery } from '@tanstack/react-query'
import { obs } from '~/services/obs'
import { useConnectionStore } from '~/store/connectionStore'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'

const SystemResources = () => {
  const isConnected = useConnectionStore((state) => state.isConnected)

  const { data: stats } = useQuery({
    queryKey: ['obs', 'stats'],
    queryFn: async () => {
      return await obs.call('GetStats')
    },
    refetchInterval: 1000,
    enabled: isConnected,
  })

  if (!isConnected) return null

  let cpuUsage = stats?.cpuUsage
  if (cpuUsage) cpuUsage = parseFloat(cpuUsage.toFixed(2))

  let memoryUsage = stats?.memoryUsage
  if (memoryUsage) memoryUsage = parseFloat(memoryUsage.toFixed(2))

  let availableDiskSpace = stats?.availableDiskSpace
  if (availableDiskSpace)
    availableDiskSpace = parseFloat(availableDiskSpace.toFixed(2))

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Resources</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <div className='mb-1 flex justify-between'>
            <div>CPU Usage</div>
            <div>{cpuUsage}%</div>
          </div>
          {/* <Progress value={stats?.cpuUsage} /> */}
        </div>
        <div>
          <div className='mb-1 flex justify-between'>
            <div>Memory Usage</div>
            <div>{memoryUsage} MB</div>
          </div>
          {/* <Progress value={stats?.memoryUsage}  /> */}
        </div>
        <div>
          <div className='mb-1 flex justify-between'>
            <div>Free Disk Space</div>
            <div>{availableDiskSpace} MB</div>
          </div>
          {/* <Progress value={50} max={100} /> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default SystemResources
