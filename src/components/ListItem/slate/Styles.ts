import styled from "styled-components";

export const Styled_ToolBar = styled.div<{left: number}>`
    position: absolute;
    display: flex;
    z-index: 100;
    top:-25px;
    color: #fff;
    background-color: #000;
    padding: 3px 5px;
    column-gap: 3px;
    & button{
        border: none;
        background-color: #000;
    }
    & button:hover{
        background-color: #2b2b2b;
        border-radius: 2px;
    }
    .tool-italic{
        font-style: italic;
        font-family: serif;
    }
`;