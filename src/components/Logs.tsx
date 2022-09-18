import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button, colors, FlexContainer } from "../styles/globals";
import { PlusCircle } from "../images/PlusCircle";
import { supabase } from "../lib/api";
import { useSession } from "../hooks/useSession";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { XyzTransitionGroup } from "@animxyz/react";
import { toast } from "react-toastify";

export default function Logs() {
  const Title = styled.h1({
    fontWeight: "300",
    color: colors.primary.darkest,
  });
  const LogsBox = styled.div({
    border: `1.5px solid ${colors.gray}66`,
    borderRadius: "1rem",
    padding: "2rem 3rem",
    backgroundColor: "white",
  });
  const InfoText = styled.h4({
    fontWeight: 300,
    margin: 0,
  });
  const AddButton = styled.button<any>((props) => ({
    backgroundColor: "#00000000",
    margin: 0,
    padding: 0,
    borderRadius: "100%",
    border: "none",
    cursor: "pointer",
    fill: colors.primary.main,
    height: props.height || "25px",
    width: props.width || "25px",
    "&:hover": {
      fill: colors.primary.lightest,
      transition: "all 0.5s",
    },
  }));
  const RemoveButton = styled(AddButton)({
    rotate: "45deg",
    fill: "red",
  });
  const AddImage = styled(PlusCircle)({
    height: "100%",
    width: "100%",
  });
  const WorkoutAddContainer = styled.div({
    width: "100%",
    borderRadius: "1rem",
    // padding: "1rem 1rem",
  });
  const GridContainer = styled.div<any>((props) => ({
    display: "grid",
    gap: props.gap || "0 50px",
    gridTemplateColumns: "minmax(0,1fr) ".repeat(props.nColumns),
    margin: props.margin,
    width: props.width,
  }));
  const Border = styled.div({
    backgroundColor: colors.primary.dark,
    height: "1px",
    width: "100%",
  });
  const Xyz = styled(XyzTransitionGroup)({
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem 0",
  });

  const session = useSession();
  const [workouts, setWorkouts] = useState<any[] | null>(null);
  const [createWorkout, setCreateWorkout] = useState(false);
  useEffect(() => {
    if (!session) return;
    const getWorkouts = async () => {
      const { user } = session!;
      const { data, error } = await supabase
        .from("exercise")
        .select("*, workout!inner(*)")
        .eq("workout.user_id", user?.id);
      console.log(data);
      // const workouts = {}
      // for (const exercise of data) {
      // }
      // setWorkouts(data);
    };
    getWorkouts();
  }, [session]);

  const initialExercises = {
    workout: { name: "", gym: "", notes: "" },
    exercises: [
      {
        name: "",
        weight: "",
        sets: "",
        reps: "",
      },
    ],
  };
  const addExercise = async ({
    values,
  }: {
    values: {
      workout: {
        name: string;
        gym: string;
        notes: string;
      };
      exercises: {
        name: string;
        weight: string;
        sets: string;
        reps: string;
      }[];
    };
  }) => {
    if (!session) return;
    try {
      // setLoading(true); // toastify
      const { user } = session;
      const toastId = toast.loading("Adding workout...", { type: "default" });
      const { data: workout, error } = await supabase.from("workout").insert({
        user_id: user?.id,
        workout_name: values.workout.name,
        gym: values.workout.gym,
        notes: values.workout.notes,
      });
      // const { data: exercises, error: error1 } = await supabase
      const { data: exercises, error: error1 } = await supabase
        .from("exercises")
        .upsert(
          values.exercises.map((exercise) => ({
            name: exercise.name.toLowerCase(),
          }))
        )
        .then(() =>
          supabase.from("exercise").insert(
            values.exercises.map((exercise) => ({
              workout_id: workout![0].id,
              exercise_name: exercise.name,
              user_id: user?.id,
              weight: Number(exercise.weight),
              sets: Number(exercise.sets),
              reps: Number(exercise.reps),
            }))
          )
        );
      toast.update(toastId, {
        render: "Workout added!",
        type: "success",
        isLoading: false,
        closeButton: true,
        autoClose: 3000,
      });

      console.log(exercises, error1);
    } catch (error) {
      alert(error);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <React.Fragment>
      <FlexContainer column>
        <Title>Workout Logs</Title>
        <LogsBox>
          {workouts && workouts!.length > 0 ? (
            <React.Fragment></React.Fragment>
          ) : (
            <FlexContainer column alignItems="center">
              {!createWorkout ? (
                <>
                  <InfoText>Log your first workout</InfoText>
                  <AddButton onClick={() => setCreateWorkout(true)}>
                    <AddImage />
                  </AddButton>
                </>
              ) : (
                <WorkoutAddContainer>
                  <Formik
                    initialValues={initialExercises}
                    onSubmit={async (values) => addExercise({ values })}
                  >
                    {({ values }) => (
                      <Form>
                        <FlexContainer column gap="1rem 0">
                          <GridContainer nColumns={3}>
                            <FlexContainer column>
                              <label htmlFor={`workout.name`}>Workout</label>
                              <Field
                                name={`workout.name`}
                                placeholder="Workout Name"
                                type="text"
                              />
                            </FlexContainer>
                            <FlexContainer column>
                              <label htmlFor={`workout.gym`}>Gym</label>
                              <Field
                                name={`workout.gym`}
                                placeholder="Gym Name"
                                type="text"
                              />
                            </FlexContainer>
                            <FlexContainer column>
                              <label htmlFor={`workout.name`}>Notes</label>
                              <Field
                                name={`workout.notes`}
                                placeholder="Workout Notes"
                                type="text"
                              />
                            </FlexContainer>
                          </GridContainer>
                          <Border />
                          <FieldArray name="exercises">
                            {({ insert, remove, push }) => (
                              <React.Fragment>
                                {/* <Xyz appear xyz="up"> */}
                                <FlexContainer column gap="0.5rem 0">
                                  {values.exercises.map((exercise, index) => (
                                    <div key={index}>
                                      <FlexContainer
                                        alignItems="center"
                                        margin="0 1rem"
                                      >
                                        <RemoveButton
                                          height="20px"
                                          width="20px"
                                          type="button"
                                          onClick={() => remove(index)}
                                        >
                                          <AddImage />
                                        </RemoveButton>

                                        <GridContainer
                                          margin="0 1rem"
                                          nColumns={4}
                                          gap="10px 50px"
                                          width="100%"
                                        >
                                          <FlexContainer column gap="5px">
                                            <label
                                              htmlFor={`exercises.${index}.name`}
                                            >
                                              Exercise Name
                                            </label>
                                            <Field
                                              name={`exercises.${index}.name`}
                                              placeholder="Bench Press"
                                              type="text"
                                            />
                                          </FlexContainer>
                                          <FlexContainer column gap="5px">
                                            <label
                                              htmlFor={`exercises.${index}.weight`}
                                            >
                                              Weight (lbs)
                                            </label>
                                            <Field
                                              name={`exercises.${index}.weight`}
                                              placeholder="100"
                                              type="number"
                                            />
                                          </FlexContainer>
                                          <FlexContainer column gap="5px">
                                            <label
                                              htmlFor={`exercises.${index}.sets`}
                                            >
                                              Sets
                                            </label>
                                            <Field
                                              name={`exercises.${index}.sets`}
                                              placeholder="10"
                                              type="number"
                                            />
                                          </FlexContainer>
                                          <FlexContainer column gap="5px">
                                            <label
                                              htmlFor={`exercises.${index}.reps`}
                                            >
                                              Reps
                                            </label>
                                            <Field
                                              name={`exercises.${index}.reps`}
                                              placeholder="3"
                                              type="number"
                                            />
                                          </FlexContainer>
                                        </GridContainer>
                                      </FlexContainer>
                                    </div>
                                  ))}
                                </FlexContainer>
                                {/* </Xyz> */}
                                <FlexContainer
                                  alignItems="center"
                                  margin="1rem 1rem"
                                >
                                  <AddButton
                                    height="20px"
                                    width="20px"
                                    type="button"
                                    onClick={() =>
                                      push({
                                        name: "",
                                        weight: "",
                                        sets: "",
                                        reps: "",
                                      })
                                    }
                                  >
                                    <AddImage />
                                  </AddButton>
                                  <GridContainer
                                    margin="0 1rem"
                                    nColumns={4}
                                    gap="10px 50px"
                                    width="100%"
                                  >
                                    <p style={{ margin: 0 }}>Add an exercise</p>
                                  </GridContainer>
                                </FlexContainer>
                              </React.Fragment>
                            )}
                          </FieldArray>
                          <FlexContainer
                            margin="2rem 0"
                            justifyContent="center"
                          >
                            <Button type="submit">Submit</Button>
                          </FlexContainer>{" "}
                        </FlexContainer>
                      </Form>
                    )}
                  </Formik>
                </WorkoutAddContainer>
              )}
            </FlexContainer>
          )}
        </LogsBox>
      </FlexContainer>
    </React.Fragment>
  );
}
