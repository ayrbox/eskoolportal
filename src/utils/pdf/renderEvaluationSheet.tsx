import * as React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import MarksEvaluationTable from "~/components/MarksEvaluationTable";
import { StudentWithObtainedMarks } from "~/types/Marks";

const readFile = promisify(fs.readFile);

const wrapContent = async (contentHtml: string): Promise<string> => {
  const layoutFile = "./pdf-layout.html";

  console.log("xxxxxx", __dirname);
  console.log(">>>>>>>>", layoutFile);
  const layoutHtml = await readFile(layoutFile, "utf-8");

  return layoutHtml.replace("<%content%>", contentHtml);
};

const renderEvaluationSheet = async (
  data: StudentWithObtainedMarks[]
): Promise<string> => {
  const content = ReactDOMServer.renderToStaticMarkup(
    <MarksEvaluationTable studentsWithObtainedMarks={data} />
  );
  return content;

  // return await wrapContent(content);
};

export default renderEvaluationSheet;
