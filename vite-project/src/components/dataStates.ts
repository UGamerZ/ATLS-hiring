import { makeAutoObservable } from "mobx";
import data from '../assets/data.json';

export function createData() {
    return makeAutoObservable({
        boards: [
            {
                id: 1, 
                title: 'В ожидании', items: data.filter((item) => item.statusId == 0)
            },
            {
                id: 2, 
                title: 'В работе', items: data.filter((item) => item.statusId == 1)
            },
            {
                id: 3, 
                title: 'Тестирование', items: data.filter((item) => item.statusId == 2)
            },
            {
                id: 4, 
                title: 'Готово', items: data.filter((item) => item.statusId == 3)
                
            },
        ],
        currentTask: {
            taskName: '',
            description: '',
            assigneeId: 0,
            dueDate: '',
            priorityId: 0,
            statusId: 0,
        },
        currentBoard: { 
            id: 0, 
            title: '', 
            items: [
                {
                    taskName: '',
                    description: '',
                    assigneeId: 0,
                    dueDate: '',
                    priorityId: 0,
                    statusId: 0,
                }
            ],
        },

        setBoards(newBoards: {
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
        }[]) {
            this.boards = newBoards;
        },
        setCurrentBoard(board: {
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
        }) {
            this.currentBoard = board;
        },
        setCurrentTask(task: {
            taskName: string;
            description: string;
            assigneeId: number;
            dueDate: string;
            priorityId: number;
            statusId: number;
        }) {
            this.currentTask = task;
        },
        update() {
            this.boards = this.boards.map((board) => board);
        }
    })
}