export type ContentSection = {
  title?: string;
  paragraphs?: string[];
  list?: string[];
};

export const companyPageContent = {
  title: "About Devsinn Technologies",
  eyebrow: "Who Leads Delivery",
  introTitle: "A Product Engineering Team Built for Outcomes",
  introParagraphs: [
    "Devsinn Technologies builds AI-enabled SaaS, mobile products, and operations automation for businesses that need dependable delivery from technical planning through launch and long-term support.",
    "We are not a broad IT agency menu. We focus on four commercial offers: AI automation, SaaS MVPs, custom operational software, and app rescue/maintenance — with scoped sprints, visible milestones, and support after launch.",
    "Our team works from Lahore, Pakistan with clients across SaaS, agencies, hospitality, productivity tools, and operations-heavy businesses worldwide. Founder-led discovery, clear accountability, and weekly progress visibility are standard on every engagement.",
  ],
  sections: [
    {
      title: "How We Work",
      paragraphs: [
        "Every project starts with a baseline: what is broken or missing, what success looks like, and what is explicitly out of scope. We then deliver in focused sprints with demos, documentation, and a path to maintenance or expansion.",
      ],
      list: [
        "Discovery and fit assessment before build",
        "Scoped sprints with includes / not-includes",
        "Weekly progress and milestone reviews",
        "Post-launch support and retainer options",
        "Client-owned code, repos, and deployment access",
      ],
    },
    {
      title: "What We Are Known For",
      list: [
        "AI Automation Sprints for manual operations",
        "SaaS MVP delivery from idea to launch",
        "App rescue and stabilization sprints",
        "Custom dashboards, CRMs, and client portals",
        "Flutter, Next.js, NestJS, and AI workflow integrations",
      ],
    },
    {
      title: "Accountability",
      paragraphs: [
        "Founder and senior engineers lead major discovery calls. Delivery teams own milestones, documentation, and measurable outcomes. We ask for testimonials and reviews when value is delivered — because proof should compound into the next project.",
      ],
    },
  ] satisfies ContentSection[],
};

export const whyChooseUsContent = {
  title: "Why Choose Us",
  eyebrow: "Why Clients Choose Devsinn",
  introTitle: "Why Choose Devsinn Technologies?",
  introParagraphs: [
    "At Devsinn Technologies, we are committed to delivering top-notch software solutions that drive innovation and success. Here's why we stand out:",
  ],
  cards: [
    {
      title: "Expertise & Experience",
      description:
        "With a team of skilled developers, designers, and project managers, we bring years of industry experience in web, mobile, and enterprise software development.",
    },
    {
      title: "Client-Centric Approach",
      description:
        "We prioritize your business goals and tailor solutions to meet your unique needs, ensuring seamless collaboration and satisfaction.",
    },
    {
      title: "Cutting-Edge Technologies",
      description:
        "From AI-powered applications to scalable cloud solutions, we leverage the latest technologies to keep you ahead of the competition.",
    },
    {
      title: "Agile & Transparent Process",
      description:
        "Our agile development approach ensures flexibility, faster delivery, and continuous improvement while keeping you informed at every step.",
    },
    {
      title: "Quality & Security First",
      description:
        "We adhere to industry best practices, ensuring that our solutions are secure, scalable, and high-performing.",
    },
    {
      title: "End-to-End Services",
      description:
        "From ideation and development to deployment and maintenance, we provide full-cycle software development services.",
    },
  ],
  closing:
    "Partner with Devsinn Technologies and turn your ideas into reality with reliable, scalable, and innovative software solutions.",
};

export const termsContent = {
  title: "Terms of Use",
  eyebrow: "Website Terms",
  introTitle:
    "Terms governing use of devsinntechnologies.com and related Devsinn business communications.",
  items: [
    {
      title: "Services Overview",
      body: "Devsinn Technologies provides software engineering, product strategy, AI automation, SaaS MVP development, custom software, app rescue, and related consulting services. Information on this website is for general business communication and does not constitute a binding offer until confirmed in a written agreement.",
    },
    {
      title: "Use of the Website",
      body: "You may use this website for lawful purposes only. You may not use this website in any way that infringes on the rights of others, or that is in violation of any applicable laws or regulations.",
    },
    {
      title: "Intellectual Property",
      body: "All content on this website, including but not limited to text, graphics, images, and logos, is the property of Devsinn Technologies or its licensors and is protected by copyright and other intellectual property laws. You may not use, copy, or distribute any content from this website without our express written consent.",
    },
    {
      title: "Disclaimer of Warranties",
      body: "Devsinn Technologies makes no representations or warranties about the accuracy, completeness, or reliability of the information on this website. This website is provided on an \"as is\" and \"as available\" basis.",
    },
    {
      title: "Limitation of Liability",
      body: "Devsinn Technologies is not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.",
    },
    {
      title: "Links to Third-Party Websites",
      body: "This website may contain links to third-party websites that are not owned or controlled by Devsinn Technologies. We are not responsible for the content or practices of these websites.",
    },
    {
      title: "Indemnification",
      body: "You agree to indemnify and hold Devsinn Technologies and its affiliates, officers, agents, and employees harmless from any claim, demand, or damage, including reasonable attorneys' fees, arising out of or in connection with your use of this website.",
    },
    {
      title: "Changes to Terms and Conditions",
      body: "We reserve the right to update or modify these terms and conditions at any time. Your continued use of this website after any such changes constitutes your acceptance of the new terms and conditions.",
    },
    {
      title: "Governing Law",
      body: "These terms and conditions are governed by the laws of Pakistan, and you agree to submit to the exclusive jurisdiction of the courts located in Lahore, Pakistan for any disputes arising out of or in connection with these terms and conditions.",
    },
  ],
};

export const privacyContent = {
  title: "Privacy Policy",
  eyebrow: "Your Privacy",
  introTitle: "How Devsinn Technologies handles personal information",
  introParagraphs: [
    "This policy explains how Devsinn Technologies collects, uses, stores, and protects personal information shared through devsinntechnologies.com, contact forms, booking tools, email, WhatsApp, and other business communications.",
    "Last updated: June 2026.",
  ],
  items: [
    {
      title: "Information We Collect",
      body: "We may collect your name, work email, company or product URL, phone number, project details, budget range, timeline, and communication preferences when you submit a form, book a call, email us, or message us on WhatsApp or social channels.",
    },
    {
      title: "How We Use Information",
      body: "We use contact information to respond to inquiries, qualify projects, schedule calls, prepare proposals, deliver services, send requested updates, and improve our website and offers. We do not sell personal information.",
    },
    {
      title: "Tools and Processors",
      body: "We may use third-party tools such as email delivery providers, form handlers, analytics, calendar booking, and cloud hosting. These providers process data only as needed to operate the service.",
    },
    {
      title: "Data Retention",
      body: "We retain inquiry and project-related information for as long as needed to respond, deliver services, meet legal obligations, and maintain business records. You may request deletion of non-essential marketing data.",
    },
    {
      title: "Security",
      body: "We apply reasonable administrative and technical safeguards to protect information. No online transmission is completely secure, so please avoid sending highly sensitive credentials through unsecured channels.",
    },
    {
      title: "Your Rights",
      body: "You may request access, correction, or deletion of personal information we hold about you by emailing hello@devsinn.co.uk. We will respond within a reasonable timeframe.",
    },
    {
      title: "Contact",
      body: "For privacy questions contact Devsinn Technologies at hello@devsinn.co.uk or +92 336 5918295.",
    },
  ],
};

export const supportContent = {
  title: "Support",
  eyebrow: "We're Here To Help",
  introTitle: "Get the Support You Need with Devsinn",
  introParagraphs: [
    "At Devsinn Technologies, we provide reliable technical support for the digital products and solutions we develop, including AI automation systems, SaaS platforms, custom software, and mobile applications. Our experienced team helps clients resolve technical issues, maintain system performance, and keep their products stable, secure, and running smoothly.",
    "Whether you need troubleshooting, bug fixes, ongoing maintenance, product updates, performance improvements, or technical guidance, we work closely with your team to understand and address your requirements effectively. Our goal is to minimize disruptions, improve product reliability, and provide responsive and dependable support throughout your product's lifecycle.",
  ],
  sections: [
    {
      title: "Features & Benefits",
      list: [
        "Real-time Assistance",
        "Feedback Collection",
        "Remote Assistance",
        "24x7 Support",
      ],
    },
  ] satisfies ContentSection[],
};
