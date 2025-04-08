import { LinearProgress } from "@mui/joy";
import { Container } from "./bottomPGStyles";

const BottomProgressBar = ({ totalTasks, successTasks }:{ totalTasks: number, successTasks: number }) => {
    const percentOfSuccess = Math.round(successTasks / totalTasks * 100);
    return(
        <Container>
            <span>{percentOfSuccess}%</span>
            выполненных задач
            <LinearProgress variant="solid" determinate value={percentOfSuccess} />
        </Container>
    );
};

export default BottomProgressBar;