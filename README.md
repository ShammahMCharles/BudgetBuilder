# 💰 Budget Builder

**Take control of your finances, one goal at a time.**

🔗 **Live Application:** [BudgetBuilder](https://budgetbuilder-1.onrender.com)

## 📖 About the Project

Budget Builder is a personal finance application designed to help users organize their finances, track their spending, set budget goals, and plan for future purchases. I built this project to strengthen my full-stack development skills while creating something practical that people can use in their everyday lives.

The goal was to build more than just a budgeting calculator. I wanted to create an application that could help users better understand their financial situation, set meaningful goals, and make more informed financial decisions.

This project challenged me to bring together frontend development, backend API design, database management, and authentication into one working application.

## ✨ Features

* **User Authentication:** Register and log in to access personal financial information.
* **Budget Goals:** Create, view, update, and delete financial goals.
* **Financial Profile:** Track monthly income, expenses, savings, debt, and emergency funds.
* **Purchase Planning:** Add and manage planned purchases, including prices, categories, priorities, down payments, and monthly payments.
* **Personalized Data:** Keep financial information associated with the authenticated user.
* **Full-Stack Integration:** Connect a React frontend to a REST API backed by MongoDB.

## 🛠️ Tech Stack

| Technology   | Purpose                                |
| ------------ | -------------------------------------- |
| React        | Building the user interface            |
| TypeScript   | Type safety and more maintainable code |
| Vite         | Frontend development and build tooling |
| Node.js      | Backend runtime                        |
| Express.js   | REST API and routing                   |
| MongoDB      | Storing application data               |
| Mongoose     | Database models and queries            |
| JWT          | Authentication and protected routes    |
| Git & GitHub | Version control and project management |
| Render       | Hosting and deployment                 |

## 🧗 Challenges & Lessons Learned

Building Budget Builder wasn't always easy, but the challenges helped me become a better developer.

### 1. Debugging Backend and Database Errors

I encountered issues connecting to MongoDB, configuring environment variables, and handling backend errors. At different points, database connection problems and authentication-related errors prevented parts of the application from working as expected.

Working through these issues helped me better understand how database connections, middleware, environment configuration, and error handling fit together.

### 2. Connecting the Frontend and Backend

Getting the React frontend to communicate with the Express API required careful configuration. I had to troubleshoot API endpoints, HTTP methods, request handling, and the difference between local development URLs and production URLs.

This taught me the importance of testing API routes and making sure frontend requests match the backends' expected methods and data structures.

### 3. Handling CRUD Operations and Data Validation

Implementing create, read, update, and delete operations required me to make sure the frontend forms, API routes, and MongoDB models worked together correctly.

I also encountered issues involving mismatched category values and backend validation. Fixing these problems helped me understand why consistent data formats and validation rules matter across an application.

### 4. Deploying the Application

Deploying Budget Builder introduced a different set of challenges, including correcting a misspelled package dependency, troubleshooting deployment configuration, and separating frontend and backend settings.

I also learned why a deployed frontend cannot rely on `localhost` to reach a backend running on a remote server, and why production environment variables must be configured correctly.

Each error became an opportunity to troubleshoot, research, and understand the underlying problem instead of simply moving on.

## 🎉 What I Enjoyed

One of the most rewarding parts of this project was watching individual pieces come together into a functioning full-stack application.

I especially enjoyed designing features that solve practical problems, building CRUD functionality, working with database models, and connecting the frontend to the backend. Seeing a feature go from an idea to something I could test in the browser made the difficult moments worthwhile.

Some parts came together more easily than others, particularly once the project structure and API routes were in place. Other parts required patience, experimentation, and plenty of debugging.

Overall, creating Budget Builder was a fun learning experience that pushed me beyond writing individual components and helped me think about how a complete application works.

## 🚀 Future Improvements

Budget Builder is a work in progress, and I plan to continue expanding it. Some improvements I would like to explore include:

* Interactive charts and financial dashboards.
* Monthly spending breakdowns and expense tracking.
* More detailed savings and debt payoff projections.
* Improved affordability calculations for planned purchases.
* Enhanced form validation and user feedback.
* A more polished, responsive user interface.
* Additional financial insights and personalized recommendations.

These enhancements will give me more opportunities to improve my frontend, backend, database, and application design skills.

## 💡 What I Learned

Through this project, I gained practical experience with:

* Building and connecting a full-stack application.
* Designing and testing RESTful APIs.
* Implementing authentication and protected routes.
* Modeling and managing data with MongoDB and Mongoose.
* Debugging frontend, backend, and database integration issues.
* Configuring environment variables and deploying an application.
* Troubleshooting errors systematically and learning from failed attempts.

Most importantly, I learned that building software involves more than writing code. It also requires patience, problem-solving, testing, and the willingness to keep going when things don't work the first time.

## 🌱 Final Thoughts

Budget Builder started as a project to strengthen my development skills, but it became an opportunity to build something useful while learning through real-world challenges.

I'm proud of the progress I've made, the errors I've worked through, and the experience I've gained along the way. This is only the beginning, and I look forward to adding more features and continuing to improve the application.

**Thanks for checking out Budget Builder!**

🔗 **Try it here:** https://budgetbuilder-1.onrender.com
