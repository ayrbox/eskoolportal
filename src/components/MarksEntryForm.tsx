import React, {
  FormEventHandler,
  KeyboardEventHandler,
  useRef,
  useState,
  useEffect,
} from "react";
import Overlay from "~/components/Overlay";
import Panel from "~/components/Panel";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { StudentWithObtainedMarks } from "~/types/StudentTypes";
import axios, { AxiosError } from "axios";
import { ChangeEventHandler } from "react";
import {
  Marks,
  ObtainedMarksQueryParams,
  StudentMarksPayload,
} from "~/types/Marks";
import { ResponseErrorType } from "~/types/AppTypes";
import { FaExclamationTriangle } from "react-icons/fa";

export interface MarksEntryFormProps {
  onClose?: () => void;
  formValue: ObtainedMarksQueryParams;
  /**
   * The event is triggered when marks for a student has been entered successfully
   */
  onSubmitted?: () => void;
}

export default function MarksEntryForm({
  onSubmitted,
  onClose,
  formValue,
}: MarksEntryFormProps) {
  const [error, setError] = useState<ResponseErrorType>();
  const [studentCode, setStudentCode] = useState<string>("");
  const [studentDetail, setStudentDetail] =
    useState<StudentWithObtainedMarks>();
  const [obtainedMarks, setObtainedMarks] = useState<Marks>({
    fullMark: 0,
    passMark: 0,
    obtainedMarks: 0,
  });

  const inputObtainedMarks = useRef<any>(null);
  const inputStudentCode = useRef<any>(null);
  useEffect(() => {
    inputStudentCode.current?.focus();
  }, [inputStudentCode.current]);

  useEffect(() => {
    if (!error) return;
    setTimeout(() => setError(undefined), 2000);
  }, [error]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      // TODO: Validate payload before posting
      const payload: StudentMarksPayload = {
        examId: formValue.examId,
        classGroupId: formValue.classGroupId,
        sectionId: formValue.sectionId,
        subjectId: formValue.subjectId,
        examType: formValue.examType,
        marks: obtainedMarks,
      };

      await axios.post<void, any, StudentMarksPayload>(
        `/api/students/code/${studentCode}/marks`,
        payload
      );

      setStudentCode("");
      setStudentDetail(undefined);
      setObtainedMarks({
        fullMark: 0,
        passMark: 0,
        obtainedMarks: 0,
      });
      inputStudentCode.current?.focus();

      if (onSubmitted) onSubmitted();
    } catch (err: unknown) {
      const e = err as AxiosError<ResponseErrorType>;
      setError(e);
    }
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();

    try {
      const { data } = await axios.get<StudentWithObtainedMarks>(
        `/api/students/code/${studentCode}/marks`,
        { params: formValue }
      );
      setStudentDetail(data);

      const [obtainedMarksByStudent] = data.obtainedMarks;
      setObtainedMarks({
        fullMark: obtainedMarksByStudent?.fullMark || data.fullMark,
        passMark: obtainedMarksByStudent?.passMark || data.passMark,
        obtainedMarks: obtainedMarksByStudent?.obtainedMarks || 0,
      });

      // Focus on obtained marks
      inputObtainedMarks.current?.focus();
      inputObtainedMarks.current?.select();
    } catch (err: unknown) {
      const e = err as AxiosError<ResponseErrorType>; // Assuming its is always Axios Error
      setError(e.response?.data);
    }
  };

  const handleClose = () => {
    if (!onClose) return;
    onClose();
  };

  const handleStudentCodeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setStudentCode(e.target.value);
  };

  const handleObtaineMarksChange =
    (key: keyof Marks): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      e.preventDefault();

      setObtainedMarks((state) => ({
        ...state,
        [key]: e.target.value,
      }));
    };

  return (
    <Overlay open onClose={handleClose}>
      <Panel className="shadow-lg">
        <>
          {error && (
            <Alert color="danger">
              <FaExclamationTriangle /> {error.message}
            </Alert>
          )}
        </>

        <Form onSubmit={handleFormSubmit} className="p-5">
          <h3>Student Code: </h3>
          <Input
            type="text"
            name="studentCode"
            id="studentCode"
            innerRef={inputStudentCode}
            onKeyPress={handleKeyPress}
            onChange={handleStudentCodeChange}
            value={studentCode}
          />
          <p className="small">Please enter student code and press enter.</p>
          {studentDetail && (
            <Panel>
              <h1>
                <strong>{studentDetail.name}</strong> (
                <small>{studentDetail.rollNo}</small>)
              </h1>
              <h3>
                {studentDetail.ClassGroup.name} ({studentDetail.Section.name}) -{" "}
                {studentDetail.rollNo}
              </h3>

              <Label>Obtained Marks:</Label>
              <Input
                type="number"
                name="obtainedMarks"
                value={obtainedMarks.obtainedMarks}
                innerRef={inputObtainedMarks}
                onChange={handleObtaineMarksChange("obtainedMarks")}
              />
              <Row>
                <Col>
                  <Label>Full Marks:</Label>
                  <Input
                    type="number"
                    name="fullMark"
                    value={obtainedMarks.fullMark}
                    onChange={handleObtaineMarksChange("fullMark")}
                  />
                </Col>
                <Col>
                  <Label>Pass Marks:</Label>
                  <Input
                    type="number"
                    name="passMark"
                    value={obtainedMarks.passMark}
                    onChange={handleObtaineMarksChange("passMark")}
                  />
                </Col>
              </Row>
              {/* <pre>{JSON.stringify(studentMarks, null, 2)}</pre> */}
            </Panel>
          )}

          <FormGroup row>
            <Col sm={12}>
              <div className="d-flex justify-content-end py-3">
                {studentDetail && (
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                )}
                <Button type="reset" onClick={onClose} outline color="primary">
                  Cancel
                </Button>
              </div>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    </Overlay>
  );
}
