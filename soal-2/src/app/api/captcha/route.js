import { NextResponse } from "next/server";

export async function POST(request) {
  const { 'g-recaptcha-response': token, rows, cols } = await request.json();
  let SECRET_KEY = "6LcMGR0qAAAAAHbneD-kt9iyQhG_COOylv-1NulH"
  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${token}`);

    if (response.data.success) {
      // reCAPTCHA verification succeeded
      // Process your form data (rows and cols) here
      return NextResponse.json({ message: 'reCAPTCHA verified successfully' });
    } else {
      return NextResponse.json({ message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error during reCAPTCHA verification' });
  }
}

