import { StudyDocument, Quiz, Recommendation, UserStats, ChatMessage } from "@/types";

// ─── Mock Documents ────────────────────────────────────────────────
export const MOCK_DOCUMENTS: StudyDocument[] = [
  {
    id: "doc-1",
    ownerId: "user-1",
    title: "Introduction to Machine Learning",
    course: "CS 4820",
    fileType: "pdf",
    status: "ready",
    pageCount: 42,
    wordCount: 18500,
    uploadedAt: "2026-06-25T10:00:00Z",
    updatedAt: "2026-06-25T10:05:00Z",
    size: 2400000,
    tags: ["AI", "algorithms"],
  },
  {
    id: "doc-2",
    ownerId: "user-1",
    title: "Organic Chemistry Chapter 7 - Reaction Mechanisms",
    course: "CHEM 301",
    fileType: "pdf",
    status: "ready",
    pageCount: 28,
    wordCount: 12300,
    uploadedAt: "2026-06-24T14:30:00Z",
    updatedAt: "2026-06-24T14:35:00Z",
    size: 1800000,
    tags: ["chemistry", "reactions"],
  },
  {
    id: "doc-3",
    ownerId: "user-1",
    title: "World War II - Lecture Notes Week 8",
    course: "HIST 201",
    fileType: "docx",
    status: "processing",
    uploadedAt: "2026-06-28T09:00:00Z",
    updatedAt: "2026-06-28T09:02:00Z",
    size: 450000,
    tags: ["history"],
  },
  {
    id: "doc-4",
    ownerId: "user-1",
    title: "Macroeconomics - GDP and Inflation Notes",
    course: "ECON 102",
    fileType: "txt",
    status: "ready",
    pageCount: 15,
    wordCount: 6800,
    uploadedAt: "2026-06-22T08:00:00Z",
    updatedAt: "2026-06-22T08:03:00Z",
    size: 120000,
    tags: ["economics"],
  },
  {
    id: "doc-5",
    ownerId: "user-1",
    title: "Calculus III - Vector Fields and Line Integrals",
    course: "MATH 301",
    fileType: "pdf",
    status: "failed",
    uploadedAt: "2026-06-27T16:00:00Z",
    updatedAt: "2026-06-27T16:01:00Z",
    size: 5200000,
    tags: ["math"],
  },
  {
    id: "doc-6",
    ownerId: "user-1",
    title: "Shakespeare's Tragedies - Analysis Guide",
    course: "ENGL 250",
    fileType: "pdf",
    status: "ready",
    pageCount: 55,
    wordCount: 24000,
    uploadedAt: "2026-06-20T11:00:00Z",
    updatedAt: "2026-06-20T11:06:00Z",
    size: 3100000,
    tags: ["literature"],
  },
];

// ─── Mock Quiz ─────────────────────────────────────────────────────
export const MOCK_QUIZ: Quiz = {
  id: "quiz-1",
  documentId: "doc-1",
  documentTitle: "Introduction to Machine Learning",
  title: "Machine Learning Fundamentals Quiz",
  difficulty: "medium",
  createdAt: "2026-06-25T11:00:00Z",
  questions: [
    {
      id: "q1",
      prompt: "Which of the following best describes supervised learning?",
      choices: [
        "A model learns from unlabeled data to find hidden patterns",
        "A model learns from labeled input-output pairs to make predictions",
        "A model learns through trial and error using reward signals",
        "A model compresses data into a lower-dimensional representation",
      ],
      answerIndex: 1,
      explanation:
        "Supervised learning uses labeled training data where each example has an associated target output. The model learns to map inputs to outputs based on these examples.",
      topic: "ML Fundamentals",
      difficulty: "easy",
    },
    {
      id: "q2",
      prompt: "What is the primary purpose of a validation set during model training?",
      choices: [
        "To train the model on more diverse data",
        "To evaluate final model performance for reporting",
        "To tune hyperparameters and detect overfitting",
        "To augment the training dataset",
      ],
      answerIndex: 2,
      explanation:
        "The validation set is used during training to tune hyperparameters and monitor for overfitting. It differs from the test set, which is only used for final evaluation.",
      topic: "Model Evaluation",
      difficulty: "medium",
    },
    {
      id: "q3",
      prompt: "Which algorithm is NOT typically used for classification tasks?",
      choices: [
        "Logistic Regression",
        "Linear Regression",
        "Random Forest",
        "Support Vector Machine",
      ],
      answerIndex: 1,
      explanation:
        "Linear Regression predicts continuous numerical values, making it a regression algorithm. The others — Logistic Regression, Random Forest, and SVM — are all commonly used for classification.",
      topic: "Algorithms",
      difficulty: "medium",
    },
    {
      id: "q4",
      prompt: "What does 'overfitting' mean in the context of machine learning?",
      choices: [
        "The model performs poorly on both training and test data",
        "The model has too few parameters to capture patterns",
        "The model memorizes training data but fails to generalize",
        "The model trains too slowly due to insufficient compute",
      ],
      answerIndex: 2,
      explanation:
        "Overfitting occurs when a model learns the training data too well, including noise and outliers, and consequently performs poorly on unseen data. It signals the model lacks generalization.",
      topic: "Model Evaluation",
      difficulty: "easy",
    },
    {
      id: "q5",
      prompt: "Which of the following is a dimensionality reduction technique?",
      choices: [
        "K-Means Clustering",
        "Principal Component Analysis (PCA)",
        "Gradient Boosting",
        "Naive Bayes",
      ],
      answerIndex: 1,
      explanation:
        "PCA is a dimensionality reduction technique that transforms data into a lower-dimensional space while preserving the most variance. It's commonly used for feature reduction and visualization.",
      topic: "Unsupervised Learning",
      difficulty: "hard",
    },
  ],
};

// ─── Mock Recommendations ──────────────────────────────────────────
export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "rec-1",
    type: "quiz",
    title: "Retake ML Quiz — Weak Topics Detected",
    description: "You scored 60% on Model Evaluation questions. A focused retake will help reinforce those concepts.",
    documentId: "doc-1",
    documentTitle: "Introduction to Machine Learning",
    priority: "high",
    actionLabel: "Retake Quiz",
    icon: "🎯",
  },
  {
    id: "rec-2",
    type: "summarize",
    title: "Summarize Organic Chemistry Notes",
    description: "Your Organic Chemistry PDF is ready. Generate an exam-focused summary to prepare for next week.",
    documentId: "doc-2",
    documentTitle: "Organic Chemistry Chapter 7",
    priority: "high",
    actionLabel: "Generate Summary",
    icon: "✨",
  },
  {
    id: "rec-3",
    type: "review",
    title: "Spaced Review — Macroeconomics",
    description: "It's been 6 days since you studied this. A quick review now will improve long-term retention.",
    documentId: "doc-4",
    documentTitle: "Macroeconomics - GDP and Inflation",
    priority: "medium",
    actionLabel: "Start Review",
    icon: "🔁",
  },
  {
    id: "rec-4",
    type: "chat",
    title: "Ask Questions About Shakespeare",
    description: "You haven't explored the chat feature for your Shakespeare guide yet. Try asking about key themes.",
    documentId: "doc-6",
    documentTitle: "Shakespeare's Tragedies - Analysis Guide",
    priority: "low",
    actionLabel: "Open Chat",
    icon: "💬",
  },
];

// ─── Mock User Stats ───────────────────────────────────────────────
export const MOCK_STATS: UserStats = {
  documentsUploaded: 6,
  quizzesTaken: 8,
  averageScore: 74,
  studyStreak: 5,
  totalStudyMinutes: 320,
  weeklyGoal: 5,
  weeklyProgress: 3,
};

// ─── Mock Chat Messages ────────────────────────────────────────────
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    role: "user",
    content: "What is gradient descent and how does it work?",
    timestamp: "2026-06-25T11:30:00Z",
  },
  {
    id: "msg-2",
    role: "assistant",
    content:
      "**Gradient descent** is an optimization algorithm used to minimize a function — typically the loss function in machine learning.\n\nHere's how it works:\n\n1. **Start at a random point** on the loss surface\n2. **Calculate the gradient** (the direction of steepest ascent)\n3. **Move in the opposite direction** of the gradient by a step size called the *learning rate*\n4. **Repeat** until the loss converges to a minimum\n\nThe key formula is: `θ = θ - α × ∇J(θ)` where α is the learning rate and ∇J(θ) is the gradient of the loss.",
    sources: [
      { label: "ML Notes, p. 12", page: 12, excerpt: "Gradient descent minimizes J(θ) by iteratively..." },
      { label: "ML Notes, p. 15", page: 15 },
    ],
    timestamp: "2026-06-25T11:30:15Z",
  },
  {
    id: "msg-3",
    role: "user",
    content: "What's the difference between batch, stochastic, and mini-batch gradient descent?",
    timestamp: "2026-06-25T11:31:00Z",
  },
  {
    id: "msg-4",
    role: "assistant",
    content:
      "Great follow-up! Here's a breakdown of the three variants:\n\n**Batch Gradient Descent**\n- Uses the entire dataset to compute gradient\n- Stable but slow for large datasets\n\n**Stochastic Gradient Descent (SGD)**\n- Uses a single random sample per update\n- Fast but noisy — can jump around the loss surface\n\n**Mini-batch Gradient Descent**\n- Uses a small subset (e.g., 32–256 samples)\n- Best of both worlds: efficient and reasonably stable\n- Most commonly used in practice",
    sources: [{ label: "ML Notes, p. 18", page: 18 }],
    timestamp: "2026-06-25T11:31:20Z",
  },
];

// ─── Mock Summary Content ──────────────────────────────────────────
export const MOCK_SUMMARY_BRIEF = `**Machine Learning** is a branch of AI that enables systems to learn from data without explicit programming.

**Key concepts covered:**
- **Supervised Learning**: Training on labeled input-output pairs (classification, regression)
- **Unsupervised Learning**: Finding patterns in unlabeled data (clustering, dimensionality reduction)
- **Model Evaluation**: Using train/validation/test splits to measure generalization
- **Overfitting vs Underfitting**: The bias-variance tradeoff as a central challenge

**Core algorithms**: Linear/Logistic Regression, Decision Trees, Random Forests, SVMs, Neural Networks, K-Means, PCA.`;

export const MOCK_SUMMARY_DETAILED = `## Introduction to Machine Learning — Detailed Summary

### 1. What is Machine Learning?
Machine Learning (ML) is a subfield of Artificial Intelligence focused on building systems that learn from experience. Rather than being explicitly programmed with rules, ML models identify patterns in data and improve their performance over time.

### 2. Types of Learning
**Supervised Learning** involves training a model on labeled data where each input has a corresponding output label. Common tasks include:
- Classification (predicting discrete categories)
- Regression (predicting continuous values)

**Unsupervised Learning** works with unlabeled data to discover hidden structure:
- Clustering (K-Means, DBSCAN)
- Dimensionality Reduction (PCA, t-SNE)

**Reinforcement Learning** trains agents through reward signals from environment interactions.

### 3. The ML Pipeline
1. Data collection and cleaning
2. Feature engineering and selection
3. Model selection and training
4. Hyperparameter tuning using validation set
5. Final evaluation on held-out test set
6. Deployment and monitoring

### 4. Key Challenges
- **Overfitting**: Model memorizes training data, fails to generalize
- **Underfitting**: Model too simple to capture patterns
- **Data quality**: Garbage in, garbage out
- **Class imbalance**: Skewed datasets bias model predictions

### 5. Core Algorithms
| Algorithm | Type | Use Case |
|-----------|------|----------|
| Linear Regression | Supervised | Continuous prediction |
| Logistic Regression | Supervised | Binary classification |
| Random Forest | Supervised | General classification/regression |
| K-Means | Unsupervised | Clustering |
| PCA | Unsupervised | Dimensionality reduction |`;

export const MOCK_SUMMARY_EXAM = `## Exam-Focused Summary: ML Fundamentals

### ⚡ Must-Know Definitions
- **ML**: Systems that learn from data without explicit programming
- **Overfitting**: High train accuracy, low test accuracy — model too complex
- **Underfitting**: Low accuracy on both — model too simple
- **Bias-Variance Tradeoff**: Core tension between model complexity and generalization

### 🎯 High-Yield Concepts
1. **Supervised vs Unsupervised**: Labeled vs unlabeled data
2. **Train/Val/Test Split**: Train=learn, Val=tune, Test=final evaluation only
3. **Gradient Descent**: Minimize loss by moving opposite to gradient; α = learning rate
4. **Regularization**: L1 (Lasso) adds sparsity; L2 (Ridge) shrinks weights

### 📋 Common Exam Questions
- "What is the purpose of a validation set?" → Hyperparameter tuning & overfitting detection
- "Which algorithm for classification vs regression?" → Logistic vs Linear Regression
- "What does PCA do?" → Reduces dimensions while preserving variance

### ⚠️ Common Mistakes
- Confusing validation set with test set
- Applying test set during training (data leakage)
- Forgetting to normalize features before distance-based algorithms`;

// ─── AI Context Document ──────────────────────────────────────────
export const MOCK_DOCUMENT_TEXT = `
TITLE: Introduction to Machine Learning
COURSE: CS 4820

1. WHAT IS MACHINE LEARNING?
Machine Learning (ML) is a subset of Artificial Intelligence (AI) that provides systems the ability to automatically learn and improve from experience without being explicitly programmed. Traditional programming requires hardcoding rules, whereas ML uses data to train models that infer rules.

2. SUPERVISED VS UNSUPERVISED LEARNING
Supervised Learning algorithms are trained using labeled data. The model learns a mapping from inputs (features) to outputs (labels or targets). Examples include:
- Classification: Categorizing data into discrete classes (e.g., spam vs. not spam). Common algorithms include Logistic Regression, Random Forest, and Support Vector Machines (SVM).
- Regression: Predicting continuous values (e.g., house prices). Linear Regression is the most common example.

Unsupervised Learning algorithms are used when the data has no labels. The system tries to learn the patterns and the structure from the data without guidance.
- Clustering: Grouping similar data points together. K-Means and DBSCAN are popular clustering algorithms.
- Dimensionality Reduction: Reducing the number of random variables under consideration by obtaining a set of principal variables. Principal Component Analysis (PCA) is widely used.

3. MODEL EVALUATION AND VALIDATION
When training an ML model, it is critical not to test the model on the data used to train it, as this leads to overfitting. Therefore, datasets are typically split into three sets:
- Training Set: Used to fit the model parameters. (Usually 70-80% of data)
- Validation Set: Used to tune hyperparameters (like learning rate) and prevent overfitting during the training process. (Usually 10-15% of data)
- Test Set: Used exclusively for the final evaluation of the model to provide an unbiased estimate of its performance on unseen data. (Usually 10-15% of data)

4. THE BIAS-VARIANCE TRADEOFF
- Overfitting (High Variance): The model performs extremely well on training data but poorly on unseen test data. It has memorized the noise instead of learning the signal. Solutions include adding more data, simplifying the model, or using regularization (like L1/Lasso or L2/Ridge).
- Underfitting (High Bias): The model is too simple to capture the underlying patterns in the data, performing poorly on both training and test data. Solutions include using a more complex model or engineering better features.
The goal of ML is to find the sweet spot that minimizes both bias and variance.

5. OPTIMIZATION: GRADIENT DESCENT
Gradient descent is an iterative optimization algorithm for finding the local minimum of a differentiable function. It is heavily used in training neural networks and regressions to minimize the Loss Function. 
The algorithm calculates the gradient (slope) of the loss function and takes a step in the opposite direction. The size of this step is controlled by a hyperparameter called the Learning Rate (α). 
- If α is too small, convergence is slow. 
- If α is too large, the algorithm may overshoot the minimum and diverge.
Types of Gradient Descent include Batch Gradient Descent (uses entire dataset), Stochastic Gradient Descent (uses one sample), and Mini-batch Gradient Descent (uses a small batch of samples).
`;
