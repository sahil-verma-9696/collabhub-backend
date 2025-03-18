import { fileURLToPath } from "url";
import path from "path";

function getFilename(importMetaUrl) {
  return path.basename(fileURLToPath(importMetaUrl));
}

function getFunctionNameAndSignature() {
  const stack = new Error().stack;
  const stackLines = stack.split("\n");

  // Skipping "Error" line and `logError()` function itself
  const match = stackLines[3]?.match(/at (\S+)/);
  const functionName = match ? match[1] : "UnknownFunction";

  return `${functionName}()`;
}

function getFormattedTimestamp() {
  return new Date().toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  });
}

export function logError(importMetaUrl, errorMessage) {
  console.error(
    `\n❌ [${getFormattedTimestamp()}] \nError in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}: \n${errorMessage}\n`
  );
}

export function logWarning(importMetaUrl, warningMessage) {
  console.warn(
    `\n⚠️ [${getFormattedTimestamp()}] \nWarning in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}: \n${warningMessage}\n`
  );
}

export function logSuccess(importMetaUrl, successMessage) {
  console.log(
    `\n✅ [${getFormattedTimestamp()}] \nSuccess in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}: \n${successMessage}\n`
  );
}

export function logInfo(importMetaUrl, infoMessage) {
  console.info(
    `\nℹ️ [${getFormattedTimestamp()}] \nInfo in ${getFilename(
      importMetaUrl
    )} -> ${getFunctionNameAndSignature()}: \n${infoMessage}\n`
  );
}
