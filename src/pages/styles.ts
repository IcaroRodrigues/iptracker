import styled from "styled-components";

import background from "../assets/pattern-bg.png";

export const Main = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .leaflet-container {
    z-index: 5;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: 250px;
  position: relative;

  background: url("${background}") no-repeat;
  background-size: cover;

  .container {
    width: 100%;

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
        height: 30px;

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
    position: absolute;
    right: 0;
    border-radius: 0px 10px 10px 0px;

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 1000px) {
    width: 400px;

    input {
      &::placeholder {
        color: #666360;
        font-size: 14px;
      }
    }
  }

  @media (max-width: 900px) {
    width: 350px;
    input {
      &::placeholder {
        color: #666360;
        font-size: 12px;
      }
    }
  }

  @media (max-width: 835px) {
    width: 300px;
    input {
      &::placeholder {
        color: #666360;
        font-size: 12px;
      }
    }
  }

  @media (max-width: 375px) {
    width: 300px;
    input {
      &::placeholder {
        color: #666360;
        font-size: 12px;
      }
    }
  }
`;

export const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;

  background: transparent;

  .location-container {
    display: flex;

    border-radius: 15px;
    box-shadow: 0px 1px 1px;
    margin-top: 50px;

    font-size: 14px;
    min-height: 120px;

    background: white;

    z-index: 10;

    img {
      box-shadow: 0px 1px 5px;
      border-radius: 10px;
      width: 100px;
      height: 70px;
      flex: 1;
      margin: 25px 20px 0px 40px;
    }
  }

  .location-group {
    padding: 30px 50px 0px 20px;
  }

  h2 {
    margin-top: 10px;
  }

  h3 {
    color: hsl(0, 0%, 59%);
    font-size: 14px;
    letter-spacing: 1px;
  }

  .vertical-line {
    border-left: 2px solid hsl(0, 0%, 80%);
    height: 60px;
    margin-top: 30px;
  }

  @media (max-width: 1000px) {
    .location-container {
      font-size: 10px;
      margin-top: 60px;
      min-height: 100px;

      img {
        overflow: hidden;
        object-fit: cover;
        width: 70px;
        height: 50px;
      }
    }

    .vertical-line {
      height: 50px;
    }
  }

  @media (max-width: 850px) {
    .location-container {
      margin-top: 70px;
      font-size: 9px;
      min-height: 100px;

      img {
        width: 70px;
        height: 50px;
      }
    }

    .vertical-line {
      height: 45px;
    }
  }

  @media (max-width: 765px) {
    .location-container {
      margin-top: 70px;
      font-size: 7px;
      min-height: 90px;

      img {
        width: 70px;
        height: 50px;
        margin-left: 0px;
      }
    }
    .vertical-line {
      height: 45px;
    }
  }

  @media (max-width: 375px) {
    .location-container {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      margin-top: 25px;
      font-size: 7px;

      img {
        border-radius: 4px;
        width: 70px;
        height: 30px;
        margin: 20px 0px 20px 0px;
      }
    }

    .location-group {
      width: 100%;
      padding: 20px 50px 0px 20px;
    }
    .vertical-line {
      display: none;
    }
  }
`;
