import { DragEvent } from "react";
import { Container, Head, FlexFormat, Task, TaskContainer, Wrapper } from "./styles";
import { observer } from "mobx-react-lite";
import { createData } from "./dataStates";
import TaskCard from "./TaskCard/TaskCard";
import { CalendarClock, NotepadText, Plus, Zap } from "lucide-react";
import { Button, Typography } from "@mui/joy";
import BottomProgressBar from "./BottomProgressBar/BottomProgressBar";

const TaskList = () => {
    const Tasks = createData();

    function dragOverHandler(ctx: DragEvent<HTMLDivElement>){
        ctx.preventDefault();
        const target = ctx.target as HTMLDivElement;
        target.style.boxShadow = '0 5px 1px gray';
    }

    function dragLeaveHandler(ctx: DragEvent<HTMLDivElement>){
        const target = ctx.target as HTMLDivElement; 
        target.style.boxShadow = 'none';
    }

    function dragStartHandler(
        board: { id: number; title: string; items: {
            "taskName": string,
            "description": string,
            "assigneeId": number,
            "dueDate": string,
            "priorityId": number,
            "statusId": number
        }[]; }, 
        task: {
            "taskName": string,
            "description": string,
            "assigneeId": number,
            "dueDate": string,
            "priorityId": number,
            "statusId": number
        },
        taskData: typeof Tasks,
    ){
        taskData.setCurrentBoard(board);
        taskData.setCurrentTask(task);
    }

    function dragDropHandler(
        ctx: DragEvent<HTMLDivElement>, 
        board: { id: number; title: string; items: {
            "taskName": string,
            "description": string,
            "assigneeId": number,
            "dueDate": string,
            "priorityId": number,
            "statusId": number
        }[]; }, 
        task: {
            "taskName": string,
            "description": string,
            "assigneeId": number,
            "dueDate": string,
            "priorityId": number,
            "statusId": number
        },
        taskData: typeof Tasks,
    ){
        ctx.preventDefault();
        const target = ctx.target as HTMLDivElement; 
        target.style.boxShadow = 'none';

        const currentIndex = taskData.currentBoard.items.indexOf(taskData.currentTask);
        taskData.currentBoard.items.splice(currentIndex, 1);
        const currentDrop = board.items.indexOf(task);
        board.items.splice(currentDrop + 1, 0, taskData.currentTask);
        taskData.setBoards(taskData.boards.map(
            (b) => {
                if(b.id === board.id){
                    return board;
                }
                if(b.id === taskData.currentBoard.id){
                    return taskData.currentBoard;
                }
                return b;
            }
        ));

        taskData.boards.forEach((b) => {b.items.forEach((item) => item.statusId = b.id-1)})
    }

    function addTaskHandler(id: number, taskData: typeof Tasks) {
        const newItem = {
            "taskName": "Новая задача",
            "description": "Новое описание",
            "assigneeId": 0,
            "dueDate": new Date(Date.now()).toDateString(),
            "priorityId": 0,
            "statusId": id-1,
        };
        taskData.boards[id-1].items.push(newItem);
    }

    const TaskList = observer(({ taskData }: {taskData: typeof Tasks}) => (
        <Wrapper>
            <Container>
                {taskData.boards.map((board) => 
                    <div>
                        <Head>
                            <Typography
                                variant="soft" 
                                color={
                                    board.id == 1? 'success' : 
                                    board.id == 2? 'warning' :
                                    board.id == 3? 'danger' :
                                    'primary' 
                                }
                                level="body-md"
                            >
                                <FlexFormat>
                                    {board.id == 1? <Zap size={16}/> : 
                                    board.id == 2 || board.id == 4? <NotepadText size={16}/> :
                                    <CalendarClock size={16}/>}
                                    {board.title}
                                </FlexFormat>
                            </Typography>
                            <span>{board.items.length}</span>
                        </Head>
                        <TaskContainer>
                            {board.items.map((task) => 
                                <Task 
                                    draggable={true}
                                    onDragOver={(ctx: DragEvent<HTMLDivElement>) => dragOverHandler(ctx)}
                                    onDragLeave={(ctx: DragEvent<HTMLDivElement>) => dragLeaveHandler(ctx)}
                                    onDragStart={() => dragStartHandler(board, task, taskData)}
                                    onDrop={(ctx: DragEvent<HTMLDivElement>) => dragDropHandler(ctx, board, task, taskData)}
                                >
                                    <TaskCard 
                                        task={task}
                                        board={board}
                                        update={() => taskData.update()}
                                    />
                                </Task>
                            )}    
                        </TaskContainer>
                        <Button
                            onClick={() => addTaskHandler(board.id, taskData)}
                            fullWidth={true}
                            variant="outlined"
                            color={
                                    board.id == 1? 'success' : 
                                    board.id == 2? 'warning' :
                                    board.id == 3? 'danger' :
                                    'primary' 
                                }>
                            <FlexFormat>
                                <Plus />
                                Новая задача
                            </FlexFormat>
                        </Button>
                    </div>
                )}
            </Container>
            <BottomProgressBar 
                totalTasks={
                    taskData.boards
                        .map((item) => item.items)
                        .map((item) => item.length)
                        .reduce((partialSum, a) => partialSum + a, 0)
                }
                successTasks={taskData.boards[3].items.length}
            />
        </Wrapper>
    ))

    return <TaskList taskData={Tasks}/>
}

export default TaskList;
