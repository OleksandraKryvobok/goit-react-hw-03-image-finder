import styled from "styled-components";

export const ErrorMessage = styled.h1`
    display: block;
    font-size: 30px;
    color: #434343;
    margin: 0 auto;
`;

export const List = styled.ul`
    display: grid;
    max-width: calc(100vw - 48px);
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    grid-gap: 16px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
    margin-left: auto;
    margin-right: auto;
`;