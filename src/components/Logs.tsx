import React from "react";
import styled from "@emotion/styled";
import { colors } from "../styles/globals";
import { PlusCircle } from "../images/PlusCircle";

export default function Logs() {
  const Container = styled.div<any>((props) => ({
    display: "flex",
    flexDirection: props.column && "column",
    justifyContent: props.justifyContent,
    alignItems: props.alignItems,
    width: "100%",
    gap: "10px",
  }));
  const Title = styled.h1({
    fontWeight: "300",
    color: colors.primary.darkest,
  });
  const LogsBox = styled.div({
    border: `1.5px solid ${colors.gray}66`,
    borderRadius: "1rem",
    padding: "2rem 3rem",
  });
  const InfoText = styled.h4({
    fontWeight: 300,
    margin: 0,
  });
  const AddButton = styled.button({
    backgroundColor: "#00000000",
    margin: 0,
    padding: 0,
    borderRadius: "100%",
    border: "none",
    cursor: "pointer",
    fill: colors.primary.main,
    height: "25px",
    width: "25px",
    "&:hover": {
      fill: colors.primary.lightest,
      transition: "all 0.5s",
    },
  });
  const AddImage = styled(PlusCircle)({
    height: "100%",
    width: "100%",
  });

  const workouts = false;
  return (
    <React.Fragment>
      <Container column>
        <Title>Workout Logs</Title>
        <LogsBox>
          {workouts ? (
            <React.Fragment></React.Fragment>
          ) : (
            <React.Fragment>
              <Container column alignItems="center">
                <InfoText>Log your first workout</InfoText>
                <AddButton>
                  <AddImage />
                </AddButton>
              </Container>
            </React.Fragment>
          )}
        </LogsBox>
      </Container>
    </React.Fragment>
  );
}
