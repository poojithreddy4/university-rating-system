import {
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  ModalProps,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import {
  QuestionObjectType,
  useGetQuestionsService,
} from "../api-services/questions-services";
import CustomRadio from "./custom-radio";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.default",
  border: "1px solid lightgray",
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflow: "auto",
  width: { xs: "80vw", md: "60vw" },
};

type Props = Omit<ModalProps, "children">;
type ResponsesType = { [key: string]: number };

const RateNowModal = (props: Props) => {
  const { data: questionsList } = useGetQuestionsService();
  const [responses, setResponses] = useState<ResponsesType>({});

  const handleSubmitRating = useCallback((resps: ResponsesType) => {
    console.log(resps);
  }, []);

  return (
    <Modal {...props}>
      <Stack
        sx={styles}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitRating(responses);
        }}
      >
        <Stack sx={{ overflow: "auto" }}>
          {questionsList?.map((q) => (
            <Stack key={q.label}>
              <Typography variant="h5" fontWeight={500}>
                {q.label}
              </Typography>
              <List>
                {q.questions.map((qn, index) => (
                  <ListItem key={qn._id}>
                    <ListItemText
                      secondaryTypographyProps={{
                        component: "div",
                      }}
                      primary={
                        <Typography variant="h6">
                          {index + 1}. {qn.question}
                        </Typography>
                      }
                      secondary={
                        <CustomRating
                          onChange={(v) =>
                            setResponses((r) => ({ ...r, [qn._id]: v }))
                          }
                          question={qn}
                          value={responses[qn._id]}
                        />
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Stack>
          ))}
        </Stack>

        <Button color="warning" variant="contained" type="submit">
          Rate Now
        </Button>
      </Stack>
    </Modal>
  );
};

export default RateNowModal;

/**
 * =========== CUSTOM RATING =========
 */
type CustomRatingProps = {
  question: QuestionObjectType;
  value: number;
  onChange: (newVal: number) => unknown;
};

const options = [
  {
    label: "Yes",
    value: 5,
  },
  {
    label: "No",
    value: 0,
  },
];

const CustomRating = ({ question, value, onChange }: CustomRatingProps) => {
  if (question.type === "rating") {
    return (
      <Rating value={value ?? null} onChange={(_, v) => onChange(v ?? 0)} />
    );
  }
  if (question.type === "boolean") {
    return (
      <CustomRadio
        options={options}
        value={value ?? null}
        onChange={(_, v) => onChange(Number(v))}
        label=""
      />
    );
  }
};
