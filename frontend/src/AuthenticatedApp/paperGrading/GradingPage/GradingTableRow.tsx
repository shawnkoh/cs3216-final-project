import { Button, TableCell, TableRow, Tooltip } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { getUser } from "../../../store/auth/selectors";

interface Props {
  questionTemplate: any;
}

const GradingTableRow: React.FC<Props> = props => {
  const currentUser = useSelector(getUser);
  const { url } = useRouteMatch()!;

  const { questionTemplate } = props;

  const {
    name,
    totalScore,
    markers,
    questionCount,
    markCount
  } = questionTemplate;

  return (
    <TableRow>
      <TableCell>Q{name}</TableCell>
      <TableCell>{totalScore}</TableCell>
      <TableCell>
        {markers.map(marker => {
          const userName = marker.name ? marker.name : "-";
          return (
            <>
              {userName}
              <br />
            </>
          );
        })}
      </TableCell>
      <TableCell>
        {`${markCount} / ${questionCount} (${(
          markCount / questionCount
        ).toLocaleString(undefined, {
          style: "percent"
        })}) of questions marked`}
        <br />
      </TableCell>
      <TableCell>
        {currentUser && markers.some(marker => marker.id === currentUser.id) && (
          <Tooltip title={`Continue grading`}>
            <Button
              component={Link}
              to={`${url}/${questionTemplate.id}`}
              variant="contained"
              color="primary"
              style={{ borderRadius: 24 }}
            >
              Grade
            </Button>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

export default GradingTableRow;
