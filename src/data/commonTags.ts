export const COMMON_TAGS = {
  Identity: ["Passport", "Aadhar", "PAN", "Driving License", "Voter ID", "Birth Certificate"],
  Finance: ["Tax", "Investment", "Bank Statement", "Loan", "Credit Card", "Insurance"],
  Health: ["Medical Report", "Prescription", "Insurance", "Vaccination", "Lab Results"],
  Travel: ["Visa", "Ticket", "Booking", "Itinerary", "Hotel", "Flight"],
  Work: ["Contract", "Payslip", "Offer Letter", "Resume", "Certificate", "ID Card"],
  Legal: ["Agreement", "Property", "Will", "Court Document", "License", "Registration"],
  Insurance: ["Policy", "Claim", "Premium", "Health", "Life", "Vehicle", "Home"],
  General: ["Important", "Urgent", "Archive", "Personal", "Official", "Confidential"],
};

export const getAllCommonTags = (): string[] => {
  const allTags = new Set<string>();
  Object.values(COMMON_TAGS).forEach((tags) => {
    tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
};

export const getTagsForCategory = (category: string): string[] => {
  return COMMON_TAGS[category as keyof typeof COMMON_TAGS] || COMMON_TAGS.General;
};
