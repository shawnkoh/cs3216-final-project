import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";

import api from "../../../api";
import { PaperData } from "backend/src/types/papers";
import { PaperUserListData } from "../../../types/paperUsers";
import { ScriptTemplateData } from "backend/src/types/scriptTemplates";
import { TableColumn } from "../../../components/tables/TableTypes";

import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Tooltip,
  Paper
} from "@material-ui/core";
import SearchBar from "../../../components/fields/SearchBar";
import LoadingSpinner from "../../../components/LoadingSpinner";
import StudentsTableRow from "./StudentsTableRow";

const useStyles = makeStyles(theme => ({
  tableWrapper: {
    overflowX: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

interface OwnProps {
  paper: PaperData;
}

type Props = OwnProps & RouteComponentProps;

const StudentsTable: React.FC<Props> = ({ paper }) => {
  const classes = useStyles();

  const [students, setStudents] = useState<PaperUserListData[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);
  const [refreshStudentsFlag, setRefreshStudentsFlag] = useState(0);

  const getStudents = () => {
    api.paperUsers
      .getStudents(paper.id)
      .then(resp => {
        setStudents(resp.data.paperUsers);
      })
      .finally(() => setIsLoadingStudents(false));
  };

  useEffect(getStudents, [refreshStudentsFlag]);

  const refreshStudents = () => {
    setTimeout(() => {
      setRefreshStudentsFlag(refreshStudentsFlag + 1);
    }, 2500);
  };
  const callbackStudents = () => {
    setTimeout(() => {
      getStudents();
    }, 2000);
  };

  const [searchText, setSearchText] = useState("");

  if (isLoadingStudents) {
    return <LoadingSpinner loadingMessage={`Loading students...`} />;
  }

  const columns: TableColumn[] = [
    {
      name: "",
      key: ""
    },
    {
      name: "Student matriculation number",
      key: "matric"
    },
    {
      name: "Name / Email",
      key: "name"
    },
    {
      name: "Score",
      key: "score"
    },
    {
      name: "",
      key: ""
    }
  ];

  const filteredStudents = students.filter(student => {
    const { user, matriculationNumber } = student;
    const matricNo = matriculationNumber || "";
    const studentName = user.name || "";
    const email  = user.email || "";
    const lowerCaseSearchText = searchText.toLowerCase();
    return ( 
      searchText === "" ||
      matricNo.toLowerCase().includes(lowerCaseSearchText) ||
      studentName.toLowerCase().includes(lowerCaseSearchText) ||
      email.toLowerCase().includes(lowerCaseSearchText)
    );
  });

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          <SearchBar
            value={""}
            placeholder="Search..."
            onChange={str => setSearchText(str)}
          />
        </Grid>
      </Grid>
      <Paper className={classes.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {column.isSortable ? (
                    <TableSortLabel
                      active={true}
                      direction={"desc"}
                      onClick={() => {}}
                    >
                      {column.name}
                    </TableSortLabel>
                  ) : (
                    column.name
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <br />
                  <div style={{ textAlign: "center" }}>No students found.</div>
                  <br />
                </TableCell>
              </TableRow>
            )}
            {filteredStudents.map((student: PaperUserListData, index) => {
              return (
                <StudentsTableRow
                  key={student.id}
                  index={index + 1}
                  student={student}
                />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default withRouter(StudentsTable);
