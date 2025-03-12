"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Chart, ChartLegend, ChartLegendItem, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface SpendingDataItem {
  name: string
  value: number
  color: string
}

interface SpendingChartProps {
  data: SpendingDataItem[]
}

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <div className="h-80 w-full">
      <Chart>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent
                        content={
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold">{data.name}</span>
                            <span className="text-xs">{data.value}% of spending</span>
                          </div>
                        }
                      />
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Chart>
      <ChartLegend className="mt-4 justify-center gap-6">
        {data.map((item, index) => (
          <ChartLegendItem key={index} name={item.name} color={item.color} className="text-xs" />
        ))}
      </ChartLegend>
    </div>
  )
}

