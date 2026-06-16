// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schemas/contact';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body with Zod
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { name, email, message, submittedAt, source } = validationResult.data;
    const {
      RESEND_API_KEY,
      CONTACT_EMAIL,
      MAIL_FROM_NAME,
      MAIL_FROM_ADDRESS,
      NEXT_PUBLIC_OWNER_NAME,
      NEXT_PUBLIC_SITE_NAME,
      NEXT_PUBLIC_SITE_URL,
      ENABLE_AUTO_REPLY,
    } = process.env;

    if (!RESEND_API_KEY || !CONTACT_EMAIL || !MAIL_FROM_ADDRESS) {
      return NextResponse.json({ error: 'Server email configuration is missing' }, { status: 500 });
    }

    const resend = new Resend(RESEND_API_KEY);
    const submittedAtValue = submittedAt ?? new Date().toISOString();
    const sourceValue = source ?? NEXT_PUBLIC_SITE_URL ?? 'N/A';

    const fromEmail = `${MAIL_FROM_NAME ?? 'Portfolio'} <${MAIL_FROM_ADDRESS}>`;

    // Email gửi cho bạn
    await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL!,
      replyTo: email,
      subject: `🚀 New ${NEXT_PUBLIC_SITE_NAME} Inquiry - ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
      <h2>🚀 New ${NEXT_PUBLIC_SITE_NAME} Inquiry</h2>

      <table style="border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Name:</strong>
          </td>
          <td>${name}</td>
        </tr>

        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Email:</strong>
          </td>
          <td>
            <a href="mailto:${email}">
              ${email}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Submitted:</strong>
          </td>
          <td>${new Date(submittedAtValue).toLocaleString()}</td>
        </tr>

        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Source:</strong>
          </td>
          <td>
            <a href="${sourceValue}">
              ${sourceValue}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Website:</strong>
          </td>
          <td>
            <a href="${NEXT_PUBLIC_SITE_URL}">
              ${NEXT_PUBLIC_SITE_NAME}
            </a>
          </td>
        </tr>
      </table>

      <hr style="margin: 24px 0;" />

      <h3>Message</h3>

      <div
        style="
          background: #f5f5f5;
          padding: 16px;
          border-radius: 8px;
          white-space: pre-wrap;
        "
      >
        ${message}
      </div>
    </div>
  `,
    });

    // Auto reply cho khách
    if (ENABLE_AUTO_REPLY === 'true') {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: `Thanks for reaching out to ${NEXT_PUBLIC_SITE_NAME} 👋`,
          html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
          <h2>Thanks for reaching out 👋</h2>

          <p>Hi ${name},</p>

          <p>
            Thank you for contacting me through
            <a href="${NEXT_PUBLIC_SITE_URL}">
              ${NEXT_PUBLIC_SITE_NAME}
            </a>.
          </p>

          <p>
            I have received your message and will get back to you as soon as possible.
          </p>

          <p>
            In the meantime, feel free to explore my work and projects on the website.
          </p>

          <br />

          <p>
            Best regards,<br />
            ${NEXT_PUBLIC_OWNER_NAME}
          </p>
        </div>
      `,
        });
      } catch (error) {
        console.error('Failed to send auto reply email:', error);
      }
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
