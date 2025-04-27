import { NextResponse } from "next/server";

export const buildErrorResponse = (
  status: number,
  type: string,
  message: string,
) => {
  return new NextResponse(
    JSON.stringify({
      data: {},
      errors: [
        {
          type,
          message,
        },
      ],
    }),
    { status },
  );
};
