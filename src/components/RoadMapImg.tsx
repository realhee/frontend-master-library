import React from "react";
import styled from "styled-components";

const ImgWrapper = styled.span<RoadMapImgTypes>`
  margin-left: ${(props) => props.left};
  margin-top: ${(props) => props.top};
  width: 150px;
  height: 100px;
  display: block;
  background: url(${(props) => props.names}) no-repeat center center / 100% 100%;
  cursor: pointer;
`;

interface RoadMapImgTypes {
  left?: any;
  top?: any;
  names?: any;
}

const RoadMapImg = (props) => {
  return (
    <>
      <ImgWrapper left={props.left} top={props.top} names={props.names} />
    </>
  );
};

export default RoadMapImg;
