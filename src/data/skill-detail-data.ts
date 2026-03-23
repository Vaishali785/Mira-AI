export type SkillTopicAsset = {
    label: string;
    url: string;
};

export type SkillTopic = {
    id: number;
    done: boolean;
    name: string;
    date: string | null;
    asset: SkillTopicAsset | null;
    post: string | null;
    postDate: string | null;
};

export const machineLearningTopics: SkillTopic[] = [
    {
        id: 1,
        done: true,
        name: "Linear Algebra Foundations",
        date: "Nov 12, 2024",
        asset: { label: "Notes", url: "#" },
        post: "Day 1 of ML: Linear algebra is the backbone of everything.\n\nDot products, matrix multiplication, eigenvectors - it all clicked today.\n\nIf you're starting ML, don't skip the math. It pays off.\n\n#MachineLearning #100DaysOfML",
        postDate: "Nov 12, 2024"
    },
    {
        id: 2,
        done: true,
        name: "Probability & Statistics",
        date: "Nov 15, 2024",
        asset: { label: "Cheatsheet", url: "#" },
        post: "Probability in ML is everything.\n\nBayes theorem, probability distributions, expected value - spent 3 hours on this today and it finally makes sense.\n\nStats is just math with opinions.\n\n#MachineLearning #Statistics",
        postDate: "Nov 15, 2024"
    },
    {
        id: 3,
        done: true,
        name: "Data Preprocessing",
        date: "Nov 18, 2024",
        asset: null,
        post: "Garbage in, garbage out.\n\nSpent today learning data preprocessing: imputation, scaling, encoding.\n\n80% of ML work is cleaning data. The other 20% is complaining about cleaning data.\n\n#DataScience #MLTips",
        postDate: "Nov 18, 2024"
    },
    {
        id: 4,
        done: true,
        name: "Linear Regression",
        date: "Nov 22, 2024",
        asset: { label: "Notebook", url: "#" },
        post: "Linear regression: the hello world of ML.\n\nTrained my first model today. MSE, gradient descent, closed-form solution.\n\nIt predicted house prices with 87% accuracy. I feel like a wizard.\n\n#MachineLearning #LinearRegression",
        postDate: "Nov 22, 2024"
    },
    {
        id: 5,
        done: true,
        name: "Logistic Regression",
        date: "Nov 25, 2024",
        asset: null,
        post: "Despite the name, logistic regression is a classification algorithm.\n\nSigmoid function, log loss, decision boundary - this one was dense.\n\nKey insight: it's just linear regression with a transformation at the end.\n\n#ML #LogisticRegression",
        postDate: "Nov 25, 2024"
    },
    {
        id: 6,
        done: true,
        name: "Decision Trees",
        date: "Nov 29, 2024",
        asset: { label: "Article", url: "#" },
        post: "Decision trees are just glorified 20 questions.\n\nGini impurity, information gain, pruning - learned it all today.\n\nThe beautiful thing: you can actually explain why the model made a decision.\n\n#ExplainableAI #ML",
        postDate: "Nov 29, 2024"
    },
    {
        id: 7,
        done: true,
        name: "Random Forests & Ensembles",
        date: "Dec 2, 2024",
        asset: null,
        post: "Why have one tree when you can have 500?\n\nRandom forests average out individual tree mistakes. It's wisdom of the crowd for algorithms.\n\nBagging, feature subsampling, OOB error - all makes sense now.\n\n#EnsembleMethods #ML",
        postDate: "Dec 2, 2024"
    },
    {
        id: 8,
        done: true,
        name: "Feature Engineering",
        date: "Dec 5, 2024",
        asset: { label: "Notes", url: "#" },
        post: "Feature engineering is where domain knowledge meets math.\n\nPolynomial features, interaction terms, target encoding - spent 4 hours on this.\n\nA mediocre model with great features beats a great model with bad features every time.\n\n#FeatureEngineering #DataScience",
        postDate: "Dec 5, 2024"
    },
    { id: 9, done: false, name: "Model Evaluation & Metrics", date: null, asset: null, post: null, postDate: null },
    { id: 10, done: false, name: "Gradient Descent Deep Dive", date: null, asset: null, post: null, postDate: null },
    { id: 11, done: false, name: "Neural Network Basics", date: null, asset: null, post: null, postDate: null },
    { id: 12, done: false, name: "Model Deployment & MLOps", date: null, asset: null, post: null, postDate: null }
];
