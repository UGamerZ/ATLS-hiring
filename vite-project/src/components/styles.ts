import styled from "styled-components";

const MAXHEIGHT = window.innerHeight;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 
        var(
            --joy-fontFamily-body, "Inter", 
            var(
                --joy-fontFamily-fallback, 
                -apple-system, 
                BlinkMacSystemFont, 
                "Segoe UI", 
                Roboto, 
                Helvetica, 
                Arial, 
                sans-serif, 
                "Apple Color Emoji", 
                "Segoe UI Emoji", 
                "Segoe UI Symbol"
            )
        );
`;

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    gap: 10px;
`;

export const Head = styled.div`
    display: flex;
    align-self: center;
    padding-bottom: 5%;
    align-items: center;
    & span{
        margin-left: 5%;
    }
`;

export const TaskContainer = styled.div`
    max-height: ${MAXHEIGHT * 0.75}px;
    overflow: auto;
`;

export const Task = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    & div{
        margin-bottom: 5%;
    }
`;

export const FlexFormat = styled.div`
    display: flex;
    align-items: center;
    gap: 7px;
`;
