export const EMAILJS_CONFIG = {
  serviceId:
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_x556en8",
  templateId:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_spojanl",
  publicKey:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "RhJw_v_DMSUblJIw3",
} as const;

export const EMAILJS_INVALID_ACCOUNT_MESSAGE =
  "Email service account not found. Please update the EmailJS credentials.";
