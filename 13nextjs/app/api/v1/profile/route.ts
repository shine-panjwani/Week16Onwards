import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json({
        url : "https://images/cat.png"
    })
}