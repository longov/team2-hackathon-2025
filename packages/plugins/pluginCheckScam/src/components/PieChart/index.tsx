'use client';
import React from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  RadialBar,
  PolarRadiusAxis,
  X,
  RadialBarChart,
  LabelRecharts,
  PolarGrid,
} from '@repo/ui';

import { ChartContainer } from '@repo/ui';
import { InputData } from '../CheckScam/Security.component';
import { IScannerProject } from '../../apis/client';

import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  safari: {
    label: 'Score',
    color: 'hsl(var(--chart-4))',
  },
} as any;

interface Props extends InputData {
  data?: IScannerProject;
}

const PieChartComponent = ({ data }: Props) => {
  const score = _get(data, 'aiScore');

  if (!data || _isEmpty(data) || !score) return null;
  // return <div className="py-4 text-center">No Data!</div>;

  const chartData = [
    {
      browser: 'safari',
      visitors: data?.aiScore || 0,
      fill: 'var(--color-safari)',
    },
  ];

  return (
    <Card className="flex flex-col border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Safety Score</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <LabelRecharts
                content={({ viewBox }): any => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-foreground"
                        >
                          Percentage
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          <X className="h-4 w-4" color="red" />
          No information is available: liquidity is too low
        </div>
      </CardFooter>
    </Card>
  );
};

export default PieChartComponent;
