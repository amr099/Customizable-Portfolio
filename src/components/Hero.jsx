import React, { useContext } from "react";
import Links from "./Links";
import styled from "styled-components";
import { FirebaseContext } from "context/firebase-context";

const Grid = styled.section`
    display: grid;
    row-gap: 30px;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(6, fit-content);
`;
const LogoWrapper = styled.div`
    grid-area: 1/2/2/4;
    @media (max-width: 768px) {
        grid-area: 1/2/2/12;
        align-self: center;
    }
`;
const NavWrapper = styled.div`
    grid-area: 1/8/2/12;
    align-self: center;
    @media (max-width: 768px) {
        grid-area: 2/2/2/12;
    }
`;
const MainParagraphWrapper = styled.div`
    grid-area: ${(props) => (props.layout === "1" ? "3/2/5/6" : "3/2/4/12")};
    text-align: ${(props) => (props.layout === "1" ? "" : "center")};
    justify-self: center;
    align-self: center;
    @media (max-width: 768px) {
        grid-area: 4/2/5/12;
        text-align: center;
    }
`;
const MainImgWrapper = styled.div`
    grid-area: ${(props) => (props.layout === "1" ? "3/8/5/12" : "4/5/5/9")};
    justify-self: center;
    @media (max-width: 768px) {
        grid-area: 6/5/8/9;
    }
`;
const LinksWrapper = styled.div`
    grid-area: 5/4/6/10;
    @media (max-width: 768px) {
        grid-area: 8/2/9/12;
    }
`;

export default function Hero() {
    const { data } = useContext(FirebaseContext);
    console.log(data?.layout);

    return (
        <Grid>
            <LogoWrapper>
                <h1 className='logo'>{data?.name}</h1>
            </LogoWrapper>
            <NavWrapper>
                <div className='nav flex between'>
                    <span>About</span>
                    <span>Services</span>
                    <span>Projects</span>
                    <span>Contacts</span>
                </div>
            </NavWrapper>
            <MainParagraphWrapper layout={data?.layout}>
                <div className='main-paragraph'>
                    <h1>{data?.mainHeading}</h1>
                    <p>{data?.mainText}</p>
                </div>
            </MainParagraphWrapper>
            <MainImgWrapper layout={data?.layout}>
                <img className='main-figure' src={data?.mainImg} alt='' />
            </MainImgWrapper>
            <LinksWrapper>
                <Links />
            </LinksWrapper>
        </Grid>
    );
}
