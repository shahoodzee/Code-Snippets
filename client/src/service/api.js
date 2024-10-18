import { BASE_URL } from './apiUrls.js';
import request from './request.js';

export const login = (requestObj) => {
    return request({
        url: `${BASE_URL}/User/signIn`,
        method: 'POST',
        data: requestObj
    });
};

export const logout = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    return request({
        url: `${BASE_URL}/User/signOut`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export const signup = (requestObj) => {
    return request({
        url: `${BASE_URL}/User/Create`,
        method: 'POST',
        data: requestObj
    });
};

export const resetPassword = (requestObj) => {
    return request({
        url: `${BASE_URL}/User/ResetPassword`,
        method: 'POST',
        data: requestObj
    });
};

export const getUserById = (userId) => {
    return request({
        url: `${BASE_URL}/User/GetUser`,
        method: 'GET'
    });
};


export const fetchPost = () => {
    // return request({
    //     url: `${BASE_URL}/User/GetUser`,
    //     method: 'GET'
    // });
    const mockPost = {
        title: "Understanding React Hooks",
        description: "A comprehensive guide to React Hooks and their usage",
        code: "const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n});",
        dateCreated: new Date("2023-06-15T10:30:00"),
        createdBy: "John Doe",
        tags: ["React", "JavaScript", "Hooks"],
        comments: [
            { id: 1, content: "Great post!", author: "Alice", createdAt: new Date("2023-06-15T11:00:00") },
            { id: 2, content: "Very helpful, thanks!", author: "Bob", createdAt: new Date("2023-06-15T12:15:00") },
        ]
    };

    return Promise.resolve(mockPost);
};

export const fetchAllPosts = () => {
    // return request({
    //     url: `${BASE_URL}/User/GetUser`,
    //     method: 'GET'
    // });
    const resObj = {
        posts: [
            {
                id: 1,
                title: "Understanding React Hooks",
                description: "A comprehensive guide to React Hooks and their usage",
                code: "const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  document.title = `You clicked ${count} times`;\n});",
                dateCreated: new Date("2023-06-15T10:30:00"),
                createdBy: "John Doe",
                tags: ["React", "JavaScript", "Hooks"],
                comments: [
                    { id: 1, content: "Great post!", author: "Alice", createdAt: new Date("2023-06-15T11:00:00") },
                    { id: 2, content: "Very helpful, thanks!", author: "Bob", createdAt: new Date("2023-06-15T12:15:00") },
                ],
                likeCount: 5
            },
            {
                id: 2,
                title: "Introduction to Redux",
                description: "Learn the basics of state management with Redux",
                code: "const store = createStore(rootReducer);\n\nfunction mapStateToProps(state) {\n  return { todos: state.todos };\n}",
                dateCreated: new Date("2023-06-16T14:45:00"),
                createdBy: "Jane Smith",
                tags: ["Redux", "JavaScript", "State Management"],
                comments: [
                    { id: 1, content: "This cleared up a lot for me!", author: "Charlie", createdAt: new Date("2023-06-16T15:30:00") },
                    { id: 2, content: "Can you explain more about middleware?", author: "Diana", createdAt: new Date("2023-06-16T16:00:00") },
                ],
                likeCount: 4
            },
            {
                id: 3,
                title: "Mastering CSS Grid",
                description: "A deep dive into CSS Grid layout system",
                code: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}",
                dateCreated: new Date("2023-06-17T09:15:00"),
                createdBy: "Emily Chen",
                tags: ["CSS", "Web Design", "Layout"],
                comments: [
                    { id: 1, content: "This is exactly what I needed!", author: "Frank", createdAt: new Date("2023-06-17T10:00:00") },
                    { id: 2, content: "Could you cover flexbox next?", author: "Grace", createdAt: new Date("2023-06-17T11:30:00") },
                ],
                likeCount: 7
            },
            {
                id: 4,
                title: "JavaScript Promises Explained",
                description: "Understanding asynchronous JavaScript with Promises",
                code: "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));",
                dateCreated: new Date("2023-06-18T13:20:00"),
                createdBy: "Michael Johnson",
                tags: ["JavaScript", "Asynchronous", "Promises"],
                comments: [
                    { id: 1, content: "Finally, I understand Promises!", author: "Hannah", createdAt: new Date("2023-06-18T14:00:00") },
                    { id: 2, content: "Great explanation, thanks!", author: "Ian", createdAt: new Date("2023-06-18T15:45:00") },
                ],
                likeCount: 6
            },
            {
                id: 5,
                title: "Getting Started with Vue.js",
                description: "A beginner's guide to Vue.js framework",
                code: "new Vue({\n  el: '#app',\n  data: {\n    message: 'Hello Vue!'\n  }\n})",
                dateCreated: new Date("2023-06-19T11:00:00"),
                createdBy: "Sarah Lee",
                tags: ["Vue.js", "JavaScript", "Frontend"],
                comments: [
                    { id: 1, content: "Vue.js looks interesting!", author: "Jack", createdAt: new Date("2023-06-19T12:30:00") },
                    { id: 2, content: "How does it compare to React?", author: "Karen", createdAt: new Date("2023-06-19T13:15:00") },
                ],
                likeCount: 3
            },
            {
                id: 6,
                title: "Python for Data Science",
                description: "Introduction to using Python for data analysis",
                code: "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('data.csv')\nprint(df.describe())",
                dateCreated: new Date("2023-06-20T16:40:00"),
                createdBy: "David Wilson",
                tags: ["Python", "Data Science", "Analytics"],
                comments: [
                    { id: 1, content: "This is a great starting point!", author: "Laura", createdAt: new Date("2023-06-20T17:30:00") },
                    { id: 2, content: "Can you cover matplotlib next?", author: "Mark", createdAt: new Date("2023-06-20T18:00:00") },
                ],
                likeCount: 8
            },
            {
                id: 7,
                title: "RESTful API Design Principles",
                description: "Best practices for designing RESTful APIs",
                code: "GET /api/users\nPOST /api/users\nGET /api/users/{id}\nPUT /api/users/{id}\nDELETE /api/users/{id}",
                dateCreated: new Date("2023-06-21T10:10:00"),
                createdBy: "Alex Turner",
                tags: ["API", "REST", "Web Development"],
                comments: [
                    { id: 1, content: "Very informative, thanks!", author: "Olivia", createdAt: new Date("2023-06-21T11:00:00") },
                    { id: 2, content: "How about handling authentication?", author: "Paul", createdAt: new Date("2023-06-21T12:20:00") },
                ],
                likeCount: 5
            }
        ]
    };

    return Promise.resolve(resObj);
};


export const fetchUser = () => {
    const mockUser = {
        fullName: 'John Doe',
        role: 'Admin',
        imageUrl: null,
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St, Anytown, USA',
        dateOfBirth: new Date("1990-01-01"),
        gender: 'Male'
    };

    return Promise.resolve(mockUser);
};

// client/src/service/api.js

export const getTotalUsers = () => 100; // Mock data
export const getTotalPosts = () => 50; // Mock data
export const getTotalSnippets = () => 30; // Mock data
export const getTotalAttachments = () => 20; // Mock data