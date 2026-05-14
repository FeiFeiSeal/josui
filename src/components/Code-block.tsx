/*
 * @Author:FeiFeiSeal
 * @Date:2025-05-12 18:53:31
 * @LastEditors:FeiFeiSeal
 * @LastEditTime:2025-05-13 10:20:10
 * @Description:
 */

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <SyntaxHighlighter
      language="css"
      style={coldarkDark}
      customStyle={{
        margin: "0px",
        borderRadius: "var(--radius)",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;