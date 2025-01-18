import React from 'react';
import { InputData } from './Security.component';
import _get from 'lodash/get';
import { Card, CardContent, CardHeader } from '@repo/ui';

interface Props {
  data?: InputData;
}
type Issuse = {
  confidence: string;
  description: string;
  data: string;
  impact: string;
  id: string;
};

type IssuesData = {
  scwId: string;
  scwTitle: string;
  scwDescription: string;
  issues: Issuse[];
};

const DataInfo = ({ data }: Props) => {
  if (!data) return <></>;

  const coreIssues: IssuesData[] = _get(data, 'coreIssues', [])?.filter(
    (issue: any) => issue.issues.length > 0
  );

  if (!coreIssues || coreIssues.length === 0) return null;

  return (
    <div className="space-y-4">
      {coreIssues.map((issue: IssuesData) => (
        <Card key={issue.scwId} className="">
          <CardHeader>
            <p className="p-2 border bg-red-500/50 rounded-lg uppercase font-bold">
              {issue.scwTitle}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {issue.issues.map((issue: Issuse) => (
                <Card key={issue.id} className="">
                  <CardContent className=" space-y-1">
                    <p className="p-1 uppercase font-semibold border-b">
                      {issue.confidence}
                    </p>
                    <div className="text-sm">
                      Description:
                      <p className="text-red-500 text-xs">{`${issue.description}`}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DataInfo;
