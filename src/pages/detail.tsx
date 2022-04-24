import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DetailBook } from "../components/DetailBook";
import { shareKakao } from "../api/shareKakao";
import kakaoIcon from "../assets/ico_sns_kakao.svg";
import Utterances from "../api/utterances";

const Section = styled.div`
  width: 80%;
  height: 100%;
  margin: 100px auto 0;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 82px 10px 10px 0;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .links {
    justify-content: space-between;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const BookInfo = styled.div`
  width: 90%;
  color: #f0efef;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 2rem;
  line-height: 2.2rem;
`;

const SubTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 1.5rem;
  margin: 1rem 0;
`;

const HorizontalLine = styled.hr`
  border-top: 0;
  border-bottom: solid 1px #d8d8d8;
`;

const VerticalLine = styled.em`
  margin: 4px 4px 0 4px;
  width: 1px;
  height: 12px;
  text-indent: -999em;
  border-right: solid 1px #ccc;
  overflow: hidden;
  text-align: left;
  vertical-align: top;
  display: inline-block;
  zoom: 1;
`;

const Author = styled.span``;

const Publisher = styled.span``;

const Suggestion = styled.p`
  width: 100%;
  margin: 3rem 0;
  white-space: pre-wrap;

  text-align: center;
  color: #f0efef;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 2rem auto;
  }
`;

const Summary = styled.p`
  width: 100%;
  margin: 1rem 0;
  white-space: pre-wrap;
  color: #f0efef;
  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 2rem auto;
  }
`;

const Links = styled.div`
  display: flex;
  line-height: 50px;
  vertical-align: center;
  margin-top: 20px;
`;

const PurchaseLink = styled.a`
  display: block;
  width: 100px;
  height: 50px;
  margin-left: 1rem;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  color: black;
  background: #ececec;
  border-radius: 10px;
  cursor: pointer;

  & + & {
    margin-left: 1rem;
  }
`;

const SharingBtn = styled.a`
  cursor: pointer;
  width: 56px;
  position: relative;
  display: block;
  margin-left: 1rem;

  &:after {
    background: url(${kakaoIcon}) no-repeat 0 0;
    position: absolute;
    width: 56px;
    height: 56px;
    transform: translateX(-50%);
    content: "";
    left: 50%;
  }
`;

interface DetailProps {
  id: string;
  bookTitle: string;
  bookSubTitle: string;
  author: string;
  publisher: string;
  img: string;
  kyobo: string;
  sharing: string;
  summary: string;
  yes24: string;
  suggestion: string;
}

function Detail({ match }: any) {
  const { group, id } = useParams();
  const [param, setParam] = useState(0);

  const [selectedBook, setSelectedBook] = useState<DetailProps>({
    id: "",
    bookTitle: "",
    bookSubTitle: "",
    author: "",
    publisher: "",
    img: "https://i.imgur.com/HxbUvqG.png",
    kyobo: "",
    sharing: "",
    summary: "",
    yes24: "",
    suggestion: "",
  });

  useEffect(() => {
    setParam(+id - 1);
    fetch(window.location.origin + "/data/bookMock.json", {})
      .then((response) => response.json())
      .then((data) => {
        const entire = data.data;
        const length = Object.keys(entire).length;

        for (let i = 0; i < length; i++) {
          if (group === entire[i]["group"]) {
            setSelectedBook(data.data[i].bookList[param]);
          }
        }
      });
  }, [param, group, id]);

  return (
    <>
      <Section>
        <FlexWrapper>
          <DetailBook src={selectedBook.img} />
          <BookInfo>
            <Title>{selectedBook.bookTitle}</Title>
            <SubTitle>{selectedBook.bookSubTitle}</SubTitle>
            <Author>{selectedBook.author}</Author>
            <VerticalLine>|</VerticalLine>
            <Publisher>{selectedBook.publisher}</Publisher>
            <HorizontalLine />
            <FlexWrapper className="links">
              <Links>
                구매하기
                <PurchaseLink
                  href={selectedBook.kyobo}
                  target="_blank"
                  rel="noreferrer"
                >
                  교보문고
                </PurchaseLink>
                <PurchaseLink
                  href={selectedBook.yes24}
                  target="_blank"
                  rel="noreferrer"
                >
                  yse24
                </PurchaseLink>
              </Links>
              <Links>
                공유하기
                <SharingBtn
                  onClick={(e) => {
                    e.preventDefault();
                    shareKakao(
                      selectedBook.bookTitle,
                      selectedBook.img,
                      window.location.href
                    );
                  }}
                ></SharingBtn>
              </Links>
            </FlexWrapper>
          </BookInfo>
        </FlexWrapper>
        <Suggestion>"{selectedBook.suggestion[0]}"</Suggestion>
        <Suggestion>"{selectedBook.suggestion[1]}"</Suggestion>
        <HorizontalLine />
        <Summary>{selectedBook.summary}</Summary>
        <Utterances repo="FTOOOS/comment" theme="photon-dark" />
      </Section>
    </>
  );
}

export default Detail;
