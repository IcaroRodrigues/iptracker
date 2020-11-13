import styled from "styled-components";

import background from "../assets/pattern-bg.png";

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 100vw;
  height: 250px;
  position: relative;

  background: url("${background}") no-repeat;
  background-size: cover;

  .container {
    width: 100%;
    max-width: 1440px;

    display: flex;

    align-items: center;
    justify-content: center;

    flex-direction: column;

    h1 {
      color: white;
      margin-top: 20px;
      font-weight: 500;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        flex: 1;
        width: 450px;
        height: 50px;

        border-radius: 10px 0px 0px 10px;
        border: none;

        padding: 10px;

        outline: none;

        margin-top: 20px;
      }

      > svg {
        height: 50px;

        background: black;
      }
    }
  }
`;

export const Input = styled.div`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  margin-top: 20px;
  width: 450px;
  height: 50px;

  position: relative;

  background: white;
  border: 0px;

  display: flex;
  align-items: center;
  justify-content: center;

  input {
    border: 0;
    margin-bottom: 10px;
    background: transparent;
    color: black;
    &::placeholder {
      color: #666360;
      font-size: 16px;
    }
  }

  svg {
    background-color: white;
    position: absolute;
    right: 0;
    border-radius: 0px 10px 10px 0px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  width: 100vw;

  background: transparent;
  > div {
    margin-top: 40px;
    display: flex;
  }

  .location-group {
    display: flex;
    padding: 40px;

    background: white;

    &:nth-child(1) {
      display: flex;
      flex-direction: column;

      border-radius: 20px 0px 0px 20px;
    }

    &:nth-last-child(1) {
      display: flex;
      flex-direction: column;

      border-radius: 0px 20px 20px 0px;
    }
  }

  .vertical-line {
    border-left: 2px solid #ff0000;
    margin-right: 40px;
  }
`;
