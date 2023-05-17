import * as React from "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import MarksEvaluationTable from "~/components/MarksEvaluationTable";
import { StudentWithObtainedMarks } from "~/types/Marks";
import getConfig from "next/config";

const readFile = promisify(fs.readFile);

const wrapContent = async (contentHtml: string): Promise<string> => {
  const { serverRuntimeConfig } = getConfig();

  const layoutFile = path.join(
    serverRuntimeConfig.ROOT_PATH,
    "public",
    "pdf-layout.html"
  );
  const layoutHtml = await readFile(layoutFile, "utf-8");
  return layoutHtml.replace("<%content%>", contentHtml);
};

const renderEvaluationSheet = async (
  data: StudentWithObtainedMarks[]
): Promise<string> => {
  const content = ReactDOMServer.renderToStaticMarkup(
    <div>
      <h3>
        Marks Evaluation Sheet - <strong>Class 10 (A)</strong>
      </h3>
      <MarksEvaluationTable studentsWithObtainedMarks={data} />
    </div>
  );

  return await wrapContent(content);
};

export default renderEvaluationSheet;
