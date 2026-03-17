export const demoStudent = {
  name: 'Sanjay Kumar',
  department: 'Computer Science and Engineering',
  shortDept: 'CSE',
  year: '2nd Year',
  college: 'Sri Sairam Engineering College',
  location: 'Chennai, India',
  registerNumber: '2023CSE1021',
  email: 'sanjay.cse@sairam.edu',
}

export const demoCredentials = {
  email: 'sanjay.cse@sairam.edu',
  password: 'password123',
}

export const demoAnnouncements = [
  {
    id: 'a1',
    title: 'Internal Exam Schedule Released',
    message:
      'The internal exams for CSE 2nd year will start from April 10. Students must check the timetable.',
    postedBy: 'Dr. Priya Raman',
  },
  {
    id: 'a2',
    title: 'Hackathon Registration Open',
    message: 'Students can register for the Sairam Tech Hackathon.',
    postedBy: 'CSE Department Office',
  },
  {
    id: 'a3',
    title: 'Placement Training Session',
    message: 'Placement training will be conducted in Seminar Hall 2.',
    postedBy: 'Placement Cell',
  },
]

export const demoEvents = [
  {
    id: 'e1',
    title: 'Sairam Tech Hackathon 2026',
    date: 'April 15',
    location: 'Innovation Lab',
    description: '24-hour coding competition for AI and web development.',
  },
  {
    id: 'e2',
    title: 'AI Workshop',
    date: 'April 5',
    location: 'CSE Lab 3',
    description: 'Hands-on workshop on machine learning.',
  },
]

export const demoChatChannels = [
  { id: 'c1', name: 'CSE-2ND-YEAR' },
  { id: 'c2', name: 'DATA-STRUCTURES' },
  { id: 'c3', name: 'HACKATHON-TEAM' },
]

export const demoChatMessages = {
  'CSE-2ND-YEAR': [
    { id: 'm1', author: 'Sanjay', text: 'Anyone started the data structures assignment?' },
    { id: 'm2', author: 'Rahul', text: "Yes bro it's about binary trees." },
  ],
  'DATA-STRUCTURES': [
    { id: 'm3', author: 'Rahul', text: 'Anyone clear on traversals? I can share notes.' },
    { id: 'm4', author: 'Sanjay', text: 'Please share, that would help a lot.' },
  ],
  'HACKATHON-TEAM': [
    { id: 'm5', author: 'Sanjay', text: 'Team, should we finalize the idea today?' },
    { id: 'm6', author: 'Rahul', text: 'Yes, let’s meet after lab.' },
  ],
}

export const demoLostFound = [
  { id: 'l1', item: 'Scientific Calculator', details: 'Found near CSE Lab 2.' },
  { id: 'l2', item: 'Black Backpack', details: 'Lost near library.' },
]

export const demoMarketplace = [
  { id: 'p1', item: 'Data Structures Textbook', price: '₹400', details: 'Condition: Good' },
  { id: 'p2', item: 'Laptop Stand', price: '₹500', details: 'Adjustable aluminium stand.' },
]

export const demoSkillExchange = [
  { id: 's1', title: 'Teach Python Programming' },
  { id: 's2', title: 'Looking for UI/UX designer for hackathon project.' },
]

export const demoStartup = {
  name: 'EduTrack',
  description: 'A productivity tracker for college students.',
  skillsNeeded: ['Frontend developer', 'Backend developer', 'UI designer'],
}

export const demoCampusLocations = [
  'Library',
  'CSE Block',
  'Innovation Lab',
  'Auditorium',
  'Hostel',
  'Cafeteria',
  'Sports Ground',
]

export const demoBusRoute = {
  routeName: 'Route 3',
  stops: ['Tambaram', 'Perungalathur', 'Guduvanchery', 'Sri Sairam Engineering College'],
  status: 'Currently near Guduvanchery.',
}

export const demoAssistantSeed = [
  {
    q: 'Where is CSE Lab 2?',
    a: 'CSE Lab 2 is located in the Computer Science block on the second floor.',
  },
]
