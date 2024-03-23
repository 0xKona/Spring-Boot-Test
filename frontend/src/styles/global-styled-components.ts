import styled from "styled-components";

export const Button = styled.button`
    width: 100px;
    height: 40px;
    border: none;
    background-color: whitesmoke;
    &:hover {
        cursor: pointer;
        background-color: darkgrey;
    }
`

export const muiStyles = {
    //inline css styling for mui components :'(
    width: '100%',
    marginTop: 15,
}