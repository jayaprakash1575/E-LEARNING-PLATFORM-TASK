export const INITIAL_COURSES = [
  {
    id: "course-1",
    title: "Full-Stack Web Architecture 2026: React 19, Next.js & Node.js",
    slug: "fullstack-react-nextjs-node-india",
    subtitle: "Build Flipkart & Blinkit scale high-concurrency web applications with the modern JavaScript ecosystem.",
    description: "Master modern full-stack web development engineered for Indian tech scale. You will build high-throughput e-commerce and quick-commerce systems capable of handling Big Billion Days traffic, utilizing React 19 Server Components, Next.js App Router, Node.js microservices, PostgreSQL, Redis caching, Razorpay payment gateway integration, and automated CI/CD pipelines.",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.9,
    ratingCount: 4820,
    studentsEnrolled: 32450,
    duration: "42 hours",
    totalDurationHours: 42,
    lessonsCount: 48,
    price: 4999,
    originalPrice: 9999,
    isBestseller: true,
    isTrending: true,
    isFeatured: true,
    updatedAt: "March 2026",
    language: "English & Hinglish",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    instructor: {
      name: "Prof. R. Ananthakrishnan",
      role: "Ex-Flipkart Principal Architect & IIT Madras Alum",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      bio: "14+ years building high-load distributed systems at Flipkart and Walmart Labs in Bengaluru. Mentored over 85,000 South Indian engineers.",
      rating: 4.95,
      studentsCount: 140000,
      coursesCount: 5
    },
    whatYouWillLearn: [
      "Master React 19 Server Components, Actions, and modern state architectures",
      "Build production-grade APIs using Node.js, Express, and Prisma ORM",
      "Integrate Razorpay & UPI payment webhooks with automated reconciliation",
      "Deploy scalable applications to AWS Mumbai (ap-south-1) with automated CI/CD",
      "Optimize web performance, Core Web Vitals, and SEO for 4G/5G Indian mobile networks",
      "Implement real-time inventory updates using WebSockets and Redis pub/sub"
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and elementary JavaScript (ES6+)",
      "A laptop (Windows, Mac, or Linux) with Node.js installed",
      "No prior experience with React or backend engineering required"
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Modern JavaScript & React 19 Core Mechanics",
        duration: "8 hours",
        lessons: [
          {
            id: "l1",
            title: "1.1 Indian Tech Ecosystem & Full-Stack Roadmap 2026",
            duration: "14:20",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Comprehensive overview of salary benchmarks in Bengaluru/Gurugram/Hyderabad, tech stack trends, and local dev setup.",
            resources: ["Indian Tech Hiring Guide 2026 PDF", "Starter GitHub Repository"]
          },
          {
            id: "l2",
            title: "1.2 React 19 Core Mechanics & Server Components",
            duration: "22:45",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            summary: "Deep dive into React 19 updates: Server Components, useTransition, useActionState, and compiler optimization.",
            resources: ["React 19 Cheatsheet", "Code Sandbox Snippet"]
          },
          {
            id: "l3",
            title: "1.3 State Management at Scale: Zustand & TanStack Query",
            duration: "18:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            summary: "Comparing Context API, Zustand, and TanStack Query for optimal client and server cache synchronization.",
            resources: ["State Patterns Guide"]
          }
        ],
        quiz: {
          id: "q1",
          title: "Module 1 Assessment: React 19 Architecture",
          questions: [
            {
              id: "q1-1",
              question: "What is the primary benefit of React Server Components (RSC) for Indian mobile users?",
              options: [
                "They run exclusively in client browser memory",
                "They dramatically reduce client bundle size, improving performance on variable mobile networks",
                "They eliminate the need for any CSS",
                "They only work on desktop browsers"
              ],
              correctAnswer: 1,
              explanation: "RSC executes code on the server, avoiding sending large JavaScript bundles over mobile networks."
            },
            {
              id: "q1-2",
              question: "Which hook is introduced in React 19 to handle asynchronous form submissions?",
              options: ["useActionState", "useHistory", "useSyncExternalStore", "useMountedState"],
              correctAnswer: 0,
              explanation: "useActionState manages pending states and results for async actions seamlessly."
            }
          ]
        }
      },
      {
        id: "m2",
        title: "Module 2: High-Load Backend Design with Node.js & Prisma",
        duration: "12 hours",
        lessons: [
          {
            id: "l4",
            title: "2.1 Designing Resilient REST APIs for Indian e-Commerce",
            duration: "25:30",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            summary: "Layered architecture pattern with controllers, services, repositories, and error middleware.",
            resources: ["REST Standards Specification", "Express Boilerplate"]
          },
          {
            id: "l5",
            title: "2.2 PostgreSQL Indexing & Flash-Sale Inventory Locking",
            duration: "31:15",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            summary: "Designing normalized schemas, relationships, pessimistic locking, and automated Prisma migrations.",
            resources: ["Prisma Schema Templates"]
          }
        ],
        quiz: {
          id: "q2",
          title: "Module 2 Assessment: API & Database Design",
          questions: [
            {
              id: "q2-1",
              question: "Why is Redis caching crucial during high-traffic events like Diwali sales?",
              options: [
                "It replaces HTML",
                "It serves frequently requested product catalog data from in-memory cache, shielding the primary database",
                "It only works with payments",
                "It is a frontend CSS library"
              ],
              correctAnswer: 1,
              explanation: "Redis handles sub-millisecond in-memory reads, preventing database connection exhaustion during peak traffic."
            }
          ]
        }
      },
      {
        id: "m3",
        title: "Module 3: Razorpay, UPI Integration & Security",
        duration: "10 hours",
        lessons: [
          {
            id: "l6",
            title: "3.1 Seamless UPI & Net Banking Checkout Flow",
            duration: "28:40",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
            summary: "Setting up Razorpay API keys, order creation, UPI QR generation, and signature verification.",
            resources: ["Razorpay Integration Checklist"]
          },
          {
            id: "l7",
            title: "3.2 Webhook Signature Verification & Idempotency",
            duration: "24:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            summary: "Handling payment success callbacks securely without duplicate credit issues.",
            resources: ["Webhook Security Guide"]
          }
        ]
      },
      {
        id: "m4",
        title: "Module 4: AWS Mumbai Deployment & Performance",
        duration: "12 hours",
        lessons: [
          {
            id: "l8",
            title: "4.1 Deploying Full-Stack Apps to AWS ap-south-1",
            duration: "20:00",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
            summary: "Multi-stage Docker builds, AWS ECS, RDS PostgreSQL, and CloudFront CDN configuration.",
            resources: ["AWS Architecture Blueprint"]
          },
          {
            id: "l9",
            title: "4.2 Monitoring, Sentry Error Alerts & Production Launch",
            duration: "26:50",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
            summary: "Setting up Prometheus, Grafana, Sentry error alerts, and Lighthouse 100/100 audits.",
            resources: ["Production Launch Checklist"]
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "AI & Large Language Models: Prompt Engineering to Autonomous Agents",
    slug: "ai-llms-prompt-engineering-to-agents-india",
    subtitle: "Master OpenAI, Claude, LangChain, and RAG pipelines curated by IISc Bengaluru researchers.",
    description: "Step into the forefront of generative artificial intelligence with India's premier AI curriculum. Understand Transformer attention mechanisms, master multi-turn conversational agents, and build Retrieval-Augmented Generation (RAG) semantic search pipelines with Indic languages support using LangChain, LlamaIndex, and Python.",
    category: "AI & Machine Learning",
    level: "Advanced",
    rating: 4.96,
    ratingCount: 3940,
    studentsEnrolled: 26800,
    duration: "36 hours",
    totalDurationHours: 36,
    lessonsCount: 42,
    price: 5999,
    originalPrice: 11999,
    isBestseller: true,
    isTrending: true,
    isFeatured: true,
    updatedAt: "February 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    instructor: {
      name: "Dr. Lakshmi Narayanan",
      role: "Lead AI Research Scientist, IISc Bengaluru & Ex-Microsoft India R&D",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "Ph.D. in Computer Science from IISc Bengaluru. Published 18+ papers in ACL & NeurIPS. Leading generative AI research for enterprise solutions across Bengaluru and Hyderabad.",
      rating: 4.98,
      studentsCount: 110000,
      coursesCount: 4
    },
    whatYouWillLearn: [
      "Understand Transformer self-attention math and tokenization schemes",
      "Construct high-precision few-shot prompts and reasoning chains",
      "Build custom RAG pipelines with Pinecone, ChromaDB, and hybrid semantic search",
      "Create autonomous reasoning agents using ReAct frameworks and tool calling",
      "Fine-tune open-source models (Llama 3, Mistral) on Indian enterprise datasets using LoRA",
      "Deploy scalable, low-latency AI endpoints with rate limiting and guardrails"
    ],
    requirements: [
      "Familiarity with Python programming syntax",
      "Basic understanding of REST APIs and HTTP requests",
      "Curiosity about generative artificial intelligence and neural networks"
    ],
    modules: [
      {
        id: "m2-1",
        title: "Module 1: Transformer Foundations & Prompt Science",
        duration: "7 hours",
        lessons: [
          {
            id: "l2-1",
            title: "1.1 How Transformers Think: Attention & Embeddings",
            duration: "21:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Demystifying token spaces, contextual vector embeddings, and self-attention math.",
            resources: ["Visual Transformers Interactive Guide"]
          },
          {
            id: "l2-2",
            title: "1.2 Advanced Prompt Design & Structured Outputs",
            duration: "29:40",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            summary: "Constrained JSON decoding, system prompt hardening, and adversarial injection defense.",
            resources: ["Prompt Engineering Bible v3.2"]
          }
        ],
        quiz: {
          id: "q2-1",
          title: "Module 1 Assessment: Embeddings & Attention",
          questions: [
            {
              id: "q2-1-1",
              question: "What does an embedding vector represent in natural language processing?",
              options: [
                "An image pixel array",
                "A mathematical point in high-dimensional vector space capturing semantic meaning",
                "A private key for encryption",
                "A database primary key"
              ],
              correctAnswer: 1,
              explanation: "Embeddings position semantically related words and queries near each other in vector space."
            }
          ]
        }
      },
      {
        id: "m2-2",
        title: "Module 2: Vector Databases & Enterprise RAG",
        duration: "11 hours",
        lessons: [
          {
            id: "l2-3",
            title: "2.1 Chunking Strategies & Hybrid Search",
            duration: "24:15",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            summary: "Recursive character chunking vs semantic parent-document retrievers for enterprise docs.",
            resources: ["Chunking Benchmark Guide"]
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "UI/UX Design Masterclass: Systems, Figma, & Indian FinTech Interactions",
    slug: "ui-ux-design-masterclass-cred-swiggy",
    subtitle: "Design award-winning apps inspired by CRED, Swiggy, and Apple design languages.",
    description: "Transform your visual design and user experience skills. Discover how elite design teams at CRED, Swiggy, and Razorpay craft tactile micro-interactions, dark mode aesthetics, multi-lingual Indian user interfaces, and scalable design systems in Figma.",
    category: "UI/UX Design",
    level: "Beginner",
    rating: 4.91,
    ratingCount: 2720,
    studentsEnrolled: 19400,
    duration: "24 hours",
    totalDurationHours: 24,
    lessonsCount: 32,
    price: 3499,
    originalPrice: 7499,
    isBestseller: false,
    isTrending: true,
    isFeatured: true,
    updatedAt: "January 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    instructor: {
      name: "Priya Nambiar",
      role: "Staff Product Designer at CRED, Bengaluru",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Ex-Swiggy Design Lead. Creator of acclaimed dark-mode and neo-brutalist FinTech design systems with 10+ years shaping top Indian mobile experiences.",
      rating: 4.94,
      studentsCount: 72000,
      coursesCount: 3
    },
    whatYouWillLearn: [
      "Master Figma Auto-Layout 5.0, Component Variants, and Design Tokens",
      "Create ultra-slick dark mode FinTech user experiences with glowing accents",
      "Design accessible interfaces for Tier-2 and Tier-3 Indian digital consumers",
      "Craft smooth spring micro-interactions and swipe-to-pay animations",
      "Conduct rapid usability testing with Indian user cohorts",
      "Export design token packages for React and React Native engineers"
    ],
    requirements: [
      "A free Figma account",
      "A laptop or desktop computer with internet access",
      "No prior design experience required — starts with visual fundamentals"
    ],
    modules: [
      {
        id: "m3-1",
        title: "Module 1: Visual Design Foundations & FinTech Aesthetics",
        duration: "6 hours",
        lessons: [
          {
            id: "l3-1",
            title: "1.1 The CRED Aesthetic: Neumorphism, Shadows & Contrast",
            duration: "18:30",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Understanding negative space, 8pt spatial rhythm, and high-contrast dark palette theory.",
            resources: ["Design Rhythm Templates", "8pt Grid Cheatsheet"]
          },
          {
            id: "l3-2",
            title: "1.2 Typography Hierarchy for English + Regional Scripts",
            duration: "24:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            summary: "Constructing harmonic HSL color palettes and accessible contrast ratios for multilingual interfaces.",
            resources: ["Type Scale Calculator", "Color Palette Generator"]
          }
        ],
        quiz: {
          id: "q3-1",
          title: "Module 1 Assessment: Spatial Systems & Typography",
          questions: [
            {
              id: "q3-1-1",
              question: "Why is the 8-point spatial grid system widely adopted in UI design?",
              options: [
                "Because 8 is a lucky number in design",
                "It scales uniformly across different screen resolutions and prevents sub-pixel blurring",
                "It only works with 8-bit graphics",
                "It reduces screen brightness"
              ],
              correctAnswer: 1,
              explanation: "Most display resolutions divide cleanly by 8 or 4, ensuring crisp element rendering without blurred fractional pixels."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-4",
    title: "Cloud DevOps & Kubernetes: Architecting for 10M+ UPI Transactions",
    slug: "cloud-devops-kubernetes-upi-scale-india",
    subtitle: "Deploy resilient infrastructure with Docker, Kubernetes, Terraform, and AWS Mumbai.",
    description: "Learn infrastructure engineering capable of handling India's staggering digital transaction volumes. Master Kubernetes cluster management, Infrastructure as Code with Terraform, zero-downtime rolling deployments, ArgoCD GitOps, and real-time observability at Razorpay & Swiggy scale.",
    category: "Cloud & DevOps",
    level: "Intermediate",
    rating: 4.93,
    ratingCount: 2480,
    studentsEnrolled: 18200,
    duration: "34 hours",
    totalDurationHours: 34,
    lessonsCount: 38,
    price: 5499,
    originalPrice: 10999,
    isBestseller: true,
    isTrending: false,
    isFeatured: true,
    updatedAt: "February 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    instructor: {
      name: "Dr. Ashwin Rajagopal",
      role: "Lead SRE & Cloud Architect, AWS Community Hero, Chennai",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      bio: "Certified Kubernetes Administrator (CKA). Built multi-region high-availability cloud systems processing 10M+ daily UPI transactions with 99.999% uptime across Chennai and Bengaluru datacenters.",
      rating: 4.96,
      studentsCount: 86000,
      coursesCount: 5
    },
    whatYouWillLearn: [
      "Deploy and manage production Kubernetes clusters on AWS EKS",
      "Write modular Infrastructure as Code using Terraform for AWS ap-south-1",
      "Automate progressive delivery with ArgoCD and GitOps workflows",
      "Implement zero-downtime rolling updates, canary releases, and auto-scaling",
      "Configure centralized observability with Prometheus, Grafana, and Loki",
      "Harden cloud security complying with RBI digital payment guidelines"
    ],
    requirements: [
      "Basic familiarity with Linux terminal commands",
      "Basic networking concepts (IP, DNS, HTTP/S)",
      "A computer with internet connection"
    ],
    modules: [
      {
        id: "m4-1",
        title: "Module 1: Containerization & Docker Internals",
        duration: "8 hours",
        lessons: [
          {
            id: "l4-1",
            title: "1.1 Linux Namespaces, Cgroups & Container Internals",
            duration: "23:50",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Unpacking what a container really is in the Linux kernel.",
            resources: ["Container Architecture Diagram"]
          },
          {
            id: "l4-2",
            title: "1.2 Minimal, Secure Multi-Stage Dockerfiles",
            duration: "26:30",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            summary: "Distroless images, vulnerability scanning with Trivy, and layer caching optimization.",
            resources: ["Multi-Stage Templates"]
          }
        ],
        quiz: {
          id: "q4-1",
          title: "Module 1 Assessment: Containers & Security",
          questions: [
            {
              id: "q4-1-1",
              question: "What Linux feature restricts CPU and Memory allocation for containers?",
              options: ["Cgroups (Control Groups)", "Namespaces", "IPTables", "Cron"],
              correctAnswer: 0,
              explanation: "Cgroups manage and limit hardware resource allocation for running container processes."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-5",
    title: "Python Data Science: Swiggy Delivery & IPL Cricket Analytics",
    slug: "python-data-science-swiggy-ipl-analytics",
    subtitle: "Master data wrangling, machine learning, and predictive models using Indian real-world datasets.",
    description: "Extract actionable business insights from iconic Indian datasets. Learn data wrangling with Pandas & NumPy, exploratory statistical visualization with Seaborn, machine learning algorithms with Scikit-Learn, and build delivery time prediction models inspired by Swiggy alongside IPL match prediction algorithms.",
    category: "AI & Machine Learning",
    level: "Beginner",
    rating: 4.88,
    ratingCount: 3510,
    studentsEnrolled: 31900,
    duration: "30 hours",
    totalDurationHours: 30,
    lessonsCount: 35,
    price: 0,
    originalPrice: 4999,
    isBestseller: false,
    isTrending: false,
    isFeatured: true,
    updatedAt: "January 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    instructor: {
      name: "Dr. Divya Murugesan",
      role: "Principal Data Scientist, Swiggy Data Labs & NIT Trichy Ph.D.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "10+ years mentoring top data science and ML engineering teams across Bengaluru and Chennai tech corridors.",
      rating: 4.92,
      studentsCount: 110000,
      coursesCount: 4
    },
    whatYouWillLearn: [
      "Master Pandas dataframes, indexing, aggregation, and vectorization",
      "Craft interactive dashboards and statistical visualizations with Seaborn",
      "Predict delivery transit times using regression models (Swiggy use case)",
      "Analyze player performance and match win probabilities using IPL match data",
      "Handle missing data, feature scaling, and categorical encoding",
      "Deploy prediction endpoints via FastAPI"
    ],
    requirements: [
      "Basic understanding of Python programming syntax",
      "High-school level algebra and basic statistics"
    ],
    modules: [
      {
        id: "m5-1",
        title: "Module 1: Exploratory Data Analysis with Pandas",
        duration: "8 hours",
        lessons: [
          {
            id: "l5-1",
            title: "1.1 High-Performance Data Ingestion with Pandas",
            duration: "21:40",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Handling large CSVs and Parquet files with memory optimization.",
            resources: ["Pandas Cheat Sheet 2026"]
          },
          {
            id: "l5-2",
            title: "1.2 Statistical Plotting with Matplotlib & Seaborn",
            duration: "25:10",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            summary: "Visualizing Swiggy delivery times across peak Bengaluru traffic hours.",
            resources: ["Plotting Template Notebook"]
          }
        ],
        quiz: {
          id: "q5-1",
          title: "Module 1 Assessment: Data Wrangling",
          questions: [
            {
              id: "q5-1-1",
              question: "Which file format is column-oriented and significantly faster than CSV for analytical queries?",
              options: ["JSON", "XML", "Apache Parquet", "Plain Text"],
              correctAnswer: 2,
              explanation: "Parquet stores data by column, allowing selective loading and superior compression."
            }
          ]
        }
      }
    ]
  },
  {
    id: "course-6",
    title: "Cross-Platform Mobile Apps with React Native & Expo",
    slug: "cross-platform-react-native-zomato-scale",
    subtitle: "Ship native iOS and Android apps optimized for 500M Indian smartphones.",
    description: "Build fluid, fast mobile apps that run smoothly on budget smartphones across India. Learn Expo EAS builds, native camera & geolocation tracking, offline SQLite caching, smooth 60fps gestures with Reanimated, and Play Store publishing.",
    category: "Mobile Development",
    level: "Intermediate",
    rating: 4.88,
    ratingCount: 1950,
    studentsEnrolled: 15200,
    duration: "26 hours",
    totalDurationHours: 26,
    lessonsCount: 30,
    price: 3999,
    originalPrice: 7999,
    isBestseller: false,
    isTrending: true,
    isFeatured: false,
    updatedAt: "February 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    instructor: {
      name: "Harish Venkataraman",
      role: "Lead Mobile Architect, Ex-Swiggy & Freshworks, Chennai",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      bio: "Shipped top consumer applications in Chennai and Bengaluru with over 50M+ downloads across Google Play and iOS.",
      rating: 4.89,
      studentsCount: 65000,
      coursesCount: 3
    },
    whatYouWillLearn: [
      "Build fluid iOS and Android apps using modern React Native and Expo Router",
      "Implement 60fps gesture animations with React Native Reanimated 3",
      "Integrate live delivery location tracking with Mapbox and native GPS",
      "Manage offline state sync with local SQLite on low-connectivity networks",
      "Compile native binaries in the cloud using Expo Application Services (EAS)",
      "Prepare app listings for Google Play Store review"
    ],
    requirements: [
      "Working knowledge of React components, props, and hooks",
      "An Android or iOS smartphone for live wireless testing"
    ],
    modules: [
      {
        id: "m6-1",
        title: "Module 1: Expo Router & Native Component Architecture",
        duration: "7 hours",
        lessons: [
          {
            id: "l6-1",
            title: "1.1 Setting Up Expo SDK & File-Based Navigation",
            duration: "20:30",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "File-based routing with tabs, stack navigators, and modal presentation.",
            resources: ["Expo Project Starter Kit"]
          }
        ]
      }
    ]
  },
  {
    id: "course-7",
    title: "Cybersecurity & Ethical Hacking: Banking & UPI Defense Masterclass",
    slug: "cybersecurity-ethical-hacking-upi-defense",
    subtitle: "Offensive security, vulnerability assessment, and financial API protection.",
    description: "Learn offensive security fundamentals and defensive countermeasures aligned with Indian digital security standards. Master Kali Linux, Wireshark packet analysis, OWASP Top 10 vulnerabilities, API reconnaissance, Metasploit, and enterprise vulnerability remediation.",
    category: "Cybersecurity",
    level: "Advanced",
    rating: 4.95,
    ratingCount: 3620,
    studentsEnrolled: 22700,
    duration: "38 hours",
    totalDurationHours: 38,
    lessonsCount: 44,
    price: 4999,
    originalPrice: 9499,
    isBestseller: true,
    isTrending: false,
    isFeatured: true,
    updatedAt: "March 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    instructor: {
      name: "K. Senthil Nathan",
      role: "Lead Cyber Security Auditor & OSCP, NPCI UPI Security Council, Hyderabad",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      bio: "Red team consultant protecting top financial institutions and payment gateways across Hyderabad HITEC City and Bengaluru.",
      rating: 4.97,
      studentsCount: 94000,
      coursesCount: 3
    },
    whatYouWillLearn: [
      "Set up an isolated virtual penetration testing lab with Kali Linux",
      "Conduct network reconnaissance, port scanning, and OS fingerprinting using Nmap",
      "Exploit OWASP Top 10 web vulnerabilities (SQLi, CSRF, SSRF, IDOR)",
      "Audit payment gateway callbacks and UPI webhook signatures",
      "Perform privilege escalation on Windows and Linux targets",
      "Write professional remediation reports for security stakeholders"
    ],
    requirements: [
      "Solid understanding of computer networking (TCP/IP, HTTP/S, DNS)",
      "Comfort with Linux terminal commands",
      "A PC capable of running VirtualBox or VMware"
    ],
    modules: [
      {
        id: "m7-1",
        title: "Module 1: Ethical Hacking Foundations & Indian Cyber Laws",
        duration: "6 hours",
        lessons: [
          {
            id: "l7-1",
            title: "1.1 The Hacker Mindset & IT Act 2000 Guidelines",
            duration: "18:20",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Understanding scopes of engagement, authorized testing, and legal compliance.",
            resources: ["Rules of Engagement Agreement Template"]
          }
        ]
      }
    ]
  },
  {
    id: "course-8",
    title: "TypeScript Enterprise Architecture: PhonePe & IRCTC Scale Systems",
    slug: "typescript-enterprise-architecture-concurrency",
    subtitle: "Design modular, resilient enterprise backends with TypeScript, NestJS, and Apache Kafka.",
    description: "Scale your TypeScript mastery to enterprise systems handling millions of concurrent requests. Learn advanced type acrobatics, domain-driven design (DDD), hexagonal clean architecture, event-driven streaming with Apache Kafka, and distributed tracing across microservices.",
    category: "Web Development",
    level: "Advanced",
    rating: 4.94,
    ratingCount: 2140,
    studentsEnrolled: 16800,
    duration: "32 hours",
    totalDurationHours: 32,
    lessonsCount: 36,
    price: 4499,
    originalPrice: 8999,
    isBestseller: false,
    isTrending: true,
    isFeatured: false,
    updatedAt: "January 2026",
    language: "English & Hindi",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackSeeTheWorld.mp4",
    instructor: {
      name: "Kavitha Ramanathan",
      role: "Staff Distributed Systems Engineer, Bengaluru",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80",
      bio: "Ex-PhonePe and Zoho distributed systems architect. Specialist in high-concurrency event brokers and type-safe systems across Bengaluru and Chennai.",
      rating: 4.95,
      studentsCount: 68000,
      coursesCount: 3
    },
    whatYouWillLearn: [
      "Master conditional types, mapped types, template literal types, and inference",
      "Structure maintainable microservices using Domain-Driven Design (DDD)",
      "Build asynchronous event-driven pipelines using Apache Kafka and RabbitMQ",
      "Implement the Saga pattern for distributed transactions without locking",
      "Enforce end-to-end API type contracts with Zod and tRPC",
      "Benchmark throughput and diagnose memory leaks in high-load services"
    ],
    requirements: [
      "Comfortable with intermediate TypeScript and Node.js",
      "Understanding of asynchronous programming and database interactions"
    ],
    modules: [
      {
        id: "m8-1",
        title: "Module 1: Advanced Type Metaprogramming",
        duration: "7 hours",
        lessons: [
          {
            id: "l8-1",
            title: "1.1 Conditional Types & Infer Keyword Mastery",
            duration: "25:40",
            type: "video",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            summary: "Creating dynamic utility types that unpack nested generics with compile-time safety.",
            resources: ["Type Gymnastics Sandbox"]
          }
        ]
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Categories", count: 8, icon: "Layers" },
  { id: "Web Development", name: "Web Development", count: 2, icon: "Code2" },
  { id: "AI & Machine Learning", name: "AI & Machine Learning", count: 2, icon: "Cpu" },
  { id: "UI/UX Design", name: "UI/UX Design", count: 1, icon: "Palette" },
  { id: "Cloud & DevOps", name: "Cloud & DevOps", count: 1, icon: "Cloud" },
  { id: "Mobile Development", name: "Mobile Development", count: 1, icon: "Smartphone" },
  { id: "Cybersecurity", name: "Cybersecurity", count: 1, icon: "ShieldCheck" }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Aditya Rao",
    role: "Senior SDE II at Razorpay, Bengaluru (NIT Surathkal Alum)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    text: "Prof. R. Ananthakrishnan's Full-Stack Web Architecture course gave me the exact distributed systems and high-concurrency insights needed for my Razorpay interview. The UPI webhook projects are unmatched!",
    rating: 5,
    courseTitle: "Full-Stack Web Architecture 2026"
  },
  {
    id: 2,
    name: "Pooja Sundaram",
    role: "Lead Machine Learning Engineer at Freshworks, Chennai",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    text: "Dr. Lakshmi Narayanan's LLM & RAG course helped our team architect an internal autonomous customer intelligence copilot. Pure gold standard for Indian engineers.",
    rating: 5,
    courseTitle: "AI & Large Language Models"
  },
  {
    id: 3,
    name: "Sai Teja Reddy",
    role: "Senior Product Designer at CRED, Bengaluru / Hyderabad",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "Priya Nambiar's UI/UX masterclass breaks down micro-interactions and dark-mode FinTech systems better than any design school in India. Helped me build a world-class portfolio.",
    rating: 5,
    courseTitle: "UI/UX Design Masterclass"
  },
  {
    id: 4,
    name: "Keerthana Mohan",
    role: "Cloud DevOps Engineer at Zoho, Chennai",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    text: "Dr. Ashwin Rajagopal's Kubernetes and AWS Mumbai curriculum gave me practical infrastructure chops that immediately accelerated my career. JP Academy is truly world-class!",
    rating: 5,
    courseTitle: "Cloud DevOps & Kubernetes"
  }
];

export const FAQS = [
  {
    q: "How does progress tracking work on JP Academy?",
    a: "Every video lesson, code resource, and interactive quiz you complete updates your progress percentage in real time. Your progress is saved automatically to your profile in local storage so you can pause anytime and resume from your mobile or laptop."
  },
  {
    q: "Do I receive a verified certificate upon 100% completion?",
    a: "Yes! Once you reach 100% completion across all modules and pass the module quizzes, you unlock an official, verifiable JP Certificate of Completion with your name, unique QR/Certificate ID, and academic instructor signatures for LinkedIn and resume showcasing."
  },
  {
    q: "Are the courses taught in English or Hinglish / Regional languages?",
    a: "Our courses feature bilingual English & regional explanations — architectural terminology is delivered in industry-standard English, accompanied by intuitive concepts explained for maximum conceptual clarity across South Indian tech hubs."
  },
  {
    q: "Can I pay via UPI, GPay, PhonePe, or Net Banking?",
    a: "Yes, all Indian payment modes are supported including UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay/Visa/MasterCard credit and debit cards, and Net Banking across all Indian banks with instant enrollment activation."
  },
  {
    q: "Can I take notes while watching lectures?",
    a: "Yes! The JP classroom comes equipped with a built-in timestamped note-taking system. Jot down architectural reminders pinned to the exact second in the video, saved persistently on your device."
  }
];

export const TOP_HIRING_PARTNERS = [
  "Zoho (Chennai)",
  "Freshworks (Chennai)",
  "Infosys (Bengaluru/Mysore)",
  "Flipkart (Bengaluru)",
  "Swiggy (Bengaluru)",
  "Razorpay (Bengaluru)",
  "CRED (Bengaluru)",
  "PhonePe (Bengaluru)",
  "Microsoft India (Hyderabad)",
  "TCS (Siruseri Chennai)",
  "Wipro (Bengaluru)",
  "Titan Tech (Hosur)"
];
