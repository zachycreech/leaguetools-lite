// https://gist.github.com/ndpniraj/633474d23145499c5a3c39b017f43be4

import { ReactNode, useRef } from "react";
import { styled } from "styled-components";

const StyledContainer = styled.div`
  position: relative;
  & .tooltip {
    display: none;
    width: 300px;
    padding: 1rem;
    background-color: #070720;
    color: #fff;
    position: absolute;
    top: 0;
    left: 100%;
    transform: translateX(20%);
    z-index: 10;
    font-size: 10px;
  }
  &:hover .tooltip {
    display: block;
  }
`;

type Props = {
  children: ReactNode;
  tooltip?: string;
};

export default function Tooltip({ children, tooltip = "" }: Props) {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const cleanedUpTooltip = tooltip.replace(/\n/g, "<br />");

  return (
    <StyledContainer ref={containerRef}>
      {children}
      {tooltip && (
        <div
          className="tooltip"
          ref={tooltipRef}
          dangerouslySetInnerHTML={{ __html: cleanedUpTooltip }}
        ></div>
      )}
    </StyledContainer>
  );
}
