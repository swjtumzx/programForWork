
import React from 'react'
import styled from '@emotion/styled';
import { useKanbans } from 'utils/kanban';
import { useDocumentTitle } from '../../utils/index';
import { KanbanColumn } from './kanban-column';
import { useProjectInUrl, useTasksSearchParams, useKanbanSearchParams } from './util';
import { SearchPanel } from './search-panel';
import { ScreenContainer } from 'components/lib';
import { useTasks } from '../../utils/task';
import { Spin } from 'antd';
import { CreateKanban } from './create-kanban';
import { TaskModal } from './task-modal';

//每个Kanban-column都会请求一次task，如此会请求三次，但实际上只请求一次，是因为react-query缓存

export default function KanbanScreen() {
  useDocumentTitle('看板列表')

  const {data:kanbans,isLoading:kanbanIsLoading}=useKanbans(useKanbanSearchParams());
  const {isLoading:taskIsLoading}=useTasks(useTasksSearchParams());
  const {data:currentProject}=useProjectInUrl();
  const isLoading= taskIsLoading || kanbanIsLoading;
  


  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {
        isLoading? <Spin size={'large'}/>:<ColumnsContainer>
        {
          kanbans?.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}/>)
        }
          <CreateKanban />
        </ColumnsContainer>
      }
      <TaskModal/>
    </ScreenContainer>
  )
}

export const ColumnsContainer=styled.div`
  display: flex;
  overflow: auto;
  flex: 1;
  
`
