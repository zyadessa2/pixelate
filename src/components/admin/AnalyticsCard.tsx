interface AnalyticsCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

const AnalyticsCard = ({ title, value, icon, trend }: AnalyticsCardProps) => {
  return (
    <div className="rounded-xl bg-[#1a1f25] border border-[#2B353C] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p
              className={`mt-2 text-sm ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {trend.isPositive ? '+' : '-'}{trend.value}% from last period
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-[#2B353C] p-3 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

export default AnalyticsCard
