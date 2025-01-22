import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Om Yadav.</h2>;
  const three = <h3 className="big-heading">I build things for the Mobile.</h3>;
  const four = (
    <>
      <p>
        I'm a seasoned software engineer with a passion for creating impactful, scalable, and secure
        solutions. As a Cloud Engineer at Searce, I leverage the power of cloud technologies to
        implement robust and secure systems. My expertise spans across various domains, including
        app development and seamless API integrations, with a commitment to building user-centric
        experiences. Beyond my daily work, I'm actively engaged in the tech community, sharing my
        knowledge and insights through tech-related video content on Instagram{' '}
        <a href="https://www.instagram.com/duo_coderz/" target="_blank" rel="noreferrer">
          @duo_coderz
        </a>
        . I thrive in collaborative environments, contributing to team success with my ability to
        create and deliver secure software solutions. I'm currently focused on mastering the
        intricacies of building scalable systems and leveraging the cloud to its fullest potential,
        while always keeping security at the forefront. I'm driven by a desire to create innovative
        solutions that push the boundaries of technology. #Technophile | Team Player | Software
        Creator
      </p>
      <p>
        Connect to explore opportunities or discuss tech! You can also follow my content on
        Instagram:{' '}
        <a href="https://www.instagram.com/duo_coderz/" target="_blank" rel="noreferrer">
          @duo_coderz
        </a>
        .
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://play.google.com/store/apps/developer?id=BitCrackers"
      target="_blank"
      rel="noreferrer">
      Check out my PlayStore!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
