import Measure from '../../assets/images/measure.svg';
import Learn from '../../assets/images/learn.svg';
import Build from '../../assets/images/build.svg';
import Practice from '../../assets/images/practice_circle.svg';
import Showcase from '../../assets/images/showcase.svg';
import bookIcon from '../../assets/images/book-w.svg';
import videoIcon from '../../assets/images/video-w.svg';
import articleIcon from '../../assets/images/article-w.svg';
import assessmentIcon from '../../assets/images/assessment-w.svg';

const routeConstant = {
  HOME: '/home',
  DASHBOARD: '/dashboard',
  LEARNINGPATHS: '/dashboard/learningpaths',
  SECTION: '/section',
  SECTIONID: '/section/:sectionId',
  LEARNINGPATH: '/learningpath',
  LEARNINGPATHID: '/learningpath/:pathId',
  LEARNER: '/learner',
  BOOK: '/book',
  BOOKID: '/book/:contentId',
  CONTENT: '/video',
  CONTENTID: '/:contentType/:contentId',
  REWARD: '/reward',
  EDITGOAL: '/editGoal',
  PROFILE: '/profile',
  EXPERTPASSWORDRESET: '/reset',
  LEARNERPASSWORDRESET: '/learner/reset',
  DOCUMENT: '/document',
  DOCUMENTID: '/:contentType/:contentId',
  ARTICLEID: '/:contentType/:contentId',
  ARTICLE: '/article',
  INVITESIGNUP: '/invite/signup',
  ASSESSMENT: '/assessment',
  ASSESSMENTID: '/assessment/:contentId',
  ADMIN: '/admin',
  CATEGORY: '/category',
  YTVIDEO: '/ytvideo',
  YTVIDEOID: '/:contentType/:contentId',
  CATALOG: '/catalog',
  LEARNER_CONTENT: '/contentList',
  CAREER: '/career',
  CAREERID: '/career/:careerId',
  SKILL: '/skill',
  SKILLID: '/skill/:skillId',
  COURSES: '/courses',
  UPLOADRESUME: '/upload-resume',
  COURSETYPEID: '/:courseType/:courseId',
  CAREER_TRACK: '/careertrack',
  SKILL_TRACK: '/skilltrack',
  MICRO_LEARNING: '/microlearning',
  COURSE: '/course',
  COURSEID: '/course/:courseId',
  CAREER_TRACK_ID: '/careertrack/:careerTrackId',
  SKILL_TRACK_ID: '/skilltrack/:skillTrackId',
  CERTIFICATE: '/certificate',
  SEARCH: '/courses/search/:searchParam',
  RECENT_HAPPENINGS: '/recentHappenings'
};

const isTabView = window.innerWidth <= 991;

const admin = {
  home: {
    adminSideMenu: [
      // {
      //   id: 'dashboard',
      //   img: 'fa fa-home'
      // },
      {
        id: 'manageUsers',
        img: 'fa fa-database'
      },
      {
        id: 'manageCategories',
        img: 'fa fa-bullseye'
      },
      {
        id: 'profile',
        img: 'fa fa-user-o'
      }
    ]
  },
  manageUsers: {
    tabList: ['All users', 'Pending invitations', 'Deactivated users']
  }
};

const courseSection = {
  careerImpact: {
    barChartData: [
      {
        name: '3-8 LPA', '0-4 years': 40, '4-8 years': 37, '>8 years': 45
      },
      {
        name: '8-13 LPA', '0-4 years': 25, '4-8 years': 42, '>8 years': 37
      },
      {
        name: '13-18 LPA', '0-4 years': 34, '4-8 years': 12, '>8 years': 45
      },
      {
        name: '18-23 LPA', '0-4 years': 44, '4-8 years': 18, '>8 years': 22
      },
      {
        name: '23-28 LPA', '0-4 years': 25, '4-8 years': 28, '>8 years': 15
      },
      {
        name: '>28 LPA', '0-4 years': 16, '4-8 years': 12, '>8 years': 35
      }
    ],
    reviewList: [
      {
        name: 'Josie Stevens',
        current: 'Product Manager at Google Inc.',
        url: 'google.com',
        prev: 'Marketing at Facebook Inc.'
      },
      {
        name: 'Alejandro Cobb',
        current: 'Technical Product Manager at Microsoft IDC',
        url: 'microsoft.com',
        prev: 'Technical lead at Apple Inc'
      },
      {
        name: 'Garrett Weber',
        current: 'Director, Products at Google Inc.',
        url: 'github.com',
        prev: 'Senior Manager at Atlassian Inc.'
      },
      {
        name: 'Sam Underwood',
        current: 'Product Manager at Cisco Networks',
        url: 'cisco.com',
        prev: 'Marketing at Facebook Inc.'
      }
    ],
    navigation: [
      'carrerTrack',
      'skillTrack'
    ],
    navigationLink: [
      'aboutUs',
      'blog'
    ],
    questionList: [
      {
        id: 1,
        question: 'Is the course really completely free of charge?'
      },
      {
        id: 2,
        question: 'This is the second question on the FAQ section of the application'
      },
      {
        id: 3,
        question: `What is the time commitment expected for this
        Data Visualization certification program?`
      },
      {
        id: 4,
        question: `Is there any certification granted at the
        end of the Data Visualization program?`
      },
      {
        id: 5,
        question: `Is there any minimum educational qualification required to
        take this Data Visualization certification program?`
      }
    ]
  },
  overViewSection: [
    {
      count: '4500+',
      learners: 'Learners',
      duration: '~2 hours',
      completion: 'Completion time'
    },
    {
      count: '20000+',
      learners: 'Visitors',
      duration: '60 XP',
      completion: 'Points'
    }
  ],
  syllabusList: [
    {
      title: 'Introduction to Data Visualization',
      desc: `You will start the program with a basic understanding
          of Data Visualization and the key skills required to become
          a successful product manager. Through this module, you will
          have an understanding of expectations from a product manager,
          how these expectations vary across companies and across industries.`,
      userName: 'Chad Carlson',
      designation: 'Head of Marketing & Data Visualization',
      publishedAt: '2 hours',
      order: 1
    },
    {
      title: 'Understanding the market',
      desc: `The first step before developing a product is to
          understand the current situation in the market. To understand your market, this module will
          cover various techniques you can use, as well as
          understand where your product stands in the mind of the customer..`,
      userName: 'Maude Barton',
      designation: 'Head of Data Visualization',
      publishedAt: '2 hours',
      order: 2
    },
    {
      title: 'Product Planning and Development',
      desc: `The first step before developing a product
          is to understand the current situation in the market. To understand your market, this module
          will cover various techniques you can use,
          as well as understand where your product stands in the mind of the customer..`,
      userName: 'Maude-Barton',
      designation: 'Head of Data Visualization',
      publishedAt: '2 hours',
      order: 3
    },
    {
      title: 'Building Artifacts from User Research',
      desc: `You will start the program with a basic understanding
          of Data Visualization and the key skills required to become
          a successful product manager. Through this module, you will
          have an understanding of expectations from a product manager,
          how these expectations vary across companies and across industries.`,
      userName: 'Chad Carlson',
      designation: 'Head of Data Visualization',
      publishedAt: '2 hours',
      order: 4
    }
  ],
  verifyPeopleList: [
    {
      name: 'Juan Wade',
      design: 'Professor at Harvard University'
    },
    {
      name: 'Cecelia Carr',
      design: 'Product Manager at Google'
    },
    {
      name: 'Scott Stewart',
      design: 'Senior Designer at Dropbox'
    },
    {
      name: 'Tommy Owen',
      design: 'Direct - Products, Lateral.io'
    },
    {
      name: 'Mitchell McGuire',
      design: 'CPO at Balsamiq'
    }
  ],
  productManagementUrl: 'https://www.blockline.com/product-management',
  ratingsCount: [
    {
      percentage: 69,
      rating: 5
    },
    {
      percentage: 18,
      rating: 4
    },
    {
      percentage: 45,
      rating: 3
    },
    {
      percentage: 5,
      rating: 2
    },
    {
      percentage: 3,
      rating: 1
    }
  ],
  commentList: [
    {
      name: 'Jared Woods',
      comment: `I love the simplicity of the course presentation and
          level of detail each section covers. Comprehensive curriculum
          and great examples provided both during the course and other
          ad-hoc links related to the subject matter. Thoroughly enjoyed it!`,
      day: '5th June 2018'
    },
    {
      name: 'Javier Zon',
      comment: `Now that I finished the whole course
          I can say that Cole and Evan's course offers
          a great learning experience from the beginning to the end
          and the content comes with a surplus that goes
          beyond standard theory/practice approaches, that you find in other places.`,
      day: '1st June 2018'
    },
    {
      name: 'Stefan Freitag',
      comment: `This thing changed my life. These guys not only showed me
          that there is a job for someone who is jack of all trades but after i took lots of notes every step of the
          way i suddenly realized i am holding a framework for how to think
          like PM and what to do every step of the way. `,
      day: '31st may 2018'
    }
  ],
  starCount: [5, 4, 3, 2, 1],
  currentRating: 4.3,
  total: '(123)',
  testimonialsCount: [1, 2, 3]
};

const dashboardSection = {
  carousel: [
    {
      id: 1,
      name: 'Basic Cloud Computing',
      imageUrl: 'http://www.techsparks.co.in/wp-content/uploads/2017/02/cloud-computing.jpg',
      lastUpdate: 'Last updated on 18th May 2018',
      rating: '(24 ratings)',
      count: '6514'
    },
    {
      id: 2,
      name: 'Advanced Cloud Computing',
      imageUrl: 'https://s3.amazonaws.com/ag-blockline/example/file/path/1533826781166.jpeg',
      lastUpdate: 'Last updated on 18th May 2018',
      rating: '(230 ratings)',
      count: '6515'
    },
    {
      id: 3,
      name: 'Data Mining',
      imageUrl: 'https://cdn01.alison-static.net/courses/1039/alison_courseware_intro_1039.jpg',
      lastUpdate: 'Last updated on 18th May 2018',
      rating: '(254 ratings)',
      count: '6518'
    },
    {
      id: 4,
      name: 'Data Analytics',
      imageUrl: 'https://cdn01.alison-static.net/courses/1037/alison_courseware_intro_1037.jpg',
      lastUpdate: 'Last updated on 18th May 2018',
      rating: '(267 ratings)',
      count: '6578'
    }
  ],
  tabTitles: ['Recommended', 'Most Viewed', 'Popular', 'Highly Rated']
};

const assessment = {
  sample: {
    title: 'sample',
    questions: [
      {
        type: 'mcq',
        options: [
          {
            option: 'Algebra which is linear'
          },
          {
            option: 'It is a branch of math'
          },
          {
            option: 'It is linear'
          },
          {
            option: 'It is a branch of physics'
          }
        ],
        question: 'What is linear algebra?',
        answer: {
          id: 1,
          name: 'Answer 2'
        }
      },
      {
        type: 'mcq',
        options: [
          {
            option: 'Former prime minister of the United Kingdom'
          },
          {
            option: 'A moron'
          },
          {
            option: 'A writer'
          },
          {
            option: 'A singer'
          }
        ],
        question: 'Who is Winston Churchill?',
        answer: {
          id: 2,
          name: 'Answer 1'
        }
      },
      {
        type: 'mcq',
        options: [
          {
            option: 'None of the below'
          },
          {
            option: 'emit property is used to fire an event'
          },
          {
            option: 'emit property is used to locate the event handler'
          },
          {
            option: 'emit property is used to stop an event'
          }
        ],
        question: 'What is true about Event emitter.emit Property?',
        answer: {
          id: 2,
          name: 'Answer 2'
        }
      }
    ]
  }
};

const footer = {
  tableContent: [
    'features',
    'blog',
    'useCases',
    'community',
    'userStories',
    'certified',
    'contactSales',
    'events'
  ],
  supportContent: [
    'learning',
    'careers',
    'support',
    'press',
    'forum',
    'contact',
    'developers'
  ],
  discover: [
    'business',
    'discover'
  ],
  helpSection: [
    'help',
    'status',
    'blog',
    'careers',
    'privacy',
    'terms',
    'about'
  ]
};

const constantValues = {
  expandableLimit: 900,
  descLimit: 15,
  contentTitleLimit: 100
};

const learningPathSectionList = {
  rating: 3.9,
  ratingCount: 24,
  count: 2237,
  pendingMinutes: 4,
  unlockPoints: 200,
  goalDuration: 15,
  concepts: 8,
  points: 4482,
  streakDay: 4,
  availableDays: 3,
  pointsToUnlock: 1000,
  goalDays: 7,
  goalPoints: 1000
};

const weekDayList = [
  {
    id: 1,
    name: 'day1',
    className: 'day1'
  }, {
    id: 2,
    name: 'day2',
    className: 'day2'
  }, {
    id: 3,
    name: 'day3',
    className: 'day3'
  }, {
    id: 4,
    name: 'day4',
    className: 'day4'
  }, {
    id: 5,
    name: 'day5',
    className: 'day5'
  }, {
    id: 6,
    name: 'day6',
    className: 'day6'
  }, {
    id: 7,
    name: 'day7',
    className: 'day7'
  }
];

const exploreCourses = [
  'Data Science',
  'Marketing',
  'Sales',
  'Startups & Fundrising',
  'Blockchain'
];

const careerTrackSideMenu = [
  {
    name: 'overview',
    desc: 'Overview'
  },
  {
    name: 'program-benefit',
    desc: 'Program Benefits'
  },
  {
    name: 'career-impact',
    desc: 'Career Impact'
  },
  {
    name: 'review',
    desc: 'Student Reviews'
  },
  {
    name: 'testimonial',
    desc: 'Student Testimonials'
  },
  {
    name: 'syllabus',
    desc: 'Syllabus'
  },
  {
    name: 'faq',
    desc: 'FAQs'
  }
];

const profileTabList = [
  'personal',
  'skills',
  'employment',
  'education',
  'certificates',
  'achievements',
  'recommend',
  'interested categories'
];

const socialMediaList = [
  {
    name: 'Twitter',
    url: 'twitter.com'
  },
  {
    name: 'Facebook',
    url: 'facebook.com'
  },
  {
    name: 'Linked In',
    url: 'linkedin.com'
  },
  {
    name: 'Instagram',
    url: 'instagram.com'
  }
];

const userStatus = {
  all: 'ALL',
  active: 'ACTIVE',
  pending: 'PENDING',
  deleted: 'DELETED'
};

const programBenefits = [
  {
    name: 'Measure',
    desc: `Identify core competencies in your
    profile & take learning paths to optimize
    your skills.`,
    imageComponent: Measure
  },
  {
    name: 'Learn',
    desc: `Acquire new skills. Choose from over
    100 intuitive Courses on R, Python,
    SQL, Git, Shell.`,
    imageComponent: Learn
  },
  {
    name: 'Build',
    desc: `Apply your skills to real-world problems.
    Start hands-on projects after completing your
    learning path..`,
    imageComponent: Build
  },
  {
    name: 'Practice',
    desc: `Sharpen and train your newly learned skills.
    Take bite-sized test, challenges & earn rewards.`,
    imageComponent: Practice
  },
  {
    name: 'Showcase',
    desc: `The first is a non technical method which
    requires the use of adware removal software.`,
    imageComponent: Showcase
  }
];

const RLanguages = [
  {
    name: 'R Programmer'
  },
  {
    name: 'Data Scientist with R'
  },
  {
    name: 'Data analyst with R'
  },
  {
    name: 'Quantitative analyst with R'
  }
];

const pythonLanguages = [
  {
    name: 'Python programmer'
  },
  {
    name: 'Data analyst with Python'
  }
];

const design = [
  {
    name: 'Become a User Experience Designer'
  },
  {
    name: 'Become a User Interface Design'
  },
  {
    name: 'Become an expert motion designer'
  },
  {
    name: 'Transition to UX design from UI design'
  },
  {
    name: 'Become an expert UX designer'
  },
  {
    name: 'Industrial & Product designer'
  },
  {
    name: 'Transition from Graphic to digital design'
  }
];

const otherCategories = [
  {
    name: 'Data Visualization'
  },
  {
    name: 'Data Science'
  },
  {
    name: 'Business'
  },
  {
    name: 'IoT - Internet of things'
  },
  {
    name: 'Project Management'
  },
  {
    name: 'Leadership'
  },
  {
    name: 'Productivity'
  }
];

const topLearningPathCategories = [
  {
    name: 'Blockchain'
  },
  {
    name: 'Data Science'
  },
  {
    name: 'Internet of things'
  },
  {
    name: 'Security'
  },
  {
    name: 'Cloud'
  }
];

const tabHeadersForBook = [
  'Book details',
  'How to read the book',
  'Chapters to read'
];

const apiConstant = {
  LEARNER: 'Learners',
  EXPERT: 'Experts',
  LEARNINGPATH: 'learningPath',
  CURRENT_ENTROLLMENT: 'current-enrolments',
  CATEGORIES: 'categories',
  CONTENT_COMPLETE: 'content-complete',
  ENROLL: 'enroll',
  SECTION: 'section',
  INTERESTCATEGORY: 'interestedCategory',
  CONTENTLIST: 'contentsList',
  ASSESSMENT: 'assessment',
  RESULT: 'result',
  UPLOADRESUME: 'uploadResume',
  SECTIONS: 'sections',
  UPDATEORDER: 'updateOrder',
  PUBLISH: 'publish',
  SKILLTRACK: 'skillTrack',
  SKILLTRACKS: 'SkillTracks',
  COMPLETEDCOURSES: 'completedCourses',
  CONTENT: 'content',
  USERS: 'Users',
  USERDETAILS: 'userDetails',
  UPDATEPERSONALDETAIL: 'updatePersonalDetails',
  UPLOADPROFILE: 'uploadProfile',
  LEARNEREMPLOYMENTS: 'LearnerEmployments',
  EMPLOYMENT: 'employment',
  LEARNEREDUCATIONS: 'LearnerEducations',
  EDUCATION: 'education',
  LEARNERSKILLS: 'LearnerSkills',
  SUBLEARNERSKILLS: 'learnerskills',
  ADDLEARNERSKILLS: 'addLearnerSkills',
  SKILLS: 'Skills',
  GAMIFICATION: 'Gamifications',
  USERREWARDS: 'userRewards',
  USER: 'user',
  USERREWARDSCORE: 'totalRewardScore',
  GETRECOMMENDEDLEARNINGS: 'getRecommendedLearnings',
  MICROLEARNING: 'microlearning',
  ALLCOURSES: 'allCourses',
  CAREERTRACKS: 'CareerTracks',
  COURSETYPE: 'CourseTypes',
  COURSES: 'Courses',
  CREATECONTENT: 'createContent',
  CONTENT_LIST: 'contentList',
  ALL_SECTIONS: 'Sections',
  CONTENTS: 'Contents',
  DOCUMENT: 'document',
  VIDEO: 'video',
  ORDER: 'order',
  QUESTION_TYPES: 'QuestionTypes',
  DEFAULT: 'default',
  CREATE_QUESTION: 'createQuestion',
  LIST_QUESTIONS: 'listQuestions',
  QUESTIONS: 'Questions',
  CREATEWALLET: 'createWallet',
  COURSE: 'course',
  CERTIFICATE: 'certificate',
  DOWNLOAD: 'download',
  UPLOADCERTIFICATE: 'uploadCertificate',
  RELATED_CONTENT: 'relatedContent',
  LATEST_HAPPENINGS: 'latestHappenings',
  LATEST_HAPPENING_TYPES: 'LatestHappeningTypes',
  CATEGORY: 'Categories',
  LATEST_HAPPENING: 'LatestHappenings',
  THUMBNAIL: 'thumbnail'
};

const reduxConstant = {
  userRedux: 'user',
  userRole: 'userRole',
  roleId: 'roleId',
  userId: 'userId'
};

const learningPathTabs = ['Top', 'New', 'Trending'];

const iconTypes = {
  Video: videoIcon,
  Book: bookIcon,
  Article: articleIcon,
  Assessment: assessmentIcon,
  Document: articleIcon,
  YTVideo: videoIcon
};

const ProfileFormInfo = {
  personalDetail: {
    title: 'Personal Detail',
    fields: [
      'first_name',
      'last_name',
      'place_of_birth',
      'date_of_birth',
      'city',
      'address',
      'summary',
      'mobile_number',
      'email'
    ]
  },
  skillDetail: {
    title: 'Skills',
    fields: []
  },
  editSkill: {
    title: 'Skills'
  },
  employmentDetail: {
    title: 'Employment',
    fields: [
      'title',
      'employer',
      'city',
      'start_month',
      'start_year',
      'end_month',
      'end_year',
      'description',
      'employer_url'
    ]
  },
  educationDetail: {
    title: 'Education',
    fields: [
      'title',
      'institute',
      'city',
      'start_month',
      'start_year',
      'end_month',
      'end_year',
      'description'
    ]
  },
  certificationform: {
    title: 'Certification',
    fields: [
      'certificatename',
      'enddate',
      'institue',
      'description'
    ]
  },
  interestedCategories: {
    title: 'Interested Categories',
    fields: []
  }
};

const monthList = [
  {
    name: 'January',
    id: 0
  },
  {
    name: 'February',
    id: 1
  },
  {
    name: 'March',
    id: 2
  },
  {
    name: 'April',
    id: 3
  },
  {
    name: 'May',
    id: 4
  },
  {
    name: 'June',
    id: 5
  },
  {
    name: 'July',
    id: 6
  },
  {
    name: 'August',
    id: 7
  },
  {
    name: 'September',
    id: 8
  },
  {
    name: 'Octobar',
    id: 9
  },
  {
    name: 'November',
    id: 10
  },
  {
    name: 'December',
    id: 11
  }
];

const badgeCompletionType = {
  section: 'ON_SECTION_COMPLETION',
  course: 'ON_COURSE_COMPLETION',
  assessment: 'ON_ASSESSMENT_COMPLETION',
  question: 'ON_CORRECT_ANSWER'
};

const rewardType = {
  badge: 'Badge',
  point: 'Point',
  message: 'Message'
};

const courseTypes = {
  'Skill track': 'skillTrack',
  'Career track': 'careerTrack',
  'Micro learning': 'microLearning'
};

const smallCourseTypes = {
  'Skill track': 'skilltrack',
  'Career track': 'careertrack',
  'Micro learning': 'microlearning',
  Microlearning: 'microlearning'
};

const thumnailCourseType = {
  'Career track': {
    url: 'CareerTracks'
  },
  'Skill track': {
    url: 'SkillTracks'
  },
  'Microlearning/Section': {
    url: 'Sections'
  },
  Section: {
    url: 'Sections'
  },
  Microlearning: {
    url: 'Sections'
  }
};

const courseTypeList = [
  {
    name: 'Career track',
    apiName: 'CareerTracks',
    urlName: 'careertrack'
  },
  {
    name: 'Skill track',
    apiName: 'SkillTracks',
    urlName: 'skilltrack'
  },
  {
    name: 'Microlearning/Section',
    apiName: 'Sections',
    urlName: 'microlearning'
  }
];

const courseDropdownList = [
  { name: 'Career track' },
  { name: 'Skill track' },
  { name: 'Microlearning' }
];

const userRole = {
  admin: 'ADMIN',
  expert: 'EXPERT',
  publisher: 'PUBLISHER',
  learner: 'LEARNER'
};

const expertDashboardTabs = ['All Courses', 'My Courses'];
const certificateVerifyUrl = 'https://ropsten.etherscan.io/tx';
const learnerEnrollmentTabs = ['Current Enrollments', 'Completed Courses'];
const recentHappeningTabs = ['My Recent Happenings', 'All Recent Happenings'];

module.exports = {
  routeConstant,
  constantValues,
  admin,
  courseSection,
  userStatus,
  profileTabList,
  learningPathSectionList,
  socialMediaList,
  programBenefits,
  careerTrackSideMenu,
  exploreCourses,
  weekDayList,
  RLanguages,
  pythonLanguages,
  design,
  otherCategories,
  topLearningPathCategories,
  tabHeadersForBook,
  dashboardSection,
  assessment,
  footer,
  isTabView,
  reduxConstant,
  apiConstant,
  learningPathTabs,
  iconTypes,
  ProfileFormInfo,
  monthList,
  badgeCompletionType,
  rewardType,
  courseTypes,
  smallCourseTypes,
  courseDropdownList,
  courseTypeList,
  thumnailCourseType,
  userRole,
  expertDashboardTabs,
  certificateVerifyUrl,
  learnerEnrollmentTabs,
  recentHappeningTabs
};
