import { Button, Card, CardContent, Dropdown, IconButton, Menu, MenuButton, MenuItem, Textarea, Typography } from "@mui/joy";
import TaskIcon from '../../assets/Circle Icon.svg'
import { TaskHead, TaskType } from "./taskCardStyle";
import { CalendarClock, NotepadText, Trash2, Zap } from "lucide-react";
import { useState } from "react";

const TaskCard = ({ 
        task,
        board,
        update
    }: { 
        task: {
            taskName: string;
            description: string;
            assigneeId: number;
            dueDate: string;
            priorityId: number;
            statusId: number;
        },
        board: {
            id: number;
            title: string;
            items: {
                taskName: string;
                description: string;
                assigneeId: number;
                dueDate: string;
                priorityId: number;
                statusId: number;
            }[];
        },
        update: () => void,
    }) => {

    const [isNameBtnDisabled, setIsNameBtnDisabled] = useState(true);
    const [nameInput, setNameInput] = useState('');

    function nameSetHandler() {
        board.items[board.items.indexOf(task)].taskName = nameInput;
        setNameInput('');
        setIsNameBtnDisabled(true);
    }

    function nameChangeHandler(
        ctx: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        setNameInput(ctx.target.value);
        if(ctx.target.value!=''){
            setIsNameBtnDisabled(false);
        }
        else {
            setIsNameBtnDisabled(true);
        }
    }

    const [isDescBtnDisabled, setIsDescBtnDisabled] = useState(true);
    const [descInput, setDescInput] = useState('');

    function descSetHandler() {
        board.items[board.items.indexOf(task)].description = descInput;
        setDescInput('');
        setIsDescBtnDisabled(true);
    }

    function descChangeHandler(
        ctx: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        setDescInput(ctx.target.value);
        if(ctx.target.value!=''){
            setIsDescBtnDisabled(false);
        }
        else {
            setIsDescBtnDisabled(true);
        }
    }

    function deleteTaskHandler() {
        board.items.splice(board.items.indexOf(task), 1)
    }

    function setPriorityHandler(id: number) {
        board.items[board.items.indexOf(task)].priorityId = id;
        update();
    }

    function setAssigneeHandler(id: number) {
        board.items[board.items.indexOf(task)].assigneeId = id;
        update();
    }

    return(
        <Card size="sm">
            <TaskHead>
                <img src={TaskIcon} />
                <Typography level="title-lg" width={'80%'} marginBottom={-4}>
                    <Textarea
                        value={nameInput}
                        onChange={(ctx) => nameChangeHandler(ctx)} 
                        variant="plain" 
                        placeholder={task.taskName} 
                        endDecorator={
                            <Button 
                                disabled={isNameBtnDisabled} 
                                onClick={() => nameSetHandler()}
                                size="sm"
                                variant="soft"
                            >
                                Сохранить
                            </Button>
                        }
                    />
                </Typography>
                <IconButton 
                    onClick={() => deleteTaskHandler()} 
                    color="danger"
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                >
                    <Trash2 size={16} />
                </IconButton>
            </TaskHead>
            <CardContent>
                <TaskType>
                    <TaskHead style={{marginBottom: -10}}>
                        <Dropdown>
                            <MenuButton variant="plain" size="sm">
                                {
                                    task.assigneeId == 0? 'Добавить ответственного' :
                                    task.assigneeId == 1? 'Иван Иванов' :
                                    task.assigneeId == 2? 'Мария Смирнова' :
                                    'Дмитрий Алексеев'
                                }
                            </MenuButton>
                            <Menu>
                                Выберите ответственного
                                <MenuItem onClick={() => setAssigneeHandler(1)}>Иван Иванов</MenuItem>
                                <MenuItem onClick={() => setAssigneeHandler(2)}>Мария Смирнова</MenuItem>
                                <MenuItem onClick={() => setAssigneeHandler(3)}>Дмитрий Алексеев</MenuItem>
                            </Menu>
                        </Dropdown>
                         • {new Date(task.dueDate).toDateString()}
                    </TaskHead>
                </TaskType>
                <TaskType>
                    <div style={{maxWidth: 'fit-content', maxHeight: '10px'}}>
                        <Dropdown>
                            <MenuButton
                                variant="soft"
                                size="sm"
                                color={
                                    task.priorityId == 0? 'success' : 
                                    task.priorityId == 1? 'warning' :
                                    'danger'
                                }
                            >
                                {
                                    task.priorityId == 0? 'low' : 
                                    task.priorityId == 1? 'medium' :
                                    'high'
                                }
                            </MenuButton>
                            <Menu>
                                Выберите приоритет
                                <MenuItem onClick={() => setPriorityHandler(2)}>
                                    <Typography variant="soft" color="danger" level="body-sm">
                                        High
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => setPriorityHandler(1)}>
                                    <Typography variant="soft" color="warning" level="body-sm">
                                        Medium
                                    </Typography>
                                </MenuItem>
                                <MenuItem onClick={() => setPriorityHandler(0)}>
                                    <Typography variant="soft" color="success" level="body-sm">
                                        Low
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    </div>
                    <div style={{maxWidth: 'fit-content', maxHeight: '10px'}}>
                        <Typography
                            variant="soft"
                            level="body-sm"
                            color={
                                task.statusId == 0? 'success' : 
                                task.statusId == 1? 'warning' :
                                task.statusId == 2? 'danger' :
                                'primary' 
                            }
                        >
                            <TaskType>
                                {
                                    task.statusId == 0? (
                                        <>
                                            <Zap size={16}/>
                                            В ожидании
                                        </>) : 
                                    task.statusId == 1? (
                                        <>
                                            <NotepadText size={16}/>
                                            В работе
                                        </>):
                                    task.statusId == 2? (
                                        <>
                                            <CalendarClock size={16}/>
                                            Тестирование
                                        </>) :
                                    (
                                        <>
                                            <NotepadText size={16}/>
                                            Готово
                                        </>)
                                }
                            </TaskType>
                        </Typography>
                    </div>
                </TaskType>
                <div style={{marginTop: '10px', marginBottom: '-30px'}}>
                    <Textarea
                        size="sm"
                        value={descInput}
                        onChange={(ctx) => descChangeHandler(ctx)} 
                        variant="plain"
                        placeholder={task.description}
                        endDecorator={
                            <Button 
                                disabled={isDescBtnDisabled} 
                                onClick={() => descSetHandler()}
                                size="sm"
                                variant="soft"
                            >
                                Сохранить
                            </Button>
                        }
                    />
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard;