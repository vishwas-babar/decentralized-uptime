import { ZodError, ZodIssue } from "zod";

/**
 * Extract and format errors from Zod validation error
 */
export const extractZodErrors = (error: ZodError): string[] => {
   return error.issues.map((issue: ZodIssue) => {
      const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
      return `${path}${issue.message}`;
   });
};

/**
 * Extract errors and return as a single formatted string
 */
export const formatZodError = (error: ZodError): string => {
   const errors = extractZodErrors(error);
   return errors.join(", ");
};

/**
 * Extract errors and return as an object with field names as keys
 */
export const extractZodErrorsAsObject = (
   error: ZodError
): Record<string, string[]> => {
   const errorObj: Record<string, string[]> = {};

   error.issues.forEach((issue: ZodIssue) => {
      const field = issue.path.length > 0 ? issue.path.join(".") : "root";

      if (!errorObj[field]) {
         errorObj[field] = [];
      }

      errorObj[field].push(issue.message);
   });

   return errorObj;
};
