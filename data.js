// This is the single source of truth for your content. Update it with your real details.
const portfolioData = {
  name: "Ankit",
  role: "Computer Science Student & Developer",
  location: "Bhilai, Chhattisgarh, India",
  education: "B.Tech in Computer Science and Engineering, Rungta College of Engineering and Technology (2022–2026), 7.4 CGPA",
  educationHistory: [
    {
      stage: "Undergraduate",
      school: "Rungta College of Engineering and Technology",
      univ: "Affiliated to: Chhattisgarh Swami Vivekanand Technical University (CSVTU)",
      detail: "Bachelor of Technology in Computer Science and Engineering (Specialization in Data Science) • 7.4 CGPA",
      duration: "Sep 2022 – May 2026",
      place: "📍Bhilai, Chhattisgarh",
      photo: "assets/rungta_pic.webp"
    },
    {
      stage: "Secondary",
      school: "St. Xavier's School",
      univ: "Affiliated to: Indian School Certificate Examinations (ICSE)",
      detail: "Intermediate in Science · 82.5%",
      duration: "",//"May 2021",
      place: "📍Bokaro Steel City, Jharkhand",
      // Add a photo of the school here later, same pattern as the project thumbnails.
      photo: "assets/st.xav_bok.jpg"
    }
    
  ],

    internships: [
    {
      title: "AWS Cloud Trainee",
      organization: "EduSkills · AICTE",
      duration: "October 2025 – December 2025",
      description: "AWS Cloud training completed through the EduSkills AICTE Internship."
    },
    {
      title: "Power BI Intern",
      organization: "Microsoft Elevate · AICTE",
      duration: "December 2025 – January 2026",
      description: "Power BI internship completed through the Microsoft Elevate and AICTE program."
    }
  ],
  // Each course gets a short blurb plus a large background "watermark" icon (emoji is
  // fine — swap for an SVG later if you want something sharper) shown faded behind the text.
  coursework: [
    { title: "Data Structures & Algorithms", blurb: "Core structures and algorithmic thinking for writing efficient, scalable code.", icon: "🌳" },
    { title: "Software Engineering", blurb: "Practices for designing, building, and maintaining reliable software systems.", icon: "🛠️" },
    { title: "Data Analytics & Visualization", blurb: "Turning raw data into visual insight through structured analysis.", icon: "📊" },
    { title: "Database Management", blurb: "Relational design, normalization, and query fundamentals.", icon: "🗄️" },
    { title: "Artificial Intelligence & Machine Learning", blurb: "Foundations of intelligent systems and learning-based models.", icon: "🤖" },
    { title: "Object-Oriented Programming", blurb: "Modeling software through classes, objects, and encapsulation.", icon: "🧩" },
    { title: "Operating Systems", blurb: "Process management, memory handling, and system-level concepts.", icon: "💻" },
    { title: "Computer Architecture", blurb: "How hardware components execute and support running software.", icon: "🖥️" }
  ],
  email: "ankit108120@gmail.com",
  phone: "+91 6201508881",
  github: "https://github.com/Ankit-8881",
  linkedin: "https://www.linkedin.com/in/ankit8881",
  skills: [
    ["Languages", "C++, Python, Java, JavaScript, SQL"], ["Web & data", "HTML5, CSS, Flask, Streamlit, SQLite"],
    ["Analytics", "Power BI, Tableau, SAP Analytics Cloud"], ["Cloud & tools", "AWS Cloud, Google Cloud, Git, GitHub, Figma"]
  ],
  projects: [
    {
      number: "01",
      title: "Automated Data Verification System",
      type: "Document intelligence web app",
      date: "November 2024",
      description: "A web app that extracts and cross-verifies user-entered details—like name, date of birth, and parents' names—against identity and academic documents, using OCR and fuzzy matching to automate checks that used to be manual.",
      stack: ["Python", "Tesseract OCR", "spaCy", "Pandas", "NumPy"],
      github: "https://github.com/Ankit-8881",
      live: "#",
      thumbnail: "assets/ADVS.png",
      // Shown as a hoverable badge on the project card, with the certificate as proof.
      award: {
        label: "3rd Position – College Project Competition",
        image: "assets/awards/3rd-position-certificate.png",
        link: "assets/awards/3rd-position-certificate.pdf"
      },
      color: "violet"
    },
    {
      number: "02",
      title: "Resume Parser",
      type: "Recruitment intelligence app",
      date: "May 2025",
      description: "A role-based app for recruiters and applicants that matches résumés to job descriptions using semantic similarity, extracts key skills and sections from PDFs, and recommends skill-gap courses—cutting manual screening effort by 60%.",
      stack: ["Python", "Flask", "SQLite", "OpenAI API", "HTML5", "CSS", "JavaScript"],
      github: "https://github.com/Ankit-8881",
      live: "#",
      thumbnail: "assets/resumate.png",
      color: "green"
    }
  ],
  // Each certification names the skill it backs up, plus an optional `image` path
  // to the actual certificate. Leave `image` blank until you have a scanned copy—
  // a "Certificate coming soon" placeholder shows instead, same as the projects thumbnails.
  certifications: [
    { title: "Google Cloud Data Analytics", issuer: "Google Cloud", skill: "Data Analytics", description: "Covered data pipelines, BigQuery, and building dashboards for cloud-based analytics workflows.", image: "assets/google_cloud.png", link: "https://www.credly.com/badges/c4d2cd45-701e-44d0-a550-d7e53c0b095f/public_url" },
    { title: "DSA with C++", issuer: "Campus Connection", skill: "Data Structures & Algorithms", description: "Structured practice in arrays, trees, graphs, and complexity analysis using C++.", image: "" },
    { title: "Java Deep Diving", issuer: "Udemy", skill: "Java", description: "In-depth Java fundamentals: OOP concepts, collections, and exception handling.", image: "assets/Udemy_Java.png" , link: "https://www.udemy.com/certificate/UC-58d97e8d-5812-4092-a771-53fe47e28e38/" },
    { title: "Data Analytics Virtual Job Simulation", issuer: "Deloitte Australia (Forage)", skill: "Business Analytics", description: "A simulated consulting engagement covering data classification and forensic technology analysis.", image: "assets/deloitte_forage.png" ,link: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_o76Brdbu3ryuS7CWo_1750166249342_completion_certificate.pdf"},
    { title: "SAP Business Data Cloud", issuer: "SAP · Course Completion", skill: "Cloud & ERP Analytics", description: "Introduction to SAP's cloud data platform for integrating and analyzing enterprise business data.", image: "assets/sap_buss.png" ,link: "https://badger.learning.sap.com/verify/xanyp-cedaf-poduf-temyg-pacel"},
    { title: "Data Visualization in Tableau & Python", issuer: "Udemy", skill: "Data Analytics", description: "Gained advanced knowledge of Java programming concepts and practical problem‑solving skills for building robust applications.", image: "assets/Udemy_Tableau.png" ,link: "https://www.udemy.com/certificate/UC-e40b0e36-4d5f-43d1-990c-bc5785b40d05/"}
  ],
  achievements: [
    "Secured 3rd position in a college project competition for the Automated Data Verification System, recognized for excellence."
  ]
};
