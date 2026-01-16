export interface Document {
  id: string;
  name: string;
  category: string;
  uploadDate: string;
  size: string;
  pages: number;
  image: any;
  details: {
    idName: string;
    gender: string;
    idNumber: string;
    state: string;
    yearOfGetting: string;
    address: string;
    folder: string;
    tags: string[];
  };
}

export const DUMMY_DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Berlin Pan Card",
    category: "Identity",
    uploadDate: "15 May 2035",
    size: "5 MB",
    pages: 2,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Cristiano Ronaldo",
      gender: "Male",
      idNumber: "ABCDE1234F",
      state: "Bihar, India",
      yearOfGetting: "2023",
      address:
        "Flat No. 204, Skyline Residency\nMG Road, Near Metro Station\nHyderabad, Telangana - 500081\nIndia",
      folder: "Identity / PAN card",
      tags: ["Identity", "Tax", "Pan"],
    },
  },
  {
    id: "2",
    name: "Berlin Aadhar Card",
    category: "Identity",
    uploadDate: "15 May 2035",
    size: "12 MB",
    pages: 2,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Cristiano Ronaldo",
      gender: "Male",
      idNumber: "1234 5678 9012",
      state: "Goa, India",
      yearOfGetting: "2024",
      address:
        "Flat No. 505, Coastal Breeze\nBeach Road, Near Lighthouse\nPanaji, Goa - 403001\nIndia",
      folder: "Identity / Aadhaar card",
      tags: ["Identity", "Main", "Aadhar"],
    },
  },
  {
    id: "3",
    name: "Investment Bond",
    category: "Finance",
    uploadDate: "10 June 2035",
    size: "2.5 MB",
    pages: 5,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Berlin Account",
      gender: "Male",
      idNumber: "FIN-987654",
      state: "Delhi, India",
      yearOfGetting: "2025",
      address: "Finance District, Tower A, Delhi",
      folder: "Finance / Investments",
      tags: ["Finance", "Bond", "Investment"],
    },
  },
  {
    id: "4",
    name: "Health Insurance Policy",
    category: "Health",
    uploadDate: "20 May 2035",
    size: "8 MB",
    pages: 12,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Berlin Health",
      gender: "Male",
      idNumber: "H-882299",
      state: "Mumbai, India",
      yearOfGetting: "2024",
      address: "Medical Plaza, Block C, Mumbai",
      folder: "Health / Insurance",
      tags: ["Health", "Insurance", "Policy"],
    },
  },
  {
    id: "5",
    name: "Passport",
    category: "Travel",
    uploadDate: "05 April 2035",
    size: "4 MB",
    pages: 36,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Berlin Travel",
      gender: "Male",
      idNumber: "Z1234567",
      state: "Karnataka, India",
      yearOfGetting: "2020",
      address: "Passport Seva Kendra, Bangalore",
      folder: "Travel / Documents",
      tags: ["Travel", "Passport", "Identity"],
    },
  },
  {
    id: "6",
    name: "Employment Contract",
    category: "Work",
    uploadDate: "12 August 2035",
    size: "1.2 MB",
    pages: 8,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Berlin Work",
      gender: "Male",
      idNumber: "W-554433",
      state: "Tamil Nadu, India",
      yearOfGetting: "2025",
      address: "Tech Park, Phase 1, Chennai",
      folder: "Work / HR",
      tags: ["Work", "Contract", "Job"],
    },
  },
  {
    id: "7",
    name: "Property Agreement",
    category: "Legal",
    uploadDate: "30 September 2035",
    size: "15 MB",
    pages: 24,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Berlin Legal",
      gender: "Male",
      idNumber: "L-112233",
      state: "Kerala, India",
      yearOfGetting: "2023",
      address: "Legal Chambers, Trivandrum",
      folder: "Legal / Property",
      tags: ["Legal", "Property", "Agreement"],
    },
  },
  {
    id: "8",
    name: "Car Insurance",
    category: "Insurance",
    uploadDate: "15 October 2035",
    size: "3 MB",
    pages: 4,
    image: require("../../assets/doc-thumbnail.png"),
    details: {
      idName: "Berlin Insurance",
      gender: "Male",
      idNumber: "I-998877",
      state: "Rajasthan, India",
      yearOfGetting: "2025",
      address: "Insurance Hub, Jaipur",
      folder: "Insurance / Car",
      tags: ["Insurance", "Car", "Vehicle"],
    },
  },
];
