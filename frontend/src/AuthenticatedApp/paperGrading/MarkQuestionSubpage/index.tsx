import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";

import api from "../../../api";
import usePaper from "../../../contexts/PaperContext";
import {
  QuestionViewData,
  AnnotationViewData,
  PageViewData,
  ScriptViewData
} from "backend/src/types/view";

import {
  Container,
  Grid,
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Chip,
  Avatar
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowLeftIcon from "@material-ui/icons/ArrowBackIos";
import ArrowRightIcon from "@material-ui/icons/ArrowForwardIos";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";

import LoadingSpinner from "../../../components/LoadingSpinner";
import ReversedChip from "../../../components/ReversedChip";
import Annotator from "./Annotator";
import MarkQuestionModal from "./MarkQuestionModal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      flexDirection: "column",
      touchAction: "none"
    },
    innerContainer: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    grow: {
      display: "flex",
      flexGrow: 1
    },
    backButton: {
      marginRight: theme.spacing(2)
    },
    prevPageButton: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      margin: "auto"
    },
    nextPageButton: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      margin: "auto"
    },
    pageLabel: {
      position: "absolute",
      bottom: theme.spacing(10),
      left: 0,
      right: 0,
      margin: "0 auto"
    },
    questionBar: {
      backgroundColor: lightBlue[50],
      top: "auto",
      bottom: 0
    },
    questionBarItem: {
      marginRight: theme.spacing(1)
    }
  })
);

type Props = RouteComponentProps;

const MarkQuestionPage: React.FC<Props> = ({ match }) => {
  const classes = useStyles();
  const paper = usePaper();

  const questionTemplateId = parseInt(
    (match.params as { questionTemplateId: string }).questionTemplateId,
    10
  );

  const [scriptViewData, setScriptViewData] = useState<ScriptViewData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const toggleRefreshFlag = () => setRefreshFlag(!refreshFlag);

  const [pageNo, setPageNo] = useState<number>(0);
  const [pageNos, setPageNos] = useState<number[]>([0]);

  const getScriptViewData = async (questionTemplateId: number) => {
    setIsLoading(true);
    const data = await api.questionTemplates.getQuestionToMark(
      questionTemplateId
    );
    setScriptViewData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getScriptViewData(questionTemplateId);
  }, [refreshFlag]);

  useEffect(() => {
    if (scriptViewData && scriptViewData.pages.length) {
      setPageNos(scriptViewData.pages.map(page => page.pageNo));
    }
  }, [scriptViewData]);

  useEffect(() => {
    if (pageNos.length) setPageNo(pageNos[0]);
  }, [pageNos]);

  const Header = () => (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <IconButton
          color="inherit"
          component={Link}
          to={`/papers/${paper.id}/setup`}
          className={classes.backButton}
        >
          <ArrowBackIcon />
        </IconButton>
        <Grid container className={classes.grow}>
          <Grid item xs={12}>
            <Typography variant="h6">{paper.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{`Marking question template ID ${questionTemplateId}`}</Typography>
          </Grid>
        </Grid>
        <Button color="inherit" onClick={toggleRefreshFlag}>
          Next Script
        </Button>
      </Toolbar>
    </AppBar>
  );

  if (isLoading) {
    return (
      <div className={classes.container}>
        <Header />
        <LoadingSpinner loadingMessage="Loading script..." />
      </div>
    );
  }

  if (!scriptViewData) {
    return (
      <div className={classes.container}>
        <Header />
        <Container maxWidth={false} className={classes.innerContainer}>
          <Typography variant="subtitle1">An error occurred.</Typography>
        </Container>
      </div>
    );
  }

  const {
    matriculationNumber,
    rootQuestion,
    descendantQuestions,
    pages
  } = scriptViewData;

  console.log(scriptViewData); // for debugging

  if (!pages) {
    return (
      <div className={classes.container}>
        <Header />
        <Container maxWidth={false} className={classes.innerContainer}>
          <Typography variant="subtitle1">No pages to display.</Typography>
        </Container>
      </div>
    );
  }

  const lastPageNo = pageNos[pageNos.length - 1];
  const firstPageNo = pageNos[0];
  const incrementPageNo = () =>
    setPageNo(prevPageNo => {
      const nextPageNo = pageNos[pageNos.indexOf(prevPageNo) + 1];
      return Math.min(lastPageNo, isNaN(nextPageNo) ? Infinity : nextPageNo);
    });
  const decrementPageNo = () =>
    setPageNo(prevPageNo => {
      const nextPageNo = pageNos[pageNos.indexOf(prevPageNo) - 1];
      return Math.max(firstPageNo, isNaN(nextPageNo) ? -Infinity : nextPageNo);
    });

  const getCurrentPageQuestions = () => {
    const currentPage = pages.find(page => page.pageNo === pageNo)!;
    const currentPageQuestions =
      descendantQuestions === undefined ||
      descendantQuestions === null ||
      descendantQuestions.length == 0
        ? [rootQuestion]
        : descendantQuestions.filter(question =>
            currentPage.questionIds.includes(question.id)
          );
    return currentPageQuestions;
  };

  return (
    <div className={classes.container}>
      <Header />
      {pages
        .filter(page => page.pageNo === pageNo)
        .map(page => (
          <div className={classes.grow}>
            <Annotator
              key={page.id}
              pageId={page.id}
              backgroundImageSource={page.imageUrl || ""}
              foregroundAnnotation={
                page.annotations.length > 0 ? page.annotations[0].layer : []
              }
            />
          </div>
        ))}
      <AppBar position="fixed" color="inherit" className={classes.questionBar}>
        <Toolbar>
          <Typography variant="button" className={classes.questionBarItem}>
            {matriculationNumber} page {pageNo}
          </Typography>
          {getCurrentPageQuestions().map(question => (
            <MarkQuestionModal
              key={question.id}
              question={question}
              render={(toggleVisibility, score, name) => (
                <ReversedChip
                  onClick={toggleVisibility}
                  label={"Q" + name}
                  avatar={<Avatar>{score || "-"}</Avatar>}
                  color={score ? "primary" : "default"}
                  className={classes.questionBarItem}
                />
              )}
            />
          ))}
        </Toolbar>
      </AppBar>
      {pageNo !== pageNos[0] && (
        <IconButton
          onClick={decrementPageNo}
          className={classes.prevPageButton}
          color="inherit"
          aria-label="previous page"
        >
          <ArrowLeftIcon />
        </IconButton>
      )}
      {pageNo !== pageNos[pageNos.length - 1] && (
        <IconButton
          onClick={incrementPageNo}
          className={classes.nextPageButton}
          color="inherit"
          aria-label="next page"
        >
          <ArrowRightIcon />
        </IconButton>
      )}
    </div>
  );
};

export default MarkQuestionPage;