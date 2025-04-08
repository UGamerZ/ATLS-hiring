import styled from "styled-components";

export const Container = styled.footer`
    align-self: bottom;
    margin-top: 15px;
    display: flex;
    gap: 10px;
    align-items: center;
    & span {
        font-weight: bold;
        color: 
            var(
                --variant-solidBg, 
                var(
                    --joy-palette-primary-solidBg, 
                    var(--joy-palette-primary-500, #0B6BCB)
                    )
                );
    }
`;