import { NextResponse } from "next/server";
import { handleForm } from "@/lib/forms/handler";
import { formSchemas, type FormType } from "@/lib/forms/schemas";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  if (!(type in formSchemas)) return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 404 });
  return handleForm(request, type as FormType);
}
