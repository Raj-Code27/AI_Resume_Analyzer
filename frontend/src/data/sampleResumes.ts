export interface SampleResume {
  id: string;
  title: string;
  role: string;
  filename: string;
  targetRole: string;
  jobDescription?: string;
  content: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'fullstack-senior',
    title: 'Senior Full-Stack Engineer',
    role: 'Full-Stack Developer',
    filename: 'Alex_Morgan_Senior_FullStack.pdf',
    targetRole: 'Senior Full-Stack Engineer',
    jobDescription: `Looking for a Senior Full-Stack Engineer to architect and scale web applications using React, Node.js, TypeScript, PostgreSQL, and AWS. Experience with Docker, microservices, CI/CD pipelines, and high-concurrency systems is required.`,
    content: `ALEX MORGAN
alex.morgan@email.com • (555) 234-5678 • San Francisco, CA • linkedin.com/in/alexmorgan • github.com/alexmorgan

PROFESSIONAL SUMMARY
Senior Full-Stack Software Engineer with 6+ years of experience designing, developing, and deploying scalable distributed web applications. Expert in TypeScript, React, Node.js, Express, and cloud architecture (AWS/Docker). Demonstrated track record of reducing API latency by 42% and leading high-performing engineering teams.

CORE TECHNICAL SKILLS
• Languages: TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
• Frontend: React, Redux Toolkit, Next.js, Tailwind CSS, Webpack
• Backend & APIs: Node.js, Express.js, RESTful APIs, GraphQL, WebSockets
• Databases: PostgreSQL, MongoDB, Redis
• Cloud & DevOps: AWS (EC2, S3, ECS, Lambda), Docker, GitHub Actions, Terraform, Kubernetes basics
• Tools: Git, Jest, Vitest, Postman, Jira, Figma

PROFESSIONAL EXPERIENCE

Senior Full-Stack Engineer | CloudScale Systems Inc. | 2022 - Present
• Designed and developed resilient microservices architecture serving 2.5M daily active users using Node.js, TypeScript, and MongoDB.
• Spearheaded migration of legacy monolith to React/Next.js frontend, improving Core Web Vitals by 35% and user session duration by 18%.
• Optimized complex PostgreSQL queries and integrated Redis caching, decreasing average endpoint latency from 280ms to 85ms.
• Mentored 5 mid-level engineers in code reviews, automated testing, and CI/CD pipelines with GitHub Actions.

Full-Stack Developer | InnovateTech Labs | 2019 - 2022
• Built dynamic customer analytics dashboard using React, Recharts, and Express.js, adopted by 120+ enterprise clients.
• Implemented role-based access control (RBAC) and JWT authentication with secure refresh-token rotation.
• Automated test suites achieving 88% unit test coverage using Jest and Supertest.
• Collaborated closely with product managers and UX designers to ship features across 2-week agile sprints.

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2015 - 2019

PROJECTS
• DevMetrics Platform: Open-source developer productivity tool built with TypeScript, React, Express, and Docker. 1.2k GitHub stars.
• TaskFlow Pro: Real-time collaborative workspace with WebSockets, MongoDB, and Redis pub/sub.

CERTIFICATIONS
• AWS Certified Solutions Architect - Associate (2023)`,
  },
  {
    id: 'frontend-mid',
    title: 'Mid-Level Frontend Developer',
    role: 'Frontend Developer',
    filename: 'Jordan_Lee_Frontend_Resume.pdf',
    targetRole: 'Frontend Developer',
    jobDescription: `Seeking a skilled Frontend Developer proficient in modern React, TypeScript, responsive UI development, and state management. Strong focus on accessibility (a11y) and automated testing.`,
    content: `JORDAN LEE
jordan.lee@example.com • (555) 345-6789 • New York, NY • github.com/jordanlee

OBJECTIVE
Motivated Frontend Developer with 3 years of experience crafting responsive, accessible, and performant user interfaces using React, JavaScript, and Tailwind CSS.

SKILLS
• Languages: JavaScript, TypeScript, HTML, CSS
• Libraries/Frameworks: React, Vue.js, Tailwind CSS, Bootstrap
• Testing & Tools: Jest, Git, Vite, npm, Figma

EXPERIENCE
Frontend Developer | PixelCraft Digital | 2021 - Present
• Built responsive user interfaces for 8 client e-commerce websites using React and Tailwind CSS.
• Improved mobile performance scores on Google Lighthouse from 62 to 91 across client storefronts.
• Worked with backend engineers to integrate RESTful JSON APIs.
• Fixed cross-browser compatibility issues and ensured WCAG AA compliance.

Junior Web Developer | Apex Media Solutions | 2020 - 2021
• Developed reusable landing page components using HTML5, CSS3, and modern JavaScript.
• Maintained client websites and resolved UI bugs reported in Jira.

EDUCATION
Bachelor of Science in Information Technology | Rutgers University | 2016 - 2020`,
  },
  {
    id: 'data-ai-engineer',
    title: 'AI / Data Engineer',
    role: 'AI & Data Engineer',
    filename: 'Sam_Taylor_AI_Data_Resume.docx',
    targetRole: 'Machine Learning Engineer',
    jobDescription: `We are hiring a Machine Learning Engineer to design ML pipelines, train and evaluate NLP and LLM models, and deploy scalable inference APIs using Python, FastAPI, and PyTorch.`,
    content: `SAM TAYLOR
sam.taylor@email.com • (555) 789-0123 • Seattle, WA • linkedin.com/in/samtaylor-ai

SUMMARY
AI and Data Engineer with 4 years of experience building machine learning pipelines, fine-tuning large language models, and developing low-latency prediction microservices. Proficient in Python, PyTorch, LangChain, and Docker.

TECHNICAL EXPERTISE
• Programming: Python, SQL, C++, Bash
• Machine Learning: PyTorch, TensorFlow, Scikit-Learn, Hugging Face, LangChain
• Data Engineering: Pandas, NumPy, Apache Spark, Kafka, PostgreSQL
• Cloud & MLOps: AWS SageMaker, Docker, MLflow, FastAPI
• Databases: PostgreSQL, ChromaDB, Pinecone, Redis

EXPERIENCE
Machine Learning Engineer | NeuroData Solutions | 2022 - Present
• Developed semantic search and RAG pipeline using Hugging Face transformers and vector databases, increasing search accuracy by 27%.
• Deployed FastAPI inference services inside Docker containers on AWS ECS, serving 400+ queries per second.
• Built automated data pipelines with Apache Spark processing 500GB+ daily transaction records.

Data Analyst | Insight Partners | 2020 - 2022
• Performed statistical analysis and created automated Tableau and Python dashboards for executive leadership.
• Cleaned and prepared large unstructured datasets for predictive customer churn models.

EDUCATION
Master of Science in Data Science | University of Washington | 2018 - 2020
Bachelor of Science in Mathematics | University of Washington | 2014 - 2018`,
  },
];
