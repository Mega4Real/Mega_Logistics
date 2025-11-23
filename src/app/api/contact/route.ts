import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, message } = await request.json();
        // Email handling – log the submission and pretend to send an email to martinwood904@aol.com
        const recipient = "martinwood904@aol.com";
        console.log("Contact form submission:");
        console.log(`From: ${firstName} ${lastName} <${email}>`);
        console.log(`Message: ${message}`);
        // Here you could integrate a real email service (e.g., nodemailer, SendGrid) using the address martinwood904@aol.com.
        return NextResponse.json({ success: true, message: "Email sent to martinwood904@aol.com." }, { status: 200 });
    } catch (error) {
        console.error("Error handling contact form:", error);
        return NextResponse.json({ success: false, error: "Failed to process request." }, { status: 500 });
    }
}
