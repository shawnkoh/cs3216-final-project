import { DiscardableData } from "./entities";
import {
  isPageTemplateListData,
  PageTemplateListData,
  PageTemplateSetupData
} from "./pageTemplates";
import {
  isQuestionTemplateListData,
  QuestionTemplateListData,
  QuestionTemplateTreeData
} from "./questionTemplates";

export interface ScriptTemplatePostData {
  sha256: string;
  imageUrls: string[];
}

// potentially deprecated
export interface ScriptTemplateData extends DiscardableData {
  pageTemplates: PageTemplateListData[];
  questionTemplates: QuestionTemplateListData[];
}

export interface ScriptTemplateSetupData {
  id: number;
  pageTemplates: PageTemplateSetupData[];
  questionTemplates: QuestionTemplateTreeData[];
}

export function isScriptTemplateData(data: any): data is ScriptTemplateData {
  return (
    data.pageTemplates.every((pageTemplate: any) =>
      isPageTemplateListData(pageTemplate)
    ) &&
    data.questionTemplates.every((questionTemplate: any) =>
      isQuestionTemplateListData(questionTemplate)
    )
  );
}
