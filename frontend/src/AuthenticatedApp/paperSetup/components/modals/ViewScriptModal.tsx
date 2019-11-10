import React, { useState, useEffect } from "react";

import api from "../../../../api";
import { ScriptData, ScriptListData } from "backend/src/types/scripts";

import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import TogglePageComponent from "../../../../components/misc/TogglePageComponent";
import Canvas from "../../../../components/Canvas";
import { CanvasMode } from "../../../../components/Canvas/types";
import LoadingSpinner from "../../../../components/LoadingSpinner";
import DialogTitleWithCloseButton from "../../../../components/dialogs/DialogTitleWithCloseButton";

interface OwnProps {
  script: ScriptListData;
  render: any;
}

type Props = OwnProps;

const ViewScriptModal: React.FC<Props> = props => {
  const { script, render } = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleVisibility = () => setIsOpen(!isOpen);

  const [scriptData, setScriptData] = useState<ScriptData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const getScript = async (scriptId: number) => {
    const data = await api.scripts.getScript(scriptId);
    setScriptData(data);
  };

  useEffect(() => {
    getScript(script.id);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Dialog open={isOpen} fullWidth onClose={toggleVisibility}>
        <DialogTitleWithCloseButton
          id="dialog-title-with-close-button"
          onClose={toggleVisibility}
        >
          {`Viewing script ${script.filename}`}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          {`Script id: ${script.id} (for debugging; remove in ViewScriptModal)`}
          {isLoading && (
            <LoadingSpinner loadingMessage="Loading script template..." />
          )}
          {!scriptData && <>This script does not exist</>}
          {scriptData &&
            scriptData.pages.map((page, index) => {
              return <img src={page.imageUrl} />;
            })}
        </DialogContent>
      </Dialog>
      {render(toggleVisibility)}
    </>
  );
};

export default ViewScriptModal;