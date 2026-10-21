// Portfolio data extracted from existing pages
export const sections = [
    { id: 'home', label: 'HOME', icon: 'home' },
    { id: 'experience', label: 'EXPERIENCE', icon: 'briefcase' },
    { id: 'projects', label: 'PROJECTS', icon: 'folder' },
    { id: 'about', label: 'ABOUT', icon: 'user' },
    { id: 'gallery', label: 'GALLERY', icon: 'image' },
];

export const projects = [
    {
        number: '01',
        title: 'VR App for Students with EBD',
        eyebrow: 'Immersive learning experience',
        description: 'Project aimed at creating a virtual reality experience that immerses players in a cartoonish world where players witness short stories and learn how the characters overcome various emotional challenges. The game is designed to educate players on emotional issues in an engaging and interactive way, using humor and relatable scenarios to foster empathy and understanding.',
        tags: ['Unity', 'VR', 'Education'],
        images: [
            'src/assets/Portfolio/Images/Projects/VR_InGame.jpg',
            'src/assets/Portfolio/Images/Projects/VR_Menu.gif',
            'src/assets/Portfolio/Images/Projects/VR_Setting.png',
            'src/assets/Portfolio/Images/Projects/VR_Tutorial.png',
        ],
    },
    {
        number: '02',
        title: 'Buzz',
        eyebrow: 'Social platform prototype',
        description: 'Buzz is a social media platform that allows users to create, share, and interact with content in a dynamic and engaging way. With features such as posting text and images, liking, and commenting, Buzz fosters a vibrant community where users can connect and express themselves. The platform utilizes Google authentication for secure and easy access, ensuring a smooth user experience.',
        tags: ['React', 'Google Auth', 'Community'],
        images: [
            'src/assets/Portfolio/Images/Projects/Buzz_HomeScreen.jpg',
            'src/assets/Portfolio/Images/Projects/Buzz_LoginScreen.jpg',
            'src/assets/Portfolio/Images/Projects/Buzz_AdminConsole.png',
        ],
    },
];

export const careerEntries = [
    {
        date: 'Jan 2022',
        company: 'Lehigh University',
        role: 'Technology Consultant',
        initials: 'LU',
        description: 'Inspired by my love of building computers, I joined the LTS department to troubleshoot and repair campus computers. I diagnosed issues, found solutions, and tracked every repair through Jira.',
        skills: ['Diagnostics', 'Jira', 'IT Support'],
    },
    {
        date: 'Aug 2022',
        company: 'Lehigh University',
        role: 'Software Engineer Teaching Assistant',
        initials: 'LU',
        description: 'I supported young developers across three teams, mentoring them through Agile methodology, RESTful APIs, Google OAuth, dependency management, deployment, and full-stack connections.',
        skills: ['Mentorship', 'REST APIs', 'Agile'],
    },
    {
        date: 'May 2023 - Aug 2023',
        company: 'FreeWheel / Comcast',
        role: 'Software Engineer Intern',
        initials: 'FW',
        description: 'My first software developer position. I helped upgrade FreeWheel\'s QA certification webpage, building practical experience while learning from a new engineering team.',
        skills: ['Web Development', 'QA', 'Internship'],
    },
    {
        date: 'Jan 2024',
        company: 'Lehigh University',
        role: 'Head Teaching Assistant',
        initials: 'LU',
        description: 'Promoted to Head Teaching Assistant, taking responsibility for coordinating and supporting the other teaching assistants alongside helping student teams succeed.',
        skills: ['Leadership', 'Teaching', 'Coordination'],
    },
    {
        date: 'Sept 2024',
        company: 'ID Holdings',
        role: 'Software Developer (Application)',
        initials: 'ID',
        description: 'I moved to Japan to develop applications with the skills I had built while taking on the challenge of working in a new country and improving my Japanese language ability.',
        skills: ['Application Development', 'Japan', 'Japanese'],
    },
    {
        date: 'March 2025',
        company: 'ID Holdings',
        role: 'Software Developer (Databases)',
        initials: 'ID',
        description: 'I joined a team where my development experience and fluency in English are better utilized. Along the way, I obtained my JLPT N2 certification with support from my teammates.',
        skills: ['Databases', 'English', 'JLPT N2'],
    },
];

export const skills = ['React', 'Java', 'JavaScript', 'Databases', 'SQL', 'Full Stack'];

export const contactLinks = [
    { label: 'GitHub', href: 'https://github.com/sunnyyou3' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/sunnyyou3' },
    { label: 'Email', href: 'mailto:yousunny3@gmail.com' },
];
