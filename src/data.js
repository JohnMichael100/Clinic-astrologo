// All site content lives here so it can be edited without touching components.
// Contact details and hours are placeholders; replace them before launch.

export const clinic = {
  name: "Dr. Astrologo",
  practice: "General Surgery",
  phone: "(555) 014-2200",
  email: "care@astrologosurgery.example",
  address: "128 Harbor Street, Suite 200",
  city: "Portside, CA 90210",
};

export const consultationFee = 1000;
export const paymentCurrency = "PHP";

export const hours = [
  { day: "Monday to Friday", time: "8:00 AM - 6:00 PM" },
  { day: "Saturday", time: "By appointment" },
  { day: "Sunday", time: "Closed" },
];

export const services = [
  {
    id: "consultations",
    icon: "stethoscope",
    title: "General surgery consultations",
    text: "One-on-one assessment to understand your concerns and talk through appropriate next steps.",
    points: ["Review symptoms and history", "Clear discussion of options", "Personalized care plan"],
  },
  {
    id: "hernia",
    icon: "shield",
    title: "Hernia care",
    text: "Evaluation of hernia symptoms, with straightforward guidance on monitoring and treatment options.",
    points: ["Hernia assessment", "Treatment options explained", "Surgical planning when appropriate"],
  },
  {
    id: "gallbladder",
    icon: "heart",
    title: "Gallbladder concerns",
    text: "Consultation for gallbladder symptoms and help understanding diagnosis and possible treatment.",
    points: ["Symptom review", "Imaging and records discussion", "Next-step planning"],
  },
  {
    id: "wound-care",
    icon: "check",
    title: "Wound and follow-up care",
    text: "Practical support for wound checks and follow-up after a surgical procedure.",
    points: ["Wound assessment", "Recovery guidance", "Follow-up planning"],
  },
];

export const doctors = [
  {
    name: "Dr. Astrologo",
    specialty: "General Surgeon",
    bio: "A personal, one-doctor practice focused on clear conversations, thoughtful surgical care, and a plan shaped around each patient.",
  },
];

export const faqs = [
  {
    q: "Do I need an appointment?",
    a: "Please book ahead so Dr. Astrologo can reserve time for your consultation. Contact the practice to ask about availability.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Bring a photo ID, a list of current medications, relevant medical records, and any recent imaging or test results you have.",
  },
  {
    q: "Will surgery be recommended at my consultation?",
    a: "Not necessarily. Your consultation is a chance to discuss your symptoms, review relevant information, and understand the options before deciding on next steps.",
  },
  {
    q: "How do I receive follow-up information?",
    a: "Dr. Astrologo will discuss the follow-up plan with you during your visit. Contact the practice if you have questions afterward.",
  },
  {
    q: "Can I change or cancel my appointment?",
    a: "Yes. Please contact the practice as soon as possible if you need to change or cancel your appointment.",
  },
];

export const timeSlots = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];
