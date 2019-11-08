import React, { useState, useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import api from "../../../../api";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid
} from "@material-ui/core";
import Clear from "@material-ui/icons/Clear";
import { PaperUserListData } from "../../../../types/paperUsers";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../components/dialogs/ConfirmationDialog";

interface OwnProps {
  student: PaperUserListData;
  refreshStudents?: () => void;
}

type Props = OwnProps;

const DeleteStudentModal: React.FC<Props> = props => {
  const { student, children, refreshStudents } = props;
  const { user, matriculationNumber } = student;
  const { name } = user;
  const [isOpen, setIsOpen] = useState(false);
  const toggleVisibility = () => setIsOpen(!isOpen);

  return (
    <>
      <ConfirmationDialog
        title={`Delete student "${name}" (Matric no: ${matriculationNumber}).`}
        message={`This action is irreversible. Do you still want to delete?`}
        open={isOpen}
        handleClose={toggleVisibility}
        handleConfirm={async () => {
          api.paperUsers
            .discardPaperUser(student.id)
            .then(() => {
              toast.success(`Student ${name} has been deleted successfully.`);
              if (refreshStudents) {
                refreshStudents();
              }
            })
            .catch(errors => {
              toast.error(`Student ${name} could not be deleted.`);
            });
          toggleVisibility();
        }}
      />
      <IconButton onClick={toggleVisibility}>
        <Clear />
      </IconButton>
    </>
  );
};

export default DeleteStudentModal;
