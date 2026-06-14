// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, submittedAt, source } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { CONTACT_EMAIL, MAIL_FROM_NAME, MAIL_FROM_ADDRESS, OWNER_NAME, SITE_NAME, SITE_URL, ENABLE_AUTO_REPLY } = process.env;

    const fromEmail = `${MAIL_FROM_NAME} <${MAIL_FROM_ADDRESS}>`;

    // Email gửi cho bạn
    await resend.emails.send({
      from: fromEmail,
      to: CONTACT_EMAIL!,
      replyTo: email,
      subject: `🚀 New ${SITE_NAME} Inquiry - ${name}`,
      html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
      <h2>🚀 New ${SITE_NAME} Inquiry</h2>

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
          <td>${new Date(submittedAt).toLocaleString()}</td>
        </tr>

        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Source:</strong>
          </td>
          <td>
            <a href="${source}">
              ${source}
            </a>
          </td>
        </tr>

        <tr>
          <td style="padding: 4px 12px 4px 0;">
            <strong>Website:</strong>
          </td>
          <td>
            <a href="${SITE_URL}">
              ${SITE_NAME}
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
          subject: `Thanks for reaching out to ${SITE_NAME} 👋`,
          html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px;">
          <h2>Thanks for reaching out 👋</h2>

          <p>Hi ${name},</p>

          <p>
            Thank you for contacting me through
            <a href="${SITE_URL}">
              ${SITE_NAME}
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
            ${OWNER_NAME}
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
