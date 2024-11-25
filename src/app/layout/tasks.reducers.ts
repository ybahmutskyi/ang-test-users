import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { TasksActions } from '../actions';
import { CommentModel } from '@shared/components/comment/comment.model';
import { AvailableProjectModel, CompanyWithTasksModel, TaskModel } from 'src/app/jobs/task/shared/task.model';
import { TaskRequestPreviewModel, TaskRequestModel } from '@jobs/task/shared/task-request.model';

/* eslint-disable */

export interface State {
  loaded: boolean;
  loading: boolean;
  comments: TaskCommentsState;
  selectedComment: CommentModel;
  availableProjectsLoading: boolean;
  availableProjectsLoaded: boolean;
  // selectedTask: TaskModel;
  companiesWithTasks: CompaniesWithTasksState;
  task: TaskModel;
  tasksForCompany: TasksForCompanyState;
  availableProjects: AvailableProjectsState;
  taskRequests: TasksRequestsState;
  nextPageUrl: string;
  groupedTasksFilter: string;
  tasksFilter: string;
  selectedTaskRequest: TaskRequestModel;
  taskRequestComments: TaskCommentsState;
  selectedTaskRequestComment: CommentModel;
  hasMandatoryTemplates: boolean;
}

export interface CompaniesWithTasksState extends EntityState<CompanyWithTasksModel> {}
export const adapterCompaniesWithTasks: EntityAdapter<CompanyWithTasksModel> = createEntityAdapter<CompanyWithTasksModel>({
  selectId: (companyWithTasks: CompanyWithTasksModel) => companyWithTasks.id,
  sortComparer: false,
});

export interface TasksForCompanyState extends EntityState<TaskModel> {}  
export const adapterTasksForCompany: EntityAdapter<TaskModel> = createEntityAdapter<TaskModel>({
  selectId: (task: TaskModel) => task.id,
  sortComparer: false,
});

export interface AvailableProjectsState extends EntityState<AvailableProjectModel> {}  
export const adapterAvailableProjects: EntityAdapter<AvailableProjectModel> = createEntityAdapter<AvailableProjectModel>({
  selectId: (project: AvailableProjectModel) => project.id,
  sortComparer: false,
});

export interface TasksRequestsState extends EntityState<TaskRequestPreviewModel> {}  
export const adapterTasksRequests: EntityAdapter<TaskRequestPreviewModel> = createEntityAdapter<TaskRequestPreviewModel>({
  selectId: (taskRequest: TaskRequestPreviewModel) => taskRequest.id,
  sortComparer: false,
});

export interface TaskCommentsState extends EntityState<CommentModel> {}
export const adapterTaskComments =  createEntityAdapter<CommentModel>({
  selectId: (comment: CommentModel) => comment.id,
  sortComparer: false,
});

export interface TaskRequestCommentsState extends EntityState<CommentModel> {}
export const adapterTaskRequestComments =  createEntityAdapter<CommentModel>({
  selectId: (comment: CommentModel) => comment.id,
  sortComparer: false,
});

export const initialState: State = {
  loaded: false,
  loading: false,
  comments: adapterTaskComments.getInitialState({}),
  selectedComment: null,
  availableProjectsLoading: false,
  availableProjectsLoaded: false,
  // selectedTask: null,
  companiesWithTasks: adapterCompaniesWithTasks.getInitialState({}),
  task: null,
  tasksForCompany: adapterTasksForCompany.getInitialState({}),
  availableProjects: adapterAvailableProjects.getInitialState({}),
  taskRequests: adapterTasksRequests.getInitialState({}),
  nextPageUrl: null,
  tasksFilter: null,
  groupedTasksFilter: null,
  selectedTaskRequest: null,
  taskRequestComments: adapterTaskRequestComments.getInitialState({}),
  selectedTaskRequestComment: null,
  hasMandatoryTemplates: null,
};

/* eslint-disable */
const tasksReducer = createReducer(
  initialState,
  // on(TasksActions.editTask, (state) => ({
  //   ...state,
  //   loaded: false,
  //   loading: true,
  // })),
  // on(TasksActions.editTaskSuccess, (state) => ({
  //   ...state,
  //   loaded: true,
  //   loading: false,
  // })),
  // on(TasksActions.editTaskFailure, (state) => ({
  //   ...state,
  //   loaded: false,
  //   loading: true,
  // })),
  
  // load tasks grouped by company
  on(TasksActions.loadTasksGroupedByCompany, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadTasksGroupedByCompanyFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(TasksActions.loadTasksGroupedByCompanySuccess, (state, { companiesWithTasks }) =>
    ({
      ...state,
      loaded: true,
      loading: false,
      companiesWithTasks: adapterCompaniesWithTasks.setAll(companiesWithTasks, state.companiesWithTasks),
    })
  ),

  // load tasks by company id
  on(TasksActions.loadTasksByCompanyId, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadTasksByCompanyIdSuccess, (state,  { tasks, nextPageUrl }) => ({
    ...state,
    loaded: true,
    loading: false,
    tasksForCompany: adapterTasksForCompany.setAll(tasks, state.tasksForCompany),
    nextPageUrl,
  })),
  on(TasksActions.loadTasksByCompanyIdFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  //load more tasks
  on(TasksActions.loadMoreTasks, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadMoreTasksSuccess, (state, { tasks, nextPageUrl }) =>
    ({
      ...state,
      loaded: true,
      loading: false,
      tasksForCompany: adapterTasksForCompany.addMany(tasks, state.tasksForCompany),
      nextPageUrl,
    })
  ),
  on(TasksActions.loadMoreTasksFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // load task
  on(TasksActions.loadTask, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadTaskSuccess, (state,  { task }) => ({
    ...state,
    loaded: true,
    loading: false,
    task
  })),
  on(TasksActions.loadTaskFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // load available projects
  on(TasksActions.loadAvailableProjects, (state) => ({
    ...state,
    availableProjectsLoaded: false,
    availableProjectsLoading: true,
  })),
  on(TasksActions.loadAvailableProjectsSuccess, (state,  { projects }) => ({
    ...state,
    availableProjectsLoaded: true,
    availableProjectsLoading: false,
    availableProjects: adapterAvailableProjects.setAll(projects, state.availableProjects)
  })),
  on(TasksActions.loadAvailableProjectsFailure, (state) => ({
    ...state,
    availableProjectsLoaded: false,
    availableProjectsLoading: false,
  })),

  // task create
  on(TasksActions.createTask, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.createTaskSuccess, (state, { createdTask }) => ({
    ...state,
    loaded: true,
    loading: false,
    tasksForCompany: adapterTasksForCompany.addOne(createdTask, state.tasksForCompany)
  })),
  on(TasksActions.createTaskFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // update task
  on(TasksActions.updateTask, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.updateTaskSuccess, (state, { updatedTask }) => ({
      ...state,
      loaded: true,
      loading: false,
      task: updatedTask
  })),
  on(TasksActions.updateTaskFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // update task state
  on(TasksActions.updateTaskState, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.updateTaskStateSuccess, (state, { updatedTask }) => ({
      ...state,
      loaded: true,
      loading: false,
      task: updatedTask
  })),
  on(TasksActions.updateTaskStateFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // load comments
  on(TasksActions.loadComments, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadCommentsFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(TasksActions.loadCommentsSuccess, (state, { comments }) =>
    ({
      ...state,
      loaded: true,
      loading: false,
      comments: adapterTaskComments.setAll(comments, state.comments)
    })
  ),

  // create comment
  on(TasksActions.createComment, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.createCommentSuccess, (state, { createdComment }) => ({
      ...state,
      loaded: true,
      loading: false,
      comments: adapterTaskComments.addOne(createdComment, state.comments),
      task: { ...state.task, commentsCount: (state.task.commentsCount + 1) },
  })),
  on(TasksActions.createCommentFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // update comment
  on(TasksActions.updateComment, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.updateCommentSuccess, (state, { updatedComment }) => ({
      ...state,
      loaded: true,
      loading: false,
      comments: adapterTaskComments.updateOne({id: updatedComment.id, changes: updatedComment}, state.comments)
  })),
  on(TasksActions.updateCommentFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // delete comment
  on(TasksActions.deleteComment, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.deleteCommentSuccess, (state, { commentId }) => ({
      ...state,
      loaded: true,
      loading: false,
      comments: adapterTaskComments.removeOne(commentId, state.comments),
      task: { ...state.task, commentsCount: (state.task.commentsCount - 1) }
  })),
  on(TasksActions.deleteCommentFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  
  on(TasksActions.setSelectedComment, (state, { comment }) => ({
    ...state,
    selectedComment: comment,
  })),
  
  on(TasksActions.loadTaskRequests, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadTaskRequestsSuccess, (state, { taskRequests }) => ({
    ...state,
    loaded: true,
    loading: false,
    taskRequests: adapterTasksRequests.setAll(taskRequests, state.taskRequests)
  })),
  on(TasksActions.loadTaskRequestsFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  on(TasksActions.loadTaskRequest, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadTaskRequestSuccess, (state, { taskRequest }) => ({
    ...state,
    loaded: true,
    loading: false,
    selectedTaskRequest: taskRequest,
  })),
  on(TasksActions.loadTaskRequestFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  on(TasksActions.clearSelectedTaskRequest, (state) => ({
    ...state,
    selectedTaskRequest: null,
  })),

  on(TasksActions.updateTaskRequest, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.updateTaskRequestSuccess, (state) => ({
    ...state,
    loaded: true,
    loading: false,
    selectedTaskRequest: null,
  })),
  on(TasksActions.updateTaskRequestFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // load comments
  on(TasksActions.loadTaskRequestComments, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadTaskRequestCommentsFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(TasksActions.loadTaskRequestCommentsSuccess, (state, { comments }) =>
    ({
      ...state,
      loaded: true,
      loading: false,
      taskRequestComments: adapterTaskRequestComments.setAll(comments, state.taskRequestComments)
    })
  ),

  // create comment
  on(TasksActions.createTaskRequestComment, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.createTaskRequestCommentSuccess, (state, { createdComment }) => ({
      ...state,
      loaded: true,
      loading: false,
      taskRequestComments: adapterTaskRequestComments.addOne(createdComment, state.taskRequestComments)
  })),
  on(TasksActions.createTaskRequestCommentFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // update comment
  on(TasksActions.updateTaskRequestComment, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.updateTaskRequestCommentSuccess, (state, { updatedComment }) => ({
      ...state,
      loaded: true,
      loading: false,
      taskRequestComments: adapterTaskRequestComments.updateOne({id: updatedComment.id, changes: updatedComment}, state.taskRequestComments)
  })),
  on(TasksActions.updateTaskRequestCommentFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // delete comment
  on(TasksActions.deleteTaskRequestComment, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.deleteTaskRequestCommentSuccess, (state, { commentId }) => ({
      ...state,
      loaded: true,
      loading: false,
      taskRequestComments: adapterTaskRequestComments.removeOne(commentId, state.taskRequestComments)
  })),
  on(TasksActions.deleteTaskRequestCommentFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  
  on(TasksActions.setTaskRequestSelectedComment, (state, { comment }) => ({
    ...state,
    selectedTaskRequestComment: comment,
  })),

  // on(TasksActions.setSelectedTask, (state, { task }) => {
  //   return {
  //     ...state,
  //     selectedTask: task,
  //   };
  // })

  // change tasks filter
  on(TasksActions.changeTasksFilter, (state, { filter }) => ({
    ...state,
    tasksFilter: filter,
  })),

  // change grouped tasks filter
  on(TasksActions.changeGroupedTasksFilter, (state, { filter }) => ({
    ...state,
    groupedTasksFilter: filter,
  })),

  // load tasks by company id
  on(TasksActions.loadHasMandatoryTemplates, (state) => ({
    ...state,
    loaded: false,
    loading: true,
  })),
  on(TasksActions.loadHasMandatoryTemplatesSuccess, (state,  { hasMandatoryTemplates }) => ({
    ...state,
    loaded: true,
    loading: false,
    hasMandatoryTemplates
  })),
  on(TasksActions.loadHasMandatoryTemplatesFailure, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),

  // reset mandatory templates
  on(TasksActions.resetHasMandatoryTemplates, (state) => ({
    ...state,
    hasMandatoryTemplates: null,
  })),

);

export function reducer(state: State | undefined, action: Action) {
  return tasksReducer(state, action);
}

export const selectAllCompaniesWithTasks = adapterCompaniesWithTasks.getSelectors().selectAll;

export const selectAllTasksForCompany = adapterTasksForCompany.getSelectors().selectAll;

export const selectAllAvailableProjects = adapterAvailableProjects.getSelectors().selectAll;

export const selectAllTasksRequests = adapterTasksRequests.getSelectors().selectAll;