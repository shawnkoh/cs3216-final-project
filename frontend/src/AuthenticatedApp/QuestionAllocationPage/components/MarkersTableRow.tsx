import {
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Tooltip
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Delete from "@material-ui/icons/Delete";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  AllocationListData,
  AllocationPostData
} from "backend/src/types/allocations";
import { QuestionTemplateData } from "backend/src/types/questionTemplates";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sumArray } from "utils/arrays";
import api from "../../../api";
import { getUser } from "../../../store/auth/selectors";
import { PaperUserListData } from "../../../types/paperUsers";
import DeleteMarkerModal from "./DeleteMarkerModal";
import ReversedChip from "../../../components/ReversedChip";

const useStyles = makeStyles(theme => ({
  green: {
    color: "green"
  },
  red: {
    color: "red"
  },
  grey: {
    color: "grey"
  },
  black: {
    color: "black"
  },
  chip: {
    marginRight: theme.spacing(2)
  },
  unallocatedChip: {
    marginRight: theme.spacing(2),
    opacity: 0.4
  }
}));

interface OwnProps {
  index: number;
  columns: number;
  marker: PaperUserListData;
  questionTemplates: QuestionTemplateData[];
  refreshMarkers: () => void;
}

type Props = OwnProps;

const MarkersTableRow: React.FC<Props> = props => {
  const classes = useStyles();
  const currentUser = useSelector(getUser);
  const { refreshMarkers, index, columns, questionTemplates, marker } = props;
  const { user } = marker;
  const { name, email } = user;

  const [canSeeAllocatedQuestions, setCanSeeAllocatedQuestions] = useState(
    false
  );
  const toggleCanSeeAllocatedQuestions = () =>
    setCanSeeAllocatedQuestions(!canSeeAllocatedQuestions); 

  const [allocations, setAllocations] = useState<AllocationListData[]>([]);

  const getAllocations = () => {
    api.allocations
      .getAllocationsOfMarker(marker.id)
      .then(res => setAllocations(res.data.allocations));
  };

  const deleteAllocation = (allocationId: number) => {
    api.allocations
      .deleteAllocation(allocationId)
      .then(() => getAllocations())
      .catch(() => toast.error("Question allocation could not be made."));
  };

  const postAllocation = (questionTemplateId: number) => {
    const allocationPostData: AllocationPostData = {
      paperUserId: marker.id
    };
    api.allocations
      .createAllocation(questionTemplateId, allocationPostData)
      .then(res => {
        getAllocations();
      })
      .catch(() => toast.error("Question allocation could not be made."));
  };

  useEffect(getAllocations, []);

  const allocatedQuestionTemplateIdToAllocationIdMap = new Map<
    number,
    number
  >();
  for (let i = 0; i < allocations.length; i++) {
    const allocation = allocations[i];
    allocatedQuestionTemplateIdToAllocationIdMap.set(
      allocation.questionTemplateId,
      allocation.id
    );
  }

  const questionTemplateScores = questionTemplates.map(questionTemplate =>
    allocatedQuestionTemplateIdToAllocationIdMap.get(questionTemplate.id) &&
    questionTemplate.score
      ? questionTemplate.score
      : 0
  );
  const totalScore = sumArray(questionTemplateScores);

  return (
    <>
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>{name ? name : "-"}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>
          {currentUser && currentUser.id !== user.id && (
            <DeleteMarkerModal
              marker={marker}
              refreshMarkers={refreshMarkers}
              render={toggleModal => (
                <Tooltip title={"Delete marker"}>
                  <IconButton className={classes.red} onClick={toggleModal}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              )}
            />
          )}
        </TableCell>
        <TableCell>
          <IconButton onClick={toggleCanSeeAllocatedQuestions}>
            {canSeeAllocatedQuestions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {canSeeAllocatedQuestions && (
        <TableRow>
          <TableCell />
          <TableCell>Total marks: {totalScore}</TableCell>
          <TableCell colSpan={columns - 2}>
            {questionTemplates.map(questionTemplate => {
              const allocationId = allocatedQuestionTemplateIdToAllocationIdMap.get(
                questionTemplate.id
              );
              return (
                <ReversedChip
                  variant="outlined"
                  avatar={<Avatar>{questionTemplate.score}</Avatar>}
                  label={"Q" + questionTemplate.name}
                  className={
                    allocationId ? classes.chip : classes.unallocatedChip
                  }
                  onClick={() => {
                    allocationId
                      ? deleteAllocation(allocationId)
                      : postAllocation(questionTemplate.id);
                  }}
                />
              );
            })}
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

export default MarkersTableRow;
